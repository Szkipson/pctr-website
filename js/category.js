/* GOL-STORE — listing kategorii: filtry, sortowanie, paginacja */

const PER_PAGE = 12;

const state = {
  cat: getParam("cat") || null,
  sub: getParam("sub") || null,
  q: (getParam("q") || "").trim(),
  brands: getParam("brand") ? [getParam("brand")] : [],
  sizes: [],
  priceMin: null,
  priceMax: null,
  onSale: getParam("cat") === "wyprzedaz",
  sort: getParam("sort") || "popular",
  page: 1,
  collapsed: new Set()
};

window.pageInit = function () {
  renderListing();
  qs("#mobileFiltersBtn")?.addEventListener("click", () => qs("#filters").classList.add("open"));
};

/* ---------- filtrowanie ---------- */
function baseProducts() {
  let list = PRODUCTS;
  if (state.cat && state.cat !== "wyprzedaz") list = list.filter((p) => p.cat === state.cat);
  if (state.cat === "wyprzedaz") list = list.filter((p) => p.oldPrice);
  if (state.sub) list = list.filter((p) => p.sub === state.sub);
  if (state.q) {
    const q = state.q.toLowerCase();
    list = list.filter((p) => (p.name + " " + p.brand + " " + p.cat + " " + p.sub + " " + p.desc).toLowerCase().includes(q));
  }
  return list;
}

function filteredProducts() {
  let list = baseProducts();
  if (state.brands.length) list = list.filter((p) => state.brands.includes(p.brand));
  if (state.sizes.length) list = list.filter((p) => p.sizes.some((s) => state.sizes.includes(s)));
  if (state.priceMin != null) list = list.filter((p) => p.price >= state.priceMin);
  if (state.priceMax != null) list = list.filter((p) => p.price <= state.priceMax);
  if (state.onSale && state.cat !== "wyprzedaz") list = list.filter((p) => p.oldPrice);

  switch (state.sort) {
    case "price-asc": list = [...list].sort((a, b) => a.price - b.price); break;
    case "price-desc": list = [...list].sort((a, b) => b.price - a.price); break;
    case "name": list = [...list].sort((a, b) => a.name.localeCompare(b.name, "pl")); break;
    case "discount": list = [...list].sort((a, b) =>
      (b.oldPrice ? 1 - b.price / b.oldPrice : 0) - (a.oldPrice ? 1 - a.price / a.oldPrice : 0)); break;
    default: list = [...list].sort((a, b) => b.reviews - a.reviews);
  }
  return list;
}

/* ---------- nagłówek listingu ---------- */
function listingTitle() {
  if (state.q) return `Wyniki wyszukiwania: „${escapeHtml(state.q)}”`;
  const cat = CATEGORIES.find((c) => c.id === state.cat);
  if (!cat) return "Wszystkie produkty";
  if (state.sub) {
    const sub = cat.subs.find((s) => s.id === state.sub);
    if (sub) return sub.name;
  }
  return cat.name;
}

