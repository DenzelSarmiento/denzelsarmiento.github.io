#!/usr/bin/env node

/**
 * Memory Core — Message Encryption CLI
 * 
 * Encrypts a message with a passphrase using PBKDF2 + AES-256-GCM.
 * Outputs JSON that can be pasted into memories.js
 * 
 * Usage:
 *   node scripts/encrypt-message.js "Tu mensaje secreto" "la contraseña"
 * 
 * Or interactive mode:
 *   node scripts/encrypt-message.js
 */

import { webcrypto } from 'crypto';
const { subtle } = webcrypto;

function bufferToBase64(buffer) {
  return Buffer.from(buffer).toString('base64');
}

async function deriveKey(passphrase, salt) {
  const encoder = new TextEncoder();
  const keyMaterial = await subtle.importKey(
    'raw',
    encoder.encode(passphrase),
    'PBKDF2',
    false,
    ['deriveKey']
  );

  return subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

async function encryptMessage(message, passphrase) {
  const encoder = new TextEncoder();
  const salt = webcrypto.getRandomValues(new Uint8Array(16));
  const iv = webcrypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(passphrase, salt);

  const ciphertext = await subtle.encrypt(
    { name: 'AES-GCM', iv: iv },
    key,
    encoder.encode(message)
  );

  return {
    ciphertext: bufferToBase64(ciphertext),
    salt: bufferToBase64(salt),
    iv: bufferToBase64(iv),
  };
}

async function decryptMessage(encryptedData, passphrase) {
  const salt = Buffer.from(encryptedData.salt, 'base64');
  const iv = Buffer.from(encryptedData.iv, 'base64');
  const ciphertext = Buffer.from(encryptedData.ciphertext, 'base64');
  const key = await deriveKey(passphrase, salt);

  try {
    const decrypted = await subtle.decrypt(
      { name: 'AES-GCM', iv: iv },
      key,
      ciphertext
    );
    return new TextDecoder().decode(decrypted);
  } catch {
    return null;
  }
}

// --- CLI ---
const args = process.argv.slice(2);

if (args.length < 2) {
  console.log('');
  console.log('🪐 Memory Core — Message Encryptor');
  console.log('===================================');
  console.log('');
  console.log('Usage:');
  console.log('  node scripts/encrypt-message.js "Tu mensaje secreto" "la contraseña"');
  console.log('');
  console.log('Example:');
  console.log('  node scripts/encrypt-message.js "Te quiero mucho, mamá" "nombre-del-perro"');
  console.log('');
  process.exit(1);
}

const [message, passphrase] = args;

console.log('');
console.log('🔐 Encrypting message...');
console.log('');

const encrypted = await encryptMessage(message, passphrase);

console.log('✅ Encrypted successfully! Paste this into your memory data:');
console.log('');
console.log(JSON.stringify(encrypted, null, 2));
console.log('');

// Verify by decrypting
const verified = await decryptMessage(encrypted, passphrase);
if (verified === message) {
  console.log('✅ Verification: Decryption successful');
} else {
  console.log('❌ Verification: FAILED — something went wrong');
}
console.log('');
