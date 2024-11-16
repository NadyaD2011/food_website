appendProducts();

let card_add = document.querySelector('.products__add');
let img_add = document.querySelector('.add_img');
let form_add = document.querySelector('.form__fields');
let buttom = document.querySelector('.form__button');
let delete_buttons = document.querySelectorAll('.card__delete');
let button_true = document.querySelector('#yes');
let button_false = document.querySelector('#no');
let modal = document.querySelector('.modal');
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
                <img src='img/delete.svg' alt="картинка удалить" data="${card.data}" class='card__delete'>
                <img class="card__image" src="${card.image_path}" alt="картинка товара">
            </div>
            <div class="card__description">
                <div class="card__meta">
                    <div class="card__rating">${card.rating}</div>
                    <div class="card__value">${card.value}</div>
                </div>
                <div class="card__name">${card.name}</div>
                <div class="card__cost">${card.cost}</div>
            </div>
      `;
      products.prepend(card_product);
    }
  }
}

card_add.addEventListener('click', function () {
  img_add.classList.add("hude");
  form_add.classList.add("show");
});

buttom.addEventListener('click', function (event) {
  event.preventDefault();

  let form = document.querySelector('.add__form')
  let inputs = document.querySelectorAll('.text-field');

  if (form.checkValidity()) {
    card = {'image_path': inputs[0].value, 'rating': inputs[1].value, 'value': inputs[2].value, 'name': inputs[3].value, 'cost': inputs[4].value, 'data': counter+1};
    createProdcut(card);
    location.reload();
  }
});


for (let delete_button = 0; delete_button < delete_buttons.length; delete_button++){
  delete_buttons[delete_button].addEventListener('click', function () {
    modal.classList.add('active');
    modal.classList.remove('closed');
    button_false.addEventListener('click', function () {
      modal.classList.add('closed');
      modal.classList.remove('active');
    });
    button_true.addEventListener('click', function () {
      modal.classList.add('closed');
      modal.classList.remove('active');
      localStorage.removeItem(`card${delete_buttons[delete_button].getAttribute('data')}`);
      setTimeout(() => location.reload(), 600);
    });
  });
};