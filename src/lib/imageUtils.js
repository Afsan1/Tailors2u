/**
 * Image processing utilities for validating, resizing, and compressing images
 */

/**
 * Validates file type and size (must be PNG/JPG/JPEG and under 10MB)
 * @param {File} file 
 * @returns {{valid: boolean, error: string}}
 */
export function validateImage(file) {
  if (!file) {
    return { valid: false, error: 'No image file provided.' };
  }

  const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
  if (!validTypes.includes(file.type)) {
    return { valid: false, error: 'Invalid file format. Please upload a JPG, JPEG, or PNG image.' };
  }

  const maxSize = 10 * 1024 * 1024; // 10 MB
  if (file.size > maxSize) {
    return { valid: false, error: 'Image size exceeds the 10 MB limit.' };
  }

  return { valid: true, error: null };
}

/**
 * Converts a file to base64 string
 * @param {File} file 
 * @returns {Promise<string>}
 */
export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

/**
 * Converts a blob to a File object
 * @param {Blob} blob 
 * @param {string} fileName 
 * @returns {File}
 */
export function blobToFile(blob, fileName) {
  return new File([blob], fileName, { type: blob.type });
}

/**
 * Resizes and compresses image on the client side using canvas
 * @param {string} dataUrl 
 * @param {number} maxW 
 * @param {number} maxH 
 * @param {number} quality 
 * @returns {Promise<{dataUrl: string, width: number, height: number}>}
 */
export function resizeImage(dataUrl, maxW = 1024, maxH = 1024, quality = 0.85) {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      // Server-side fallback: return as-is
      resolve({ dataUrl, width: 0, height: 0 });
      return;
    }

    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxW / img.width, maxH / img.height);
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, w, h);
      
      const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
      resolve({ dataUrl: compressedDataUrl, width: w, height: h });
    };
    img.onerror = (err) => reject(err);
    img.src = dataUrl;
  });
}

/**
 * Compress base64 image (wraps resizeImage)
 * @param {string} dataUrl 
 * @returns {Promise<string>}
 */
export async function compressImage(dataUrl) {
  const result = await resizeImage(dataUrl, 1024, 1024, 0.8);
  return result.dataUrl;
}

/**
 * Generates a solid color PNG buffer using Node's zlib module
 * @param {string} hex - Hex color string (e.g. #FAF8F5)
 * @returns {Buffer}
 */
export function createSolidColorPNG(hex) {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  const width = 512;
  const height = 512;

  // Uncompressed data: height scanlines, each has 1 filter byte + width * 3 RGB bytes
  const scanlineSize = 1 + width * 3;
  const buffer = typeof Buffer !== 'undefined' ? Buffer.alloc(height * scanlineSize) : new Uint8Array(height * scanlineSize);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * scanlineSize;
    buffer[rowOffset] = 0; // Filter type 0 (None)
    for (let x = 0; x < width; x++) {
      const colOffset = rowOffset + 1 + x * 3;
      buffer[colOffset] = r;
      buffer[colOffset + 1] = g;
      buffer[colOffset + 2] = b;
    }
  }

  // Compress the IDAT payload using Node's zlib sync
  const zlib = require('zlib');
  const compressed = zlib.deflateSync(buffer);

  // Helper to write PNG chunks
  const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk data
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeInt32BE(width, 0);
  ihdrData.writeInt32BE(height, 4);
  ihdrData[8] = 8; // 8 bits per channel
  ihdrData[9] = 2; // Color type 2 (RGB)
  ihdrData[10] = 0; // Compression (deflate)
  ihdrData[11] = 0; // Filter
  ihdrData[12] = 0; // Interlace

  const ihdrChunk = createPNGChunk('IHDR', ihdrData);
  const idatChunk = createPNGChunk('IDAT', compressed);
  const iendChunk = createPNGChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([pngSignature, ihdrChunk, idatChunk, iendChunk]);
}

function createPNGChunk(type, data) {
  const length = data.length;
  const chunk = Buffer.alloc(8 + length + 4);
  chunk.writeInt32BE(length, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);

  // Calculate CRC
  const crc = crc32(chunk.subarray(4, 8 + length));
  chunk.writeInt32BE(crc, 8 + length);
  return chunk;
}

// Simple CRC32 implementation
const crcTable = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    if (c & 1) {
      c = 0xedb88320 ^ (c >>> 1);
    } else {
      c = c >>> 1;
    }
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return crc ^ 0xffffffff;
}

