/**
 * Particle System — Canvas-based floating stardust
 * Subtle twinkling stars and slow-moving particles overlaid on all views
 */

let animationId = null;
let particles = [];
let canvas, ctx;

const PARTICLE_COUNT = 100;
const COLORS = [
  'rgba(255, 255, 255, 0.6)',
  'rgba(250, 204, 21, 0.5)',
  'rgba(234, 179, 8, 0.4)',
  'rgba(253, 224, 71, 0.3)',
  'rgba(245, 158, 11, 0.2)',
];

class Particle {
  constructor(w, h) {
    this.reset(w, h, true);
  }

  reset(w, h, initial = false) {
    this.x = Math.random() * w;
    this.y = initial ? Math.random() * h : -10;
    this.size = Math.random() * 2.5 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = Math.random() * 0.2 + 0.05;
    this.opacity = Math.random() * 0.8 + 0.2;
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.twinkleSpeed = Math.random() * 0.02 + 0.005;
    this.twinklePhase = Math.random() * Math.PI * 2;
    this.life = 0;
  }

  update(w, h) {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life += this.twinkleSpeed;

    // Twinkle effect
    this.currentOpacity = this.opacity * (0.5 + 0.5 * Math.sin(this.life + this.twinklePhase));

    // Wrap around
    if (this.y > h + 10 || this.x < -10 || this.x > w + 10) {
      this.reset(w, h);
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color.replace(/[\d.]+\)$/, `${this.currentOpacity})`);
    ctx.fill();

    // Glow for larger particles
    if (this.size > 1.5) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
      const gradient = ctx.createRadialGradient(
        this.x, this.y, 0,
        this.x, this.y, this.size * 3
      );
      gradient.addColorStop(0, this.color.replace(/[\d.]+\)$/, `${this.currentOpacity * 0.3})`));
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gradient;
      ctx.fill();
    }
  }
}

function animate() {
  if (!ctx || !canvas) return;

  const w = canvas.width;
  const h = canvas.height;

  ctx.clearRect(0, 0, w, h);

  particles.forEach(p => {
    p.update(w, h);
    p.draw(ctx);
  });

  animationId = requestAnimationFrame(animate);
}

export function initParticles(canvasEl) {
  canvas = canvasEl;
  ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle(canvas.width, canvas.height));
  }

  animate();
}

export function destroyParticles() {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
  particles = [];
}
