/* GOL-STORE — składanie zamówienia (demo, bez realnych płatności) */

const DELIVERY = [
  { id: "kurier", name: "Kurier", note: "dostawa 1–2 dni robocze", price: 12.99 },
  { id: "paczkomat", name: "Automat paczkowy", note: "dostawa 1–2 dni robocze", price: 9.99 },
  { id: "odbior", name: "Odbiór w sklepie", note: "gotowe tego samego dnia", price: 0 }
];
const PAYMENT = [
  { id: "blik", name: "BLIK", note: "kod z aplikacji bankowej" },
  { id: "karta", name: "Karta płatnicza", note: "Visa, Mastercard" },
  { id: "przelew", name: "Szybki przelew", note: "24 banki" },
  { id: "pobranie", name: "Za pobraniem", note: "+5,00 zł" }
];

window.pageInit = function () {
  const cart = getCart();
  const mount = qs("#checkoutMount");
  if (!cart.length) {
    mount.innerHTML = `
      <div class="empty-state">
        ${ICONS.cart}
        <b>Koszyk jest pusty</b>
        <p>Dodaj produkty, aby złożyć zamówienie.</p>
        <a class="btn btn-primary" href="index.html">Wróć do sklepu</a>
      </div>`;
    return;
  }
  renderCheckout();
};

function checkoutTotals(deliveryId, paymentId) {
  const subtotal = cartTotal();
  const promo = store.read("golstore_promo", null);
  const rate = promo && PROMO_CODES[promo] ? PROMO_CODES[promo] : 0;
  const discount = subtotal * rate;
  const after = subtotal - discount;
  const del = DELIVERY.find((d) => d.id === deliveryId) || DELIVERY[0];
  const shipping = after >= FREE_SHIPPING_FROM ? 0 : del.price;
  const cod = paymentId === "pobranie" ? 5 : 0;
  return { subtotal, promo, discount, shipping, cod, total: after + shipping + cod };
}

function renderCheckout() {
  const mount = qs("#checkoutMount");
  mount.innerHTML = `
  <form class="checkout" id="checkoutForm">
    <div class="checkout-steps">
      <div class="checkout-block">
        <h3><span class="step-no">1</span> Dane odbiorcy</h3>
        <div class="form-grid form">
          <label>Imię<input required name="fname" placeholder="Jan"></label>
          <label>Nazwisko<input required name="lname" placeholder="Kowalski"></label>
          <label class="full">E-mail<input required type="email" name="email" placeholder="jan@przyklad.pl"></label>
          <label>Telefon<input required type="tel" name="phone" pattern="[0-9+ ]{9,15}" placeholder="600 700 800"></label>
          <label>Kod pocztowy<input required name="zip" pattern="[0-9]{2}-[0-9]{3}" placeholder="00-001"></label>
          <label class="full">Ulica i numer<input required name="street" placeholder="ul. Sportowa 10/2"></label>
          <label class="full">Miasto<input required name="city" placeholder="Warszawa"></label>
        </div>
      </div>

      <div class="checkout-block">
        <h3><span class="step-no">2</span> Dostawa</h3>
        ${DELIVERY.map((d, i) => `
          <label class="radio-card">
            <input type="radio" name="delivery" value="${d.id}" ${i === 0 ? "checked" : ""}>
            <span style="flex:1"><b>${d.name}</b><span>${d.note}</span></span>
            <span class="price">${d.price === 0 ? "0,00 zł" : zl(d.price)}</span>
          </label>`).join("")}
      </div>

      <div class="checkout-block">
        <h3><span class="step-no">3</span> Płatność</h3>
        ${PAYMENT.map((p, i) => `
          <label class="radio-card">
            <input type="radio" name="payment" value="${p.id}" ${i === 0 ? "checked" : ""}>
            <span style="flex:1"><b>${p.name}</b><span>${p.note}</span></span>
          </label>`).join("")}
      </div>
    </div>

    <aside class="summary">
      <h3>Twoje zamówienie</h3>
      <div class="checkout-mini">
        ${getCart().map((i) => {
          const p = getProduct(i.id);
          if (!p) return "";
          return `
          <div class="mini-row">
            <span class="img">${productSVG(p)}</span>
            <span class="nm">${escapeHtml(p.name)}<br><small>rozm. ${escapeHtml(i.size)} × ${i.qty}</small></span>
            <b>${zl(p.price * i.qty)}</b>
          </div>`;
        }).join("")}
      </div>
      <div id="checkoutTotals"></div>
      <label class="filter-option" style="font-size:13px">
        <input type="checkbox" required> Akceptuję regulamin sklepu (demo)
      </label>
      <button class="btn btn-primary btn-block" type="submit" style="height:52px;font-size:16px">
        Zamawiam i płacę
      </button>
    </aside>
  </form>`;

  const refreshTotals = () => {
    const t = checkoutTotals(
      qs('input[name="delivery"]:checked').value,
      qs('input[name="payment"]:checked').value
    );
    qs("#checkoutTotals").innerHTML = `
      <div class="summary-row"><span>Produkty</span><span>${zl(t.subtotal)}</span></div>
      ${t.discount > 0 ? `<div class="summary-row"><span>Rabat (${t.promo})</span><span class="discount">−${zl(t.discount)}</span></div>` : ""}
      <div class="summary-row"><span>Dostawa</span>${t.shipping === 0 ? `<span class="free">Gratis</span>` : `<span>${zl(t.shipping)}</span>`}</div>
      ${t.cod ? `<div class="summary-row"><span>Pobranie</span><span>${zl(t.cod)}</span></div>` : ""}
      <div class="summary-row total"><span>Do zapłaty</span><span>${zl(t.total)}</span></div>`;
  };
  qsa('input[name="delivery"], input[name="payment"]').forEach((i) =>
    i.addEventListener("change", refreshTotals));
  refreshTotals();

  qs("#checkoutForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const orderNo = "GS/" + new Date().getFullYear() + "/" + String(Math.floor(1000 + Math.random() * 9000));
    setCart([]);
    store.write("golstore_promo", null);
    qs("#checkoutMount").innerHTML = `
      <div class="order-done">
        <div class="check">✓</div>
        <h1>Dziękujemy za zamówienie!</h1>
        <span class="order-no">Nr zamówienia: ${orderNo}</span>
        <p>To zamówienie demonstracyjne — żadna płatność nie została pobrana.
        Potwierdzenie w prawdziwym sklepie trafiłoby na Twój adres e-mail.</p>
        <a class="btn btn-primary" href="index.html">Wróć na stronę główną</a>
      </div>`;
    window.scrollTo({ top: 0 });
  });
}
