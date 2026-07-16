/* ============================================================
   GOL-STORE — wspólny silnik: nagłówek, stopka, koszyk,
   ulubione, wyszukiwarka, mega-menu, drawer koszyka, toasty
   ============================================================ */

/* ---------- pomocnicze ---------- */
const zl = (n) => n.toFixed(2).replace(".", ",") + " zł";
const qs = (sel, el) => (el || document).querySelector(sel);
const qsa = (sel, el) => Array.from((el || document).querySelectorAll(sel));
const getParam = (name) => new URLSearchParams(location.search).get(name);
const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (m) =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));

function getProduct(id) { return PRODUCTS.find((p) => p.id === Number(id)); }

/* ---------- stan: koszyk + ulubione (localStorage) ---------- */
const store = {
  read(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
  },
  write(key, val) { localStorage.setItem(key, JSON.stringify(val)); }
};

function getCart() { return store.read("golstore_cart", []); }
function setCart(cart) { store.write("golstore_cart", cart); updateHeaderCounts(); renderCartDrawer(); }
function cartCount() { return getCart().reduce((s, i) => s + i.qty, 0); }
function cartTotal() {
  return getCart().reduce((s, i) => {
    const p = getProduct(i.id);
    return p ? s + p.price * i.qty : s;
  }, 0);
}

function addToCart(id, size, qty) {
  const cart = getCart();
  const found = cart.find((i) => i.id === id && i.size === size);
  if (found) found.qty += qty || 1;
  else cart.push({ id, size, qty: qty || 1 });
  setCart(cart);
  const p = getProduct(id);
  toast(`Dodano do koszyka: ${p ? p.name : ""} (rozm. ${size})`, "cart");
  openCartDrawer();
}

function removeFromCart(id, size) {
  setCart(getCart().filter((i) => !(i.id === id && i.size === size)));
}

function changeQty(id, size, delta) {
  const cart = getCart();
  const item = cart.find((i) => i.id === id && i.size === size);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) return removeFromCart(id, size);
  setCart(cart);
}

function getWishlist() { return store.read("golstore_wishlist", []); }
function toggleWishlist(id) {
  let list = getWishlist();
  if (list.includes(id)) { list = list.filter((x) => x !== id); toast("Usunięto z ulubionych"); }
  else { list.push(id); toast("Dodano do ulubionych ♥"); }
  store.write("golstore_wishlist", list);
  updateHeaderCounts();
  qsa(`.wish-btn[data-id="${id}"]`).forEach((b) => b.classList.toggle("active", list.includes(id)));
}

/* ---------- ikony ---------- */
const ICONS = {
  search: `<svg viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/><path d="m20 20-3.5-3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  user: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="2"/><path d="M4 20c1.5-3.5 4.5-5 8-5s6.5 1.5 8 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  heart: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 20.5C7 16.5 3 13.3 3 9.3 3 6.4 5.2 4.5 7.8 4.5c1.6 0 3.2.8 4.2 2.2 1-1.4 2.6-2.2 4.2-2.2 2.6 0 4.8 1.9 4.8 4.8 0 4-4 7.2-9 11.2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>`,
  cart: `<svg viewBox="0 0 24 24" fill="none"><path d="M3 4h2.5l2.2 12.2A2 2 0 0 0 9.7 18H18a2 2 0 0 0 2-1.6L21.5 8H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="10" cy="21" r="1.4" fill="currentColor"/><circle cx="18" cy="21" r="1.4" fill="currentColor"/></svg>`,
  truck: `<svg viewBox="0 0 24 24" fill="none"><path d="M2 6h12v10H2zM14 9h4l3 3v4h-7" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="6" cy="18" r="2" stroke="currentColor" stroke-width="2"/><circle cx="17" cy="18" r="2" stroke="currentColor" stroke-width="2"/></svg>`,
  return: `<svg viewBox="0 0 24 24" fill="none"><path d="M4 10 8 6m-4 4 4 4m-4-4h11a5 5 0 0 1 0 10h-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 3 5 6v5c0 4.5 3 8.5 7 10 4-1.5 7-5.5 7-10V6l-7-3Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="m9 12 2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/><path d="M12 7v5l3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  star: `<svg viewBox="0 0 24 24"><path d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9Z" fill="currentColor"/></svg>`,
  menu: `<svg viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  close: `<svg viewBox="0 0 24 24" fill="none"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  chevron: `<svg viewBox="0 0 24 24" fill="none"><path d="m9 6 6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  trash: `<svg viewBox="0 0 24 24" fill="none"><path d="M4 7h16M9 7V5h6v2m-8 0 1 13h8l1-13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`
};

