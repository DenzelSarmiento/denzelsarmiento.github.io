
import { webcrypto } from 'crypto';
import fs from 'fs';
import path from 'path';

const { subtle } = webcrypto;

// --- Encryption Utils ---
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

// --- Content ---
const rawText = fs.readFileSync('frases.txt', 'utf-8');

const constellations = {
  amistad: { id: 'amistad', title: 'Amistad', description: 'Lazos que elegimos', icon: 'people', color: '#3b82f6', memories: [] },
  familia: { id: 'familia', title: 'Familia', description: 'Nuestras raíces', icon: 'family_restroom', color: '#ef4444', memories: [] },
  amor: { id: 'amor', title: 'Amor', description: 'El motor del universo', icon: 'favorite', color: '#ec4899', memories: [] },
  viajes: { id: 'viajes', title: 'Viajes', description: 'Horizontes lejanos', icon: 'flight', color: '#f59e0b', memories: [] },
  suenos: { id: 'suenos', title: 'Sueños', description: 'Lo que buscamos', icon: 'bedtime', color: '#8b5cf6', memories: [] },
  reflexiones: { id: 'reflexiones', title: 'Reflexiones', description: 'Pensamientos profundos', icon: 'lightbulb', color: '#10b981', memories: [] },
  perdidas: { id: 'perdidas', title: 'Perdidas', description: 'Fragmentos ocultos', icon: 'auto_awesome', color: '#64748b', memories: [] },
};

