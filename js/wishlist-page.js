/* GOL-STORE — strona ulubionych */

window.pageInit = function () {
  renderWishlistPage();
};

function renderWishlistPage() {
  const list = getWishlist().map(getProduct).filter(Boolean);
  const mount = qs("#wishlistMount");

  if (!list.length) {
    mount.innerHTML = `
      <div class="empty-state">
        ${ICONS.heart}
        <b>Lista ulubionych jest pusta</b>
        <p>Kliknij serduszko przy produkcie, aby zapisać go na później.</p>
        <a class="btn btn-primary" href="kategoria.html?cat=buty-pilkarskie">Przeglądaj produkty</a>
      </div>`;
    return;
  }

  mount.innerHTML = `<div class="product-grid" style="padding-bottom:50px">${list.map(productCard).join("")}</div>`;
  bindWishButtons(mount);
}

/* po usunięciu z ulubionych odśwież siatkę */
window.onWishChanged = renderWishlistPage;
