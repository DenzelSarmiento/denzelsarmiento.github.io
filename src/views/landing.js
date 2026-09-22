/**
 * Landing View — Mockup 1
 * The first screen: Memory Core planet centered with floating bubbles
 */
import { memories, stats } from '../data/memories.js';
import { startShootingStars, stopShootingStars, initParallax, destroyParallax } from '../effects/space-effects.js';

export function renderLanding(app, onEnterUniverse) {
  const publicMemories = memories.filter(m => m.type === 'public').slice(0, 4);
  const lockedCount = memories.filter(m => m.type === 'locked').length;

  // Bubble position presets for landing
  const bubblePositions = [
    { top: '12%', left: '8%', anim: 'animate-float' },
    { top: '18%', right: '6%', anim: 'animate-float-delayed' },
    { top: '48%', left: '-1%', anim: 'animate-float-slow' },
    { top: '52%', right: '4%', anim: 'animate-float' },
    { bottom: '28%', left: '10%', anim: 'animate-float-delayed' },
    { bottom: '22%', right: '12%', anim: 'animate-float-slow' },
  ];

  app.innerHTML = `
    <div class="view-container space-bg view-enter" id="landing-view">
      <!-- Stars -->
      <div class="stars"></div>

      <!-- Nebula Glows -->
      <div style="position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:0;">
        <div class="nebula animate-pulse-slow" style="top:-80px;left:-80px;width:384px;height:384px;background:rgba(var(--color-primary-rgb),0.15);"></div>
        <div class="nebula" style="top:50%;right:-128px;width:320px;height:320px;background:rgba(59,130,246,0.08);"></div>
        <div class="nebula" style="bottom:-80px;left:33%;width:384px;height:384px;background:rgba(var(--color-primary-rgb),0.08);"></div>
      </div>

      <!-- Header -->
      <header style="position:relative;z-index:50;width:100%;padding:24px;display:flex;justify-content:center;align-items:center;">
        <div style="display:flex;flex-direction:column;align-items:center;">
          <span style="font-size:10px;font-weight:600;letter-spacing:0.2em;color:rgba(var(--color-primary-rgb),0.8);text-transform:uppercase;margin-bottom:4px;">Para mi amor</span>
          <h1 style="font-size:18px;font-weight:700;color:white;letter-spacing:0.05em;">Nuestro Memory Core</h1>
        </div>
      </header>

      <!-- Main Content: Planet + Bubbles -->
      <main style="position:relative;z-index:10;flex:1;width:100%;display:flex;align-items:center;justify-content:center;">
        <!-- Central Planet -->
        <div id="planet-container" style="position:relative;width:256px;height:256px;display:flex;align-items:center;justify-content:center;z-index:10;">
          <div class="planet-core" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;position:relative;">
            <!-- Planet surface gradient -->
            <div style="position:absolute;inset:0;border-radius:50%;background:linear-gradient(135deg, rgba(255,255,255,0.05), transparent);opacity:0.5;"></div>
            <!-- Orbit ring 1 -->
            <div class="animate-spin-slow" style="position:absolute;width:110%;height:110%;border-radius:50%;border:1px dashed rgba(255,255,255,0.08);opacity:0.4;"></div>
            <!-- Orbit ring 2 -->
            <div class="animate-spin-reverse" style="position:absolute;width:150%;height:150%;border-radius:50%;border:1px solid rgba(var(--color-primary-rgb),0.15);opacity:0.3;"></div>
            <!-- Center label / Photo -->
            <div style="text-align:center;z-index:20;pointer-events:none;width:120px;height:120px;border-radius:50%;overflow:hidden;border:2px solid rgba(250,204,21,0.5);background:rgba(0,0,0,0.5);">
  <img src="foto.jpg" alt="Foto Central" style="width:100%;height:100%;object-fit:cover;" onerror="this.src='https://placehold.co'" />
</div>

          </div>
          <!-- Planet glow -->
          <div class="planet-glow" style="inset:-20px;"></div>
        </div>

        <!-- Floating Memory Bubbles -->
        ${renderLandingBubbles(publicMemories, lockedCount, bubblePositions)}
      </main>

      <!-- Footer / CTA -->
      <footer style="position:relative;z-index:50;width:100%;padding:32px 32px 40px;display:flex;flex-direction:column;align-items:center;gap:16px;">
        <!-- Stats -->
        <div style="display:flex;align-items:center;gap:24px;color:rgba(255,255,255,0.5);font-size:12px;font-weight:500;letter-spacing:0.05em;margin-bottom:8px;">
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="width:8px;height:8px;border-radius:50%;background:var(--color-primary);"></span>
            <span>${stats.totalMemories} Recuerdos</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="width:8px;height:8px;border-radius:50%;background:#60a5fa;"></span>
            <span>${stats.month} Meses</span>
          </div>
        </div>
        <!-- Primary CTA -->
        <button id="enter-universe-btn" style="position:relative;width:100%;max-width:320px;height:56px;border-radius:var(--radius-full);background:white;color:var(--color-bg-dark);font-weight:700;font-size:18px;border:none;cursor:pointer;box-shadow:0 0 40px rgba(255,255,255,0.2);overflow:hidden;transition:box-shadow 0.3s ease;font-family:var(--font-display);">
          <div style="position:absolute;inset:0;background:linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);transform:translateX(-100%);transition:transform 0.7s ease;" class="shimmer-bar"></div>
          <span style="position:relative;z-index:10;display:flex;align-items:center;justify-content:center;gap:8px;">
            Entrar al Jardín
            <span class="material-icons-round" style="color:var(--color-primary);transition:transform 0.3s ease;">arrow_forward</span>
          </span>
        </button>

      </footer>
    </div>
  `;

  // Add hover shimmer effect to CTA
  const ctaBtn = document.getElementById('enter-universe-btn');
  const shimmerBar = ctaBtn.querySelector('.shimmer-bar');
  ctaBtn.addEventListener('mouseenter', () => {
    shimmerBar.style.transform = 'translateX(100%)';
    ctaBtn.style.boxShadow = '0 0 60px rgba(255,255,255,0.4)';
  });
  ctaBtn.addEventListener('mouseleave', () => {
    shimmerBar.style.transform = 'translateX(-100%)';
    ctaBtn.style.boxShadow = '0 0 40px rgba(255,255,255,0.2)';
  });

  // Initialize space effects
  const viewContainer = document.getElementById('landing-view');
  startShootingStars(viewContainer);
  initParallax(viewContainer);

  // CTA click
  ctaBtn.addEventListener('click', () => {
    // Cleanup effects before transition
    stopShootingStars();
    destroyParallax(viewContainer);
    const view = document.getElementById('landing-view');
    view.style.animation = 'fade-in 0.4s ease reverse forwards';
    setTimeout(() => onEnterUniverse(), 400);
  });
}

