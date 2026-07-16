/* GOL-STORE — strona główna: hero slider, kafle kategorii, karuzele */

window.pageInit = function () {
  renderHero();
  renderCatTiles();
  renderCarousel("newProducts", PRODUCTS.filter((p) => p.badge === "NOWOŚĆ" || p.id % 3 === 0).slice(0, 10));
  renderCarousel("bestsellers", [...PRODUCTS].sort((a, b) => b.reviews - a.reviews).slice(0, 10));
  renderCarousel("saleProducts", PRODUCTS.filter((p) => p.oldPrice).sort((a, b) =>
    (1 - b.price / b.oldPrice) - (1 - a.price / a.oldPrice)).slice(0, 10));
  renderBrands();
};

/* ---------- hero slider ---------- */
let heroIndex = 0, heroTimer = null;

function renderHero() {
  const hero = qs("#hero");
  hero.innerHTML = `
    <div class="hero-track" id="heroTrack">
      ${HERO_SLIDES.map((s) => `
        <div class="hero-slide hero-theme-${s.theme}">
          <p class="hero-kicker">GOL-STORE • sklep piłkarski</p>
          <h2>${s.title}</h2>
          <p>${s.subtitle}</p>
          <a class="btn btn-primary" href="${s.link}">${s.cta}</a>
        </div>`).join("")}
    </div>
    <button class="hero-nav hero-prev" aria-label="Poprzedni slajd">${ICONS.chevron}</button>
    <button class="hero-nav hero-next" aria-label="Następny slajd">${ICONS.chevron}</button>
    <div class="hero-dots" id="heroDots">
      ${HERO_SLIDES.map((_, i) => `<button data-i="${i}" aria-label="Slajd ${i + 1}"></button>`).join("")}
    </div>`;

  qs(".hero-prev", hero).addEventListener("click", () => heroGo(heroIndex - 1));
  qs(".hero-next", hero).addEventListener("click", () => heroGo(heroIndex + 1));
  qsa("#heroDots button", hero).forEach((d) =>
    d.addEventListener("click", () => heroGo(Number(d.dataset.i))));
  hero.addEventListener("mouseenter", () => clearInterval(heroTimer));
  hero.addEventListener("mouseleave", heroAutoplay);
  heroGo(0);
  heroAutoplay();
}

function heroGo(i) {
  heroIndex = (i + HERO_SLIDES.length) % HERO_SLIDES.length;
  qs("#heroTrack").style.transform = `translateX(-${heroIndex * 100}%)`;
  qsa("#heroDots button").forEach((d, idx) => d.classList.toggle("active", idx === heroIndex));
}

function heroAutoplay() {
  clearInterval(heroTimer);
  heroTimer = setInterval(() => heroGo(heroIndex + 1), 5500);
}

/* ---------- kafle kategorii ---------- */
function renderCatTiles() {
  qs("#catTiles").innerHTML = CATEGORIES.map((c) => `
    <a class="cat-tile" href="kategoria.html?cat=${c.id}">
      <svg viewBox="0 0 24 24">${CAT_ICONS[c.icon] || CAT_ICONS.ball}</svg>
      ${c.name}
    </a>`).join("");
}

/* ---------- karuzele ---------- */
function renderCarousel(id, products) {
  const wrap = qs("#" + id);
  if (!wrap) return;
  wrap.innerHTML = `
    <div class="carousel-track">${products.map(productCard).join("")}</div>
    <button class="carousel-nav carousel-prev" aria-label="Przewiń w lewo">${ICONS.chevron}</button>
    <button class="carousel-nav carousel-next" aria-label="Przewiń w prawo">${ICONS.chevron}</button>`;
  const track = qs(".carousel-track", wrap);
  const step = () => track.clientWidth * 0.8;
  qs(".carousel-prev", wrap).addEventListener("click", () => track.scrollBy({ left: -step(), behavior: "smooth" }));
  qs(".carousel-next", wrap).addEventListener("click", () => track.scrollBy({ left: step(), behavior: "smooth" }));
  bindWishButtons(wrap);
}

/* ---------- marki ---------- */
function renderBrands() {
  qs("#brandStrip").innerHTML = BRANDS.map((b) =>
    `<a class="brand-tile" href="kategoria.html?brand=${encodeURIComponent(b)}">${b}</a>`).join("");
}

/* odśwież serduszka po zmianie ulubionych na innych kaflach */
window.onWishChanged = function () {
  const list = getWishlist();
  qsa(".wish-btn").forEach((b) => b.classList.toggle("active", list.includes(Number(b.dataset.id))));
};
