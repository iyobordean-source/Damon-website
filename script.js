/* ===== Theme toggle & persistence ===== */
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const savedTheme = localStorage.getItem('prefers-theme');
if (savedTheme) {
  if (savedTheme === 'dark') body.classList.add('dark');
  themeToggle.setAttribute('aria-pressed', body.classList.contains('dark'));
  themeToggle.textContent = body.classList.contains('dark') ? '☀️' : '🌙';
}
themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  const isDark = body.classList.contains('dark');
  themeToggle.setAttribute('aria-pressed', isDark);
  themeToggle.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('prefers-theme', isDark ? 'dark' : 'light');
});

/* ===== Loader ===== */
const loader = document.getElementById('loader');
window.addEventListener('load', () => {
  setTimeout(() => {
    loader.style.opacity = '0';
    loader.style.pointerEvents = 'none';
    setTimeout(()=> loader.remove(), 500);
  }, 650);
});

/* ===== Typing animations ===== */
const roleEl = document.getElementById('roleText');
const roles = ['Front-End Developer 💻','Software Engineer ⚙️','Creative Designer 🎨','Problem Solver 🚀'];
let rIdx = 0, cIdx = 0, deleting = false;
const typeSpeed = 70;
function typeRole() {
  const word = roles[rIdx];
  if (!deleting) {
    roleEl.textContent = word.slice(0, cIdx + 1);
    cIdx++;
    if (cIdx === word.length) { deleting = true; setTimeout(typeRole, 900); return; }
  } else {
    roleEl.textContent = word.slice(0, cIdx - 1);
    cIdx--;
    if (cIdx === 0) { deleting = false; rIdx = (rIdx + 1) % roles.length; }
  }
  setTimeout(typeRole, deleting ? typeSpeed/2 : typeSpeed);
}
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) setTimeout(typeRole, 400);

/* ===== About typing ===== */
const aboutTextEl = document.getElementById('aboutText');
const aboutText = aboutTextEl ? aboutTextEl.textContent : '';
if (aboutTextEl) aboutTextEl.textContent = '';
let ai = 0;
function typeAbout() {
  if (!aboutTextEl) return;
  aboutTextEl.textContent = aboutText.slice(0, ai+1);
  ai++;
  if (ai < aboutText.length) setTimeout(typeAbout, 18);
}
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) setTimeout(typeAbout, 1000);

/* ===== Contact small typing ===== */
const contactTypedEl = document.getElementById('contactTyped');
const contactPhrases = ["Let's Connect!","Ready to collaborate","Say hi 👋"];
let ci = 0, cp = 0, cdel = false;
function typeContact() {
  if (!contactTypedEl) return;
  const p = contactPhrases[cp];
  if (!cdel) {
    contactTypedEl.textContent = p.slice(0, ci+1);
    ci++;
    if (ci === p.length) { cdel = true; setTimeout(typeContact, 900); return; }
  } else {
    contactTypedEl.textContent = p.slice(0, ci-1);
    ci--;
    if (ci === 0) { cdel = false; cp = (cp+1) % contactPhrases.length; }
  }
  setTimeout(typeContact, cdel ? 40 : 80);
}
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) setTimeout(typeContact, 1400);

/* ===== Reveal on scroll ===== */
const ioOptions = { threshold: 0.12 };
const revealEls = document.querySelectorAll('.reveal-text, .reveal-card, .project-card, .lead, .reveal-grid');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, ioOptions);
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('visible'));
}

/* ===== Smooth scroll ===== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if (href.length > 1) {
      e.preventDefault();
      const t = document.querySelector(href);
      if (t) t.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  });
});

/* ===== Scroll to top ===== */
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  toTop.style.display = window.scrollY > 420 ? 'flex' : 'none';
});
toTop.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));

/* ===== Contact form handler ===== */
function handleContact(e) {
  e.preventDefault();
  const f = e.target;
  const name = encodeURIComponent(f.name.value);
  const email = encodeURIComponent(f.email.value);
  const message = encodeURIComponent(f.message.value);
  const method = document.getElementById('sendMethod').value;

  if (method === 'email') {
    const mailtoLink = `mailto:iyobordean@gmail.com?subject=Message from ${name}&body=Name: ${name}%0AEmail: ${email}%0AMessage: ${message}`;
    window.location.href = mailtoLink;
  } else if (method === 'whatsapp') {
    const waLink = `https://wa.me/2347043400958?text=Hi, my name is ${name}. ${message}`;
    window.open(waLink, '_blank');
  }

  f.reset();
}