function renderLandingBubbles(publicMemories, lockedCount, positions) {
  let html = '';

  // Public memory bubbles
  /*publicMemories.forEach((mem, i) => {
    const pos = positions[i] || positions[0];
    const posStyle = Object.entries(pos)
      .filter(([k]) => k !== 'anim')
      .map(([k, v]) => `${k}:${v}`)
      .join(';');

    if (mem.style === 'icon' || mem.emoji) {
      html += `
        <div class="memory-bubble ${pos.anim}" data-id="${mem.id}" style="position:absolute;${posStyle};z-index:20;cursor:pointer;">
          <div class="glass-bubble clickable" style="width:64px;height:64px;border-radius:50%;display:flex;align-items:center;justify-content:center;">
            <span style="font-size:24px;">${mem.emoji || ''}</span>
            ${mem.icon && !mem.emoji ? `<span class="material-icons-round" style="color:${mem.iconColor || 'white'};font-size:24px;">${mem.icon}</span>` : ''}
          </div>
        </div>`;
    } else if (mem.style === 'capsule') {
      html += `
        <div class="memory-bubble ${pos.anim}" data-id="${mem.id}" style="position:absolute;${posStyle};z-index:20;cursor:pointer;">
          <div class="glass-bubble clickable" style="padding:12px 20px;border-radius:var(--radius-full);display:flex;align-items:center;justify-content:center;gap:8px;">
            ${mem.icon ? `<span class="material-icons-round" style="color:${mem.iconColor || 'var(--color-primary)'};font-size:14px;">${mem.icon}</span>` : ''}
            <span style="font-size:14px;font-weight:600;color:white;">${mem.title}</span>
          </div>
        </div>`;
    } else if (mem.style === 'capsule-detail') {
      html += `
        <div class="memory-bubble ${pos.anim}" data-id="${mem.id}" style="position:absolute;${posStyle};z-index:20;cursor:pointer;">
          <div class="glass-bubble clickable" style="padding:12px 16px;border-radius:var(--radius-full);display:flex;align-items:center;gap:12px;">
            <div style="width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center;">
              <span class="material-icons-round" style="color:white;font-size:14px;">${mem.icon || ''}</span>
            </div>
            <div style="display:flex;flex-direction:column;padding-right:8px;">
              <span style="font-size:12px;font-weight:700;color:white;">${mem.title}</span>
              <span style="font-size:10px;color:rgba(255,255,255,0.5);">${mem.date || ''}</span>
            </div>
          </div>
        </div>`;
    } else if (mem.style === 'large') {
      html += `
        <div class="memory-bubble ${pos.anim}" data-id="${mem.id}" style="position:absolute;${posStyle};z-index:20;cursor:pointer;">
          <div class="glass-bubble clickable" style="width:96px;height:96px;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:8px;text-align:center;">
            <span style="font-size:12px;font-weight:700;color:white;margin-bottom:4px;">${mem.title}</span>
            <span style="font-size:10px;color:rgba(255,255,255,0.6);">${mem.date || ''}</span>
            <div style="margin-top:4px;width:32px;height:2px;background:rgba(var(--color-primary-rgb),0.5);border-radius:var(--radius-full);transition:width 0.5s ease;"></div>
          </div>
        </div>`;
    }
  });
*/
  // Locked bubble hint (small pulsing dot)
  if (lockedCount > 0) {
    const lockPos = positions[5] || positions[4];
    const lockPosStyle = Object.entries(lockPos)
      .filter(([k]) => k !== 'anim')
      .map(([k, v]) => `${k}:${v}`)
      .join(';');
    html += `
      <div class="${lockPos.anim}" style="position:absolute;${lockPosStyle};z-index:10;">
        <div class="glass-bubble" style="width:40px;height:40px;border-radius:50%;background:rgba(var(--color-primary-rgb),0.2);display:flex;align-items:center;justify-content:center;cursor:pointer;">
          <div style="width:8px;height:8px;border-radius:50%;background:var(--color-primary);animation:pulse-slow 2s cubic-bezier(0.4,0,0.6,1) infinite;"></div>
        </div>
      </div>`;
  }

  return html;
}
