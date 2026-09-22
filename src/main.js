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

// --- Parche de Emergencia: Estilos Globales de Iconos y Botones ---
const stylePatch = document.createElement('style');
stylePatch.innerHTML = `
  /* Fuerza a que cualquier texto de icono se transforme en dibujo animado */
  i, .material-icons, .material-icons-round, [class*="material-icons"] {
    font-family: 'Material Icons Round', 'Material Icons', sans-serif !important;
    font-weight: normal !important;
    font-style: normal !important;
    display: inline-block !important;
    line-height: 1 !important;
    text-transform: none !important;
    letter-spacing: normal !important;
    word-wrap: normal !important;
    white-space: nowrap !important;
    direction: ltr !important;
    -webkit-font-smoothing: antialiased !important;
    font-feature-settings: 'liga' !important;
  }
  
  /* Ajuste de diseño para el botón de Entrar */
  button, .btn {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 8px !important;
    background-color: rgba(250, 204, 21, 0.15) !important;
    border: 2px solid rgba(250, 204, 21, 0.5) !important;
    color: #ffffff !important;
    font-family: 'Plus Jakarta Sans', sans-serif !important;
    font-weight: 600 !important;
    border-radius: 9999px !important;
    padding: 12px 24px !important;
    cursor: pointer !important;
    box-shadow: 0 0 15px rgba(250, 204, 21, 0.2) !important;
  }
`;
document.head.appendChild(stylePatch);



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
