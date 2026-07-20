import { Client } from '@gradio/client';
import fs from 'fs';
import path from 'path';

/**
 * Calls the yisol/IDM-VTON space on Hugging Face using Gradio JS Client
 * @param {Buffer} personBuffer - Buffer of the human image
 * @param {Buffer} garmentBuffer - Buffer of the garment/fabric swatch image
 * @param {string} fabricDescription - Fabric details
 * @returns {Promise<Buffer>} - Buffer of the generated try-on image
 */
export async function runIDMVTON(personBuffer, garmentBuffer, fabricDescription = 'garment fabric') {
  const hfToken = process.env.HF_TOKEN;
  if (!hfToken) {
    throw new Error('HF_TOKEN environment variable not set. Please set it in .env.local');
  }

  console.log('[HuggingFace] Connecting to yisol/IDM-VTON...');
  const client = await Client.connect('yisol/IDM-VTON', {
    hf_token: hfToken
  });

  console.log('[HuggingFace] Uploading images to Hugging Face temp space...');
  // Convert buffers to Blobs for Gradio client upload compatibility
  const personBlob = new Blob([personBuffer], { type: 'image/jpeg' });
  const garmentBlob = new Blob([garmentBuffer], { type: 'image/jpeg' });

  const humanUpload = await client.upload([{ blob: personBlob }], client.config.root);
  const garmentUpload = await client.upload([{ blob: garmentBlob }], client.config.root);

  if (!humanUpload || !humanUpload[0]) {
    throw new Error('Failed to upload human image to Gradio temp folder.');
  }
  if (!garmentUpload || !garmentUpload[0]) {
    throw new Error('Failed to upload garment image to Gradio temp folder.');
  }

  console.log('[HuggingFace] Running IDM-VTON prediction (/tryon)...');
  // predict arguments: dict, garm_img, garment_des, is_checked, is_checked_crop, denoise_steps, seed
  const result = await client.predict('/tryon', {
    dict: {
      background: humanUpload[0],
      layers: [],
      composite: null
    },
    garm_img: garmentUpload[0],
    garment_des: fabricDescription,
    is_checked: true,
    is_checked_crop: false,
    denoise_steps: 30,
    seed: 42
  });

  if (!result.data || !result.data[0]) {
    throw new Error('Inference succeeded but did not return any output image.');
  }

  // Retrieve the generated image url
  const outputImgData = result.data[0];
  const outputUrl = outputImgData.url;
  
  if (!outputUrl) {
    throw new Error('Gradio result did not return a valid output file URL.');
  }

  console.log('[HuggingFace] Downloading final try-on output image...');
  const res = await fetch(outputUrl, {
    headers: {
      Authorization: `Bearer ${hfToken}`
    }
  });

  if (!res.ok) {
    throw new Error(`Failed to download try-on result from ${outputUrl}`);
  }

  const arrayBuffer = await res.arrayBuffer();
  return Buffer.from(arrayBuffer);
}
