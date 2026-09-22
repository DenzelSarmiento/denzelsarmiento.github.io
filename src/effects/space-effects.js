/**
 * Space Visual Effects Module
 * Shooting stars, parallax starfield, and constellation lines
 */

// =============================================
// 1. SHOOTING STARS
// =============================================
let shootingStarInterval = null;

function createShootingStar(container) {
  const star = document.createElement('div');
  star.className = 'falling-flower';
  
  const startX = -10 + Math.random() * 120;
  const startY = -10;
  const duration = 5 + Math.random() * 5; 
  const size = 18 + Math.random() * 24; 
  
  const flowers = ['🌻', '🌼', '💛', '🌻', '🌼'];
  const flower = flowers[Math.floor(Math.random() * flowers.length)];
  
  star.style.cssText = `
    position: absolute;
    top: ${startY}%;
    left: ${startX}%;
    font-size: ${size}px;
    z-index: 5;
    pointer-events: none;
    filter: drop-shadow(0 0 10px rgba(250,204,21,0.6));
  `;
  star.innerHTML = flower;
  container.appendChild(star);
  
  const anim = star.animate([
    { opacity: 0, transform: `translate(0, -20px) rotate(0deg)` },
    { opacity: 0.9, transform: `translate(20px, 30vh) rotate(100deg)`, offset: 0.2 },
    { opacity: 0.9, transform: `translate(-20px, 80vh) rotate(260deg)`, offset: 0.8 },
    { opacity: 0, transform: `translate(0, 110vh) rotate(360deg)` }
  ], {
    duration: duration * 1000,
    easing: 'ease-in-out',
    fill: 'forwards'
  });
  
  anim.onfinish = () => star.remove();
}

export function startShootingStars(container) {
  if (!container) return;
  
  // Create one immediately
  setTimeout(() => createShootingStar(container), 1000);
  
  // Then periodically (every 3-7 seconds, random)
  function scheduleNext() {
    const delay = 300 + Math.random() * 800; // Emitir flores más frecuentemente
    shootingStarInterval = setTimeout(() => {
      createShootingStar(container);
      scheduleNext();
    }, delay);
  }
  scheduleNext();
}

export function stopShootingStars() {
  if (shootingStarInterval) {
    clearTimeout(shootingStarInterval);
    shootingStarInterval = null;
  }
}

// =============================================
// 2. PARALLAX STARFIELD
// =============================================
let parallaxHandler = null;

export function initParallax(container) {
  if (!container) return;
  
  // Create multiple star layers at different depths
  const layers = [
    { class: 'parallax-stars-deep', speed: 0.01, opacity: 0.3 },
    { class: 'parallax-stars-mid', speed: 0.025, opacity: 0.5 },
    { class: 'parallax-stars-near', speed: 0.045, opacity: 0.7 },
  ];
  
  const layerElements = layers.map(layer => {
    const el = document.createElement('div');
    el.className = `stars ${layer.class}`;
    el.style.cssText = `
      position: absolute;
      inset: -30px;
      pointer-events: none;
      z-index: 0;
      opacity: ${layer.opacity};
      transition: transform 0.3s ease-out;
      will-change: transform;
    `;
    container.insertBefore(el, container.firstChild);
    return { el, speed: layer.speed };
  });
  
  parallaxHandler = (e) => {
    const rect = container.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const mouseX = e.clientX - rect.left - centerX;
    const mouseY = e.clientY - rect.top - centerY;
    
    layerElements.forEach(({ el, speed }) => {
      const x = mouseX * speed;
      const y = mouseY * speed;
      el.style.transform = `translate(${x}px, ${y}px)`;
    });
  };
  
  container.addEventListener('mousemove', parallaxHandler);
}

export function destroyParallax(container) {
  if (parallaxHandler && container) {
    container.removeEventListener('mousemove', parallaxHandler);
    parallaxHandler = null;
  }
  // Remove parallax layers
  document.querySelectorAll('.parallax-stars-deep, .parallax-stars-mid, .parallax-stars-near').forEach(el => el.remove());
}

