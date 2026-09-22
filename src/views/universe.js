/**
 * Universe View — Mockup 2
 * Orbital universe with concentric rotating rings and memory bubbles
 */
import { memories, constellations } from '../data/memories.js';
import { startShootingStars, initParallax, initConstellationLines, cleanupAllEffects } from '../effects/space-effects.js';

export function renderUniverse(app, { onMemoryClick, onLockedClick, onBack }, constellationId = null) {
  // Filter memories if a constellation is selected, otherwise show all public (or all)
  const constellation = constellationId ? constellations.find(c => c.id === constellationId) : null;
  const currentMemories = constellation ? constellation.memories : memories;

  const ring1 = currentMemories.filter(m => m.orbitRing === 1 && m.type !== 'hidden');
  const ring2 = currentMemories.filter(m => m.orbitRing === 2 && m.type !== 'hidden');
  const ring3 = currentMemories.filter(m => m.orbitRing === 3 && m.type !== 'hidden');

  const title = constellation ? constellation.title : 'Universo';
  const subtitle = constellation ? constellation.description : 'Todas las memorias';
  const color = constellation ? constellation.color : 'var(--color-primary)';

  app.innerHTML = `
    <div class="view-container nebula-bg view-enter" id="universe-view">
      <!-- Stars -->
      <div class="stars animate-pulse-slow"></div>

      <!-- Nebula glows -->
      <div style="position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:0;">
        <div class="nebula" style="top:25%;left:25%;width:500px;height:500px;background:rgba(var(--color-secondary-rgb, 94,23,235),0.08);"></div>
        <div class="nebula" style="bottom:25%;right:25%;width:400px;height:400px;background:rgba(var(--color-primary-rgb),0.08);"></div>
      </div>

      <!-- Header -->
      <header style="position:relative;z-index:50;width:100%;padding:24px 24px 0;display:flex;justify-content:space-between;align-items:flex-start;">
        <button id="universe-back-btn" class="glass-bubble clickable" style="width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.8);border:none;cursor:pointer;">
          <span class="material-icons-round" style="font-size:18px;">arrow_back</span>
        </button>
        <div style="display:flex;flex-direction:column;align-items:center;padding-top:8px;">
          <h1 style="font-size:14px;font-weight:300;letter-spacing:0.3em;color:rgba(255,255,255,0.9);text-transform:uppercase;">${title}</h1>
          <div style="width:4px;height:4px;border-radius:50%;background:${color};margin-top:8px;"></div>
        </div>
        <div style="width:40px;"></div>
      </header>

      <!-- Main: Orbital System -->
      <main style="position:relative;z-index:10;flex:1;width:100%;display:flex;align-items:center;justify-content:center;">
        <div id="orbital-system" style="position:relative;width:min(600px, 90vw);height:min(600px, 90vw);">

          <!-- Outer Ring (ring 3) -->
          <div class="orbital-ring animate-spin-slow" style="width:min(600px, 90vw);height:min(600px, 90vw);border-color:rgba(255,255,255,0.04);">
            ${renderOrbitalBubbles(ring3, 'min(600px, 90vw)', 25)}
          </div>

          <!-- Middle Ring (ring 2) -->
          <div class="orbital-ring animate-spin-reverse" style="width:min(400px, 65vw);height:min(400px, 65vw);border-color:rgba(255,255,255,0.07);">
            ${renderOrbitalBubbles(ring2, 'min(400px, 65vw)', 35)}
            <!-- Decorative dot -->
            <div style="position:absolute;top:10%;right:30%;width:3px;height:3px;border-radius:50%;background:rgba(255,255,255,0.4);box-shadow:0 0 10px rgba(255,255,255,0.5);"></div>
          </div>

          <!-- Inner Ring (ring 1) -->
          <div class="orbital-ring animate-spin-slow" style="width:min(260px, 45vw);height:min(260px, 45vw);border-color:rgba(255,255,255,0.1);animation-duration:20s;">
            ${renderOrbitalBubbles(ring1, 'min(260px, 45vw)', 45)}
          </div>

<!-- Central Photo -->
<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:120px;height:120px;z-index:20;border-radius:50%;overflow:hidden;border:3px solid rgba(250,204,21,0.6);box-shadow: 0 0 20px rgba(250,204,21,0.4);background:rgba(0,0,0,0.5);">
  <img src="foto-jardin.jpg" alt="Foto Central" style="width:100%;height:100%;object-fit:cover;" onerror="this.src='https://placehold.co'" />
</div>



          <!-- Active Memory indicator -->
          <div class="animate-float-delayed" style="position:absolute;top:-60px;right:-20px;z-index:30;">
            <div class="glass-bubble" style="padding:8px 16px;border-radius:var(--radius-full);display:flex;align-items:center;gap:8px;">
              <span style="width:6px;height:6px;border-radius:50%;background:#22c55e;animation:pulse-slow 2s ease infinite;box-shadow:0 0 8px #22c55e;"></span>
              <span style="font-size:10px;font-weight:500;letter-spacing:0.05em;">MEMORIA ACTIVA</span>
            </div>
          </div>
        </div>
      </main>

      <!-- Footer Navigation -->
      <footer style="position:relative;z-index:50;width:100%;padding:16px 32px 40px;display:flex;justify-content:center;align-items:flex-end;">
        <div class="glass-bubble" style="padding:4px;border-radius:var(--radius-full);display:flex;align-items:center;gap:4px;">
          <button id="footer-home-btn" class="clickable" style="width:48px;height:48px;border-radius:50%;background:transparent;border:none;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.5);cursor:pointer;transition:color 0.3s;" title="Back to Home">
            <span class="material-icons-round" style="font-size:20px;">history</span>
          </button>
          <button id="footer-constellation-btn" class="clickable" style="width:48px;height:48px;border-radius:50%;background:transparent;border:none;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.5);cursor:pointer;transition:color 0.3s;" title="Discover a Constellation">
            <span class="material-icons-round" style="font-size:20px;">auto_awesome</span>
          </button>
        </div>
      </footer>

      <!-- Hidden Constellation Overlay -->
      <div id="constellation-overlay" style="position:absolute;inset:0;z-index:100;pointer-events:none;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity 1.5s ease;">
        <div style="position:absolute;inset:0;background:radial-gradient(ellipse at center, rgba(var(--color-primary-rgb),0.15) 0%, rgba(0,0,0,0.85) 70%, rgba(0,0,0,0.95) 100%);"></div>
        <div id="constellation-content" style="position:relative;text-align:center;max-width:320px;padding:0 24px;display:flex;flex-direction:column;align-items:center;gap:16px;">
          <div style="width:3px;height:3px;border-radius:50%;background:white;box-shadow:0 0 20px 6px rgba(255,255,255,0.6), 0 0 60px 10px rgba(var(--color-primary-rgb),0.4);"></div>
          <p style="font-size:10px;font-weight:600;letter-spacing:0.4em;color:rgba(var(--color-primary-rgb),0.7);text-transform:uppercase;">Constelación Perdida</p>
          <p id="constellation-text" class="font-serif" style="font-size:16px;color:rgba(255,255,255,0.85);line-height:1.8;font-style:italic;"></p>
          <p id="constellation-author" style="font-size:11px;color:rgba(255,255,255,0.35);letter-spacing:0.1em;margin-top:4px;"></p>
          <div style="width:3px;height:3px;border-radius:50%;background:white;box-shadow:0 0 20px 6px rgba(255,255,255,0.6), 0 0 60px 10px rgba(var(--color-primary-rgb),0.4);"></div>
        </div>
      </div>
    </div>
  `;

  // Initialize space effects
  const viewContainer = document.getElementById('universe-view');
  const orbitalSystem = document.getElementById('orbital-system');
  startShootingStars(viewContainer);
  initParallax(viewContainer);
  initConstellationLines(orbitalSystem);

  function navigateBack() {
    cleanupAllEffects(viewContainer);
    const view = document.getElementById('universe-view');
    view.style.animation = 'fade-in 0.3s ease reverse forwards';
    setTimeout(() => onBack(), 300);
  }

  // Event listeners
  document.getElementById('universe-back-btn')?.addEventListener('click', navigateBack);

  // Footer: Home button
  document.getElementById('footer-home-btn')?.addEventListener('click', navigateBack);

  // Footer: Random constellation (Lost Constellations)
  const lostMemories = memories.filter(m => m.type === 'hidden');
  let constellationActive = false;
  document.getElementById('footer-constellation-btn')?.addEventListener('click', () => {
    if (constellationActive) return;
    if (lostMemories.length === 0) return; // No hidden memories to show

    constellationActive = true;

    const random = lostMemories[Math.floor(Math.random() * lostMemories.length)];
    const overlay = document.getElementById('constellation-overlay');
    const textEl = document.getElementById('constellation-text');
    const authorEl = document.getElementById('constellation-author');

    textEl.textContent = `"${random.text}"`;
    authorEl.textContent = `— ${random.title}${random.date ? ', ' + random.date : ''}`;

    overlay.style.pointerEvents = 'auto';
    overlay.style.opacity = '1';

    // Auto-dismiss after 4s, or click to dismiss
    const dismiss = () => {
      overlay.style.opacity = '0';
      setTimeout(() => {
        overlay.style.pointerEvents = 'none';
        constellationActive = false;
      }, 1500);
    };

    overlay.addEventListener('click', dismiss, { once: true });
    setTimeout(() => {
      if (constellationActive) dismiss();
    }, 5000);
  });

  // Memory bubble clicks
  document.querySelectorAll('.orbit-bubble').forEach(bubble => {
    bubble.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = bubble.dataset.id;
      const memory = memories.find(m => m.id === id);
      if (!memory) return;

      if (memory.type === 'locked') {
        onLockedClick(memory);
      } else {
        onMemoryClick(memory);
      }
    });
  });
}

