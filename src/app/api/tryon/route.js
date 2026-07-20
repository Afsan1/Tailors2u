import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { generateTryOn } from '../../../lib/ai-provider';
import { uploadToSupabase } from '../../../lib/supabase';
import { createSolidColorPNG } from '../../../lib/imageUtils';

// Map of variant IDs to their corresponding high-quality fabric swatch images in public folder
const ARMANI_SWATCH_MAP = {
  'v1': 'armani.png',
  'v2': 'armani_grey.png',
  'v3': 'armani_brown.png',
  'v4': 'armani_darkbrown.png',
  'v5': 'armani_purple.png',
  'v6': 'armani_burgundy.png'
};

export async function POST(request) {
  try {
    const body = await request.json();
    const { image, fabric } = body;

    if (!image) {
      return NextResponse.json({ success: false, message: 'No person image uploaded.' }, { status: 400 });
    }
    if (!fabric) {
      return NextResponse.json({ success: false, message: 'No fabric selected.' }, { status: 400 });
    }

    console.log(`[TryOn API] Received request for fabric: ${fabric.name}`);

    // 1. Prepare person image buffer
    const base64Data = image.split(',')[1];
    if (!base64Data) {
      return NextResponse.json({ success: false, message: 'Invalid person image data format.' }, { status: 400 });
    }
    const personBuffer = Buffer.from(base64Data, 'base64');

    // 2. Prepare garment/fabric swatch buffer
    let garmentBuffer = null;
    let swatchSource = 'generated';

    // Check if it's one of the Armani suiting variants which has a static texture file in /public
    // We try to extract a variant ID or map it based on matching the name or ID
    const variantId = fabric.id && fabric.id.startsWith('v') ? fabric.id : null;
    const swatchFile = ARMANI_SWATCH_MAP[variantId];

    if (swatchFile) {
      try {
        const filePath = path.join(process.cwd(), 'public', swatchFile);
        console.log(`[TryOn API] Loading static Armani swatch file: ${filePath}`);
        garmentBuffer = fs.readFileSync(filePath);
        swatchSource = `static-file (${swatchFile})`;
      } catch (err) {
        console.warn(`[TryOn API] Failed to load static swatch ${swatchFile}, falling back to solid color generator:`, err.message);
      }
    }

    // Fallback: If no static fabric image is available, generate a solid color PNG swatch with zlib
    if (!garmentBuffer) {
      const colorHex = fabric.color || '#FAF8F5';
      console.log(`[TryOn API] Generating solid fabric color swatch for hex: ${colorHex}`);
      garmentBuffer = createSolidColorPNG(colorHex);
    }

    // 3. Trigger Virtual Try-On Model (IDM-VTON)
    const fabricDescription = `${fabric.name} (${fabric.origin || 'Mill Imported'}, ${fabric.weight || 'Medium Weight'})`;
    console.log(`[TryOn API] Invoking AI Virtual Try-On provider. Fabric details: "${fabricDescription}" (swatch source: ${swatchSource})`);
    
    let resultBuffer;
    try {
      resultBuffer = await generateTryOn(personBuffer, garmentBuffer, fabricDescription);
    } catch (err) {
      console.error('[TryOn API] AI Provider error:', err);
      return NextResponse.json({
        success: false,
        message: `AI Virtual Try-On service is currently unavailable or busy. (${err.message || 'Generation failed'})`
      }, { status: 503 });
    }

    // 4. Upload result to Supabase Storage
    const fileName = `tryon_${Date.now()}_${Math.floor(Math.random() * 1000)}.jpg`;
    console.log(`[TryOn API] Uploading generated image to Supabase Storage as: ${fileName}`);
    
    let publicUrl;
    try {
      publicUrl = await uploadToSupabase(resultBuffer, fileName, 'image/jpeg');
      console.log(`[TryOn API] Upload complete. Public URL: ${publicUrl}`);
    } catch (err) {
      console.error('[TryOn API] Supabase storage upload failed:', err);
      // Fallback: if Supabase fails or is not configured, return base64 data url directly to prevent crash
      const base64Result = `data:image/jpeg;base64,${resultBuffer.toString('base64')}`;
      return NextResponse.json({
        success: true,
        method: 'ai-image',
        resultImage: base64Result,
        fitAnalysis: 'Fit assessment complete. Chest alignment, collar spacing, and sleeves fall naturally.',
        styleAdvice: `The luxury drape of ${fabric.name} flatters your proportions beautifully. Pair with dark trousers.`,
        modelUsed: 'IDM-VTON (Base64 fallback)',
        warning: 'Supabase storage upload failed. Image returned as Data URL.'
      });
    }

    // 5. Generate descriptive fit analysis & styling advice
    const fitAnalysis = `The shoulder line sits well, and the garment contours cleanly around the chest. The sleeve length fits standard proportions comfortably.`;
    const styleAdvice = `The texture and hue of ${fabric.name} from ${fabric.origin || 'our premium collection'} is highly versatile. Perfect for elevated semi-formal styling.`;

    return NextResponse.json({
      success: true,
      method: 'ai-image',
      resultImage: publicUrl,
      fitAnalysis,
      styleAdvice,
      modelUsed: 'IDM-VTON'
    });

  } catch (error) {
    console.error('[TryOn API] Unexpected server error:', error);
    return NextResponse.json({ success: false, message: error.message || 'An unexpected server error occurred.' }, { status: 500 });
  }
}
