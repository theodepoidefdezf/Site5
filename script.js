/* =========================================
   SITE 5 — NUIT — script.js
   ========================================= */

// ── Particle canvas ───────────────────────
(function () {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const GOLD = 'rgba(201,169,110,';

  function createParticle() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.2,
      vy: -(Math.random() * 0.3 + 0.05),
      alpha: Math.random() * 0.5 + 0.1
    };
  }
  for (let i = 0; i < 80; i++) particles.push(createParticle());

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach((p, i) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = GOLD + p.alpha + ')';
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;
      if (p.y < -5) { particles[i] = createParticle(); particles[i].y = H + 5; }
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

// ── Navbar scroll ─────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ── Mobile nav ────────────────────────────
const nHam   = document.getElementById('nHam');
const nLinks = document.getElementById('nLinks');
if (nHam) {
  nHam.addEventListener('click', () => nLinks.classList.toggle('open'));
  nLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => nLinks.classList.remove('open'));
  });
}

// ── Scroll reveal ─────────────────────────
const nightReveal = document.querySelectorAll('.night-reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const parent = entry.target.closest('.hero-content, .hero-deco, .about-layout, .srv-grid, .testi-block, .contact-layout, section, .container') || document.body;
      const els = [...parent.querySelectorAll('.night-reveal:not(.visible)')];
      const idx = els.indexOf(entry.target);
      entry.target.style.transitionDelay = `${Math.max(0, idx) * 0.09}s`;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });
nightReveal.forEach(el => observer.observe(el));

// ── Counter animation ─────────────────────
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 2000;
  const start = performance.now();
  const tick = (now) => {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 4);
    el.textContent = Math.floor(eased * target);
    if (t < 1) requestAnimationFrame(tick);
    else el.textContent = target;
  };
  requestAnimationFrame(tick);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.st-val[data-target]').forEach(animateCounter);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) statObserver.observe(aboutStats);

// ── Hero reveal on load ───────────────────
window.addEventListener('load', () => {
  document.querySelectorAll('.hero .night-reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 300 + i * 130);
  });
});

// ── Contact form ──────────────────────────
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn-gold');
    btn.textContent = '✓ Demande envoyée';
    btn.style.background = 'linear-gradient(135deg, #5a9a6e, #3d7a52)';
    setTimeout(() => {
      btn.textContent = 'Envoyer la demande';
      btn.style.background = '';
      form.reset();
    }, 3500);
  });
}

// ── Smooth parallax hero text ─────────────
window.addEventListener('scroll', () => {
  const content = document.querySelector('.hero-content');
  if (!content) return;
  const y = window.scrollY;
  content.style.transform = `translateY(${y * 0.12}px)`;
  content.style.opacity   = Math.max(0, 1 - y / 600);
});
