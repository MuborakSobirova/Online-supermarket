/** @format */

import { products } from "./products.js";

let elProdList = document.querySelector(".products__list");
let elCartList = document.querySelector(".cart__list");
let elTotalPrice = document.querySelector(".total-count");

let cartList = [];

const totalPrice = () => {
  const price = cartList.reduce((a, b) => a + b.clientPrice, 0);
  elTotalPrice.textContent = `${price} $`;
};

const renderProduct = function (item) {
  elProdList.innerHTML = "";
  for (let i of item) {
    if (i.count > 0) {
      let li = document.createElement("li");
      li.classList.add("products__item");
      li.innerHTML = `
            <div class="products__img">
    <img src="${i.img}" alt="apple">
</div>
<div class="products__text">
    <h3>${i.name}</h3>
    <h4>${i.price} $</h4>
    <button id="${i.id}" class="add">+</button>
    <span class="count">${i.count}</span>
    <button id="${i.id}" class="remove">-</button>
</div>
            `;
      elProdList.append(li);
    }
  }
};

renderProduct(products);

const renderCart = function (item) {
  totalPrice();
  elCartList.innerHTML = "";
  for (let i of item) {
    if (i.count > 0) {
      let li = document.createElement("li");
      li.classList.add("products__item");
      li.innerHTML = `
              <div class="products__img">
      <img src="${i.img}" alt="apple">
  </div>
  <div class="products__text">
      <h3>${i.name}</h3>
      <h4>${i.clientPrice} $</h4>
      <span class="count">${i.count}</span>
  </div>
              `;
      elCartList.append(li);
    }
  }
};

elProdList.addEventListener("click", (event) => {
  if (event.target.className === "add") {
    for (let i of products) {
      if (i.id === Number(event.target.id)) {
        let obj = cartList.some((find) => find.id === Number(event.target.id));
        i.count -= 1;
        if (!obj) {
          cartList.push({ ...i, clientPrice: i.price, count: 1 });
          // console.log(cartList);
        } else {
          for (let j of cartList) {
            if (event.target.id == j.id) {
              j.count += 1;
              j.clientPrice = j.price * j.count;
            }
          }
        }
      }
    }
  } else if (event.target.className === "remove") {
    for (let i of cartList) {
      if (i.id == event.target.id && i.count > 0) {
        i.count -= 1;
        i.clientPrice = i.price * i.count;
      }
      for (let k of products) {
        if (k.id == event.target.id) {
          k.count += 1;
        }
      }
    }
  }
  renderCart(cartList);
  renderProduct(products);
});
