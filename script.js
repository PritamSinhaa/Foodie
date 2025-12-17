var swiper = new Swiper(".mySwiper", {
  loop: true,
  navigation: {
    nextEl: ".arrow-left",
    prevEl: ".arrow-right",
  },
});

const cartIcon = document.querySelector(".cart-icon");
const cartTab = document.querySelector(".cart-tab");
const closeButton = document.querySelector(".close-btn");
const cardList = document.querySelector(".card-list");
const cartList = document.querySelector(".cart-list");
const cartTotal = document.querySelector(".cart-total");

const openCart = () => cartTab.classList.toggle("cart-tab-active");

cartIcon.addEventListener("click", openCart);
closeButton.addEventListener("click", openCart);

let productList = [];
let cartProduct = [];

const updateTotals = () =>{


  let totalPrice = 0;
  document.querySelectorAll(".item").forEach(item => {

    const price =  parseFloat(item.querySelector(".item-total").textContent.replace('$',''))

    totalPrice+=price;
  })

  cartTotal.textContent=`$${totalPrice.toFixed(2)}`;
}

const showCards = () => {
  productList.forEach((product) => {
    const orderCard = document.createElement("div");
    orderCard.classList.add("order-card");

    orderCard.innerHTML = `
              <div class="card-image">
                <img src="./assets/${product.image}" alt="">
              </div>
              <h4>${product.name}</h4>
              <h4 class="price">${product.price}</h4>
              <a href="#" class="btn card-btn">Add to Cart</a>
              `;

    cardList.appendChild(orderCard);

    const cardBtn = orderCard.querySelector(".card-btn");

    cardBtn.addEventListener("click", (e) => {
      e.preventDefault();

      addTocart(product);
    });
  });
};

const addTocart = (product) => {
  const existingProduct = cartProduct.find((item) => item.id === product.id);
  if (existingProduct) {
    return;
  }

  cartProduct.push(product);
  let quantity = 1;
  let price = parseFloat(product.price.replace("$", ""));

  const cartItem = document.createElement("div");
  cartItem.classList.add("item");

  cartItem.innerHTML = `
                <div class="item-image">
                  <img src="./assets/${product.image}" alt="">
                </div>
                <div  class="detail">
                  <h4>${product.name}</h4>
                  <h4 class="item-total">${product.price}</h4>
                </div>
                <div class="flex quantity-container">
                  <a href="#" class="quantity-btn minus">
                    <i class="fa-solid fa-minus"></i>
                  </a>
                  <h4 class="quantity-value">${quantity}</h4>
                  <a href="#" class="quantity-btn plus">
                    <i class="fa-solid fa-plus"></i>
                  </a>
                </div>
  `;

  cartList.appendChild(cartItem);
updateTotals();

  const plusBtn = cartItem.querySelector(".plus");
  const minusBtn = cartItem.querySelector(".minus");
  const quantityvalue = cartItem.querySelector(".quantity-value");
  const itemTotal = cartItem.querySelector(".item-total");

  plusBtn.addEventListener("click", (e) => {
    e.preventDefault();
    quantity++;
    quantityvalue.textContent = quantity;
    itemTotal.textContent = `$${(price * quantity).toFixed(2)}`;
    updateTotals();
  });

  minusBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (quantity > 1) {
      quantity--;
      quantityvalue.textContent = quantity;
      itemTotal.textContent = `$${(price * quantity).toFixed(2)}`;
      updateTotals();
    } else {
      cartItem.classList.add("slide-out");
      setTimeout(() => {
        cartItem.remove();
        cartProduct = cartProduct.filter((item) => item.id !== product.id);
        updateTotals();
      }, 300);
    }
  });
};

const initApp = () => {
  fetch("products.json")
    .then((response) => response.json())
    .then((data) => {
      productList = data;
      showCards();
    });
};

initApp();
