/* GOL-STORE — karta produktu */

let selectedSize = null;

const REVIEWERS = ["Marek W.", "Kasia T.", "Piotrek Z.", "Ania S.", "Tomek R.", "Bartek K."];
const REVIEW_TEXTS = [
  "Produkt zgodny z opisem, szybka dostawa. Polecam ten sklep!",
  "Jakość super, rozmiar zgodny z tabelą. Druga para/sztuka w mojej kolekcji.",
  "Używam od miesiąca na treningach — trzyma się świetnie.",
  "Dobra cena w porównaniu z konkurencją. Wysyłka faktycznie w 24h.",
  "Kupione dla syna do klubu, jest bardzo zadowolony.",
  "Solidne wykonanie, niczego nie brakuje. Na pewno wrócę po więcej."
];

window.pageInit = function () {
  const p = getProduct(getParam("id"));
  if (!p) {
    qs("#productMount").innerHTML = `
      <div class="empty-state">
        ${ICONS.search}
        <b>Nie znaleziono produktu</b>
        <p>Produkt mógł zostać wycofany z oferty.</p>
        <a class="btn btn-primary" href="index.html">Wróć na stronę główną</a>
      </div>`;
    return;
  }
  renderProduct(p);
  rememberViewed(p.id);
  renderRelated(p);
  renderRecentlyViewed(p.id);
};

/* ---------- ostatnio oglądane ---------- */
function rememberViewed(id) {
  let viewed = store.read("golstore_viewed", []).filter((x) => x !== id);
  viewed.unshift(id);
  store.write("golstore_viewed", viewed.slice(0, 8));
}

function renderRecentlyViewed(currentId) {
  const viewed = store.read("golstore_viewed", [])
    .filter((x) => x !== currentId).map(getProduct).filter(Boolean);
  const section = qs("#recentSection");
  if (!section || !viewed.length) return;
  section.hidden = false;
  const wrap = qs("#recentCarousel");
  wrap.innerHTML = `
    <div class="carousel-track">${viewed.map(productCard).join("")}</div>`;
  bindWishButtons(wrap);
}

function starsHtml(rating) {
  return Array.from({ length: 5 }, (_, i) =>
    `<svg viewBox="0 0 24 24" class="${i < Math.round(rating) ? "" : "off"}"><path d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9Z" fill="currentColor"/></svg>`).join("");
}