/* ---------- nagłówek ---------- */
function renderHeader() {
  const mount = qs("#site-header");
  if (!mount) return;
  mount.innerHTML = `
  <div class="topbar">
    <div class="container topbar-inner">
      <span>${ICONS.truck} Darmowa dostawa od ${zl(FREE_SHIPPING_FROM)}</span>
      <span>${ICONS.clock} Wysyłka w 24h</span>
      <span>${ICONS.return} 30 dni na zwrot</span>
      <span class="topbar-code">Kod <b>GOL10</b> = -10% na pierwsze zakupy</span>
    </div>
  </div>
  <header class="header">
    <div class="container header-inner">
      <button class="icon-btn mobile-menu-btn" id="mobileMenuBtn" aria-label="Menu">${ICONS.menu}</button>
      <a href="index.html" class="logo" aria-label="GOL-STORE — strona główna">
        <span class="logo-mark">G</span><span class="logo-text">GOL<span>-</span>STORE</span>
      </a>
      <div class="search-box" id="searchBox">
        <input type="search" id="searchInput" placeholder="Szukaj: korki, rękawice, piłki…" autocomplete="off" aria-label="Szukaj produktów">
        <button id="searchBtn" aria-label="Szukaj">${ICONS.search}</button>
        <div class="search-suggest" id="searchSuggest"></div>
      </div>
      <nav class="header-actions" aria-label="Konto i koszyk">
        <button class="header-action" id="accountBtn">
          ${ICONS.user}<span class="ha-label">Konto</span>
        </button>
        <a class="header-action" href="ulubione.html">
          ${ICONS.heart}<span class="ha-label">Ulubione</span>
          <span class="badge-count" id="wishCount" hidden></span>
        </a>
        <button class="header-action" id="cartBtn">
          ${ICONS.cart}<span class="ha-label">Koszyk</span>
          <span class="badge-count" id="cartCountBadge" hidden></span>
        </button>
      </nav>
    </div>
    <nav class="mainnav" id="mainNav" aria-label="Kategorie">
      <div class="container mainnav-inner">
        ${CATEGORIES.map((c) => `
          <div class="nav-item ${c.id === "wyprzedaz" ? "nav-sale" : ""}" data-cat="${c.id}">
            <a href="kategoria.html?cat=${c.id}">${c.name}</a>
            ${c.subs.length ? `
            <div class="megamenu">
              <div class="mega-col">
                <h4>${c.name}</h4>
                <a href="kategoria.html?cat=${c.id}" class="mega-all">Zobacz wszystko ${ICONS.chevron}</a>
                ${c.subs.map((s) => `<a href="kategoria.html?cat=${c.id}&sub=${s.id}">${s.name}</a>`).join("")}
              </div>
              <div class="mega-col">
                <h4>Popularne marki</h4>
                ${BRANDS.slice(0, 6).map((b) => `<a href="kategoria.html?cat=${c.id}&brand=${encodeURIComponent(b)}">${b}</a>`).join("")}
              </div>
              <div class="mega-promo">
                <div class="mega-promo-card">
                  <svg viewBox="0 0 24 24" width="38" height="38">${CAT_ICONS[c.icon] || CAT_ICONS.ball}</svg>
                  <p>Bestsellery w kategorii<br><b>${c.name}</b></p>
                  <a class="btn btn-sm" href="kategoria.html?cat=${c.id}&sort=popular">Sprawdź</a>
                </div>
              </div>
            </div>` : ""}
          </div>`).join("")}
      </div>
    </nav>
  </header>

  <div class="drawer-backdrop" id="drawerBackdrop"></div>

  <aside class="cart-drawer" id="cartDrawer" aria-label="Koszyk">
    <div class="cart-drawer-head">
      <h3>Twój koszyk</h3>
      <button class="icon-btn" id="cartDrawerClose" aria-label="Zamknij">${ICONS.close}</button>
    </div>
    <div class="cart-drawer-body" id="cartDrawerBody"></div>
    <div class="cart-drawer-foot" id="cartDrawerFoot"></div>
  </aside>

  <aside class="mobile-nav" id="mobileNav" aria-label="Menu mobilne">
    <div class="cart-drawer-head">
      <h3>Menu</h3>
      <button class="icon-btn" id="mobileNavClose" aria-label="Zamknij">${ICONS.close}</button>
    </div>
    <div class="mobile-nav-body">
      ${CATEGORIES.map((c) => `
        <details ${c.subs.length ? "" : "class='no-subs'"}>
          <summary><a href="kategoria.html?cat=${c.id}">${c.name}</a></summary>
          ${c.subs.map((s) => `<a class="mob-sub" href="kategoria.html?cat=${c.id}&sub=${s.id}">${s.name}</a>`).join("")}
        </details>`).join("")}
    </div>
  </aside>

  <div class="modal-backdrop" id="accountModalBackdrop">
    <div class="modal" role="dialog" aria-label="Logowanie">
      <button class="icon-btn modal-close" id="accountModalClose" aria-label="Zamknij">${ICONS.close}</button>
      <h3>Zaloguj się</h3>
      <p class="modal-sub">Zyskaj dostęp do historii zamówień i szybszych zakupów.</p>
      <form id="loginForm" class="form">
        <label>E-mail<input type="email" required placeholder="twoj@email.pl"></label>
        <label>Hasło<input type="password" required minlength="6" placeholder="••••••••"></label>
        <button class="btn btn-primary btn-block" type="submit">Zaloguj się</button>
      </form>
      <p class="modal-alt">Nie masz konta? <a href="#" id="registerLink">Zarejestruj się</a></p>
    </div>
  </div>

  <div class="toast-wrap" id="toastWrap"></div>`;

  initHeaderEvents();
  updateHeaderCounts();
  renderCartDrawer();
}

