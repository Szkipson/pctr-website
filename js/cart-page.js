/* GOL-STORE — strona koszyka: pozycje, kod rabatowy, podsumowanie */

function getPromo() { return store.read("golstore_promo", null); }
function setPromo(code) { store.write("golstore_promo", code); }

function orderTotals() {
  const subtotal = cartTotal();
  const promo = getPromo();
  const discountRate = promo && PROMO_CODES[promo] ? PROMO_CODES[promo] : 0;
  const discount = subtotal * discountRate;
  const afterDiscount = subtotal - discount;
  const shipping = afterDiscount >= FREE_SHIPPING_FROM || subtotal === 0 ? 0 : SHIPPING_COST;
  return { subtotal, promo, discount, shipping, total: afterDiscount + shipping };
}

window.pageInit = function () {
  renderCartPage();
};

function renderCartPage() {
  const cart = getCart();
  const mount = qs("#cartMount");

  if (!cart.length) {
    mount.innerHTML = `
      <div class="empty-state">
        ${ICONS.cart}
        <b>Twój koszyk jest pusty</b>
        <p>Dodaj produkty, a pojawią się w tym miejscu.</p>
        <a class="btn btn-primary" href="kategoria.html?cat=buty-pilkarskie">Zacznij zakupy</a>
      </div>`;
    return;
  }

  const t = orderTotals();
  mount.innerHTML = `
  <div class="cart-page">
    <div class="cart-page-list">
      ${cart.map((i) => {
        const p = getProduct(i.id);
        if (!p) return "";
        const key = escapeHtml(lineKey(i));
        return `
        <div class="cart-line">
          <a class="cart-line-img" href="produkt.html?id=${p.id}">${productSVG(p)}</a>
          <div>
            <a class="cart-line-name" href="produkt.html?id=${p.id}">${escapeHtml(p.name)}</a>
            <p class="cart-line-meta">${escapeHtml(p.brand)} • Rozmiar: ${escapeHtml(i.size)} • ${zl(itemUnitPrice(i))}/szt.${i.pers ? "<br>" + escapeHtml(persLabel(i)) + " (+" + zl(PERS_PRICE) + ")" : ""}</p>
          </div>
          <div class="qty-ctrl">
            <button data-act="minus" data-key="${key}" aria-label="Zmniejsz">−</button>
            <span>${i.qty}</span>
            <button data-act="plus" data-key="${key}" aria-label="Zwiększ">+</button>
          </div>
          <span class="cart-line-price">${zl(itemUnitPrice(i) * i.qty)}</span>
          <button class="icon-btn cart-line-del" data-act="del" data-key="${key}" aria-label="Usuń">${ICONS.trash}</button>
        </div>`;
      }).join("")}
    </div>

    <aside class="summary">
      <h3>Podsumowanie</h3>
      <div class="summary-row"><span>Wartość produktów</span><span>${zl(t.subtotal)}</span></div>
      ${t.discount > 0 ? `<div class="summary-row"><span>Rabat (${t.promo})</span><span class="discount">−${zl(t.discount)}</span></div>` : ""}
      <div class="summary-row"><span>Dostawa</span>
        ${t.shipping === 0 ? `<span class="free">Gratis</span>` : `<span>${zl(t.shipping)}</span>`}
      </div>
      <div class="summary-row total"><span>Do zapłaty</span><span>${zl(t.total)}</span></div>

      ${t.promo
        ? `<div class="chip">Kod: ${escapeHtml(t.promo)} <button id="promoRemove" aria-label="Usuń kod">×</button></div>`
        : `<div class="promo-row">
            <input id="promoInput" placeholder="Kod rabatowy" aria-label="Kod rabatowy">
            <button class="btn btn-dark" id="promoApply">Dodaj</button>
          </div>
          <p class="promo-hint">Wypróbuj kod: GOL10</p>`}

      <a class="btn btn-primary btn-block" href="zamowienie.html">Przejdź do zamówienia</a>
      <a class="btn btn-block" href="index.html">Kontynuuj zakupy</a>
    </aside>
  </div>`;

  qsa("[data-act]", mount).forEach((btn) => btn.addEventListener("click", () => {
    const { act, key } = btn.dataset;
    if (act === "del") removeFromCart(key);
    else changeQty(key, act === "plus" ? 1 : -1);
    renderCartPage();
  }));

  qs("#promoApply")?.addEventListener("click", applyPromo);
  qs("#promoInput")?.addEventListener("keydown", (e) => { if (e.key === "Enter") applyPromo(); });
  qs("#promoRemove")?.addEventListener("click", () => { setPromo(null); renderCartPage(); });
}

function applyPromo() {
  const code = qs("#promoInput").value.trim().toUpperCase();
  if (!code) return;
  if (PROMO_CODES[code]) {
    setPromo(code);
    toast(`Kod ${code} aktywny: −${Math.round(PROMO_CODES[code] * 100)}%`);
  } else {
    toast("Nieprawidłowy kod rabatowy");
  }
  renderCartPage();
}

/* drawer koszyka też może zmienić stan */
window.onCartChanged = renderCartPage;
