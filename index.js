// let products = [];

function generateProductCard(product) {
  return `
    
     <div class="card col-sm-3">
     <div class="card-img" style="background-image:url(${product.image})"></div>
        <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">¢${product.price}</p>
            <p class="card-text text-truncate">${product.description}</p>
            <button type="button" value="${product.id}"  id="${product.id}" class="btn btn-primary btnAddtoCart">Add to Cart</a>
        </div>
    </div>
    `;
}

function addToCart(product) {
  // console.log(product);

  if (!localStorage.getItem("cart")) {
    localStorage.setItem("cart", JSON.stringify([]));
  }

  let cartItems = JSON.parse(localStorage.getItem("cart"));
  let existingItem = cartItems.find((item) => item.id == product.id);

  if (existingItem) {
    const newCartItems = cartItems.map((item) => {
      if (existingItem.id == item.id) {
        item.qty = item.qty + 1;
      }

      return item;
    });

    localStorage.setItem("cart", JSON.stringify(newCartItems));
  } else {
    cartItems.push({
      id: product.id,
      price: product.price,
      image: product.image,
      title: product.title,
      qty: 1,
    });

    localStorage.setItem("cart", JSON.stringify(cartItems));
  }
}

// function getProducts() {
//   let data = [];

//   const x = fetch("https://fakestoreapi.com/products")
//     .then((res) => res.json())
//     .then((json) => json)
//     .catch((err) => console.log("Unable to load data"));

//     console.log(Object.keys(x));
// //   return data;
// }

async function getProducts() {
  let data = [];

  const res = await fetch("https://fakestoreapi.com/products", {
    method: "GET",
  });
  const json = await res.json();

  if (json.length > 0) data = json;

  return data;
}

let products = [];

document.addEventListener("DOMContentLoaded", async function (e) {
  products = await getProducts();

  //   console.log(products);

  const productList = document.getElementById("product-list");

  if (products.length < 1) {
    productList.innerHTML = `<p class="fs-5 text-secondary text-center">No products in store</p>`;
  }

  products.map(function (product) {
    productList.innerHTML += generateProductCard(product);
  });

  const addToCartButtons = document.getElementsByClassName("btnAddtoCart");

  // console.log([...addToCartButtons].map(a => a));

  if (addToCartButtons.length > 0) {
    [...addToCartButtons].map(function (addToCartButton) {
      addToCartButton.addEventListener("click", function (e) {
        addToCart(products.find((p) => p.id == e.target.value));
      });
    });
  }
});
