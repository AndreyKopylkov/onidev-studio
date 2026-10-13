const studio = window.STUDIO;
const grid = document.querySelector('#games-grid');
const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const safeUrl = value => /^(https:\/\/|assets\/)/.test(value) ? escapeHtml(value) : '';
const gameName = game => game.subtitle ? `${game.title}: ${game.subtitle}` : game.title;
grid.innerHTML = studio.games.map((game, i) => `<article class="game ${game.id}">
  <div class="game-meta"><span>${escapeHtml(game.category)}</span><span class="game-status">${escapeHtml(game.status)}</span></div>
  <h2>${game.id === 'moon' ? 'We Dig<span>the Moon</span>' : `${escapeHtml(game.title)}<span>${escapeHtml(game.subtitle)}</span>`}</h2>
  <div class="game-media"><img src="${safeUrl(game.cover)}" alt="${escapeHtml(gameName(game))}" fetchpriority="${i === 0 ? 'high' : 'auto'}">${game.trailer ? `<button class="media-action" data-trailer="${i}" aria-label="Play ${escapeHtml(game.title)} trailer"><span class="play-icon" aria-hidden="true">▶</span><span>Watch trailer<small>YouTube</small></span></button>` : `<button class="media-action" data-gallery="${i}" data-index="0"><span class="play-icon" aria-hidden="true">↗</span><span>Explore the Moon<small>Gameplay gallery</small></span></button>`}</div>
  <div class="screenshots">${game.screenshots.slice(0, 3).map((src, index) => `<button data-gallery="${i}" data-index="${index}" aria-label="Open ${escapeHtml(game.title)} screenshot ${index + 1}"><img src="${safeUrl(game.thumbnails?.[index] || src)}" alt="${escapeHtml(game.title)} gameplay screenshot ${index + 1}" loading="lazy">${game.screenshots.length > 3 && index === 2 ? `<span>+${game.screenshots.length - 3}</span>` : ''}</button>`).join('')}</div>
  <div class="game-links">${game.steam ? `<a class="button primary" href="${safeUrl(game.steam)}" target="_blank" rel="noopener noreferrer">Wishlist on Steam <span aria-hidden="true">↗</span></a>` : `<span class="development-label">More to come</span>`}${game.discord ? `<a class="button secondary" href="${safeUrl(game.discord)}" target="_blank" rel="noopener noreferrer">Discord <span aria-hidden="true">↗</span></a>` : ''}<a class="button secondary" href="${safeUrl(game.pressKit)}" download>Press kit <span aria-hidden="true">↓</span></a></div>
  <p class="game-description">${escapeHtml(game.description)}</p>
</article>`).join('');

document.querySelector('#year').textContent = new Date().getFullYear();
if (studio.email) {
  const email = document.createElement('a');
  email.className = 'contact-row';
  email.href = `mailto:${studio.email}`;
  email.innerHTML = `<span><small>CONTACT</small>${escapeHtml(studio.email)}</span><span aria-hidden="true">↗</span>`;
  document.querySelector('#contact-links').prepend(email);
}
studio.members.forEach(member => {
  const memberElement = document.createElement('div');
  memberElement.innerHTML = `<p class="member-name">${escapeHtml(member.name)}</p><p class="member-role">${escapeHtml(member.role)}</p>`;
  document.querySelector('#team-members').append(memberElement);
});

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
gallery.addEventListener('close', () => document.body.classList.remove('modal-open'));
gallery.addEventListener('click', event => {
  const r = gallery.getBoundingClientRect();
  if (event.target === gallery && (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom)) gallery.close();
});
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
document.querySelectorAll('[data-trailer]').forEach(button => button.addEventListener('click', () => {
  const game = studio.games[Number(button.dataset.trailer)];
  const id = youtubeId(game.trailer);
  if (!id) return;
  const frame = document.createElement('iframe');
  frame.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
  frame.title = `${gameName(game)} trailer`;
  frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
  frame.allowFullscreen = true;
  button.parentElement.replaceChildren(frame);
}));
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
