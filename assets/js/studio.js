'use strict';

// Keep the visible image in place until its replacement is ready to render.
function preloadImage(source) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = async () => {
      try {
        if (typeof image.decode === 'function') await image.decode();
        resolve(image);
      } catch (error) {
        reject(error);
      }
    };
    image.onerror = reject;
    image.src = source;
  });
}

// Navigation stays visible without JavaScript. On small screens it becomes a disclosure.
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
const mobileQuery = window.matchMedia('(max-width: 960px)');

function closeMenu(returnFocus = false) {
  nav.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.querySelector('.menu-label').textContent = 'Menu';
  if (returnFocus) menuButton.focus();
}

function syncMenu() {
  menuButton.hidden = !mobileQuery.matches;
  closeMenu();
}

if (menuButton && nav) {
  document.documentElement.classList.add('nav-ready');
  syncMenu();
  mobileQuery.addEventListener('change', syncMenu);
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.querySelector('.menu-label').textContent = open ? 'Close' : 'Menu';
    nav.classList.toggle('is-open', open);
  });
  nav.addEventListener('click', event => {
    const link = event.target.closest('a');
    if (!link) return;
    closeMenu();
    // Move focus to the selected section instead of leaving it in the collapsed menu.
    if (mobileQuery.matches && link.hash && link.origin === location.origin) {
      const section = document.querySelector(link.hash);
      if (section) {
        section.setAttribute('tabindex', '-1');
        section.focus({ preventScroll: true });
        section.addEventListener('blur', () => section.removeAttribute('tabindex'), { once: true });
      }
    }
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) closeMenu(true);
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.site-header')) closeMenu();
  });
}

// Native details retain all gameplay descriptions if scripting is unavailable.
const features = [...document.querySelectorAll('.feature-list details')];
const featureImage = document.querySelector('#feature-image');
const featureCaption = document.querySelector('#feature-caption');
let featureRequest = 0;
async function syncFeatureImage(feature) {
  const request = ++featureRequest;
  if (mobileQuery.matches || !featureImage || !feature?.dataset.image) return;
  const source = feature.dataset.image;
  // Leave the initial image lazy-loaded and avoid loading a hidden desktop image.
  if (featureImage.getAttribute('src') === source) return;
  try {
    await preloadImage(source);
    if (request !== featureRequest || !feature.open || mobileQuery.matches) return;
    featureImage.src = source;
    featureImage.alt = feature.dataset.alt || '';
    if (featureCaption) featureCaption.textContent = feature.dataset.caption || '';
  } catch {
    // Keep the last complete image and caption if this asset is unavailable.
  }
}
features.forEach(feature => {
  feature.addEventListener('toggle', () => {
    if (!feature.open) return;
    features.forEach(other => { if (other !== feature) other.open = false; });
    syncFeatureImage(feature);
  });
});
mobileQuery.addEventListener('change', () => {
  syncFeatureImage(features.find(feature => feature.open));
});

// Gallery links still open the full image when JavaScript is disabled.
const gallery = [...document.querySelectorAll('[data-gallery]')];
const dialog = document.querySelector('#gallery-dialog');
let currentImage = 0;
let galleryTrigger;

function showImage(index) {
  currentImage = (index + gallery.length) % gallery.length;
  const link = gallery[currentImage];
  const image = link.querySelector('img');
  document.querySelector('#lightbox-image').src = link.href;
  document.querySelector('#lightbox-image').alt = image.alt;
  document.querySelector('#lightbox-caption').textContent = image.alt;
  document.querySelector('#gallery-count').textContent = (currentImage + 1) + ' / ' + gallery.length;
}

if (dialog && typeof dialog.showModal === 'function') {
  gallery.forEach((link, index) => {
    link.addEventListener('click', event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      galleryTrigger = link;
      showImage(index);
      dialog.showModal();
      document.body.classList.add('modal-open');
      dialog.querySelector('.lightbox-close').focus();
    });
  });
  dialog.querySelector('.lightbox-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    if (!document.querySelector('dialog[open]')) document.body.classList.remove('modal-open');
    galleryTrigger?.focus({ preventScroll: true });
  });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  document.querySelector('#gallery-prev').addEventListener('click', () => showImage(currentImage - 1));
  document.querySelector('#gallery-next').addEventListener('click', () => showImage(currentImage + 1));
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      showImage(currentImage + (event.key === 'ArrowLeft' ? -1 : 1));
    }
  });
}

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
