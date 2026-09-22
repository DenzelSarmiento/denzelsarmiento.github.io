(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))t(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&t(r)}).observe(document,{childList:!0,subtree:!0});function i(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function t(o){if(o.ep)return;o.ep=!0;const n=i(o);fetch(o.href,n)}})();const W="modulepreload",J=function(a){return"/memory-core/"+a},F={},Q=function(e,i,t){let o=Promise.resolve();if(i&&i.length>0){let r=function(p){return Promise.all(p.map(m=>Promise.resolve(m).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};document.getElementsByTagName("link");const s=document.querySelector("meta[property=csp-nonce]"),d=(s==null?void 0:s.nonce)||(s==null?void 0:s.getAttribute("nonce"));o=r(i.map(p=>{if(p=J(p),p in F)return;F[p]=!0;const m=p.endsWith(".css"),u=m?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${p}"]${u}`))return;const l=document.createElement("link");if(l.rel=m?"stylesheet":W,m||(l.as="script"),l.crossOrigin="",l.href=p,d&&l.setAttribute("nonce",d),document.head.appendChild(l),m)return new Promise((k,f)=>{l.addEventListener("load",k),l.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${p}`)))})}))}function n(r){const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=r,window.dispatchEvent(s),!s.defaultPrevented)throw r}return o.then(r=>{for(const s of r||[])s.status==="rejected"&&n(s.reason);return e().catch(n)})},T=[{id:"feliz-dia",title:"Primer 21 de septiembre",description:"",icon:"local_florist",color:"#facc15",memories:[{id:"flor-1",title:"Perdon",text:"Por desgracia no puedo este 21 de septiembre estar a tu lado y regalarte un ramo como a mi me gusTaria, pero te prometo que en los proximos 21 si estare ahi a tu lado con un ramo escondido para sorprenderte y darte un beso y abrazo enorme, aun asi este 21 queria darte algo parecido o que involucre a las flores amarillas y es por eso que estuve creando este memory core (el cual tome de inspiracion de Nahuel), pero quiero que aca pueda darte regalos virtuales, ya sean cartas o mensajes bonitos. ( Sigue el 🌼 )",type:"public",style:"capsule",icon:"local_florist",emoji:"🌻",orbitRing:1,angle:45,constellationId:"feliz-dia"},{id:"flor-2",title:"Eres mi persona favorita",text:"Eres la persona con la cual yo quiero pasar el rEsto de mi vida, y quiero hacer todo lo posible y lo que este a mi alcanze para lograrlo y yo se que es dificil y puede tomar tiempo (y encima por como soy yo ji) pero tu me motivas cada dia a dar lo mejor de mi y aunque aveces no haga nada o parezca que tu no me ayudas yo te prometo y juro que eso no es asi, tu me das una motivacion, esperanza y alegria que me hacen vivir de buen humor y cuando llegue el dia en que pueda despertarme a tu lado y lo primero que haga sea besarte y molestarte va a ser el dia y inicio de los dias mas felices e increibles de mi vida. (Sigue el girasol 🌻 de la misma orbita)",type:"public",style:"icon",icon:"favorite",emoji:"🌼",orbitRing:2,angle:120,constellationId:"feliz-dia"},{id:"flor-3",title:"Poesia",text:"Estuve buscando poesias para poder dedicarte y no encontraba alguna que me hiciera puM y diga 'Esta es el correcto' pero hubo una que me encanto mucho y es bastante breve y dice asi : '¿Mi tierra? Mi tierra eres tú. ¿Mi gente? Mi gente eres tú. El destierro y la muerte para mí están adonde no estés tú. ¿Y mi vida? Dime, mi vida, ¿qué es, si no eres tú?', es un poema hecho por Luis Cernuda el cual no conocia debido a que no conozo poetas la verdad, pero es muy lindo y siento que retrata muy bien lo que es el amor para toda la vida, elegi este porque de todos los que lei ( Creo que fueron 30 o 40 ) este fue el que mas me definio y encanto por su sencillez y lo que expresa. ( Sigue el ultimo girasol 🌻 )",type:"public",style:"large",icon:"wb_sunny",emoji:"☀️",orbitRing:3,angle:210,constellationId:"feliz-dia"},{id:"flor-4",title:"Esta es la primera",text:"Ve en orden amor, cada burbuja tendra un mensaje o poesia linda dedicada a ti, pero con un mensaje oculto entre todas ( La primera es el girasol 🌻 de la misma orbita amor )",type:"public",style:"capsule-detail",icon:"favorite",emoji:"💛",orbitRing:1,angle:300,constellationId:"feliz-dia"},{id:"flor-5",title:"Te extraño",text:"Mientras estaba haciendo todo esto iba dandome mas cuenta de lo mucho que te extraño, y a lo mejor suena raro pero no lo es, me refiero a que te extrAño demasiado y al hacer todo esto y ver fotos nuestra, recordar todos los momentos que hemos pasado me trae demasiado nostalgia y felicidad, tambien diversion porque no hubo un solo dia y ni siquiera un momento en el cual no me divirtiera a tu lado, cada dia que pasa es mayor mi amor y las ganas de estar alla y poder darte un abrazo enorme pero asi ENORME y llenarte de besos, de verdad te extraño mucho y jamas quiero perderte, quiero hacer todo lo posible para ganarme el privilegio de pasar el resto de mi vida a tu lado. ( Sigue el ☀️)",type:"public",style:"icon",icon:"eco",emoji:"🌻",orbitRing:2,angle:0,constellationId:"feliz-dia"},{id:"flor-6",title:"Te Amo",text:"Llegamos a la ultima burbuja mi amor! y la mas importante, te amo amOr mio y no es un decir por decir es que de verdad te amo y te has vuelto la persona mas importante en mi vida y la persona que mas me incentiva a vivir, el primer dia en el que te acercaste a mi y me pediste mi instagram (a pesar de ya haberlo buscado antes) en la casa de tus padres mientras jugabamos bingo y yo te molestaba, fue cuando mi vida empezo a mejorar y encontrar un sentido de vida, y tu me diste esa mejoria y tu me ayudaste a encontrar el sentido porque el sentido de vivir es que quiero estar a tu lado toda mi vida y hacer todo lo que podamos y queramos, y obvio es dificl pero ambos sabemos que lo mas dificil es la distancia y cuando la superemos y estemos juntos ya solo quedara hacer lo que nos guste, ganar plata y disfrutar la vida que soñabamos, te amo y te lo repetire todos los dias de mi vida y si hay algo mas despues de la vida te lo seguire repitiendo simpre, porque es hermoso el amor y es hermoso gracias a ti, eres increible, eres inteligente, divertida, dulce, bondadosa, muy hermosa, eres todo lo mas hermoso que puede dar la vida, y tenerte a mi lado es el privilegio mas grande que existe en este universo, por eso jamas quiero perderte y para ello yo tengo que esforzarme y dejar de procrastinar tanto jaja pero de verdad no se que haria sin ti y sin nuestras llamadas de todas las noches o sin nuestros mensajes contandonos todo ( o molestandonos tambien jaja) pero todo lo que haces y hacemos juntos me da una alegria y emocion que jamas tuve y me encanta, te amo 'TE AMO' y ojala te guste todo esto mi amor, fue un poco estresante pero me encanto el proceso y resultado y lo que mas quiero es que te guste y que sepas siempre del amor tan inmenso que siento hacia ti, te amo demasiado. ( Te gusto el caminito de burbujas? y pudiste descifrar el 'mensaje oculto' mi amor? )",type:"public",style:"capsule",icon:"favorite",emoji:"🌻",orbitRing:3,angle:90,constellationId:"feliz-dia"}]}],E=T.flatMap(a=>a.memories),N={totalMemories:E.length,month:9},Z=Object.freeze(Object.defineProperty({__proto__:null,constellations:T,memories:E,stats:N},Symbol.toStringTag,{value:"Module"}));let L=null;function D(a){const e=document.createElement("div");e.className="falling-flower";const i=-10+Math.random()*120,t=-10,o=5+Math.random()*5,n=18+Math.random()*24,r=["🌻","🌼","💛","🌻","🌼"],s=r[Math.floor(Math.random()*r.length)];e.style.cssText=`
    position: absolute;
    top: ${t}%;
    left: ${i}%;
    font-size: ${n}px;
    z-index: 5;
    pointer-events: none;
    filter: drop-shadow(0 0 10px rgba(250,204,21,0.6));
  `,e.innerHTML=s,a.appendChild(e);const d=e.animate([{opacity:0,transform:"translate(0, -20px) rotate(0deg)"},{opacity:.9,transform:"translate(20px, 30vh) rotate(100deg)",offset:.2},{opacity:.9,transform:"translate(-20px, 80vh) rotate(260deg)",offset:.8},{opacity:0,transform:"translate(0, 110vh) rotate(360deg)"}],{duration:o*1e3,easing:"ease-in-out",fill:"forwards"});d.onfinish=()=>e.remove()}function _(a){if(!a)return;setTimeout(()=>D(a),1e3);function e(){const i=300+Math.random()*800;L=setTimeout(()=>{D(a),e()},i)}e()}function Y(){L&&(clearTimeout(L),L=null)}let S=null;function H(a){if(!a)return;const i=[{class:"parallax-stars-deep",speed:.01,opacity:.3},{class:"parallax-stars-mid",speed:.025,opacity:.5},{class:"parallax-stars-near",speed:.045,opacity:.7}].map(t=>{const o=document.createElement("div");return o.className=`stars ${t.class}`,o.style.cssText=`
      position: absolute;
      inset: -30px;
      pointer-events: none;
      z-index: 0;
      opacity: ${t.opacity};
      transition: transform 0.3s ease-out;
      will-change: transform;
    `,a.insertBefore(o,a.firstChild),{el:o,speed:t.speed}});S=t=>{const o=a.getBoundingClientRect(),n=o.width/2,r=o.height/2,s=t.clientX-o.left-n,d=t.clientY-o.top-r;i.forEach(({el:p,speed:m})=>{const u=s*m,l=d*m;p.style.transform=`translate(${u}px, ${l}px)`})},a.addEventListener("mousemove",S)}function U(a){S&&a&&(a.removeEventListener("mousemove",S),S=null),document.querySelectorAll(".parallax-stars-deep, .parallax-stars-mid, .parallax-stars-near").forEach(e=>e.remove())}let $=null;function ee(a){if(!a)return;const e=a.closest(".view-container")||a,i=document.createElementNS("http://www.w3.org/2000/svg","svg");i.id="constellation-svg",i.setAttribute("style",`
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 15;
    pointer-events: none;
    overflow: visible;
  `),e.appendChild(i);const t=document.createElementNS("http://www.w3.org/2000/svg","defs"),o=document.createElementNS("http://www.w3.org/2000/svg","filter");o.id="constellation-glow",o.setAttribute("x","-50%"),o.setAttribute("y","-50%"),o.setAttribute("width","200%"),o.setAttribute("height","200%");const n=document.createElementNS("http://www.w3.org/2000/svg","feGaussianBlur");n.setAttribute("stdDeviation","2"),n.setAttribute("result","glow");const r=document.createElementNS("http://www.w3.org/2000/svg","feMerge"),s=document.createElementNS("http://www.w3.org/2000/svg","feMergeNode");s.setAttribute("in","glow");const d=document.createElementNS("http://www.w3.org/2000/svg","feMergeNode");d.setAttribute("in","SourceGraphic"),r.appendChild(s),r.appendChild(d),o.appendChild(n),o.appendChild(r),t.appendChild(o),i.appendChild(t);function p(){i.querySelectorAll("line, circle").forEach(g=>g.remove());const m=a.querySelectorAll(".orbit-bubble");if(m.length<2){$=requestAnimationFrame(p);return}const u=e.getBoundingClientRect(),l=[];m.forEach(g=>{const b=g.getBoundingClientRect();l.push({x:b.left+b.width/2-u.left,y:b.top+b.height/2-u.top})});const k=500,f=document.createElementNS("http://www.w3.org/2000/svg","g");f.setAttribute("filter","url(#constellation-glow)");for(let g=0;g<l.length;g++){for(let x=g+1;x<l.length;x++){const q=l[g].x-l[x].x,c=l[g].y-l[x].y,v=Math.sqrt(q*q+c*c);if(v<k){const C=.4*(1-v/k),h=document.createElementNS("http://www.w3.org/2000/svg","line");h.setAttribute("x1",l[g].x),h.setAttribute("y1",l[g].y),h.setAttribute("x2",l[x].x),h.setAttribute("y2",l[x].y),h.setAttribute("stroke",`rgba(234, 179, 8, ${C})`),h.setAttribute("stroke-width","1"),h.setAttribute("stroke-dasharray","6,10"),f.appendChild(h)}}const b=document.createElementNS("http://www.w3.org/2000/svg","circle");b.setAttribute("cx",l[g].x),b.setAttribute("cy",l[g].y),b.setAttribute("r","2"),b.setAttribute("fill","rgba(250, 204, 21, 0.7)"),f.appendChild(b);const z=document.createElementNS("http://www.w3.org/2000/svg","circle");z.setAttribute("cx",l[g].x),z.setAttribute("cy",l[g].y),z.setAttribute("r","1"),z.setAttribute("fill","rgba(255, 255, 255, 0.6)"),f.appendChild(z)}i.appendChild(f),$=requestAnimationFrame(p)}setTimeout(()=>{$=requestAnimationFrame(p)},800)}function te(){var a;$&&(cancelAnimationFrame($),$=null),(a=document.getElementById("constellation-svg"))==null||a.remove()}function G(a){Y(),U(a),te()}function ie(a,e){const i=E.filter(d=>d.type==="public").slice(0,4),t=E.filter(d=>d.type==="locked").length,o=[{top:"12%",left:"8%",anim:"animate-float"},{top:"18%",right:"6%",anim:"animate-float-delayed"},{top:"48%",left:"-1%",anim:"animate-float-slow"},{top:"52%",right:"4%",anim:"animate-float"},{bottom:"28%",left:"10%",anim:"animate-float-delayed"},{bottom:"22%",right:"12%",anim:"animate-float-slow"}];a.innerHTML=`
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
        ${oe(i,t,o)}
      </main>

      <!-- Footer / CTA -->
      <footer style="position:relative;z-index:50;width:100%;padding:32px 32px 40px;display:flex;flex-direction:column;align-items:center;gap:16px;">
        <!-- Stats -->
        <div style="display:flex;align-items:center;gap:24px;color:rgba(255,255,255,0.5);font-size:12px;font-weight:500;letter-spacing:0.05em;margin-bottom:8px;">
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="width:8px;height:8px;border-radius:50%;background:var(--color-primary);"></span>
            <span>${N.totalMemories} Recuerdos</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="width:8px;height:8px;border-radius:50%;background:#60a5fa;"></span>
            <span>${N.month} Meses</span>
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
  `;const n=document.getElementById("enter-universe-btn"),r=n.querySelector(".shimmer-bar");n.addEventListener("mouseenter",()=>{r.style.transform="translateX(100%)",n.style.boxShadow="0 0 60px rgba(255,255,255,0.4)"}),n.addEventListener("mouseleave",()=>{r.style.transform="translateX(-100%)",n.style.boxShadow="0 0 40px rgba(255,255,255,0.2)"});const s=document.getElementById("landing-view");_(s),H(s),n.addEventListener("click",()=>{Y(),U(s);const d=document.getElementById("landing-view");d.style.animation="fade-in 0.4s ease reverse forwards",setTimeout(()=>e(),400)})}function oe(a,e,i){let t="";if(e>0){const o=i[5]||i[4],n=Object.entries(o).filter(([r])=>r!=="anim").map(([r,s])=>`${r}:${s}`).join(";");t+=`
      <div class="${o.anim}" style="position:absolute;${n};z-index:10;">
        <div class="glass-bubble" style="width:40px;height:40px;border-radius:50%;background:rgba(var(--color-primary-rgb),0.2);display:flex;align-items:center;justify-content:center;cursor:pointer;">
          <div style="width:8px;height:8px;border-radius:50%;background:var(--color-primary);animation:pulse-slow 2s cubic-bezier(0.4,0,0.6,1) infinite;"></div>
        </div>
      </div>`}return t}function ae(a,{onConstellationSelect:e,onBack:i}){var o;a.innerHTML=`
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
          ${ne(T.filter(n=>n.id!=="perdidas"))}
        </div>
      </main>

      <!-- Footer: Back to Landing -->
      <footer style="position:relative;z-index:50;width:100%;padding:24px;display:flex;justify-content:center;">
        <button id="constellation-back-btn" class="glass-bubble clickable" style="padding:10px 24px;border-radius:var(--radius-full);color:rgba(255,255,255,0.7);font-size:12px;letter-spacing:0.1em;border:none;cursor:pointer;transition:all 0.3s;">
          VOLVER AL INICIO
        </button>
      </footer>
    </div>
  `;const t=document.getElementById("constellations-view");_(t),H(t),document.querySelectorAll(".constellation-card").forEach(n=>{n.addEventListener("click",()=>{const r=n.dataset.id;t.style.animation="fade-in 0.4s ease reverse forwards",setTimeout(()=>e(r),400)})}),(o=document.getElementById("constellation-back-btn"))==null||o.addEventListener("click",()=>{G(t),t.style.animation="fade-in 0.3s ease reverse forwards",setTimeout(()=>i(),300)})}function ne(a){return a.map((e,i)=>`
    <div class="constellation-card type-${i%3} clickable" data-id="${e.id}"
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
           animation: float ${4+i}s ease-in-out infinite alternate;
           animation-delay: ${i*.5}s;
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
        background:${e.color};
        opacity:0.2;
        filter:blur(20px);
        border-radius:50%;
      "></div>
      
      <span class="material-icons-round" style="font-size:54px;color:${e.color};margin-bottom:12px;position:relative;">${e.icon}</span>
      
      <h3 style="font-size:16px;font-weight:600;color:white;margin-bottom:6px;letter-spacing:0.05em;">${e.title}</h3>
      <p style="font-size:12px;color:rgba(255,255,255,0.7);line-height:1.4;">${e.description}</p>
      
      <!-- Decorative stars -->
      <div style="position:absolute;top:10px;right:10px;width:2px;height:2px;background:white;opacity:0.6;box-shadow:0 0 4px white;"></div>
      <div style="position:absolute;bottom:15px;left:15px;width:1px;height:1px;background:white;opacity:0.4;"></div>
    </div>
  `).join("")}function re(a,{onMemoryClick:e,onLockedClick:i,onBack:t},o=null){var z,x,q;const n=o?T.find(c=>c.id===o):null,r=n?n.memories:E,s=r.filter(c=>c.orbitRing===1&&c.type!=="hidden"),d=r.filter(c=>c.orbitRing===2&&c.type!=="hidden"),p=r.filter(c=>c.orbitRing===3&&c.type!=="hidden"),m=n?n.title:"Universo";n&&n.description;const u=n?n.color:"var(--color-primary)";a.innerHTML=`
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
          <h1 style="font-size:14px;font-weight:300;letter-spacing:0.3em;color:rgba(255,255,255,0.9);text-transform:uppercase;">${m}</h1>
          <div style="width:4px;height:4px;border-radius:50%;background:${u};margin-top:8px;"></div>
        </div>
        <div style="width:40px;"></div>
      </header>

      <!-- Main: Orbital System -->
      <main style="position:relative;z-index:10;flex:1;width:100%;display:flex;align-items:center;justify-content:center;">
        <div id="orbital-system" style="position:relative;width:min(600px, 90vw);height:min(600px, 90vw);">

          <!-- Outer Ring (ring 3) -->
          <div class="orbital-ring animate-spin-slow" style="width:min(600px, 90vw);height:min(600px, 90vw);border-color:rgba(255,255,255,0.04);">
            ${P(p)}
          </div>

          <!-- Middle Ring (ring 2) -->
          <div class="orbital-ring animate-spin-reverse" style="width:min(400px, 65vw);height:min(400px, 65vw);border-color:rgba(255,255,255,0.07);">
            ${P(d)}
            <!-- Decorative dot -->
            <div style="position:absolute;top:10%;right:30%;width:3px;height:3px;border-radius:50%;background:rgba(255,255,255,0.4);box-shadow:0 0 10px rgba(255,255,255,0.5);"></div>
          </div>

          <!-- Inner Ring (ring 1) -->
          <div class="orbital-ring animate-spin-slow" style="width:min(260px, 45vw);height:min(260px, 45vw);border-color:rgba(255,255,255,0.1);animation-duration:20s;">
            ${P(s)}
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
  `;const l=document.getElementById("universe-view"),k=document.getElementById("orbital-system");_(l),H(l),ee(k);function f(){G(l);const c=document.getElementById("universe-view");c.style.animation="fade-in 0.3s ease reverse forwards",setTimeout(()=>t(),300)}(z=document.getElementById("universe-back-btn"))==null||z.addEventListener("click",f),(x=document.getElementById("footer-home-btn"))==null||x.addEventListener("click",f);const g=E.filter(c=>c.type==="hidden");let b=!1;(q=document.getElementById("footer-constellation-btn"))==null||q.addEventListener("click",()=>{if(b||g.length===0)return;b=!0;const c=g[Math.floor(Math.random()*g.length)],v=document.getElementById("constellation-overlay"),C=document.getElementById("constellation-text"),h=document.getElementById("constellation-author");C.textContent=`"${c.text}"`,h.textContent=`— ${c.title}${c.date?", "+c.date:""}`,v.style.pointerEvents="auto",v.style.opacity="1";const A=()=>{v.style.opacity="0",setTimeout(()=>{v.style.pointerEvents="none",b=!1},1500)};v.addEventListener("click",A,{once:!0}),setTimeout(()=>{b&&A()},5e3)}),document.querySelectorAll(".orbit-bubble").forEach(c=>{c.addEventListener("click",v=>{v.stopPropagation();const C=c.dataset.id,h=E.find(A=>A.id===C);h&&(h.type==="locked"?i(h):e(h))})})}function P(a,e,i){return a.map(t=>{const n=(t.angle||0)*Math.PI/180,r=50+45*Math.cos(n),s=50+45*Math.sin(n),d=t.type==="locked",p=d?'<div class="lock-badge"><span class="material-icons-round" style="font-size:10px;color:white;">lock</span></div>':"";return t.style==="icon"||t.emoji?`
        <div class="orbit-bubble clickable" data-id="${t.id}"
             style="position:absolute;left:${r}%;top:${s}%;transform:translate(-50%,-50%);z-index:20;">
          <div class="glass-bubble" style="width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;position:relative;${d?"border-color:rgba(var(--color-primary-rgb),0.3);":""}">
            ${p}
            <span style="font-size:20px;">${t.emoji||""}</span>
            ${t.icon&&!t.emoji?`<span class="material-icons-round" style="color:${t.iconColor||"white"};font-size:20px;">${t.icon}</span>`:""}
          </div>
        </div>`:t.style==="capsule"||t.style==="capsule-detail"?`
        <div class="orbit-bubble clickable" data-id="${t.id}"
             style="position:absolute;left:${r}%;top:${s}%;transform:translate(-50%,-50%);z-index:20;">
          <div class="glass-bubble" style="padding:10px 18px;border-radius:var(--radius-full);display:flex;align-items:center;gap:10px;white-space:nowrap;position:relative;${d?"border-color:rgba(var(--color-primary-rgb),0.3);":""}">
            ${p}
            ${t.icon?`<span class="material-icons-round" style="color:${t.iconColor||"#ec4899"};font-size:14px;">${t.icon}</span>`:""}
            <div style="display:flex;flex-direction:column;">
              <span style="font-size:12px;font-weight:700;color:white;">${t.title}</span>
              ${t.date?`<span style="font-size:9px;color:rgba(255,255,255,0.5);">${t.date}</span>`:""}
            </div>
          </div>
        </div>`:t.style==="large"?`
        <div class="orbit-bubble clickable" data-id="${t.id}"
             style="position:absolute;left:${r}%;top:${s}%;transform:translate(-50%,-50%);z-index:20;">
          <div class="glass-bubble" style="width:90px;height:90px;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:8px;text-align:center;position:relative;">
            ${p}
            <span style="font-size:10px;color:rgba(255,255,255,0.6);margin-bottom:2px;">${t.date||""}</span>
            <span style="font-size:13px;font-weight:600;color:white;">${t.title}</span>
            ${t.icon?`<span class="material-icons-round" style="color:rgba(var(--color-primary-rgb),0.8);font-size:12px;margin-top:4px;">${t.icon}</span>`:""}
          </div>
        </div>`:""}).join("")}function se(a,e,{onClose:i,decryptedText:t}){var r,s;const o=t||e.text||"",n=!!e.image;a.innerHTML=`
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
        ${n?`
          <div class="animate-float" style="position:relative;width:min(288px, 75vw);height:min(288px, 75vw);margin-bottom:32px;">
            <!-- Glow behind -->
            <div class="animate-pulse-slow" style="position:absolute;inset:-16px;background:linear-gradient(135deg, rgba(var(--color-primary-rgb),0.3), rgba(59,130,246,0.3));border-radius:50%;filter:blur(32px);opacity:0.5;"></div>
            <!-- Image container -->
            <div class="prismatic-bubble" style="position:relative;width:100%;height:100%;border:1px solid rgba(255,255,255,0.2);">
              <img
                alt="${e.title}"
                src="${e.image}"
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
        `:`
          <!-- No image: show large emoji/icon -->
          <div class="animate-float animate-scale-in" style="position:relative;width:160px;height:160px;margin-bottom:32px;display:flex;align-items:center;justify-content:center;">
            <div class="animate-pulse-slow" style="position:absolute;inset:-16px;background:rgba(var(--color-primary-rgb),0.2);border-radius:50%;filter:blur(32px);"></div>
            <div class="glass-bubble" style="width:100%;height:100%;border-radius:50%;display:flex;align-items:center;justify-content:center;">
              <span style="font-size:64px;">${e.emoji||""}</span>
              ${e.icon&&!e.emoji?`<span class="material-icons-round" style="font-size:56px;color:${e.iconColor||"var(--color-primary)"};">${e.icon}</span>`:""}
            </div>
          </div>
        `}

        <!-- Text Content -->
        <div class="animate-slide-up" style="position:relative;z-index:20;width:100%;max-width:600px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:8px;max-height:65vh;overflow-y:auto;padding-right:8px;padding-bottom:100px;mask-image: linear-gradient(to bottom, black 85%, transparent 100%);">
          ${e.location?`
            <span style="font-size:10px;font-weight:700;letter-spacing:0.3em;text-transform:uppercase;color:rgba(var(--color-primary-rgb),0.8);">${e.location}</span>
          `:""}
          <h1 class="font-serif" style="font-size:${n?"24px":"28px"};color:white;line-height:1.3;font-style:italic;">
            ${e.title}
          </h1>
          <div style="width:48px;height:1px;background:linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);margin:8px 0 16px;"></div>
          <p class="font-serif" style="color:rgba(255,255,255,0.85);font-size:16px;line-height:1.8;padding:0 8px;white-space:pre-wrap;">
            ${o}
          </p>

          <!-- Action buttons -->
          <div style="padding-top:24px;display:flex;flex-direction:column;align-items:center;gap:16px;">
            ${e.url&&(e.type==="link"||e.type==="locked"&&t)?`
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
                <span>${e.date||"OBTENER"}</span> <!-- Using date field for button text -->
                <span class="material-icons-round" style="font-size:16px;">open_in_new</span>
              </button>
            `:""}
          </div>
        </div>
      </main>

      <!-- Footer -->
      <footer style="position:relative;z-index:50;width:100%;padding:24px 32px 40px;display:flex;flex-direction:column;align-items:center;">
        <p style="font-size:11px;font-family:monospace;color:rgba(255,255,255,0.3);letter-spacing:0.15em;">
          ${e.date?e.date.toUpperCase():""}${e.location?` • ${e.location}`:""}
        </p>
      </footer>
    </div>
  `,(r=document.getElementById("detail-close-btn"))==null||r.addEventListener("click",()=>{const d=document.getElementById("detail-view");d.style.animation="fade-in 0.3s ease reverse forwards",setTimeout(()=>i(),300)}),(s=document.getElementById("detail-cta-btn"))==null||s.addEventListener("click",()=>{e.url&&window.open(e.url,"_blank")})}async function le(a,e){const i=new TextEncoder,t=await crypto.subtle.importKey("raw",i.encode(a),"PBKDF2",!1,["deriveKey"]);return crypto.subtle.deriveKey({name:"PBKDF2",salt:e,iterations:1e5,hash:"SHA-256"},t,{name:"AES-GCM",length:256},!1,["decrypt"])}async function de(a,e){try{const i=O(a.salt),t=O(a.iv),o=O(a.ciphertext),n=await le(e,i),r=await crypto.subtle.decrypt({name:"AES-GCM",iv:t},n,o);return new TextDecoder().decode(r)}catch{return null}}function O(a){const e=atob(a),i=new Uint8Array(e.length);for(let t=0;t<e.length;t++)i[t]=e.charCodeAt(t);return i.buffer}function ce(a,e,{onSuccess:i,onBack:t}){a.innerHTML=`
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
            Ingresá la Clave Secreta<br>${e.lockLabel||"Mensajes Secretos"}
          </p>
          ${e.hint?`
            <p style="font-size:11px;color:rgba(var(--color-primary-rgb),0.7);margin-top:4px;font-style:italic;">
              Pista: ${e.hint}
            </p>
          `:""}
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
  `;const o=document.getElementById("passphrase-input"),n=document.getElementById("unlock-btn"),r=document.getElementById("error-msg"),s=document.getElementById("toggle-visibility"),d=document.getElementById("passphrase-container"),p=document.getElementById("pin-back-btn");s.addEventListener("click",()=>{const u=o.type==="password";o.type=u?"text":"password",s.querySelector(".material-icons-round").textContent=u?"visibility_off":"visibility",s.querySelector(".material-icons-round").nextSibling.textContent=u?" Ocultar clave":" Mostrar clave"});async function m(){const u=o.value.trim().toLowerCase();if(!u)return;n.innerHTML='<span class="material-icons-round" style="font-size:18px;animation:spin-slow 1s linear infinite;">refresh</span> Descifrando...',n.style.pointerEvents="none";const l=await de(e.encrypted,u);l?(r.style.opacity="0",d.querySelector(".input-glow").style.opacity="0.8",d.querySelector(".input-glow").style.background="linear-gradient(90deg, rgba(34,197,94,0.4), rgba(59,130,246,0.4))",n.innerHTML='<span class="material-icons-round" style="font-size:18px;">check</span> ¡Desbloqueado!',n.style.background="linear-gradient(135deg, #22c55e, #16a34a)",setTimeout(()=>{const k=document.getElementById("pin-view");k.style.animation="fade-in 0.4s ease reverse forwards",setTimeout(()=>i(e,l),400)},800)):(r.style.opacity="1",d.classList.add("animate-shake"),n.innerHTML='<span class="material-icons-round" style="font-size:18px;">lock_open</span> Desbloquear',n.style.pointerEvents="auto",setTimeout(()=>d.classList.remove("animate-shake"),500))}n.addEventListener("click",m),o.addEventListener("keydown",u=>{u.key==="Enter"&&m()}),p.addEventListener("click",()=>{const u=document.getElementById("pin-view");u.style.animation="fade-in 0.3s ease reverse forwards",setTimeout(()=>t(),300)}),setTimeout(()=>o.focus(),600)}let R=[],w,B;const pe=100,X=["rgba(255, 255, 255, 0.6)","rgba(250, 204, 21, 0.5)","rgba(234, 179, 8, 0.4)","rgba(253, 224, 71, 0.3)","rgba(245, 158, 11, 0.2)"];class ue{constructor(e,i){this.reset(e,i,!0)}reset(e,i,t=!1){this.x=Math.random()*e,this.y=t?Math.random()*i:-10,this.size=Math.random()*2.5+.5,this.speedX=(Math.random()-.5)*.3,this.speedY=Math.random()*.2+.05,this.opacity=Math.random()*.8+.2,this.color=X[Math.floor(Math.random()*X.length)],this.twinkleSpeed=Math.random()*.02+.005,this.twinklePhase=Math.random()*Math.PI*2,this.life=0}update(e,i){this.x+=this.speedX,this.y+=this.speedY,this.life+=this.twinkleSpeed,this.currentOpacity=this.opacity*(.5+.5*Math.sin(this.life+this.twinklePhase)),(this.y>i+10||this.x<-10||this.x>e+10)&&this.reset(e,i)}draw(e){if(e.beginPath(),e.arc(this.x,this.y,this.size,0,Math.PI*2),e.fillStyle=this.color.replace(/[\d.]+\)$/,`${this.currentOpacity})`),e.fill(),this.size>1.5){e.beginPath(),e.arc(this.x,this.y,this.size*3,0,Math.PI*2);const i=e.createRadialGradient(this.x,this.y,0,this.x,this.y,this.size*3);i.addColorStop(0,this.color.replace(/[\d.]+\)$/,`${this.currentOpacity*.3})`)),i.addColorStop(1,"rgba(0,0,0,0)"),e.fillStyle=i,e.fill()}}}function K(){if(!B||!w)return;const a=w.width,e=w.height;B.clearRect(0,0,a,e),R.forEach(i=>{i.update(a,e),i.draw(B)}),requestAnimationFrame(K)}function ge(a){w=a,B=w.getContext("2d"),w.width=window.innerWidth,w.height=window.innerHeight,R=[];for(let e=0;e<pe;e++)R.push(new ue(w.width,w.height));K()}const M=document.getElementById("app");let V="landing",I=null;const j=document.createElement("canvas");j.id="particle-canvas";j.style.cssText="position:fixed;inset:0;z-index:1;pointer-events:none;";document.body.appendChild(j);ge(j);function y(a,e={}){switch(V=a,a){case"landing":I=null,ie(M,()=>y("constellations"));break;case"constellations":I=null,ae(M,{onConstellationSelect:i=>y("universe",{constellationId:i}),onBack:()=>y("landing")});break;case"universe":e.constellationId&&(I=e.constellationId),re(M,{onMemoryClick:i=>y("detail",{memory:i}),onLockedClick:i=>y("pin",{memory:i}),onBack:()=>y("constellations")},I);break;case"detail":se(M,e.memory,{onClose:()=>y(e.returnTo||"universe"),decryptedText:e.decryptedText||null});break;case"pin":ce(M,e.memory,{onSuccess:(i,t)=>y("detail",{memory:i,decryptedText:t,returnTo:e.returnTo}),onBack:()=>y(e.returnTo||"universe")});break}}document.addEventListener("click",a=>{const e=a.target.closest(".memory-bubble");if(e&&V==="landing"){const i=e.dataset.id;i&&Q(async()=>{const{memories:t}=await Promise.resolve().then(()=>Z);return{memories:t}},void 0).then(({memories:t})=>{const o=t.find(n=>n.id===i);o&&(o.type==="locked"?y("pin",{memory:o,returnTo:"landing"}):y("detail",{memory:o,returnTo:"landing"}))})}});y("landing");window.addEventListener("resize",()=>{j.width=window.innerWidth,j.height=window.innerHeight});
