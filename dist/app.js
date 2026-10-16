const studio = window.STUDIO;
const grid = document.querySelector('#games-grid');
const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const safeUrl = value => /^(https:\/\/|assets\/)/.test(value) ? escapeHtml(value) : '';
const gameName = game => game.subtitle ? `${game.title}: ${game.subtitle}` : game.title;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const pressKitLink = game => /^https:/.test(game.pressKit)
  ? `<a class="button secondary" href="${safeUrl(game.pressKit)}" target="_blank" rel="noopener noreferrer">Press kit <span aria-hidden="true">↗</span></a>`
  : `<a class="button secondary" href="${safeUrl(game.pressKit)}" download>Press kit <span aria-hidden="true">↓</span></a>`;
grid.innerHTML = studio.games.map((game, i) => `<article class="game ${game.id}">
  <div class="game-media"><img src="${safeUrl(game.cover)}" alt="${escapeHtml(gameName(game))}" loading="lazy">${game.trailer ? `<button class="media-action" data-trailer="${i}" aria-label="Play ${escapeHtml(game.title)} trailer"><span class="play-icon" aria-hidden="true">▶</span><span>Watch trailer<small>YouTube</small></span></button>` : ''}</div>
  <div class="game-body">
    <div class="game-meta"><span>${escapeHtml(game.category)}</span><span class="game-status">${escapeHtml(game.status)}</span></div>
    <h3>${escapeHtml(game.title)}${game.subtitle ? `<span>${escapeHtml(game.subtitle)}</span>` : ''}</h3>
    <p class="game-description">${escapeHtml(game.description)}</p>
    <div class="screenshots">${game.screenshots.slice(0, 3).map((src, index) => `<button data-gallery="${i}" data-index="${index}" aria-label="Open ${escapeHtml(game.title)} screenshot ${index + 1}"><img src="${safeUrl(game.thumbnails?.[index] || src)}" alt="${escapeHtml(game.title)} gameplay screenshot ${index + 1}" loading="lazy">${game.screenshots.length > 3 && index === 2 ? `<span>+${game.screenshots.length - 3}</span>` : ''}</button>`).join('')}</div>
    <div class="game-links"><a class="button primary" href="${safeUrl(game.steam)}" target="_blank" rel="noopener noreferrer">Wishlist on Steam <span aria-hidden="true">↗</span></a>${game.discord ? `<a class="button secondary" href="${safeUrl(game.discord)}" target="_blank" rel="noopener noreferrer">Discord <span aria-hidden="true">↗</span></a>` : ''}${pressKitLink(game)}</div>
  </div>
</article>`).join('');

document.querySelector('#year').textContent = new Date().getFullYear();
if (studio.email) {
  const email = document.createElement('a');
  email.className = 'contact-row';
  email.href = `mailto:${studio.email}`;
  email.innerHTML = `<span><small>Email</small>${escapeHtml(studio.email)}</span><span aria-hidden="true">↗</span>`;
  document.querySelector('#contact-links').prepend(email);
}
document.querySelector('#team-members').innerHTML = studio.members.map(member => `<article class="member-card">
  <img src="${safeUrl(member.photo)}" alt="${escapeHtml(member.name)}" width="512" height="512" loading="lazy">
  <div>
    <p class="member-name">${escapeHtml(member.name)}</p>
    ${member.handle ? `<p class="member-handle">@${escapeHtml(member.handle)}</p>` : ''}
    <p class="member-role">${escapeHtml(member.role)}</p>
    ${member.previousGames?.length ? `<p class="member-label">Previous games</p><ul class="previous-games">${member.previousGames.map(title => `<li>${escapeHtml(title)}</li>`).join('')}</ul>` : ''}
  </div>
</article>`).join('');

