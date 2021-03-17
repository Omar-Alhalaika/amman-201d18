/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
let cart = new Cart([]);

// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {

  //TODO: Add an <option> tag inside the form's select for each product
  let selectElement = document.getElementById('items');
  for (let j = 0; j < Product.allProducts.length; j++) {
    let optionTag = document.createElement('option');
    optionTag.textContent = Product.allProducts[j].name;
    optionTag.value = Product.allProducts[j].name;
    selectElement.appendChild(optionTag);
  }
  // console.log(Product.allProducts[i]);
}


// When someone submits the form, we need to add the selected item to the cart ------- (1)
// object, save the whole thing back to local storage and update the screen ---------- (2)(3)
// so that it shows the # of items in the cart and a quick preview of the cart itself. (4)

// (1) TODO: Add the selected item and quantity to the cart
function addSelectedItemToCart() {
  // TODO: suss out the item picked from the select list
  const getListOption = document.getElementById('items');
  let elementValue = getListOption.value;
  console.log(elementValue);
  // TODO: get the quantity
  const getQuantity = document.getElementById('quantity');
  let elementQuantity = getQuantity.value;
  console.log(elementQuantity);
  // TODO: using those, add one item to the Cart----------------------------
  cart.addItem(elementValue, elementQuantity);
}
// (2) Local storage fun. added in app.js

// (3) TODO: Update the cart count in the header nav with the number of items in the Cart
function updateCounter() {
  let counter = `  :  ${cart.items.length}`;
  const getCounter = document.getElementById('itemCount');
  getCounter.textContent = counter
  console.log(cart.items);
}

// (4) TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  const getDiv = document.getElementById('cartContents');
  getDiv.textContent = ' Your Items : '
  const ul = document.createElement('ul');
    getDiv.appendChild(ul);
// console.log(car)
  // TODO: Get the item and quantity from the form
  // TODO: Add a new element to the cartContents div with that information
  for (let i = 0; i < cart.items.length; i++) {
    const item = cart.items[i].product;
    const quantity = cart.items[i].quantity;
    // const ul = document.createElement('ul');
    // getDiv.appendChild(ul);
    const itemsLi = document.createElement('li');
    ul.appendChild(itemsLi);
    itemsLi.textContent = `  ${item}   ${quantity}   `;
    // const quantityLi = document.createElement('li');
    // ul.appendChild(quantityLi);
    // quantityLi.textContent = quantity;
  };

}

// (5) All togather in one Fun.

function handleSubmit(event) {

  // TODO: Prevent the page from reloading
  event.preventDefault();

  addSelectedItemToCart();
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();

}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
const catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();

