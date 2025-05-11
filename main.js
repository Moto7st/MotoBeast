// main.js
// Додає функціонал для вибору бренду та динамічних розділів

document.addEventListener('DOMContentLoaded', () => {
  // 1. Вибір бренду
  const brandSelect = document.querySelector('#brand-select select');
  if (brandSelect) {
    brandSelect.addEventListener('change', function() {
      if (this.value) window.location.href = this.value;
    });
    // Попередній вибір (якщо є ?brand=...)
    const params = new URLSearchParams(location.search);
    if (params.get('brand')) {
      brandSelect.value = `catalog.html?brand=${params.get('brand')}`;
    }
  }

  // 2. Рекомендовані товари на головній
  const recContainer = document.getElementById('recommended-products');
  if (recContainer) {
    const recProducts = [
      { name: 'SHARK Skidplate', priceEx: '10 570,25', priceIn: '12 790', img: 'img/skidplate.jpg', inStock: true, badge: 'Новинка' },
      { name: 'ATV Cover', priceEx: '2 500,00', priceIn: '3 000', img: 'img/cover.jpg', inStock: false },
      // Додай ще товари за необхідності
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
            <p class="mb-1"><small>Ціна без ПДВ ${p.priceEx} ₴</small></p>
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
});