function updateHeaderCounts() {
  const cb = qs("#cartCountBadge"), wb = qs("#wishCount");
  if (cb) { const n = cartCount(); cb.textContent = n; cb.hidden = n === 0; }
  if (wb) { const n = getWishlist().length; wb.textContent = n; wb.hidden = n === 0; }
}

/* ---------- drawer koszyka ---------- */
function openCartDrawer() {
  qs("#cartDrawer")?.classList.add("open");
  qs("#drawerBackdrop")?.classList.add("show");
  document.body.classList.add("no-scroll");
}
function closeDrawers() {
  qsa(".cart-drawer, .mobile-nav").forEach((d) => d.classList.remove("open"));
  qs("#drawerBackdrop")?.classList.remove("show");
  document.body.classList.remove("no-scroll");
}

function renderCartDrawer() {
  const body = qs("#cartDrawerBody"), foot = qs("#cartDrawerFoot");
  if (!body || !foot) return;
  const cart = getCart();
  if (!cart.length) {
    body.innerHTML = `<div class="cart-empty">${ICONS.cart}<p>Twój koszyk jest pusty</p>
      <a class="btn btn-primary" href="kategoria.html?cat=buty-pilkarskie">Zacznij zakupy</a></div>`;
    foot.innerHTML = "";
    return;
  }
  body.innerHTML = cart.map((i) => {
    const p = getProduct(i.id);
    if (!p) return "";
    return `
    <div class="cart-row">
      <a href="produkt.html?id=${p.id}" class="cart-row-img">${productSVG(p)}</a>
      <div class="cart-row-info">
        <a href="produkt.html?id=${p.id}" class="cart-row-name">${escapeHtml(p.name)}</a>
        <span class="cart-row-meta">Rozmiar: ${escapeHtml(i.size)}</span>
        <div class="qty-ctrl">
          <button data-act="minus" data-id="${p.id}" data-size="${escapeHtml(i.size)}" aria-label="Zmniejsz">−</button>
          <span>${i.qty}</span>
          <button data-act="plus" data-id="${p.id}" data-size="${escapeHtml(i.size)}" aria-label="Zwiększ">+</button>
        </div>
      </div>
      <div class="cart-row-right">
        <span class="cart-row-price">${zl(p.price * i.qty)}</span>
        <button class="icon-btn cart-row-del" data-act="del" data-id="${p.id}" data-size="${escapeHtml(i.size)}" aria-label="Usuń">${ICONS.trash}</button>
      </div>
    </div>`;
  }).join("");

  const total = cartTotal();
  const missing = Math.max(0, FREE_SHIPPING_FROM - total);
  const pct = Math.min(100, (total / FREE_SHIPPING_FROM) * 100);
  foot.innerHTML = `
    <div class="ship-progress">
      <p>${missing > 0
        ? `Brakuje <b>${zl(missing)}</b> do darmowej dostawy`
        : `<b>Masz darmową dostawę! 🎉</b>`}</p>
      <div class="ship-bar"><div style="width:${pct}%"></div></div>
    </div>
    <div class="cart-drawer-total"><span>Razem</span><b>${zl(total)}</b></div>
    <a class="btn btn-primary btn-block" href="koszyk.html">Przejdź do koszyka</a>
    <a class="btn btn-dark btn-block" href="zamowienie.html">Do kasy</a>`;

  qsa("[data-act]", body).forEach((btn) => btn.addEventListener("click", () => {
    const { act, id, size } = btn.dataset;
    if (act === "del") removeFromCart(Number(id), size);
    else changeQty(Number(id), size, act === "plus" ? 1 : -1);
    if (typeof window.onCartChanged === "function") window.onCartChanged();
  }));
}

