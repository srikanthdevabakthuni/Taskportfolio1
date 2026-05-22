/* ===== PORTFOLIO JS ===== */

document.addEventListener('DOMContentLoaded', () => {

  // ── Navbar scroll effect ──────────────────────────────────────
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-links a');

  function updateNavbar() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  // ── Mobile nav toggle ─────────────────────────────────────────
  const navToggle = document.getElementById('navToggle');
  const navLinksContainer = document.getElementById('navLinksContainer');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinksContainer.classList.toggle('open');
  });

  // Close on link click
  navLinksContainer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinksContainer.classList.remove('open');
    });
  });

  // ── Active link on scroll ─────────────────────────────────────
  const sections = document.querySelectorAll('section[id]');

  function updateActiveLink() {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 100;
      if (window.scrollY >= top) {
        current = section.id;
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

  // ── Scroll to section ─────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── Fade-up animation on scroll ───────────────────────────────
  const fadeEls = document.querySelectorAll('.fade-up');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  fadeEls.forEach(el => fadeObserver.observe(el));

  // ── Skill bars animation ──────────────────────────────────────
  const skillFills = document.querySelectorAll('.skill-bar-fill');

  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const pct = fill.getAttribute('data-pct');
        setTimeout(() => {
          fill.style.width = pct + '%';
        }, 200);
        barObserver.unobserve(fill);
      }
    });
  }, { threshold: 0.5 });

  skillFills.forEach(fill => barObserver.observe(fill));

  // ── Typed text effect on hero ─────────────────────────────────
  const roles = ['Full Stack Developer', 'UI/UX Designer', 'Problem Solver', 'Creative Thinker'];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typedEl = document.getElementById('typed-role');

  function typeRole() {
    if (!typedEl) return;
    const current = roles[roleIndex];

    if (isDeleting) {
      typedEl.textContent = current.slice(0, charIndex - 1);
      charIndex--;
    } else {
      typedEl.textContent = current.slice(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? 60 : 110;

    if (!isDeleting && charIndex === current.length) {
      delay = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 400;
    }

    setTimeout(typeRole, delay);
  }

  setTimeout(typeRole, 1200);

  // ── Scroll indicator hide ─────────────────────────────────────
  const scrollIndicator = document.querySelector('.hero-scroll');
  if (scrollIndicator) {
    window.addEventListener('scroll', () => {
      scrollIndicator.style.opacity = window.scrollY > 100 ? '0' : '';
    }, { passive: true });
  }

});