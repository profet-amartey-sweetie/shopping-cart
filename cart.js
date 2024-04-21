// let products = [];


function generateCartItemRow(product) {
  return `
    
     <tr>
        <th scope="row">${product.id}</th>
        <td>${product.title}</td>
        <td>${product.price}</td>
        <td>${product.qty}</td>
        <td>${product.price * product.qty}</td>
    </tr>
    `;
}

let cartItems = [];

document.addEventListener("DOMContentLoaded", async function (e) {
  cartItems = JSON.parse(localStorage.getItem("cart") ?? []);

  //   console.log(products);

  const tableBody = document.getElementById("cart-item-table-body");


  cartItems.map(function (product) {
    tableBody.innerHTML += generateCartItemRow(product);
  });


  // console.log([...addToCartButtons].map(a => a));
});
