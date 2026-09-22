/**
 * PIN/Passphrase Entry View — Mockup 3
 * "Hidden Constellations" — enter passphrase to unlock secret messages
 */
import { decrypt } from '../crypto/encrypt.js';

export function renderPinEntry(app, memory, { onSuccess, onBack }) {
  app.innerHTML = `
    <div class="view-container space-bg view-enter" id="pin-view">
      <!-- Stars -->
      <div class="stars"></div>

      <!-- Nebula -->
      <div style="position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:0;">
        <div class="nebula animate-pulse-slow" style="top:-80px;left:-80px;width:384px;height:384px;background:rgba(var(--color-primary-rgb),0.08);"></div>
        <div class="nebula" style="top:50%;right:-128px;width:320px;height:320px;background:rgba(59,130,246,0.05);"></div>
        <div class="nebula" style="bottom:0;left:50%;transform:translateX(-50%);width:100%;height:256px;background:rgba(var(--color-primary-rgb),0.04);"></div>
      </div>

      <!-- Header -->
      <header style="position:relative;z-index:50;width:100%;padding:24px 24px 0;">
        <button id="pin-back-btn" class="glass-bubble clickable" style="width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.8);border:none;cursor:pointer;margin-bottom:24px;">
          <span class="material-icons-round" style="font-size:18px;">arrow_back</span>
        </button>
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
          <div class="glass-panel" style="width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;margin-bottom:8px;">
            <span class="material-icons-round" style="color:rgba(var(--color-primary-rgb),0.8);">lock</span>
          </div>
          <h1 style="font-size:22px;font-weight:700;color:white;text-align:center;letter-spacing:0.02em;">Constelaciones Ocultas</h1>
          <p style="font-size:13px;color:rgba(255,255,255,0.5);font-weight:300;letter-spacing:0.05em;text-transform:uppercase;text-align:center;max-width:280px;line-height:1.6;">
            Ingresá la Clave Secreta<br>${memory.lockLabel || 'Mensajes Secretos'}
          </p>
          ${memory.hint ? `
            <p style="font-size:11px;color:rgba(var(--color-primary-rgb),0.7);margin-top:4px;font-style:italic;">
              Pista: ${memory.hint}
            </p>
          ` : ''}
        </div>
      </header>

      <!-- Main: Passphrase Input -->
      <main style="position:relative;z-index:10;flex:1;width:100%;max-width:400px;padding:0 24px;display:flex;flex-direction:column;align-items:center;justify-content:center;">
        <!-- Input Field -->
        <div id="passphrase-container" style="width:100%;margin-bottom:32px;position:relative;">
          <div class="input-glow" style="position:absolute;inset:-4px;background:linear-gradient(90deg, rgba(var(--color-primary-rgb),0.3), rgba(59,130,246,0.3));border-radius:var(--radius-lg);filter:blur(12px);opacity:0.3;transition:opacity 1s ease;"></div>
          <div class="glass-panel animate-glow" style="position:relative;width:100%;border-radius:var(--radius-lg);padding:4px;">
            <input
              id="passphrase-input"
              type="password"
              placeholder="Ingresá la clave secreta..."
              autocomplete="off"
              style="width:100%;height:52px;background:transparent;border:none;outline:none;color:white;font-family:var(--font-display);font-size:16px;text-align:center;letter-spacing:0.1em;padding:0 16px;"
            />
          </div>
        </div>

        <!-- Toggle visibility -->
        <button id="toggle-visibility" style="background:none;border:none;color:rgba(255,255,255,0.4);cursor:pointer;display:flex;align-items:center;gap:6px;font-family:var(--font-display);font-size:11px;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:24px;transition:color 0.3s;">
          <span class="material-icons-round" style="font-size:16px;">visibility</span>
          Mostrar clave
        </button>

        <!-- Submit button -->
        <button id="unlock-btn" style="width:100%;max-width:280px;height:52px;border-radius:var(--radius-full);background:linear-gradient(135deg, var(--color-primary), #7c3aed);border:none;color:white;font-family:var(--font-display);font-weight:700;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;box-shadow:0 0 30px rgba(var(--color-primary-rgb),0.4);transition:all 0.3s ease;letter-spacing:0.05em;">
          <span class="material-icons-round" style="font-size:18px;">lock_open</span>
          Desbloquear
        </button>

        <!-- Error message -->
        <div id="error-msg" style="margin-top:16px;font-size:12px;color:var(--color-error);opacity:0;transition:opacity 0.3s ease;text-align:center;">
          Clave incorrecta. Intentá de nuevo.
        </div>


      </main>

      <!-- Footer spacer -->
      <footer style="position:relative;z-index:50;width:100%;padding:24px 32px 40px;"></footer>
    </div>
  `;

  const input = document.getElementById('passphrase-input');
  const unlockBtn = document.getElementById('unlock-btn');
  const errorMsg = document.getElementById('error-msg');
  const toggleBtn = document.getElementById('toggle-visibility');
  const container = document.getElementById('passphrase-container');
  const backBtn = document.getElementById('pin-back-btn');

  // Toggle password visibility
  toggleBtn.addEventListener('click', () => {
    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    toggleBtn.querySelector('.material-icons-round').textContent = isPassword ? 'visibility_off' : 'visibility';
    toggleBtn.querySelector('.material-icons-round').nextSibling.textContent = isPassword ? ' Ocultar clave' : ' Mostrar clave';
  });



  // Unlock attempt
  async function tryUnlock() {
    const passphrase = input.value.trim().toLowerCase();
    if (!passphrase) return;

    unlockBtn.innerHTML = `<span class="material-icons-round" style="font-size:18px;animation:spin-slow 1s linear infinite;">refresh</span> Descifrando...`;
    unlockBtn.style.pointerEvents = 'none';

    const decrypted = await decrypt(memory.encrypted, passphrase);

    if (decrypted) {
      // Success! 
      errorMsg.style.opacity = '0';
      container.querySelector('.input-glow').style.opacity = '0.8';
      container.querySelector('.input-glow').style.background = 'linear-gradient(90deg, rgba(34,197,94,0.4), rgba(59,130,246,0.4))';
      unlockBtn.innerHTML = `<span class="material-icons-round" style="font-size:18px;">check</span> ¡Desbloqueado!`;
      unlockBtn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';

      setTimeout(() => {
        const view = document.getElementById('pin-view');
        view.style.animation = 'fade-in 0.4s ease reverse forwards';
        setTimeout(() => onSuccess(memory, decrypted), 400);
      }, 800);
    } else {
      // Wrong passphrase
      errorMsg.style.opacity = '1';
      container.classList.add('animate-shake');
      unlockBtn.innerHTML = `<span class="material-icons-round" style="font-size:18px;">lock_open</span> Desbloquear`;
      unlockBtn.style.pointerEvents = 'auto';
      setTimeout(() => container.classList.remove('animate-shake'), 500);
    }
  }

  unlockBtn.addEventListener('click', tryUnlock);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') tryUnlock();
  });

  // Back button
  backBtn.addEventListener('click', () => {
    const view = document.getElementById('pin-view');
    view.style.animation = 'fade-in 0.3s ease reverse forwards';
    setTimeout(() => onBack(), 300);
  });

  // Focus input
  setTimeout(() => input.focus(), 600);
}
