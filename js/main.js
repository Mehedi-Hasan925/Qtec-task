const Carted = document.querySelector(".in-cart");
const products = [
  {
    id: 0,
    title: "Lipstick",
    price: 500,
    inCart: 0,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXR0V_oxlU5Mk6Y9qlrWBWpjI8W7h6vEp0Og&usqp=CAU",
  },
  {
    id: 1,
    title: "Acqua Di Gio by Giorgio Armani",
    price: 1500,
    inCart: 0,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeSVEUWEIcCnWjRrj3My0dwmeCMiXDdZY6Bw&usqp=CAU",
  },
  {
    id: 2,
    title: "Tom Ford Noir Extreme",
    price: 1200,
    inCart: 0,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf4pFoQq2bpzYShN7egbv8eNOvHqif73UtWw&usqp=CAU",
  },
  {
    id: 3,
    title: "Xiaomi Headset",
    price: 1700,
    inCart: 0,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDIC2m4o5Ff_s_BOIL0-y7uq8m_Kqrn0Yq1Q&usqp=CAU",
  },
  {
    id: 4,
    title: "Rose Beer",
    price: 2500,
    inCart: 0,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS16bvji845vF785H6V8PqJrm2myyYh2ZTsvA&usqp=CAU",
  },
  {
    id: 5,
    title: "Gin Tonica",
    price: 1300,
    inCart: 0,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJdu2zJ9MD9RAewX55_UDnGTNq5DSTAoGI7w&usqp=CAU",
  },
  {
    id: 6,
    title: "Lens",
    price: 1000,
    inCart: 0,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP1V6YFXJNWp8BeGn71-olORVXx427WBSkkQ&usqp=CAU",
  },
  {
    id: 7,
    title: "German Cheese",
    price: 200,
    inCart: 0,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBmvWhxHGoJaFt2zj_ic4qUo9Ktuh29GOVLg&usqp=CAU",
  },
  {
    id: 8,
    title: "LipStick",
    price: 600,
    inCart: 0,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8Kud9BOfvsdJRT6UrUYgcL72ajsUXD1po4g&usqp=CAU",
  },
  {
    id: 9,
    title: "Cheese",
    price: 300,
    inCart: 0,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBmvWhxHGoJaFt2zj_ic4qUo9Ktuh29GOVLg&usqp=CAU",
  },
];

const productCard = (productData) => {
  var productList = document.querySelector(".product-list");
  for (var i = 0; i < productData.length; i++) {
    // console.log(productData[i].title);
    var makeCard = `<a href="#"><div class="product-box">
                        <img src="${productData[i].imageUrl}" alt="${productData[i].title}">
                        <p>${productData[i].title} </p>
                    </div></a>`;
    productList.innerHTML += makeCard;
  }
};
productCard(products);

const Card = document.querySelectorAll(".product-box");
for (let j = 0; j < Card.length; j++) {
  Card[j].addEventListener("click", () => {
    addCart(products[j]);
    totalCost(products[j].price);
  });
}

const addCart = (product) => {
  let cartItems = localStorage.getItem("InCartProducts");
  cartItems = JSON.parse(cartItems);
  console.log(cartItems);
  if (cartItems != null) {
    if (cartItems[product.title] == undefined) {
      product.inCart = 1;
      cartItems = {
        ...cartItems,
        [product.title]: product,
      };
    } else {
      cartItems[product.title].inCart += 1;
    }
  } else {
    product.inCart = 1;
    cartItems = {
      [product.title]: product,
    };
  }
  localStorage.setItem("InCartProducts", JSON.stringify(cartItems));
  window.location.reload();
  // let cartProducts = localStorage.getItem()
};

// show the product in mycart
const totalCost = (productPrice) => {
  let previousCost = localStorage.getItem("totalCost");

  if (previousCost != null) {
    previousCost = parseInt(previousCost);
    localStorage.setItem("totalCost", previousCost + productPrice);
  } else {
    localStorage.setItem("totalCost", productPrice);
  }
};

const showInCart = () => {
  let cartProducts = localStorage.getItem("InCartProducts");
  let totalPayment = localStorage.getItem("totalCost");
  cartProducts = JSON.parse(cartProducts);
  console.log(typeof cartProducts);
  if (cartProducts != null) {
    let displayDiv = document.querySelector(".in-cart");
    let displayTotal = document.querySelector(".total-pay");

    Object.values(cartProducts).map((item) => {
      item.price = item.price * item.inCart;
      var makeAddCard = `<div class="cart-product">
                              <img src="${item.imageUrl}" alt="" class="cart-img">
                              <p class="cart-number">${item.inCart}<p>
                              <p class="product-name">${item.title}</p>
                              <p class="product-price">BDT${item.price}</p>
                              <p class="delete"><i class="fas fa-trash-alt" ></i><p>
                          </div>`;
      displayDiv.innerHTML += makeAddCard;
    });
    var makeTotal = `<div class="sub-total">
                          <div class="desc" style="color:#8A2BE2">Discount</div>
                          <div class="amount">BDT0.00</div>
                      </div>
                      <div class="sub-total">
                          <div class="desc">Subtotal</div>
                          <div class="amount">BDT${totalPayment}</div>
                      </div>
                      <div class="sub-total">
                          <div class="desc">Tax(0%)</div>
                          <div class="amount">BDT0</div>
                      </div>
                      <div class="sub-total">
                          <div class="desc">Total</div>
                          <div class="amount">BDT${totalPayment}</div>
                      </div>
                      <div class="pay-total">
                          <div class="desc">Pay</div>
                          <div class="amount">BDT${totalPayment}</div>
                      </div>`;

    displayTotal.innerHTML += makeTotal;
  }
};

function removeCartItem() {
  var removeItem = document.querySelectorAll(".delete");
  for (let l = 0; l < removeItem.length; l++) {
    removeItem[l].addEventListener("click", (event) => {
      var buttonClicked = event.target;
      buttonClicked.parentElement.parentElement.remove();
      let itemName =
        buttonClicked.parentElement.parentElement.querySelector(
          ".product-name"
        ).innerText;
      var cartItems = JSON.parse(localStorage.getItem("InCartProducts"));
      let Cost = JSON.parse(localStorage.getItem("totalCost"));
      let productPrice = cartItems[itemName].price;
      let inCart = cartItems[itemName].inCart;
      delete cartItems[itemName];
      Cost = Cost - productPrice * inCart;
      localStorage.setItem("InCartProducts", JSON.stringify(cartItems));
      localStorage.setItem("totalCost", JSON.stringify(Cost));
      window.location.reload();
    });
  }
}

showInCart();
removeCartItem();
