// js/main.js
document.addEventListener('DOMContentLoaded', () => {
  // 1. Выбор бренда на главной
  const brandSelect = document.querySelector('#brand-select select');
  if (brandSelect) {
    brandSelect.addEventListener('change', function() {
      if (this.value) window.location.href = this.value;
    });
    // Предварительный выбор, если есть ?brand=...
    const bp = new URLSearchParams(location.search).get('brand');
    if (bp) brandSelect.value = `catalog.html?brand=${bp}`;
  }

  // 2. Рекомендованные товары на главной
  const recContainer = document.getElementById('recommended-products');
  if (recContainer) {
    const recProducts = [
      { name: 'SHARK Skidplate', priceEx: '10 570,25', priceIn: '12 790', img: 'img/skidplate.jpg', inStock: true, badge: 'Новинка' },
      { name: 'ATV Cover',     priceEx: '2 500,00',  priceIn: '3 000',  img: 'img/cover.jpg',     inStock: false },
      // …добавьте свои товары
    ];
    recProducts.forEach(p => {
      const col = document.createElement('div');
      col.className = 'col-md-3 mb-4';
      col.innerHTML = `
        <div class="card h-100 position-relative">
          ${p.badge ? `<span class="badge badge-warning position-absolute top-0 start-0 m-2">${p.badge}</span>` : ''}
          <img src="${p.img}" class="card-img-top" alt="${p.name}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${p.name}</h5>
            <p class="mb-1"><small>Цена без НДС ${p.priceEx} ₴</small></p>
            <p class="fw-bold mb-2">${p.priceIn} ₴</p>
            <span class="badge ${p.inStock ? 'bg-success' : 'bg-secondary'} mb-2">
              ${p.inStock ? 'У наявності' : 'Немає в наявності'}
            </span>
            <button class="btn btn-primary mt-auto">Купити</button>
          </div>
        </div>`;
      recContainer.appendChild(col);
    });
  }

  // 3. Фильтрация карточек на странице каталог.html
  const grid = document.getElementById('product-grid');
  if (grid) {
    const cards  = grid.querySelectorAll('[data-category]');
    const params = new URLSearchParams(location.search);
    const cat    = params.get('category');
    const sub    = params.get('sub');
    const brand  = params.get('brand');

    cards.forEach(card => {
      let show = true;
      if (cat   && card.dataset.category !== cat) show = false;
      if (sub   && card.dataset.sub      !== sub) show = false;
      if (brand && card.dataset.brand    !== brand) show = false;
      card.style.display = show ? '' : 'none';
    });

    if (cat || brand) grid.scrollIntoView({ behavior: 'smooth' });
  }
});