// =============================================
// 3. CONSTELLATION LINES
// =============================================
let constellationRAF = null;

export function initConstellationLines(container) {
  if (!container) return;
  
  // Place SVG on the view container (parent of orbital-system) for full coverage
  const viewContainer = container.closest('.view-container') || container;
  
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.id = 'constellation-svg';
  svg.setAttribute('style', `
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 15;
    pointer-events: none;
    overflow: visible;
  `);
  viewContainer.appendChild(svg);
  
  // Add a glow filter
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
  filter.id = 'constellation-glow';
  filter.setAttribute('x', '-50%');
  filter.setAttribute('y', '-50%');
  filter.setAttribute('width', '200%');
  filter.setAttribute('height', '200%');
  const blur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
  blur.setAttribute('stdDeviation', '2');
  blur.setAttribute('result', 'glow');
  const merge = document.createElementNS('http://www.w3.org/2000/svg', 'feMerge');
  const mn1 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
  mn1.setAttribute('in', 'glow');
  const mn2 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
  mn2.setAttribute('in', 'SourceGraphic');
  merge.appendChild(mn1);
  merge.appendChild(mn2);
  filter.appendChild(blur);
  filter.appendChild(merge);
  defs.appendChild(filter);
  svg.appendChild(defs);
  
  function updateLines() {
    // Clear existing lines (except defs)
    svg.querySelectorAll('line, circle').forEach(el => el.remove());
    
    const bubbles = container.querySelectorAll('.orbit-bubble');
    if (bubbles.length < 2) {
      constellationRAF = requestAnimationFrame(updateLines);
      return;
    }
    
    // Get bubble centers relative to the SVG/viewContainer
    const svgRect = viewContainer.getBoundingClientRect();
    const points = [];
    
    bubbles.forEach(bubble => {
      const rect = bubble.getBoundingClientRect();
      points.push({
        x: rect.left + rect.width / 2 - svgRect.left,
        y: rect.top + rect.height / 2 - svgRect.top,
      });
    });
    
    // Connect nearby bubbles
    const maxDist = 500;
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    group.setAttribute('filter', 'url(#constellation-glow)');
    
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dx = points[i].x - points[j].x;
        const dy = points[i].y - points[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < maxDist) {
          const opacity = 0.4 * (1 - dist / maxDist);
          
          const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          line.setAttribute('x1', points[i].x);
          line.setAttribute('y1', points[i].y);
          line.setAttribute('x2', points[j].x);
          line.setAttribute('y2', points[j].y);
          line.setAttribute('stroke', `rgba(234, 179, 8, ${opacity})`);
          line.setAttribute('stroke-width', '1');
          line.setAttribute('stroke-dasharray', '6,10');
          group.appendChild(line);
        }
      }
      
      // Star dot at each node
      const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dot.setAttribute('cx', points[i].x);
      dot.setAttribute('cy', points[i].y);
      dot.setAttribute('r', '2');
      dot.setAttribute('fill', 'rgba(250, 204, 21, 0.7)');
      group.appendChild(dot);
      
      // Tiny white center
      const innerDot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      innerDot.setAttribute('cx', points[i].x);
      innerDot.setAttribute('cy', points[i].y);
      innerDot.setAttribute('r', '1');
      innerDot.setAttribute('fill', 'rgba(255, 255, 255, 0.6)');
      group.appendChild(innerDot);
    }
    
    svg.appendChild(group);
    constellationRAF = requestAnimationFrame(updateLines);
  }
  
  // Start drawing with a slight delay for DOM to settle
  setTimeout(() => {
    constellationRAF = requestAnimationFrame(updateLines);
  }, 800);
}

export function destroyConstellationLines() {
  if (constellationRAF) {
    cancelAnimationFrame(constellationRAF);
    constellationRAF = null;
  }
  document.getElementById('constellation-svg')?.remove();
}

// =============================================
// CLEANUP ALL
// =============================================
export function cleanupAllEffects(container) {
  stopShootingStars();
  destroyParallax(container);
  destroyConstellationLines();
}
