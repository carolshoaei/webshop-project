import ProductModule from "./modules/ProductModule.js";

// Get HTML elements

const productSection = document.querySelector("#main__product-section");
const cartCountElement = document.querySelector("#header__cart-badge");




// Function to loop over array of objects and print them out in HTML
const fillProducts = () => {
  const allProducts = ProductModule.getAll();

  let htmlTxt = "";
  allProducts.forEach((product) => {
    htmlTxt += `
        <article class="main__product-section__product xs-12 sm-6 md-4 lg-3">
                <h3 class="main__product-section__product-title">${product.name}</h3>
                <img class="img-responsive" src="${product.image}" alt="Bilde av ${product.name}">
                <p class="main__product-section__product-price">kr ${product.price.toFixed(2)}</p>
                <button class="main__product-section__add-to-cart-btn" data-id="${product.id}">Legg i handlekurv</button>
            </article>
        `;
  });
  productSection.innerHTML = htmlTxt;
};

/*
Function to set eventlisteners to listen for click, which will add the product associated
with the button clicked into localstorage through activating the function addToCart(),
which checks if the item already exists in the localstorage, and if so will increase amount by 1.

If item doesnt exist, it will apply a 'new variable' called amount and set it to 1.
*/

const setEventsOnButtons = () => {
  const buttons = document.querySelectorAll(".main__product-section__add-to-cart-btn");

  buttons.forEach((button) => button.addEventListener("click", addToCart));
};

const addToCart = (event) => {
  const productById = ProductModule.getByID(parseInt(event.target.dataset.id));


  if (localStorage.getItem(JSON.stringify(productById.id)) != null) {
   // ITEM ALREADY EXISTS

    const existingItem = JSON.parse(localStorage.getItem(productById.id));
    existingItem.amount++;

    localStorage.setItem(
      JSON.stringify(existingItem.id),
      JSON.stringify(existingItem)
    );
  } else {
    // ITEM DOES NOT EXIST
    productById.amount = 1;
    localStorage.setItem(
      JSON.stringify(productById.id),
      JSON.stringify(productById)
    );
  }
   cartItemsCount();
};


// Count how many items are in localstorage by checking their amounts

// Send the itemcount into the badge

const cartItemsCount = () => {
    let count = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      const parsedValue = JSON.parse(value);
      count += parsedValue.amount;
    }
    cartCountElement.innerHTML = `${count}`;
  }
  

// Run
fillProducts();
setEventsOnButtons();
cartItemsCount();