/* ---------- render ---------- */
function renderListing() {
  const list = filteredProducts();
  const pages = Math.max(1, Math.ceil(list.length / PER_PAGE));
  state.page = Math.min(state.page, pages);
  const pageItems = list.slice((state.page - 1) * PER_PAGE, state.page * PER_PAGE);

  const cat = CATEGORIES.find((c) => c.id === state.cat);
  qs("#breadcrumbs").innerHTML = `
    <a href="index.html">Strona główna</a>
    ${cat ? `<span>/</span><a href="kategoria.html?cat=${cat.id}">${cat.name}</a>` : ""}
    ${state.sub && cat ? `<span>/</span>${escapeHtml(listingTitle())}` : ""}
    ${state.q ? `<span>/</span>Szukaj` : ""}`;

  qs("#listingTitle").textContent = listingTitle();
  document.title = `${listingTitle()} | GOL-STORE`;
  qs("#listingCount").textContent = `${list.length} ${plural(list.length, "produkt", "produkty", "produktów")}`;

  renderFilters();
  renderActiveChips();

  const grid = qs("#productGrid");
  grid.innerHTML = pageItems.length
    ? pageItems.map(productCard).join("")
    : `<div class="no-results">
        ${ICONS.search}
        <b>Brak produktów spełniających kryteria</b>
        <p>Zmień filtry lub wyszukaj inną frazę.</p>
        <button class="btn btn-primary" onclick="clearFilters()">Wyczyść filtry</button>
      </div>`;
  /* kaskadowe wejście kart po każdej zmianie filtrów */
  qsa(".product-card", grid).forEach((card, i) => {
    card.classList.add("grid-in");
    card.style.animationDelay = Math.min(i * 45, 400) + "ms";
  });
  bindWishButtons(grid);

  const pag = qs("#pagination");
  if (pages <= 1) pag.innerHTML = "";
  else {
    pag.innerHTML = `
      <button ${state.page === 1 ? "disabled" : ""} data-p="${state.page - 1}">‹</button>
      ${Array.from({ length: pages }, (_, i) =>
        `<button class="${i + 1 === state.page ? "active" : ""}" data-p="${i + 1}">${i + 1}</button>`).join("")}
      <button ${state.page === pages ? "disabled" : ""} data-p="${state.page + 1}">›</button>`;
    qsa("button[data-p]", pag).forEach((b) => b.addEventListener("click", () => {
      state.page = Number(b.dataset.p);
      renderListing();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }));
  }

  const sortSel = qs("#sortSelect");
  sortSel.value = state.sort;
  sortSel.onchange = () => { state.sort = sortSel.value; state.page = 1; renderListing(); };
}

function plural(n, one, few, many) {
  if (n === 1) return one;
  if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14)) return few;
  return many;
}

/* ---------- panel filtrów ---------- */
function filterGroup(name, inner) {
  const collapsed = state.collapsed.has(name);
  return `
  <div class="filter-group ${collapsed ? "collapsed" : ""}">
    <button class="fg-head" data-group="${name}" type="button" aria-expanded="${!collapsed}">
      <h4>${name}</h4>
      <span class="fg-arrow">${ICONS.chevron}</span>
    </button>
    <div class="fg-body"><div>${inner}</div></div>
  </div>`;
}

