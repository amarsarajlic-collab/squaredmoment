// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Nav scroll state
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

// Gallery filters
const filters = document.querySelectorAll('.filter');
const items = document.querySelectorAll('.grid__item');
filters.forEach(btn => {
  btn.addEventListener('click', () => {
    filters.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filter;
    items.forEach(item => {
      const show = cat === 'all' || item.dataset.cat === cat;
      item.classList.toggle('hide', !show);
    });
  });
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let visibleItems = [];
let currentIndex = 0;

function getVisibleItems() {
  return Array.from(items).filter(item => !item.classList.contains('hide'));
}

function openLightbox(item) {
  visibleItems = getVisibleItems();
  currentIndex = visibleItems.indexOf(item);
  showImage();
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function showImage() {
  const item = visibleItems[currentIndex];
  const img = item.querySelector('img');
  lightboxImg.src = img.src.replace(/\/\d+\/\d+$/, '/1600/1100');
  lightboxImg.alt = img.alt;
  lightboxCaption.textContent = item.querySelector('figcaption').textContent;
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

items.forEach(item => {
  item.addEventListener('click', () => openLightbox(item));
});

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
lightboxPrev.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
  showImage();
});
lightboxNext.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % visibleItems.length;
  showImage();
});
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') lightboxPrev.click();
  if (e.key === 'ArrowRight') lightboxNext.click();
});

// Subtle cursor glow (desktop)
const glow = document.getElementById('cursorGlow');
if (window.matchMedia('(hover: hover)').matches) {
  window.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}