function renderProduct(p) {
  const cat = CATEGORIES.find((c) => c.id === p.cat);
  const sub = cat?.subs.find((s) => s.id === p.sub);
  const discount = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
  const inWish = getWishlist().includes(p.id);
  document.title = `${p.name} | GOL-STORE`;

  qs("#breadcrumbs").innerHTML = `
    <a href="index.html">Strona główna</a><span>/</span>
    ${cat ? `<a href="kategoria.html?cat=${cat.id}">${cat.name}</a><span>/</span>` : ""}
    ${sub ? `<a href="kategoria.html?cat=${cat.id}&sub=${sub.id}">${sub.name}</a><span>/</span>` : ""}
    ${escapeHtml(p.name)}`;

  /* warianty kolorystyczne do miniatur galerii */
  const variants = [
    p.img,
    { c1: p.img.c2, c2: p.img.c1, c3: p.img.c3 },
    { c1: p.img.c3, c2: p.img.c1, c3: p.img.c2 },
    { c1: p.img.c1, c2: p.img.c3, c3: p.img.c2 }
  ];
  let currentVariant = 0;

  qs("#productMount").innerHTML = `
  <div class="product-page">
    <div class="gallery">
      <div class="gallery-main" id="galleryMain">
        <div class="gallery-zoom" id="galleryZoom">${productSVG(p)}</div>
        <span class="gallery-hint">${ICONS.search} Najedź, aby przybliżyć</span>
      </div>
      <p class="gallery-label">Wersje kolorystyczne i ujęcia:</p>
      <div class="gallery-thumbs">
        ${variants.map((v, i) => `
          <button class="gallery-thumb ${i === 0 ? "active" : ""}" data-v="${i}" aria-label="Wariant ${i + 1}">
            ${productSVG({ ...p, img: v })}
          </button>`).join("")}
        <button class="gallery-thumb" data-v="alt" aria-label="Inne ujęcie">
          ${productSVGAlt(p)}
        </button>
      </div>
    </div>

    <div class="pp-details">
      <span class="pp-brand">${escapeHtml(p.brand)}</span>
      <h1 class="pp-title">${escapeHtml(p.name)}</h1>
      <div class="pp-rating">
        <span class="stars">${starsHtml(p.rating)}</span>
        <b>${p.rating.toFixed(1)}</b>
        <a href="#tab-reviews" id="goReviews">(${p.reviews} opinii)</a>
      </div>

      <div class="pp-price">
        <b>${zl(p.price)}</b>
        ${p.oldPrice ? `<s>${zl(p.oldPrice)}</s><em>-${discount}%</em>` : ""}
      </div>
      ${p.oldPrice ? `<p class="pp-lowest">Najniższa cena z 30 dni przed obniżką: ${zl(p.oldPrice)}</p>`
                   : `<p class="pp-lowest">Cena regularna</p>`}

      <div class="size-head">
        <h4>Wybierz rozmiar</h4>
        <a href="#" id="sizeTableLink">Tabela rozmiarów</a>
      </div>
      <div class="size-grid" id="sizeGrid">
        ${p.sizes.map((s) => `<button class="size-btn" data-size="${escapeHtml(s)}">${escapeHtml(s)}</button>`).join("")}
      </div>
      <p class="size-error" id="sizeError"></p>

      ${p.sub === "koszulki" ? `
      <div class="pers-box" id="persBox">
        <label class="filter-option pers-toggle">
          <input type="checkbox" id="persToggle">
          <b>Dodaj nadruk nazwiska i numeru</b>
          <span class="cnt">+${zl(PERS_PRICE)}</span>
        </label>
        <div class="pers-fields" id="persFields" hidden>
          <input id="persName" maxlength="14" placeholder="NAZWISKO" aria-label="Nazwisko na koszulce">
          <input id="persNumber" maxlength="2" inputmode="numeric" pattern="[0-9]*" placeholder="Nr" aria-label="Numer na koszulce">
        </div>
      </div>` : ""}

      <div class="pp-actions">
        <button class="btn btn-primary" id="addToCartBtn">${ICONS.cart} Dodaj do koszyka</button>
        <button class="pp-wish ${inWish ? "active" : ""}" id="ppWish" aria-label="Dodaj do ulubionych">${ICONS.heart}</button>
      </div>

      <div class="pp-perks">
        <div class="pp-perk">${ICONS.truck} Darmowa dostawa od ${zl(FREE_SHIPPING_FROM)} — wysyłka w 24h</div>
        <div class="pp-perk">${ICONS.return} 30 dni na darmowy zwrot</div>
        <div class="pp-perk">${ICONS.shield} Gwarancja oryginalności i bezpieczne płatności</div>
      </div>

      <div class="pp-tabs" role="tablist">
        <button class="pp-tab active" data-tab="desc">Opis</button>
        <button class="pp-tab" data-tab="spec">Specyfikacja</button>
        <button class="pp-tab" data-tab="reviews" id="tab-reviews">Opinie (${p.reviews})</button>
      </div>
      <div class="pp-tab-panel active" data-panel="desc">
        <p>${escapeHtml(p.desc)}</p>
        <br>
        <p>Model z kolekcji ${escapeHtml(p.brand)} przygotowany z myślą o zawodnikach oczekujących
        niezawodności w każdych warunkach. Produkt objęty jest pełną gwarancją producenta,
        a w razie nietrafionego rozmiaru masz 30 dni na bezpłatny zwrot lub wymianę.</p>
      </div>
      <div class="pp-tab-panel" data-panel="spec">
        <table class="spec-table">
          <tr><td>Marka</td><td>${escapeHtml(p.brand)}</td></tr>
          <tr><td>Kategoria</td><td>${sub ? sub.name : (cat ? cat.name : "—")}</td></tr>
          <tr><td>Dostępne rozmiary</td><td>${p.sizes.join(", ")}</td></tr>
          <tr><td>Kod produktu</td><td>GS-${String(p.id).padStart(5, "0")}</td></tr>
          <tr><td>Ocena klientów</td><td>${p.rating.toFixed(1)} / 5 (${p.reviews} opinii)</td></tr>
        </table>
      </div>
      <div class="pp-tab-panel" data-panel="reviews">
        ${Array.from({ length: 3 }, (_, i) => {
          const stars = Math.max(3, Math.round(p.rating) - (i === 2 ? 1 : 0));
          return `
          <div class="review">
            <div class="review-head">
              <b>${REVIEWERS[(p.id + i) % REVIEWERS.length]}</b>
              <span class="stars">${starsHtml(stars)}</span>
              <span class="review-date">${10 + ((p.id * 3 + i * 7) % 18)}.0${1 + ((p.id + i) % 6)}.2026</span>
            </div>
            <p>${REVIEW_TEXTS[(p.id + i * 2) % REVIEW_TEXTS.length]}</p>
          </div>`;
        }).join("")}
      </div>
    </div>
  </div>`;

  /* galeria: przełączanie wariantów z cross-fade */
  qsa(".gallery-thumb").forEach((t) => t.addEventListener("click", () => {
    qsa(".gallery-thumb").forEach((x) => x.classList.remove("active"));
    t.classList.add("active");
    const zoomEl = qs("#galleryZoom");
    zoomEl.classList.add("switching");
    setTimeout(() => {
      if (t.dataset.v === "alt") {
        zoomEl.innerHTML = productSVGAlt({ ...p, img: variants[currentVariant] });
      } else {
        currentVariant = Number(t.dataset.v);
        zoomEl.innerHTML = productSVG({ ...p, img: variants[currentVariant] });
      }
      zoomEl.classList.remove("switching");
    }, 160);
  }));

  /* galeria: zoom podążający za kursorem */
  const galleryMain = qs("#galleryMain");
  const zoomEl = qs("#galleryZoom");
  galleryMain.addEventListener("mousemove", (e) => {
    const r = galleryMain.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    zoomEl.style.transformOrigin = `${x}% ${y}%`;
  });
  galleryMain.addEventListener("mouseenter", () => zoomEl.classList.add("zoomed"));
  galleryMain.addEventListener("mouseleave", () => zoomEl.classList.remove("zoomed"));

  /* rozmiary — przy jednym dostępnym rozmiarze zaznacz go od razu */
  qsa(".size-btn").forEach((b) => b.addEventListener("click", () => {
    qsa(".size-btn").forEach((x) => x.classList.remove("active"));
    b.classList.add("active");
    selectedSize = b.dataset.size;
    qs("#sizeError").textContent = "";
  }));
  if (p.sizes.length === 1) {
    selectedSize = p.sizes[0];
    qs(".size-btn").classList.add("active");
  }

  /* personalizacja (koszulki) */
  qs("#persToggle")?.addEventListener("change", (e) => {
    qs("#persFields").hidden = !e.target.checked;
  });

  /* koszyk */
  qs("#addToCartBtn").addEventListener("click", () => {
    if (!selectedSize) {
      qs("#sizeError").textContent = "Wybierz rozmiar, aby dodać produkt do koszyka.";
      qs("#sizeGrid").scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    let pers = null;
    if (qs("#persToggle")?.checked) {
      const name = qs("#persName").value.trim().toUpperCase();
      const number = qs("#persNumber").value.trim();
      if (!name && !number) {
        toast("Uzupełnij nazwisko lub numer nadruku");
        return;
      }
      pers = { name, number };
    }
    addToCart(p.id, selectedSize, 1, pers, qs("#galleryMain"));
  });

  /* sticky pasek zakupu, gdy główny przycisk zniknie z ekranu */
  initStickyBar(p);

  /* ulubione */
  qs("#ppWish").addEventListener("click", () => {
    toggleWishlist(p.id);
    qs("#ppWish").classList.toggle("active", getWishlist().includes(p.id));
  });

  /* zakładki */
  qsa(".pp-tab").forEach((t) => t.addEventListener("click", () => {
    qsa(".pp-tab").forEach((x) => x.classList.remove("active"));
    qsa(".pp-tab-panel").forEach((x) => x.classList.remove("active"));
    t.classList.add("active");
    qs(`.pp-tab-panel[data-panel="${t.dataset.tab}"]`).classList.add("active");
  }));
  qs("#goReviews").addEventListener("click", (e) => {
    e.preventDefault();
    qs('.pp-tab[data-tab="reviews"]').click();
    qs(".pp-tabs").scrollIntoView({ behavior: "smooth" });
  });
  qs("#sizeTableLink").addEventListener("click", (e) => {
    e.preventDefault();
    qs("#sizeModalBackdrop").classList.add("show");
  });
}

/* ---------- sticky pasek zakupu ---------- */
function initStickyBar(p) {
  const bar = document.createElement("div");
  bar.className = "sticky-buy";
  bar.innerHTML = `
    <div class="container sticky-buy-inner">
      <span class="sticky-buy-img">${productSVG(p)}</span>
      <div class="sticky-buy-info">
        <b>${escapeHtml(p.name)}</b>
        <span>${selectedSize ? "Rozmiar: " + escapeHtml(selectedSize) : "Wybierz rozmiar powyżej"}</span>
      </div>
      <b class="sticky-buy-price">${zl(p.price)}</b>
      <button class="btn btn-primary" id="stickyAddBtn">${ICONS.cart} Dodaj do koszyka</button>
    </div>`;
  document.body.appendChild(bar);

  const infoSpan = qs(".sticky-buy-info span", bar);
  qsa(".size-btn").forEach((b) => b.addEventListener("click", () => {
    infoSpan.textContent = "Rozmiar: " + b.dataset.size;
  }));
  if (selectedSize) infoSpan.textContent = "Rozmiar: " + selectedSize;

  qs("#stickyAddBtn", bar).addEventListener("click", () => qs("#addToCartBtn").click());

  const mainBtn = qs("#addToCartBtn");
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => bar.classList.toggle("show", !e.isIntersecting && e.boundingClientRect.top < 0));
  }, { threshold: 0 });
  obs.observe(mainBtn);
}

