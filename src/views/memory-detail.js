/**
 * Memory Detail View — Mockup 4
 * Full-screen memory reveal with image, location, title, and quoted text
 */

export function renderMemoryDetail(app, memory, { onClose, decryptedText }) {
  const text = decryptedText || memory.text || '';
  const hasImage = !!memory.image;

  app.innerHTML = `
    <div class="view-container space-bg view-enter" id="detail-view">
      <!-- Stars -->
      <div class="stars"></div>

      <!-- Nebula -->
      <div style="position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:0;">
        <div class="nebula animate-pulse-slow" style="top:-80px;right:-80px;width:384px;height:384px;background:rgba(var(--color-primary-rgb),0.15);"></div>
        <div class="nebula" style="bottom:25%;left:-128px;width:320px;height:320px;background:rgba(59,130,246,0.08);"></div>
      </div>

      <!-- Stardust particles -->
      <div class="stardust animate-float" style="width:16px;height:16px;top:15%;left:10%;opacity:0.6;"></div>
      <div class="stardust animate-float-delayed" style="width:8px;height:8px;top:25%;right:20%;opacity:0.4;"></div>
      <div class="stardust animate-float-reverse" style="width:24px;height:24px;bottom:30%;left:15%;opacity:0.25;filter:blur(4px);"></div>
      <div class="stardust animate-float-slow" style="width:12px;height:12px;bottom:10%;right:10%;opacity:0.5;"></div>
      <div class="stardust animate-float" style="width:4px;height:4px;top:40%;left:5%;opacity:0.8;"></div>
      <div class="stardust animate-float-delayed" style="width:20px;height:20px;top:10%;left:50%;opacity:0.15;filter:blur(3px);"></div>

      <!-- Close Button -->
      <header style="position:relative;z-index:50;width:100%;padding:24px;display:flex;justify-content:flex-end;align-items:flex-start;height:80px;">
        <button id="detail-close-btn" style="position:relative;width:40px;height:40px;display:flex;align-items:center;justify-content:center;cursor:pointer;background:none;border:none;transition:transform 0.3s ease;">
          <div style="position:absolute;inset:0;background:rgba(255,255,255,0.1);border-radius:50%;backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.2);transition:all 0.5s ease;"></div>
          <span class="material-icons-round" style="position:relative;z-index:10;color:white;font-size:18px;transition:transform 0.5s ease;">close</span>
        </button>
      </header>

      <!-- Main Content -->
      <main style="position:relative;z-index:10;flex:1;width:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:0 24px;">
        <!-- Image Bubble -->
        ${hasImage ? `
          <div class="animate-float" style="position:relative;width:min(288px, 75vw);height:min(288px, 75vw);margin-bottom:32px;">
            <!-- Glow behind -->
            <div class="animate-pulse-slow" style="position:absolute;inset:-16px;background:linear-gradient(135deg, rgba(var(--color-primary-rgb),0.3), rgba(59,130,246,0.3));border-radius:50%;filter:blur(32px);opacity:0.5;"></div>
            <!-- Image container -->
            <div class="prismatic-bubble" style="position:relative;width:100%;height:100%;border:1px solid rgba(255,255,255,0.2);">
              <img
                alt="${memory.title}"
                src="${memory.image}"
                style="width:100%;height:100%;object-fit:cover;opacity:0.9;border-radius:50%;transition:all 2s ease-in-out;"
                onmouseover="this.style.opacity='1';this.style.transform='scale(1.05)'"
                onmouseout="this.style.opacity='0.9';this.style.transform='scale(1)'"
              />
              <!-- Reflection highlights -->
              <div style="position:absolute;top:16px;right:32px;width:64px;height:32px;background:rgba(255,255,255,0.1);border-radius:var(--radius-full);filter:blur(16px);transform:rotate(-20deg);"></div>
              <div style="position:absolute;bottom:32px;left:40px;width:96px;height:96px;background:rgba(var(--color-primary-rgb),0.1);border-radius:50%;filter:blur(24px);"></div>
            </div>
            <!-- Orbital detail ring -->
            <div class="animate-spin-slow" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:120%;height:120%;border:1px solid rgba(255,255,255,0.05);border-radius:50%;pointer-events:none;">
              <div style="position:absolute;top:0;left:50%;transform:translate(-50%,-50%);width:8px;height:8px;background:white;border-radius:50%;box-shadow:0 0 10px white;"></div>
            </div>
          </div>
        ` : `
          <!-- No image: show large emoji/icon -->
          <div class="animate-float animate-scale-in" style="position:relative;width:160px;height:160px;margin-bottom:32px;display:flex;align-items:center;justify-content:center;">
            <div class="animate-pulse-slow" style="position:absolute;inset:-16px;background:rgba(var(--color-primary-rgb),0.2);border-radius:50%;filter:blur(32px);"></div>
            <div class="glass-bubble" style="width:100%;height:100%;border-radius:50%;display:flex;align-items:center;justify-content:center;">
              <span style="font-size:64px;">${memory.emoji || ''}</span>
              ${memory.icon && !memory.emoji ? `<span class="material-icons-round" style="font-size:56px;color:${memory.iconColor || 'var(--color-primary)'};">${memory.icon}</span>` : ''}
            </div>
          </div>
        `}

        <!-- Text Content -->
        <div class="animate-slide-up" style="position:relative;z-index:20;width:100%;max-width:600px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:8px;max-height:65vh;overflow-y:auto;padding-right:8px;padding-bottom:100px;mask-image: linear-gradient(to bottom, black 85%, transparent 100%);">
          ${memory.location ? `
            <span style="font-size:10px;font-weight:700;letter-spacing:0.3em;text-transform:uppercase;color:rgba(var(--color-primary-rgb),0.8);">${memory.location}</span>
          ` : ''}
          <h1 class="font-serif" style="font-size:${hasImage ? '24px' : '28px'};color:white;line-height:1.3;font-style:italic;">
            ${memory.title}
          </h1>
          <div style="width:48px;height:1px;background:linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);margin:8px 0 16px;"></div>
          <p class="font-serif" style="color:rgba(255,255,255,0.85);font-size:16px;line-height:1.8;padding:0 8px;white-space:pre-wrap;">
            ${text}
          </p>

          <!-- Action buttons -->
          <div style="padding-top:24px;display:flex;flex-direction:column;align-items:center;gap:16px;">
            ${(memory.url && (memory.type === 'link' || (memory.type === 'locked' && decryptedText))) ? `
              <button id="detail-cta-btn" class="clickable glass-bubble" style="
                padding: 12px 32px;
                border-radius: var(--radius-full);
                background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
                border: 1px solid rgba(255,255,255,0.3);
                color: white;
                font-weight: 600;
                letter-spacing: 0.05em;
                cursor: pointer;
                box-shadow: 0 4px 12px rgba(var(--color-primary-rgb), 0.4);
                transition: transform 0.2s, box-shadow 0.2s;
                text-transform: uppercase;
                font-size: 13px;
                display: flex;
                align-items: center;
                gap: 8px;
              "
              onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px rgba(var(--color-primary-rgb), 0.6)'"
              onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 4px 12px rgba(var(--color-primary-rgb), 0.4)'"
              >
                <span>${memory.date || 'OBTENER'}</span> <!-- Using date field for button text -->
                <span class="material-icons-round" style="font-size:16px;">open_in_new</span>
              </button>
            ` : ''}
          </div>
        </div>
      </main>

      <!-- Footer -->
      <footer style="position:relative;z-index:50;width:100%;padding:24px 32px 40px;display:flex;flex-direction:column;align-items:center;">
        <p style="font-size:11px;font-family:monospace;color:rgba(255,255,255,0.3);letter-spacing:0.15em;">
          ${memory.date ? memory.date.toUpperCase() : ''}${memory.location ? ` • ${memory.location}` : ''}
        </p>
      </footer>
    </div>
  `;

  // Close button
  document.getElementById('detail-close-btn')?.addEventListener('click', () => {
    const view = document.getElementById('detail-view');
    view.style.animation = 'fade-in 0.3s ease reverse forwards';
    setTimeout(() => onClose(), 300);
  });

  // CTA Link Button
  document.getElementById('detail-cta-btn')?.addEventListener('click', () => {
    if (memory.url) {
      window.open(memory.url, '_blank');
    }
  });
}
