// ===== Custom Cursor =====
const cursor = document.querySelector('.cursor');
const ring = document.querySelector('.cursor-ring');
if (cursor && ring) {
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
    setTimeout(() => {
      ring.style.left = e.clientX + 'px';
      ring.style.top  = e.clientY + 'px';
    }, 80);
  });
  document.querySelectorAll('a,button,.proj-card,.tech-pill').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.style.width = '16px'; cursor.style.height = '16px'; ring.style.width = '48px'; ring.style.height = '48px'; });
    el.addEventListener('mouseleave', () => { cursor.style.width = '8px'; cursor.style.height = '8px'; ring.style.width = '34px'; ring.style.height = '34px'; });
  });
}

// ===== Navbar =====
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link-custom');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  let cur = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 110) cur = s.id; });
  navLinks.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + cur);
  });
});

// ===== Dark Mode =====
const toggle = document.getElementById('darkToggle');
if (localStorage.getItem('theme') === 'light') document.body.classList.add('light-mode');
toggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
});

// ===== Scroll Reveal =====
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ===== Skill Bars =====
const skillObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-fill').forEach(f => {
        setTimeout(() => { f.style.width = f.dataset.width; }, 200);
      });
      skillObs.unobserve(e.target);
    }
  });
}, { threshold: 0.25 });
const skillsSec = document.getElementById('skills');
if (skillsSec) skillObs.observe(skillsSec);

// ===== Counter =====
function counter(el) {
  const target = parseInt(el.dataset.count), dur = 1800, start = performance.now();
  const step = t => {
    const p = Math.min((t - start) / dur, 1);
    el.textContent = Math.floor((1 - Math.pow(1 - p, 4)) * target);
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
const statsObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('[data-count]').forEach(counter);
      statsObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
const stats = document.querySelector('.hero-stats');
if (stats) statsObs.observe(stats);

// ===== Project Filter =====
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    document.querySelectorAll('.project-item').forEach(item => {
      item.classList.toggle('hidden', f !== 'all' && item.dataset.category !== f);
    });
  });
});

// ===== Contact Form =====
const form = document.getElementById('contactForm');
const toast = document.getElementById('successToast');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.innerHTML = '<i class="bi bi-hourglass-split"></i> Sending...';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = '<i class="bi bi-send-fill"></i> Send Message';
      btn.disabled = false;
      form.reset();
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 4500);
    }, 1600);
  });
}

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const t = document.querySelector(this.getAttribute('href'));
    if (t) {
      e.preventDefault();
      t.scrollIntoView({ behavior: 'smooth' });
      const menu = document.querySelector('.navbar-collapse');
      if (menu?.classList.contains('show')) document.querySelector('.navbar-toggler').click();
    }
  });
});

// ===== Typing Effect =====
const typingEl = document.getElementById('typingRole');
if (typingEl) {
  const roles = ['Full Stack Developer', 'Python Developer', 'Web Designer', 'Problem Solver'];
  let wi = 0, ci = 0, deleting = false;
  function type() {
    const word = roles[wi];
    typingEl.textContent = deleting ? word.substring(0, ci - 1) : word.substring(0, ci + 1);
    deleting ? ci-- : ci++;
    if (!deleting && ci === word.length) { deleting = true; setTimeout(type, 1800); return; }
    if (deleting && ci === 0) { deleting = false; wi = (wi + 1) % roles.length; }
    setTimeout(type, deleting ? 55 : 95);
  }
  setTimeout(type, 1000);
}