// --- Processing ---
async function process() {
  const parts = rawText.split('--------------Frases protegidas--------------');
  const generalPart = parts[0];
  const protectedPart = parts[1];

  // 1. Process General
  const generalLines = generalPart.split('\n').filter(l => l.trim() !== '' && !l.includes('----------------Frases generales----------------'));
  
  generalLines.forEach((line, index) => {
    const [key, ...values] = line.split(':');
    if (!key || values.length === 0) return;
    
    const title = key.trim();
    const text = values.join(':').trim();
    
    // Categorization logic
    let cat = 'perdidas'; // Default to hidden 'perdidas'
    const lowerLine = line.toLowerCase();
    
    if (lowerLine.includes('amaba') || lowerLine.includes('te amo') || lowerLine.includes('beso') || lowerLine.includes('novia') || lowerLine.includes('san valentín') || lowerLine.includes('juntos') || lowerLine.includes('enamorada') || lowerLine.includes('nos encantaba') || lowerLine.includes('nuestra canción')) cat = 'amor';
    else if (lowerLine.includes('viaje') || lowerLine.includes('cusco') || lowerLine.includes('chaltén') || lowerLine.includes('japón') || lowerLine.includes('asia') || lowerLine.includes('fitz roy') || lowerLine.includes('plan')) cat = 'viajes';
    else if (lowerLine.includes('abuela') || lowerLine.includes('mamá') || lowerLine.includes('papá') || lowerLine.includes('hermano') || lowerLine.includes('primo') || lowerLine.includes('tío') || lowerLine.includes('comida favorita')) cat = 'familia';
    else if (lowerLine.includes('amigo') || lowerLine.includes('amistad')) cat = 'amistad';
    else if (lowerLine.includes('promesa') || lowerLine.includes('deseábamos') || lowerLine.includes('sueño')) cat = 'suenos';
    else if (lowerLine.includes('reflexion') || lowerLine.includes('tiempo') || lowerLine.includes('vida') || lowerLine.includes('mente')) cat = 'reflexiones';
    
    const memory = {
      id: `gen-${index}`,
      title,
      text,
      type: cat === 'perdidas' ? 'hidden' : 'public', // Mark/Type as hidden if lost
      style: index % 3 === 0 ? 'capsule' : (index % 4 === 0 ? 'large' : 'icon'), // Mix styles
      icon: cat === 'amor' ? 'favorite' : (cat === 'viajes' ? 'flight' : (cat === 'familia' ? 'home' : 'star')),
      emoji: null
    };
    
    constellations[cat].memories.push(memory);
  });

  // 2. Process Protected
  // Split by double newlines or based on the pattern "Name:\n Text"
  // The file format seems to be: Name:\n Text...
  
  const protectedBlocks = protectedPart.split(/\n\n+/).filter(b => b.trim() !== '');
  
  for (let i = 0; i < protectedBlocks.length; i++) {
    const block = protectedBlocks[i];
    const firstLineBreak = block.indexOf('\n');
    if (firstLineBreak === -1) continue;
    
    const titleRaw = block.substring(0, firstLineBreak).trim();
    const textRaw = block.substring(firstLineBreak).trim();
    const title = titleRaw.replace(':', '');
    
    // Categorize protected
    // All protected to 'familia', except 'Amigos' to 'amistad'
    let cat = 'familia';
    const lowerTitle = title.toLowerCase();
    
    if (lowerTitle.includes('amigos')) {
      cat = 'amistad';
    }
    
    // Encrypt
    const encrypted = await encryptMessage(textRaw, '0320');
    
    const memory = {
      id: `locked-${i}`,
      title,
      text: null, // Hidden
      type: 'locked',
      style: 'capsule-detail',
      icon: 'lock',
      lockLabel: `Para ${title}`,
      hint: 'mi nacimiento, su nacimiento, solo dias, 4 digitos',
      encrypted
    };
    
    constellations[cat].memories.push(memory);
  }

  // 3. Add Special Links (Keep them as requested previously)
  const specialLinks = [
    // Special encrypted book
    {
      id: 'my-book',
      title: 'Mi Libro',
      emoji: null,
      icon: 'lock', // Start with lock
      iconColor: '#fbbf24', // Amber
      type: 'locked', // Change to locked
      url: 'https://drive.google.com/file/d/1rDsMklu6kTprCt0cLi02B8SyuwGu-UXc/view?usp=sharing',
      constellationId: 'reflexiones',
      style: 'capsule-detail',
      lockLabel: 'Para ver mi libro',
      hint: 'mi nacimiento, su nacimiento, solo dias, 4 digitos', // Same hint/password
      encrypted: await encryptMessage('Descargar mi libro "Sempiterna Promesa" en PDF desde Drive', '0320'),
      date: 'Ver Libro'
    },
    {
      id: 'photo-album',
      title: 'Álbum de Fotos',
      emoji: null,
      icon: 'lock',
      iconColor: '#f472b6', // Pink
      type: 'locked',
      url: 'https://drive.google.com/drive/folders/1MwFXESa9kmaFI5zB2Kt3pwlucegIc1vN?usp=sharing',
      constellationId: 'viajes',
      style: 'capsule-detail',
      lockLabel: 'Para ver las fotos',
      hint: 'mi nacimiento, su nacimiento, solo dias, 4 digitos',
      encrypted: await encryptMessage('Ver álbum de fotos en Drive', '0320'),
      date: 'Ver en Drive'
    },
    {
      id: 'clinic-photos',
      title: 'Fotos Clínica',
      emoji: null,
      icon: 'lock', 
      iconColor: '#ef4444', // Red for Familia
      type: 'locked',
      url: 'https://drive.google.com/drive/folders/1W19mqoi0Mu13Iojnn3zlwRN2IHLij1qY?usp=sharing',
      constellationId: 'familia',
      style: 'capsule-detail',
      lockLabel: 'Para ver fotos clínica',
      hint: 'dni de peru',
      encrypted: await encryptMessage('Ver fotos de la clínica en Drive', '75975640'),
      date: 'Ver en Drive'
    },
    {
      id: 'liz-note',
      title: 'Liz también escribió',
      emoji: null,
      icon: 'edit_note',
      iconColor: '#a78bfa', // Purple
      type: 'public', // Normal public memory
      constellationId: 'reflexiones',
      style: 'capsule-detail',
      text: 'Después de terminar mi libro, encontré unas notas de Liz dónde había empezado a escribir algo similar, nunca lo había visto pero tenía la intención de escribir un libro también.\n\nLa nota:\nNos conocimos hace 9 años en una página random de fanáticos de una serie no tan conocida jajjaja, a los meses me pidió mi whatsapp y desde ahí empezamos a escribirnos todos los días, literalmente nos escribíamos párrafos y párrafos de cosas de nuestras vidas, éramos muy tímidos para hacernos videollamadas o siquiera llamadas jajaja. Después de unos meses me pidió ser su novia y lo rechace, aunque ya para ese momento lo queria un montón creía que una relación a distancia no funcionaria, eramos muy jóvenes y ninguno estaba en condiciones de viajar a otro país. Sin embargo, esa confesión me hizo replantear mis sentimientos, él era una persona única para mi, con la que podía abrirme y hablar de lo que sea, aunque fuera a distancia. Después de hablarlo mucho decidimos intentarlo, ambos temerosos y sin mucha idea de lo que hacíamos jaja, después de casi dos años me dijo que vendría a mi país a conocerme, y así fue, darnos un abrazo por primera vez confirmo que nuestros sentimientos no eran efímeros, conocio mi ciudad y a mi familia, y después de 20 días tuvimos que despedirnos, nos prometimos que no sería la última vez que nos veríamos y desde ahí nos hemos estado visitando al menos una vez al año, no ha sido nada fácil, cada vez que nos despediamos era quedarse con la incertidumbre de cuando nos volveríamos a ver y si podríamos seguir superando todas las trabas de una relación a distancia. Finalmente, después de 6 años pudimos empezar a vivir juntos, definitivamente no ha sido nada fácil llegar hasta aquí jajaja, pero ahora valoramos mucho nuestro tiempo juntos :3',
      date: 'Notas'
    }
  ];
  
  constellations['reflexiones'].memories.push(specialLinks[0]);
  constellations['viajes'].memories.push(specialLinks[1]);
  constellations['familia'].memories.push(specialLinks[2]);
  constellations['reflexiones'].memories.push(specialLinks[3]);

  // 4. Assign Orbits
  Object.values(constellations).forEach(c => {
    c.memories.forEach((m, i) => {
      // Logic for ring/angle
      const total = c.memories.length;
      m.orbitRing = (i % 3) + 1;
      m.angle = (i * (360 / Math.max(1, total))) % 360 + (Math.random() * 20 - 10);
      m.constellationId = c.id;
    });
  });
  
  // 5. Generate File Content
  const constellationsArray = Object.values(constellations);
  
  const fileContent = `/**
 * Memory Core — Memory Data Store
 * Generated from user content
 */

export const constellations = ${JSON.stringify(constellationsArray, null, 2)};

export const memories = constellations.flatMap(c => c.memories);

export const stats = {
  totalMemories: memories.length,
  Month: 9, // Reset stats?
  constellationsCount: constellations.length
};
`;

  fs.writeFileSync('src/data/memories.js', fileContent);
  console.log('✅ Generated src/data/memories.js with new content!');
}

process();
