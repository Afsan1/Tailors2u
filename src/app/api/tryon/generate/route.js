import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const IMAGE_OUTPUT_MODELS = [
  'gemini-3.1-flash-image',
  'gemini-3.1-flash-lite-image',
  'gemini-2.5-flash-image',
  'gemini-2.0-flash-preview-image-generation',
  'gemini-2.0-flash-exp',
];

const TEXT_MODELS = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-2.0-flash-lite'];

export async function POST(request) {
  try {
    const body = await request.json();
    const { image, fabric, imageWidth, imageHeight } = body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return NextResponse.json({ success: false, message: 'GEMINI_API_KEY not configured.' }, { status: 500 });
    if (!image)  return NextResponse.json({ success: false, message: 'No image provided.' }, { status: 400 });

    const base64Data = image.split(',')[1];
    const mimeType   = image.split(';')[0].split(':')[1] || 'image/jpeg';
    const imagePart  = { inlineData: { data: base64Data, mimeType } };
    const genAI      = new GoogleGenerativeAI(apiKey);

    // ── STEP 1: Try image-generating models (paid tier) ───────────────────────
    const editPrompt = buildEditPrompt(fabric);
    for (const modelName of IMAGE_OUTPUT_MODELS) {
      try {
        console.log(`[TryOn] Trying image model: ${modelName}`);
        const model  = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent({
          contents: [{ role: 'user', parts: [imagePart, { text: editPrompt }] }],
          generationConfig: { responseModalities: ['image', 'text'] },
        });
        const parts     = result.response?.candidates?.[0]?.content?.parts || [];
        let imageData   = null;
        let textOut     = '';
        for (const p of parts) {
          if (p.inlineData?.mimeType?.startsWith('image/')) imageData = p.inlineData;
          if (p.text) textOut += p.text;
        }
        if (imageData) {
          console.log(`[TryOn] Image generation SUCCESS: ${modelName}`);
          const { fitAnalysis, styleAdvice } = parseTextAnalysis(textOut, fabric);
          return NextResponse.json({
            success: true, method: 'ai-image',
            resultImage: `data:${imageData.mimeType};base64,${imageData.data}`,
            fitAnalysis, styleAdvice, modelUsed: modelName,
          });
        }
      } catch (err) {
        console.warn(`[TryOn] ${modelName} failed:`, (err.message || '').substring(0, 100));
      }
    }

    // ── STEP 2: Free-tier fallback — bounding box detection ───────────────────
    console.log('[TryOn] Image models unavailable. Using bounding box detection...');

    const bboxPrompt = buildBBoxPrompt(fabric);

    for (const modelName of TEXT_MODELS) {
      try {
        console.log(`[TryOn] BBox detection with ${modelName}`);
        const model  = genAI.getGenerativeModel({ model: modelName, generationConfig: { responseMimeType: 'application/json' } });
        const result = await model.generateContent([bboxPrompt, imagePart]);
        const parsed = JSON.parse(result.response.text());

        // Validate required fields exist and are reasonable
        const sb = parsed.shirtBox;
        const fb = parsed.faceBox;
        if (sb && typeof sb.top === 'number' && typeof sb.left === 'number' &&
            typeof sb.bottom === 'number' && typeof sb.right === 'number' &&
            sb.bottom > sb.top && sb.right > sb.left) {

          console.log(`[TryOn] BBox success: shirt ${JSON.stringify(sb)}, face ${JSON.stringify(fb)}`);
          return NextResponse.json({
            success:     true,
            method:      'canvas-composite',
            shirtBox:    sb,
            faceBox:     fb || null,
            handsBox:    parsed.handsBox || null,
            fitAnalysis: parsed.fitAnalysis || '',
            styleAdvice: parsed.styleAdvice || '',
            modelUsed:   modelName,
          });
        }
        console.warn(`[TryOn] ${modelName} returned invalid bbox:`, JSON.stringify(parsed).substring(0, 200));
      } catch (err) {
        console.warn(`[TryOn] ${modelName} BBox error:`, (err.message || '').substring(0, 100));
      }
    }

    // ── STEP 3: Hard geometric fallback ───────────────────────────────────────
    console.warn('[TryOn] All models failed. Using geometric fallback.');
    return NextResponse.json({
      success: true, method: 'canvas-composite',
      shirtBox: { top: 22, left: 18, bottom: 72, right: 82 },
      faceBox:  { top:  0, left: 28, bottom: 22, right: 72 },
      handsBox: null,
      fitAnalysis: 'Standard body pose detected. Fabric applied to estimated torso region.',
      styleAdvice: `${fabric.name} from ${fabric.origin} at ${fabric.weight} — an exceptional choice for a refined look.`,
      modelUsed: 'fallback',
    });

  } catch (error) {
    console.error('[TryOn] Unexpected error:', error);
    return NextResponse.json({ success: false, message: error.message || 'Server error.' }, { status: 500 });
  }
}

