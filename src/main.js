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
