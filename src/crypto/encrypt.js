/**
 * Memory Core — Web Crypto API Encryption Module
 * Uses PBKDF2 for key derivation and AES-256-GCM for encryption/decryption.
 * All operations use the browser's native Web Crypto API.
 */

/**
 * Derive an AES-256 key from a passphrase using PBKDF2
 */
async function deriveKey(passphrase, salt) {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(passphrase),
    'PBKDF2',
    false,
    ['deriveKey']
  );

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt']
  );
}

/**
 * Decrypt an encrypted message using AES-256-GCM
 * @param {Object} encryptedData - { ciphertext, salt, iv } all base64 encoded
 * @param {string} passphrase - The passphrase to decrypt with
 * @returns {string|null} - Decrypted text or null if wrong passphrase
 */
export async function decrypt(encryptedData, passphrase) {
  try {
    const salt = base64ToBuffer(encryptedData.salt);
    const iv = base64ToBuffer(encryptedData.iv);
    const ciphertext = base64ToBuffer(encryptedData.ciphertext);

    const key = await deriveKey(passphrase, salt);

    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: iv },
      key,
      ciphertext
    );

    return new TextDecoder().decode(decrypted);
  } catch (e) {
    // Wrong passphrase will throw a DOMException
    return null;
  }
}

/**
 * Convert a base64 string to ArrayBuffer
 */
function base64ToBuffer(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}
