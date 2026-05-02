/* =============================================
   MICROSHOP — main.js
   Scroll animations, counters, mobile menu
   ============================================= */

// ── Header scroll effect ──────────────────────
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

// ── Mobile menu ───────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');
if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ── Scroll reveal ─────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Animated counters ─────────────────────────
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const startTime = performance.now();

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
    const current = Math.round(eased * target);
    el.textContent = current.toLocaleString('es-ES') + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting && !e.target.dataset.animated) {
      e.target.dataset.animated = 'true';
      animateCounter(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number[data-target]').forEach(el => counterObserver.observe(el));

// ── Hero background parallax (subtle) ─────────
const heroBg = document.querySelector('.hero-bg');
if (heroBg) {
  heroBg.classList.add('loaded');
  window.addEventListener('scroll', () => {
    const offset = window.scrollY * 0.25;
    heroBg.style.transform = `translateY(${offset}px)`;
  }, { passive: true });
}

// ── Form submit (Formspree fallback) ──────────
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Enviando…';
    btn.disabled = true;

    // If using Formspree, replace action URL in the HTML
    const formData = new FormData(contactForm);
    const action = contactForm.action;

    if (action && (action.includes('formspree') || action.includes('formsubmit'))) {
      try {
        const res = await fetch(action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          showFormSuccess();
          contactForm.reset();
        } else {
          btn.textContent = 'Error al enviar';
        }
      } catch {
        btn.textContent = 'Error de red';
      }
    } else {
      // Simulation for local preview
      await new Promise(r => setTimeout(r, 1200));
      showFormSuccess();
      contactForm.reset();
    }

    setTimeout(() => {
      btn.textContent = originalText;
      btn.disabled = false;
    }, 3000);
  });
}

function showFormSuccess() {
  let msg = document.getElementById('form-success');
  if (!msg) {
    msg = document.createElement('div');
    msg.id = 'form-success';
    msg.style.cssText = `
      background: rgba(141,198,63,0.15);
      border: 1px solid #8DC63F;
      border-radius: 10px;
      padding: 1rem 1.5rem;
      color: #8DC63F;
      font-size: 0.9rem;
      font-weight: 600;
      margin-top: 1rem;
      text-align: center;
    `;
    msg.textContent = '✓ Mensaje enviado correctamente. Te respondemos en breve.';
    document.getElementById('contact-form').after(msg);
  }
  msg.style.display = 'block';
  setTimeout(() => { msg.style.display = 'none'; }, 6000);
}
