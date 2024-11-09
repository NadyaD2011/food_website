let counter = 0;
if (localStorage.getItem('counter')){
  counter = Number(localStorage.getItem('counter'));
} else {
  localStorage.setItem('counter', 0);
};

function createProdcut(card) {
  counter += 1;
  localStorage.setItem('counter', counter);

  localStorage.setItem(`card${counter}`, JSON.stringify(card));
}

function appendProducts() {
  let keys = Object.keys(localStorage);
  keys.sort().reverse();
  for(let key of keys){
    if (key != 'counter'){
      let card = JSON.parse(localStorage[key]);
      var products = document.querySelector(".products");

      let card_product = document.createElement("div");
      card_product.className = "products__card";

      card_product.innerHTML =  `
        <div class="card__image-block">
          <img class="card__image" src="${card.image}" alt="картинка товара">
        </div>
        <div class="card__description">
          <div class="card__meta">
            <div class="card__rating">${card.rate}</div>
            <div class="card__value">${card.value}</div>
          </div>
          <div class="card__name">${card.name}</div>
          <div class="card__cost">${card.price}</div>
        </div>
      `;
      products.append(card_product);
    }
  }
}

// card_1 = {'image': 'img/2.webp', 'rate': 4.88, 'value': '500 калл', 'name': 'Стейк из грудки охлаждённый Зелёная Линия, 500г', 'price': '450'}
// card_2 = {'image': 'img/1.webp', 'rate': 4.84, 'value': '110 калл', 'name': 'Томаты черри на ветке, 250г', 'price': '120'}
// createProdcut(card_1)
// createProdcut(card_2)
appendProducts()