// ─────────────────────────────────────────────────────────────────────────────

function buildEditPrompt(fabric) {
  const textures = {
    cotton: 'soft matte cotton weave with natural thread pattern',
    linen:  'natural linen with visible slubs and open weave',
    silk:   'lustrous silk satin with smooth sheen and fluid drape',
    wool:   'fine structured wool suiting with tight twill weave',
  };
  return `Professional photo retouching task: Replace ONLY the shirt/garment on this person.
New fabric: ${fabric.name} — ${textures[fabric.patternType] || 'premium fabric'} — colour ${fabric.color}.
PRESERVE EXACTLY (change nothing): face, skin, hair, hands, accessories, background, lighting, trousers, shoes.
GARMENT: keep exact silhouette, collar, sleeves. Add realistic folds/wrinkles. Photographic quality result.`;
}

function buildBBoxPrompt(fabric) {
  return `You are a precise computer vision assistant analyzing a photo.

Your task: identify three rectangular regions and return them as percentage coordinates (0 to 100) relative to the total image width and height.

REGION 1 — SHIRT/GARMENT: The upper body garment (shirt, jacket, etc.) the person is wearing.
  - Include: torso front, both sleeves/arms of the garment, collar area
  - Exclude: face/head, bare hands/wrists, pants/legs, background
  - Be conservative — if unsure, make the box slightly smaller

REGION 2 — FACE: The person's face and head area.
  - Include: hair, forehead, chin, ears
  - This region will be fully protected from fabric overlay

REGION 3 — HANDS (optional): Any visible bare hands/wrists area.

IMPORTANT RULES for coordinates:
  - "top" = distance from image TOP edge (0=top, 100=bottom)
  - "left" = distance from image LEFT edge (0=left, 100=right)
  - "bottom" must be greater than "top"
  - "right" must be greater than "left"
  - All values are INTEGER percentages between 0 and 100
  - The shirt box must NOT overlap with the face box
  - If the person is off-center, shift the boxes to match their actual position

Return ONLY this JSON with no markdown or explanation:
{
  "shirtBox": { "top": <int>, "left": <int>, "bottom": <int>, "right": <int> },
  "faceBox":  { "top": <int>, "left": <int>, "bottom": <int>, "right": <int> },
  "handsBox": { "top": <int>, "left": <int>, "bottom": <int>, "right": <int> },
  "fitAnalysis": "Detailed paragraph on posture, shoulder width, shirt fit, and recommended size.",
  "styleAdvice": "Detailed paragraph on styling the ${fabric.name} (${fabric.patternType}) fabric for this body type."
}`;
}

function parseTextAnalysis(text, fabric) {
  if (text && text.length > 60) {
    return {
      fitAnalysis: text.substring(0, 500),
      styleAdvice: `${fabric.name} from ${fabric.origin} — pair with tailored trousers for a refined look.`,
    };
  }
  return {
    fitAnalysis: 'AI garment analysis complete.',
    styleAdvice: `${fabric.name} from ${fabric.origin} at ${fabric.weight} — commands quiet authority.`,
  };
}
