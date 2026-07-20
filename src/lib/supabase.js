import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;

export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey) 
  : null;

/**
 * Uploads a buffer or file to Supabase Storage bucket and returns the public URL
 * @param {Buffer} buffer 
 * @param {string} fileName 
 * @param {string} contentType 
 * @returns {Promise<string>}
 */
export async function uploadToSupabase(buffer, fileName, contentType = 'image/jpeg') {
  if (!supabase) {
    console.warn('[Supabase] Warning: Supabase credentials not found in env. Falling back to local/dataURL generation.');
    throw new Error('Supabase is not configured. Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.');
  }

  const bucketName = process.env.SUPABASE_BUCKET || 'tryon-images';

  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(fileName, buffer, {
      contentType,
      upsert: true
    });

  if (error) {
    console.error('[Supabase] Error uploading file:', error);
    throw error;
  }

  const { data: publicUrlData } = supabase.storage
    .from(bucketName)
    .getPublicUrl(fileName);

  return publicUrlData.publicUrl;
}