function renderFilters() {
  const base = baseProducts();
  const brandCounts = {};
  base.forEach((p) => { brandCounts[p.brand] = (brandCounts[p.brand] || 0) + 1; });
  const sizeSet = [...new Set(base.flatMap((p) => p.sizes))]
    .sort((a, b) => (parseFloat(a) || 999) - (parseFloat(b) || 999) || a.localeCompare(b));

  const cat = CATEGORIES.find((c) => c.id === state.cat);

  qs("#filters").innerHTML = `
    <div class="filters-head">
      <h3>Filtry</h3>
      <div>
        <button class="filters-clear" onclick="clearFilters()">Wyczyść</button>
        <button class="icon-btn filters-close-mobile" onclick="document.getElementById('filters').classList.remove('open')" aria-label="Zamknij">${ICONS.close}</button>
      </div>
    </div>

    ${cat && cat.subs.length ? filterGroup("Kategoria", `
      ${cat.subs.map((s) => `
        <label class="filter-option">
          <input type="radio" name="subcat" value="${s.id}" ${state.sub === s.id ? "checked" : ""}>
          ${s.name}
          <span class="cnt">${PRODUCTS.filter((p) => p.sub === s.id).length}</span>
        </label>`).join("")}
      ${state.sub ? `<label class="filter-option"><input type="radio" name="subcat" value="">Wszystkie</label>` : ""}`) : ""}

    ${filterGroup("Marka", Object.keys(brandCounts).sort().map((b) => `
      <label class="filter-option">
        <input type="checkbox" name="brand" value="${escapeHtml(b)}" ${state.brands.includes(b) ? "checked" : ""}>
        ${escapeHtml(b)}
        <span class="cnt">${brandCounts[b]}</span>
      </label>`).join("") || `<p class="cnt">Brak marek</p>`)}

    ${sizeSet.length > 1 ? filterGroup("Rozmiar", sizeSet.map((s) => `
      <label class="filter-option">
        <input type="checkbox" name="size" value="${escapeHtml(s)}" ${state.sizes.includes(s) ? "checked" : ""}>
        ${escapeHtml(s)}
      </label>`).join("")) : ""}

    ${filterGroup("Cena", `
      <div class="price-inputs">
        <input type="number" id="priceMin" placeholder="od" min="0" value="${state.priceMin ?? ""}">
        <span>–</span>
        <input type="number" id="priceMax" placeholder="do" min="0" value="${state.priceMax ?? ""}">
        <button class="btn btn-sm btn-dark" id="priceApply">OK</button>
      </div>`)}

    <div class="filter-group">
      <div class="fg-body"><div>
        <label class="filter-option">
          <input type="checkbox" id="onSale" ${state.onSale ? "checked" : ""} ${state.cat === "wyprzedaz" ? "disabled" : ""}>
          Tylko przecenione
        </label>
      </div></div>
    </div>`;

  /* zwijanie grup z animacją */
  qsa(".fg-head", qs("#filters")).forEach((h) => h.addEventListener("click", () => {
    const name = h.dataset.group;
    if (state.collapsed.has(name)) state.collapsed.delete(name);
    else state.collapsed.add(name);
    h.closest(".filter-group").classList.toggle("collapsed", state.collapsed.has(name));
  }));

  qsa('input[name="brand"]').forEach((i) => i.addEventListener("change", () => {
    state.brands = qsa('input[name="brand"]:checked').map((x) => x.value);
    state.page = 1; renderListing();
  }));
  qsa('input[name="size"]').forEach((i) => i.addEventListener("change", () => {
    state.sizes = qsa('input[name="size"]:checked').map((x) => x.value);
    state.page = 1; renderListing();
  }));
  qsa('input[name="subcat"]').forEach((i) => i.addEventListener("change", () => {
    state.sub = i.value || null;
    state.sizes = []; state.page = 1; renderListing();
  }));
  qs("#priceApply")?.addEventListener("click", applyPrice);
  qsa("#priceMin, #priceMax").forEach((i) =>
    i.addEventListener("keydown", (e) => { if (e.key === "Enter") applyPrice(); }));
  qs("#onSale")?.addEventListener("change", (e) => {
    state.onSale = e.target.checked; state.page = 1; renderListing();
  });
}

function applyPrice() {
  const min = qs("#priceMin").value, max = qs("#priceMax").value;
  state.priceMin = min === "" ? null : Number(min);
  state.priceMax = max === "" ? null : Number(max);
  state.page = 1;
  renderListing();
}

/* ---------- chipy aktywnych filtrów ---------- */
function renderActiveChips() {
  const chips = [];
  state.brands.forEach((b) => chips.push({ label: b, un: () => { state.brands = state.brands.filter((x) => x !== b); } }));
  state.sizes.forEach((s) => chips.push({ label: "Rozmiar " + s, un: () => { state.sizes = state.sizes.filter((x) => x !== s); } }));
  if (state.priceMin != null) chips.push({ label: "od " + zl(state.priceMin), un: () => { state.priceMin = null; } });
  if (state.priceMax != null) chips.push({ label: "do " + zl(state.priceMax), un: () => { state.priceMax = null; } });
  if (state.onSale && state.cat !== "wyprzedaz") chips.push({ label: "Przecenione", un: () => { state.onSale = false; } });
  if (state.q) chips.push({ label: "„" + state.q + "”", un: () => { state.q = ""; } });

  const wrap = qs("#activeFilters");
  wrap.innerHTML = chips.map((c, i) =>
    `<span class="chip">${escapeHtml(c.label)}<button data-chip="${i}" aria-label="Usuń filtr">×</button></span>`).join("");
  qsa("[data-chip]", wrap).forEach((b) => b.addEventListener("click", () => {
    chips[Number(b.dataset.chip)].un();
    state.page = 1;
    renderListing();
  }));
}

function clearFilters() {
  state.brands = []; state.sizes = [];
  state.priceMin = null; state.priceMax = null;
  state.onSale = state.cat === "wyprzedaz";
  state.q = ""; state.page = 1;
  renderListing();
}

window.onWishChanged = function () {
  const list = getWishlist();
  qsa(".wish-btn").forEach((b) => b.classList.toggle("active", list.includes(Number(b.dataset.id))));
};
