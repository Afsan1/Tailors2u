import { runIDMVTON } from './huggingface';

/**
 * Generates an AI Virtual Try-On result
 * This abstracts the provider layer, making it easy to swap Hugging Face
 * for Fal.ai, Replicate, or other hosted solutions in the future.
 * 
 * @param {Buffer} personBuffer - Buffer of the human image
 * @param {Buffer} garmentBuffer - Buffer of the garment/fabric swatch image
 * @param {string} fabricDescription - Fabric details
 * @returns {Promise<Buffer>} - Buffer of the generated try-on image
 */
export async function generateTryOn(personBuffer, garmentBuffer, fabricDescription) {
  // Currently using Hugging Face Space (IDM-VTON) as the default provider
  try {
    return await runIDMVTON(personBuffer, garmentBuffer, fabricDescription);
  } catch (error) {
    console.error('[AI Provider] Hugging Face Space Try-On failed:', error);
    throw error;
    
    // Future expansion placeholder for alternative APIs:
    // return await runFalAiTryOn(personBuffer, garmentBuffer, fabricDescription);
    // return await runReplicateTryOn(personBuffer, garmentBuffer, fabricDescription);
  }
}
