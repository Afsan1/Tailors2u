import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request) {
  try {
    const body = await request.json();
    const { image, fabric, garment, collar, sleeve } = body;

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Mock / Simulated response if no API key is provided
      // Generate some default paths that fit a standard center torso
      let mockSvgContent = '';
      if (garment === 'pants') {
        mockSvgContent = `
          <!-- Trousers tailored overlay -->
          <path d="M 142 200 L 258 200 L 265 260 L 135 260 Z" fill="url(#tryon-pattern-active)" stroke="rgba(255,217,190,0.3)" strokeWidth="1.5" />
          <path d="M 135 260 L 120 490 L 180 490 L 200 290 Z" fill="url(#tryon-pattern-active)" stroke="rgba(255,217,190,0.2)" strokeWidth="1.2" />
          <path d="M 265 260 L 280 490 L 220 490 L 200 290 Z" fill="url(#tryon-pattern-active)" stroke="rgba(255,217,190,0.2)" strokeWidth="1.2" />
        `;
      } else if (garment === 'blazer') {
        mockSvgContent = `
          <!-- Under-shirt and tie -->
          <path d="M 175 90 L 225 90 L 200 170 Z" fill="#fafafa" />
          <path d="M 197 90 L 203 90 L 208 150 L 200 165 L 192 150 Z" fill="#064e3b" />
          <!-- Blazer main body -->
          <path d="M 132 85 Q 120 180 135 340 L 265 340 Q 280 180 268 85 Z" fill="url(#tryon-pattern-active)" stroke="rgba(255,217,190,0.3)" strokeWidth="1.5" />
          <path d="M 132 85 L 80 250 Q 75 270 78 285 L 108 290 L 138 125 Z" fill="url(#tryon-pattern-active)" stroke="rgba(255,217,190,0.2)" strokeWidth="1.2" />
          <path d="M 268 85 L 320 250 Q 325 270 322 285 L 292 290 L 262 125 Z" fill="url(#tryon-pattern-active)" stroke="rgba(255,217,190,0.2)" strokeWidth="1.2" />
          <!-- Lapels -->
          <path d="M 200 90 L 140 180 L 135 155 L 175 85 Z" fill="url(#tryon-pattern-active)" stroke="rgba(255,217,190,0.4)" strokeWidth="1" />
          <path d="M 200 90 L 260 180 L 265 155 L 225 85 Z" fill="url(#tryon-pattern-active)" stroke="rgba(255,217,190,0.4)" strokeWidth="1" />
        `;
      } else if (garment === 'kurta') {
        mockSvgContent = `
          <!-- Kurta body -->
          <path d="M 142 90 Q 130 180 135 320 L 132 430 L 268 430 L 265 320 Q 270 180 258 90 Z" fill="url(#tryon-pattern-active)" stroke="rgba(255,217,190,0.3)" strokeWidth="1.5" />
          <path d="M 142 90 L 98 250 Q 94 270 95 285 L 122 290 L 144 135 Z" fill="url(#tryon-pattern-active)" stroke="rgba(255,217,190,0.2)" strokeWidth="1.2" />
          <path d="M 258 90 L 302 250 Q 306 270 305 285 L 278 290 L 256 135 Z" fill="url(#tryon-pattern-active)" stroke="rgba(255,217,190,0.2)" strokeWidth="1.2" />
          <!-- Mandarin collar -->
          <path d="M 172 90 C 172 75, 228 75, 228 90 L 220 95 C 220 85, 180 85, 180 95 Z" fill="${fabric.color}" stroke="rgba(255,217,190,0.35)" />
        `;
      } else {
        // Shirt
        mockSvgContent = `
          <!-- Shirt main body -->
          <path d="M 140 100 Q 130 180 145 320 L 255 320 Q 270 180 260 100 Z" fill="url(#tryon-pattern-active)" stroke="rgba(255,217,190,0.3)" strokeWidth="1.5" />
          <path d="M 140 100 L 95 240 Q 90 260 92 275 L 115 280 L 140 135 Z" fill="url(#tryon-pattern-active)" stroke="rgba(255,217,190,0.2)" strokeWidth="1.2" />
          <path d="M 260 100 L 305 240 Q 310 260 308 275 L 285 280 L 260 135 Z" fill="url(#tryon-pattern-active)" stroke="rgba(255,217,190,0.2)" strokeWidth="1.2" />
          <!-- Collar spread -->
          <path d="M 200 100 L 145 110 L 170 82 Z" fill="${fabric.color}" stroke="rgba(255,217,190,0.35)" />
          <path d="M 200 100 L 255 110 L 230 82 Z" fill="${fabric.color}" stroke="rgba(255,217,190,0.35)" />
          <!-- Placket -->
          <path d="M 194 100 L 206 100 L 206 320 L 194 320 Z" fill="url(#tryon-pattern-active)" opacity="0.9" />
          <circle cx="200" cy="140" r="3.5" fill="#fafafa" stroke="#ccc" />
          <circle cx="200" cy="200" r="3.5" fill="#fafafa" stroke="#ccc" />
          <circle cx="200" cy="260" r="3.5" fill="#fafafa" stroke="#ccc" />
        `;
      }

      return NextResponse.json({
        success: true,
        isSimulated: true,
        fitAnalysis: "Standard center-body pose detected. Fitting layout coordinates mapped to custom silhouette parameters (Size: 40R).",
        styleAdvice: `The premium ${fabric.name} fabric is highly suitable for this custom ${garment}. Its unique draping properties and ${fabric.origin} origins command a crisp styling pairing—match with dark formal slacks and standard leather loafers.`,
        svgContent: mockSvgContent,
        message: "Configure GEMINI_API_KEY in your .env file to enable live visual tailoring."
      });
    }

    // Call real Gemini API
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      generationConfig: {
        responseMimeType: 'application/json',
      },
    });

    // Extract base64 parts from uploaded image
    const base64Data = image.split(',')[1];
    const mimeType = image.split(';')[0].split(':')[1];

    const imagePart = {
      inlineData: {
        data: base64Data,
        mimeType: mimeType
      },
    };

    const prompt = `
      You are SartorialAI, a master digital tailor overlaying a bespoke ${garment} in ${fabric.name} (${fabric.color}) on this user.
      Analyze the uploaded user photo. The photo is rendered inside a 400x500 viewport box.
      Locate the user's upper body (torso, shoulders, collar, arms).
      Generate the fitted SVG elements (path, polygon, circle) that overlay this garment perfectly on their body bounds.
      Use the exact fill attribute value "url(#tryon-pattern-active)" for the primary fabric parts.
      Use "${fabric.color}" for cuffs or collar accents.
      Return a strict JSON object structure:
      {
        "fitAnalysis": "A paragraph explaining body posture, shoulder slope, and fit size estimation.",
        "styleAdvice": "A paragraph of styling tips for this garment and fabric blend.",
        "svgContent": "Only the inner SVG path/shape elements (no outer <svg> wrapper) that will overlay the garment on their body coordinates inside a 400x500 canvas."
      }
    `;

    const result = await model.generateContent([prompt, imagePart]);
    const responseText = result.response.text();
    const resultJson = JSON.parse(responseText);

    return NextResponse.json({
      success: true,
      isSimulated: false,
      fitAnalysis: resultJson.fitAnalysis,
      styleAdvice: resultJson.styleAdvice,
      svgContent: resultJson.svgContent,
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
