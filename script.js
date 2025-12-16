var swiper = new Swiper(".mySwiper", {
      loop:true,
      navigation: {
        nextEl: ".arrow-left",
        prevEl: ".arrow-right",
      },
    });

 const cartIcon = document.querySelector(".cart-icon") 
 const cartTab = document.querySelector(".cart-tab") 
 const closeButton = document.querySelector(".close-btn") 

 const openCart = () => cartTab.classList.toggle("cart-tab-active")
 

 cartIcon.addEventListener("click",openCart)
 closeButton.addEventListener("click",openCart)

 let productList = [];

 const initApp = () =>{

  fetch("products.json").then
  (response => response.json()).then
  (data =>{

    productList = data;
    console.log(productList)
  })

 }

 initApp();