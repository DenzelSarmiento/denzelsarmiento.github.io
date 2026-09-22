/**
 * Constellations View
 * Selection screen for memory categories (Constellations)
 */
import { constellations } from '../data/memories.js';
import { startShootingStars, initParallax, cleanupAllEffects } from '../effects/space-effects.js';

export function renderConstellations(app, { onConstellationSelect, onBack }) {
  app.innerHTML = `
    <div class="view-container nebula-bg view-enter" id="constellations-view">
      <!-- Stars -->
      <div class="stars animate-pulse-slow"></div>

      <!-- Header -->
      <header style="position:relative;z-index:50;width:100%;padding:40px 24px 20px;display:flex;flex-direction:column;align-items:center;text-align:center;">
        <h1 style="font-size:16px;font-weight:400;letter-spacing:0.1em;color:rgba(255,255,255,0.9);text-transform:uppercase;line-height:1.4;">Nuestro lugar para guardar<br>recuerdos mi amor</h1>
      </header>

      <!-- Main: Constellation Grid -->
      <main style="position:relative;z-index:10;flex:1;width:100%;max-width:300px;margin:0 auto;display:flex;align-items:center;justify-content:center;padding:24px;">
        <div class="constellation-grid" style="display:flex;justify-content:center;align-items:center;width:100%;">
          ${renderConstellationCards(constellations.filter(c => c.id !== 'perdidas'))}
        </div>
      </main>

      <!-- Footer: Back to Landing -->
      <footer style="position:relative;z-index:50;width:100%;padding:24px;display:flex;justify-content:center;">
        <button id="constellation-back-btn" class="glass-bubble clickable" style="padding:10px 24px;border-radius:var(--radius-full);color:rgba(255,255,255,0.7);font-size:12px;letter-spacing:0.1em;border:none;cursor:pointer;transition:all 0.3s;">
          VOLVER AL INICIO
        </button>
      </footer>
    </div>
  `;

  // Initialize space effects
  const viewContainer = document.getElementById('constellations-view');
  startShootingStars(viewContainer);
  initParallax(viewContainer);

  // Event Listeners
  document.querySelectorAll('.constellation-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.id;
      // Animate out
      viewContainer.style.animation = 'fade-in 0.4s ease reverse forwards';
      setTimeout(() => onConstellationSelect(id), 400);
    });
  });

  document.getElementById('constellation-back-btn')?.addEventListener('click', () => {
    cleanupAllEffects(viewContainer);
    viewContainer.style.animation = 'fade-in 0.3s ease reverse forwards';
    setTimeout(() => onBack(), 300);
  });
}

function renderConstellationCards(list) {
  return list.map((c, index) => `
    <div class="constellation-card type-${index % 3} clickable" data-id="${c.id}"
         style="
           position:relative;
           display:flex;
           flex-direction:column;
           align-items:center;
           justify-content:center;
           text-align:center;
           width:160px;
           height:160px;
           padding:20px;
           background:rgba(255,255,255,0.05);
           border-radius:20px;
           border:1px solid rgba(255,255,255,0.15);
           backdrop-filter:blur(8px);
           transition:all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
           cursor:pointer;
           animation: float ${4 + index}s ease-in-out infinite alternate;
           animation-delay: ${index * 0.5}s;
         "
         onmouseover="this.style.background='rgba(255,255,255,0.08)';this.style.transform='translateY(-5px) scale(1.02)';"
         onmouseout="this.style.background='rgba(255,255,255,0.03)';this.style.transform='translateY(0) scale(1)';"
    >
      <!-- Glow behind icon -->
      <div style="
        position:absolute;
        top:20%;
        left:50%;
        transform:translateX(-50%);
        width:60px;
        height:60px;
        background:${c.color};
        opacity:0.2;
        filter:blur(20px);
        border-radius:50%;
      "></div>
      
      <span class="material-icons-round" style="font-size:54px;color:${c.color};margin-bottom:12px;position:relative;">${c.icon}</span>
      
      <h3 style="font-size:16px;font-weight:600;color:white;margin-bottom:6px;letter-spacing:0.05em;">${c.title}</h3>
      <p style="font-size:12px;color:rgba(255,255,255,0.7);line-height:1.4;">${c.description}</p>
      
      <!-- Decorative stars -->
      <div style="position:absolute;top:10px;right:10px;width:2px;height:2px;background:white;opacity:0.6;box-shadow:0 0 4px white;"></div>
      <div style="position:absolute;bottom:15px;left:15px;width:1px;height:1px;background:white;opacity:0.4;"></div>
    </div>
  `).join('');
}
