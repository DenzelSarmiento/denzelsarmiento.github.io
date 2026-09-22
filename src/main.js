/**
 * Memory Core — Main Application Router
 * Manages view transitions and state
 */
import './styles/index.css';
import { renderLanding } from './views/landing.js';
import { renderConstellations } from './views/constellations.js';
import { renderUniverse } from './views/universe.js';
import { renderMemoryDetail } from './views/memory-detail.js';
import { renderPinEntry } from './views/pin-entry.js';
import { initParticles, destroyParticles } from './animations/particles.js';

const app = document.getElementById('app');

// --- State ---
let currentView = 'landing';
let activeConstellationId = null;

// --- Canvas particle system (always active) ---
const particleCanvas = document.createElement('canvas');
particleCanvas.id = 'particle-canvas';
particleCanvas.style.cssText = 'position:fixed;inset:0;z-index:1;pointer-events:none;';
document.body.appendChild(particleCanvas);
initParticles(particleCanvas);

// --- Parche Definitivo Remasterizado: Interceptor de Cadenas de Texto ---
function patchIcons() {
  const elements = document.querySelectorAll('*');
  elements.forEach(el => {
    // Si el elemento contiene la palabra de la flor, no importa si tiene espacios
    if (el.innerHTML && el.innerHTML.includes('local_florist') && !el.innerHTML.includes('svg')) {
      el.innerHTML = `
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;">
          <svg xmlns="http://w3.org" viewBox="0 0 24 24" fill="#facc15" style="width:72px;height:72px;display:inline-block;animation:spin-slow 25s linear infinite;filter:drop-shadow(0 0 12px rgba(250,204,21,0.6));">
            <path d="M12 2a3 3 0 0 0-3 3v1.07A5.47 5.47 0 0 0 6 5a3 3 0 0 0-3 3 5.47 5.47 0 0 0 1.07 3H3a3 3 0 0 0 0 6h1.07A5.47 5.47 0 0 0 3 16a3 3 0 0 0 3 3 5.47 5.47 0 0 0 3-1.07V19a3 3 0 0 0 6 0v-1.07A5.47 5.47 0 0 0 18 19a3 3 0 0 0 3-3 5.47 5.47 0 0 0-1.07-3H21a3 3 0 0 0 0-6h-1.07A5.47 5.47 0 0 0 21 8a3 3 0 0 0-3-3 5.47 5.47 0 0 0-3 1.07V5a3 3 0 0 0-3-3zm0 7a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/>
          </svg>
          <span style="font-family:sans-serif;font-size:14px;color:rgba(255,255,255,0.7);margin-top:4px;">Primer 21 de septiembre</span>
        </div>
      `;
    }
    // Reemplazo para la flecha de los botones de navegación
    if (el.innerHTML && el.innerHTML.includes('arrow_forward') && !el.innerHTML.includes('svg')) {
      el.innerHTML = el.innerHTML.replace('arrow_forward', `
        <svg xmlns="http://w3.org" viewBox="0 0 24 24" fill="currentColor" style="width:18px;height:18px;display:inline-block;vertical-align:middle;margin-left:6px;">
          <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"/>
        </svg>
      `);
    }
  });
}

// Monitorear cambios de vistas en el DOM para repatchellar automáticamente
const originalNavigate = navigate;
navigate = function(view, data) {
  originalNavigate(view, data);
  setTimeout(patchIcons, 40);
  setTimeout(patchIcons, 150); // Doble verificación por delay de renderizado
};
setTimeout(patchIcons, 200);



// --- Router ---
function navigate(view, data = {}) {
  currentView = view;

  switch (view) {
    case 'landing':
      activeConstellationId = null;
      renderLanding(app, () => navigate('constellations'));
      break;

    case 'constellations':
      activeConstellationId = null;
      renderConstellations(app, {
        onConstellationSelect: (id) => navigate('universe', { constellationId: id }),
        onBack: () => navigate('landing'),
      });
      break;

    case 'universe':
      if (data.constellationId) activeConstellationId = data.constellationId;
      renderUniverse(app, {
        onMemoryClick: (memory) => navigate('detail', { memory }),
        onLockedClick: (memory) => navigate('pin', { memory }),
        onBack: () => navigate('constellations'),
      }, activeConstellationId);
      break;

    case 'detail':
      renderMemoryDetail(app, data.memory, {
        onClose: () => navigate(data.returnTo || 'universe'),
        decryptedText: data.decryptedText || null,
      });
      break;

    case 'pin':
      renderPinEntry(app, data.memory, {
        onSuccess: (memory, decryptedText) => navigate('detail', { memory, decryptedText, returnTo: data.returnTo }),
        onBack: () => navigate(data.returnTo || 'universe'),
      });
      break;
  }
}

// --- Landing page bubbles should also be clickable ---
document.addEventListener('click', (e) => {
  const bubble = e.target.closest('.memory-bubble');
  if (bubble && currentView === 'landing') {
    const id = bubble.dataset.id;
    if (id) {
      // Import memories inline to avoid circular deps
      import('./data/memories.js').then(({ memories }) => {
        const memory = memories.find(m => m.id === id);
        if (memory) {
          // If clicked from landing, we might want to set the context to its constellation
          // activeConstellationId = memory.constellationId; // Optional: set context
          if (memory.type === 'locked') {
            navigate('pin', { memory, returnTo: 'landing' });
          } else {
            navigate('detail', { memory, returnTo: 'landing' });
          }
        }
      });
    }
  }
});

// --- Initialize ---
navigate('landing');

// --- Window resize handler for particles ---
window.addEventListener('resize', () => {
  particleCanvas.width = window.innerWidth;
  particleCanvas.height = window.innerHeight;
});