/* ---------- wyszukiwarka ---------- */
function initSearch() {
  const input = qs("#searchInput"), suggest = qs("#searchSuggest"), btn = qs("#searchBtn");
  if (!input) return;
  const go = () => {
    const v = input.value.trim();
    if (v) location.href = `kategoria.html?q=${encodeURIComponent(v)}`;
  };
  btn.addEventListener("click", go);
  input.addEventListener("keydown", (e) => { if (e.key === "Enter") go(); });
  input.addEventListener("input", () => {
    const v = input.value.trim().toLowerCase();
    if (v.length < 2) { suggest.classList.remove("show"); return; }
    const hits = PRODUCTS.filter((p) =>
      (p.name + " " + p.brand + " " + p.cat + " " + p.sub).toLowerCase().includes(v)).slice(0, 6);
    if (!hits.length) {
      suggest.innerHTML = `<div class="suggest-empty">Brak wyników dla „${escapeHtml(input.value.trim())}”</div>`;
    } else {
      suggest.innerHTML = hits.map((p) => `
        <a href="produkt.html?id=${p.id}" class="suggest-row">
          <span class="suggest-img">${productSVG(p)}</span>
          <span class="suggest-name">${escapeHtml(p.name)}</span>
          <span class="suggest-price">${zl(p.price)}</span>
        </a>`).join("") +
        `<button class="suggest-all" id="suggestAll">Pokaż wszystkie wyniki ${ICONS.chevron}</button>`;
      qs("#suggestAll", suggest)?.addEventListener("click", go);
    }
    suggest.classList.add("show");
  });
  document.addEventListener("click", (e) => {
    if (!qs("#searchBox").contains(e.target)) suggest.classList.remove("show");
  });
}

/* ---------- zdarzenia nagłówka ---------- */
function initHeaderEvents() {
  qs("#cartBtn")?.addEventListener("click", openCartDrawer);
  qs("#cartDrawerClose")?.addEventListener("click", closeDrawers);
  qs("#drawerBackdrop")?.addEventListener("click", closeDrawers);
  qs("#mobileMenuBtn")?.addEventListener("click", () => {
    qs("#mobileNav").classList.add("open");
    qs("#drawerBackdrop").classList.add("show");
    document.body.classList.add("no-scroll");
  });
  qs("#mobileNavClose")?.addEventListener("click", closeDrawers);

  const modal = qs("#accountModalBackdrop");
  qs("#accountBtn")?.addEventListener("click", () => modal.classList.add("show"));
  qs("#accountModalClose")?.addEventListener("click", () => modal.classList.remove("show"));
  modal?.addEventListener("click", (e) => { if (e.target === modal) modal.classList.remove("show"); });
  qs("#loginForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    modal.classList.remove("show");
    toast("Zalogowano (tryb demo)");
  });
  qs("#registerLink")?.addEventListener("click", (e) => {
    e.preventDefault();
    toast("Rejestracja dostępna w wersji demo po zalogowaniu");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { closeDrawers(); modal?.classList.remove("show"); }
  });

  initSearch();
}