function renderOrbitalBubbles(mems, ringSize, speed) {
  return mems.map((mem) => {
    // Use angle to position on the orbit circle
    const angle = mem.angle || 0;
    const rad = (angle * Math.PI) / 180;
    // Position relative to center of ring (50%, 50%)
    const x = 50 + 45 * Math.cos(rad);
    const y = 50 + 45 * Math.sin(rad);

    const isLocked = mem.type === 'locked';
    const lockBadge = isLocked
      ? `<div class="lock-badge"><span class="material-icons-round" style="font-size:10px;color:white;">lock</span></div>`
      : '';

    if (mem.style === 'icon' || mem.emoji) {
      return `
        <div class="orbit-bubble clickable" data-id="${mem.id}"
             style="position:absolute;left:${x}%;top:${y}%;transform:translate(-50%,-50%);z-index:20;">
          <div class="glass-bubble" style="width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;position:relative;${isLocked ? 'border-color:rgba(var(--color-primary-rgb),0.3);' : ''}">
            ${lockBadge}
            <span style="font-size:20px;">${mem.emoji || ''}</span>
            ${mem.icon && !mem.emoji ? `<span class="material-icons-round" style="color:${mem.iconColor || 'white'};font-size:20px;">${mem.icon}</span>` : ''}
          </div>
        </div>`;
    } else if (mem.style === 'capsule' || mem.style === 'capsule-detail') {
      return `
        <div class="orbit-bubble clickable" data-id="${mem.id}"
             style="position:absolute;left:${x}%;top:${y}%;transform:translate(-50%,-50%);z-index:20;">
          <div class="glass-bubble" style="padding:10px 18px;border-radius:var(--radius-full);display:flex;align-items:center;gap:10px;white-space:nowrap;position:relative;${isLocked ? 'border-color:rgba(var(--color-primary-rgb),0.3);' : ''}">
            ${lockBadge}
            ${mem.icon ? `<span class="material-icons-round" style="color:${mem.iconColor || '#ec4899'};font-size:14px;">${mem.icon}</span>` : ''}
            <div style="display:flex;flex-direction:column;">
              <span style="font-size:12px;font-weight:700;color:white;">${mem.title}</span>
              ${mem.date ? `<span style="font-size:9px;color:rgba(255,255,255,0.5);">${mem.date}</span>` : ''}
            </div>
          </div>
        </div>`;
    } else if (mem.style === 'large') {
      return `
        <div class="orbit-bubble clickable" data-id="${mem.id}"
             style="position:absolute;left:${x}%;top:${y}%;transform:translate(-50%,-50%);z-index:20;">
          <div class="glass-bubble" style="width:90px;height:90px;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:8px;text-align:center;position:relative;">
            ${lockBadge}
            <span style="font-size:10px;color:rgba(255,255,255,0.6);margin-bottom:2px;">${mem.date || ''}</span>
            <span style="font-size:13px;font-weight:600;color:white;">${mem.title}</span>
            ${mem.icon ? `<span class="material-icons-round" style="color:rgba(var(--color-primary-rgb),0.8);font-size:12px;margin-top:4px;">${mem.icon}</span>` : ''}
          </div>
        </div>`;
    }

    return '';
  }).join('');
}