/* ---------- produkty powiązane ---------- */
function renderRelated(p) {
  const related = PRODUCTS
    .filter((x) => x.id !== p.id && (x.cat === p.cat || x.brand === p.brand))
    .sort((a, b) => (b.cat === p.cat ? 1 : 0) - (a.cat === p.cat ? 1 : 0) || b.reviews - a.reviews)
    .slice(0, 10);
  const wrap = qs("#relatedCarousel");
  wrap.innerHTML = `
    <div class="carousel-track">${related.map(productCard).join("")}</div>
    <button class="carousel-nav carousel-prev" aria-label="Przewiń w lewo">${ICONS.chevron}</button>
    <button class="carousel-nav carousel-next" aria-label="Przewiń w prawo">${ICONS.chevron}</button>`;
  const track = qs(".carousel-track", wrap);
  qs(".carousel-prev", wrap).addEventListener("click", () => track.scrollBy({ left: -track.clientWidth * .8, behavior: "smooth" }));
  qs(".carousel-next", wrap).addEventListener("click", () => track.scrollBy({ left: track.clientWidth * .8, behavior: "smooth" }));
  bindWishButtons(wrap);
}

window.onWishChanged = function () {
  const list = getWishlist();
  qsa(".wish-btn").forEach((b) => b.classList.toggle("active", list.includes(Number(b.dataset.id))));
};