/* ---------- stopka ---------- */
function renderFooter() {
  const mount = qs("#site-footer");
  if (!mount) return;
  mount.innerHTML = `
  <section class="benefits">
    <div class="container benefits-inner">
      <div class="benefit">${ICONS.truck}<div><b>Darmowa dostawa</b><span>dla zamówień od ${zl(FREE_SHIPPING_FROM)}</span></div></div>
      <div class="benefit">${ICONS.clock}<div><b>Wysyłka w 24h</b><span>zamów do 14:00</span></div></div>
      <div class="benefit">${ICONS.return}<div><b>30 dni na zwrot</b><span>bez podawania przyczyny</span></div></div>
      <div class="benefit">${ICONS.shield}<div><b>Bezpieczne płatności</b><span>BLIK, karta, przelew</span></div></div>
    </div>
  </section>
  <section class="newsletter">
    <div class="container newsletter-inner">
      <div>
        <h3>Zapisz się do newslettera</h3>
        <p>Odbierz kod <b>-15 zł</b> na pierwsze zakupy i bądź na bieżąco z premierami.</p>
      </div>
      <form id="newsletterForm" class="newsletter-form">
        <input type="email" required placeholder="Twój adres e-mail" aria-label="Adres e-mail">
        <button class="btn btn-primary" type="submit">Zapisz się</button>
      </form>
    </div>
  </section>
  <footer class="footer">
    <div class="container footer-cols">
      <div class="footer-col footer-brand">
        <a href="index.html" class="logo logo-footer"><span class="logo-mark">G</span><span class="logo-text">GOL<span>-</span>STORE</span></a>
        <p>Sklep piłkarski dla zawodników na każdym poziomie. Buty, odzież, sprzęt bramkarski i akcesoria treningowe.</p>
        <p class="footer-demo-note">Strona demonstracyjna — projekt edukacyjny. Produkty i ceny są fikcyjne.</p>
      </div>
      <div class="footer-col">
        <h4>Zakupy</h4>
        ${CATEGORIES.map((c) => `<a href="kategoria.html?cat=${c.id}">${c.name}</a>`).join("")}
      </div>
      <div class="footer-col">
        <h4>Pomoc</h4>
        <a href="#">Kontakt</a><a href="#">Dostawa i płatność</a><a href="#">Zwroty i reklamacje</a>
        <a href="#">Tabela rozmiarów</a><a href="#">Najczęstsze pytania</a>
      </div>
      <div class="footer-col">
        <h4>Informacje</h4>
        <a href="#">O sklepie</a><a href="#">Regulamin</a><a href="#">Polityka prywatności</a>
        <a href="#">Program lojalnościowy</a><a href="#">Współpraca B2B</a>
      </div>
      <div class="footer-col">
        <h4>Kontakt</h4>
        <a href="tel:+48123456789">+48 123 456 789</a>
        <a href="mailto:sklep@gol-store.demo">sklep@gol-store.demo</a>
        <p class="footer-hours">pon.–pt. 8:00–18:00<br>sob. 9:00–14:00</p>
      </div>
    </div>
    <div class="container footer-bottom">
      <span>© ${new Date().getFullYear()} GOL-STORE — demo edukacyjne</span>
      <div class="pay-badges"><span>BLIK</span><span>VISA</span><span>MC</span><span>P24</span></div>
    </div>
  </footer>`;

  qs("#newsletterForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    e.target.reset();
    toast("Dziękujemy! Kod rabatowy wysłaliśmy na Twój e-mail (demo)");
  });
}

/* ---------- toast ---------- */
function toast(msg) {
  const wrap = qs("#toastWrap");
  if (!wrap) return;
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = msg;
  wrap.appendChild(el);
  requestAnimationFrame(() => el.classList.add("show"));
  setTimeout(() => { el.classList.remove("show"); setTimeout(() => el.remove(), 300); }, 2600);
}

/* ---------- karta produktu (kafelek) ---------- */
function productCard(p) {
  const inWish = getWishlist().includes(p.id);
  const discount = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
  return `
  <article class="product-card">
    ${p.badge ? `<span class="p-badge ${/^-/.test(p.badge) ? "p-badge-sale" : ""}">${p.badge}</span>` : ""}
    <button class="wish-btn ${inWish ? "active" : ""}" data-id="${p.id}" aria-label="Dodaj do ulubionych">${ICONS.heart}</button>
    <a href="produkt.html?id=${p.id}" class="p-img">${productSVG(p)}</a>
    <div class="p-info">
      <span class="p-brand">${escapeHtml(p.brand)}</span>
      <a href="produkt.html?id=${p.id}" class="p-name">${escapeHtml(p.name)}</a>
      <div class="p-rating" title="${p.rating}/5 (${p.reviews} opinii)">
        ${ICONS.star}<span>${p.rating.toFixed(1)}</span><span class="p-reviews">(${p.reviews})</span>
      </div>
      <div class="p-price">
        <b>${zl(p.price)}</b>
        ${p.oldPrice ? `<s>${zl(p.oldPrice)}</s><em>-${discount}%</em>` : ""}
      </div>
    </div>
  </article>`;
}

function bindWishButtons(scope) {
  qsa(".wish-btn", scope).forEach((b) => {
    b.addEventListener("click", (e) => {
      e.preventDefault();
      toggleWishlist(Number(b.dataset.id));
      if (typeof window.onWishChanged === "function") window.onWishChanged();
    });
  });
}

/* ---------- start ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
  if (typeof window.pageInit === "function") window.pageInit();
});