const gallery = document.querySelector('#gallery');
const galleryImage = document.querySelector('#gallery-image');
let selectedGame = 0;
let selectedImage = 0;
function renderImage() {
  const game = studio.games[selectedGame];
  galleryImage.src = game.screenshots[selectedImage];
  galleryImage.alt = `${gameName(game)} — gameplay screenshot ${selectedImage + 1}`;
  document.querySelector('#gallery-title').textContent = gameName(game);
  document.querySelector('#gallery-count').textContent = `${selectedImage + 1} / ${game.screenshots.length}`;
}
function changeImage(step) {
  selectedImage = (selectedImage + step + studio.games[selectedGame].screenshots.length) % studio.games[selectedGame].screenshots.length;
  renderImage();
}
function closeOnBackdrop(dialog) {
  dialog.addEventListener('click', event => {
    const r = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
}
document.querySelectorAll('[data-gallery]').forEach(button => button.addEventListener('click', () => {
  selectedGame = Number(button.dataset.gallery);
  selectedImage = Number(button.dataset.index);
  renderImage();
  gallery.showModal();
  document.body.classList.add('modal-open');
}));
document.querySelector('.gallery-prev').addEventListener('click', () => changeImage(-1));
document.querySelector('.gallery-next').addEventListener('click', () => changeImage(1));
document.querySelector('#gallery-close').addEventListener('click', () => gallery.close());
closeOnBackdrop(gallery);
gallery.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); changeImage(event.key === 'ArrowLeft' ? -1 : 1); }
});
let touchX = 0;
galleryImage.addEventListener('touchstart', event => { touchX = event.changedTouches[0].clientX; }, { passive: true });
galleryImage.addEventListener('touchend', event => {
  const difference = event.changedTouches[0].clientX - touchX;
  if (Math.abs(difference) > 45) changeImage(difference > 0 ? -1 : 1);
}, { passive: true });

function youtubeId(url) {
  try {
    const parsed = new URL(url);
    const id = parsed.hostname === 'youtu.be' ? parsed.pathname.slice(1) : parsed.searchParams.get('v');
    return /^[\w-]{11}$/.test(id || '') ? id : null;
  } catch { return null; }
}
function trailerFrame(game) {
  const id = youtubeId(game.trailer);
  if (!id) return null;
  const frame = document.createElement('iframe');
  frame.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
  frame.title = `${gameName(game)} trailer`;
  frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
  frame.allowFullscreen = true;
  return frame;
}
document.querySelectorAll('[data-trailer]').forEach(button => button.addEventListener('click', () => {
  const frame = trailerFrame(studio.games[Number(button.dataset.trailer)]);
  if (frame) button.parentElement.replaceChildren(frame);
}));

// Hero trailer plays in a modal; the iframe is removed on close to stop playback.
const trailer = document.querySelector('#trailer');
const trailerSlot = trailer.querySelector('.trailer-frame');
document.querySelectorAll('[data-trailer-modal]').forEach(button => button.addEventListener('click', () => {
  const frame = trailerFrame(studio.games[Number(button.dataset.trailerModal)]);
  if (!frame) return;
  trailerSlot.replaceChildren(frame);
  trailer.showModal();
  document.body.classList.add('modal-open');
}));
document.querySelector('#trailer-close').addEventListener('click', () => trailer.close());
closeOnBackdrop(trailer);
trailer.addEventListener('close', () => trailerSlot.replaceChildren());

// Parallax: layers drift with the pointer and scroll at their own depth.
const hero = document.querySelector('.hero');
const layers = [...hero.querySelectorAll('[data-depth]')];
let pointerX = 0, pointerY = 0, frameRequested = false;
function renderParallax() {
  frameRequested = false;
  const scroll = Math.min(window.scrollY, hero.offsetHeight);
  layers.forEach(layer => {
    const depth = Number(layer.dataset.depth);
    layer.style.translate = `${(-pointerX * depth).toFixed(1)}px ${(-pointerY * depth * .6 + scroll * depth / 120).toFixed(1)}px`;
  });
}
function requestParallax() {
  if (reducedMotion.matches || frameRequested) return;
  frameRequested = true;
  requestAnimationFrame(renderParallax);
}
hero.addEventListener('pointermove', event => {
  if (event.pointerType !== 'mouse') return;
  pointerX = event.clientX / window.innerWidth - .5;
  pointerY = event.clientY / window.innerHeight - .5;
  requestParallax();
});
window.addEventListener('scroll', requestParallax, { passive: true });

const sections = document.querySelectorAll('main > section');
const navLinks = document.querySelectorAll('nav a');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) navLinks.forEach(link => {
    const active = link.hash === `#${entry.target.id}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
  }); });
}, { rootMargin: '-25% 0px -45% 0px', threshold: 0 });
sections.forEach(section => observer.observe(section));
