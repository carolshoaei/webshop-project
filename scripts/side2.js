const cartSection = document.querySelector("#main__cart-section");
const cartCountElement = document.querySelector("#header__cart-badge");
const totalPriceElement = document.querySelector("#total-price");


const getAllCartItems = () => {
  const allProducts = [];
  // Iterer over alle keys i localStorage
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i); // Hent key ved indeks
    const value = localStorage.getItem(key); // Hent verdien for key

    const parsedValue = JSON.parse(value);

    allProducts.push(parsedValue);
  }
  return allProducts;
};

const fillShoppingCart = () => {

  
  const allProducts = getAllCartItems();

  let htmlTxt = "";

  let totalSum = 0;


  allProducts.forEach((product) => {
    htmlTxt += `
    <article class="main__cart-item">
                    <div>
                    <img width="200px" src="${product.image}" alt="Image of ${product.name}">
                    <h4 class="main__cart-item__product-name" style ="text-align: center">${product.name}</h4>
                    </div>
                    <input class="main__cart-item__quantity-input" type="number" value="${product.amount}" min="1" data-id="${product.id}">
                    <p class="main__cart-item__cart-price">kr ${(product.price * product.amount).toFixed(2)}</p>
                    
      </article>
    `;
    cartSection.innerHTML = htmlTxt;

    cartSection.querySelectorAll(".main__cart-item__quantity-input").forEach(input => {
                input.addEventListener('change', function(event) {
                    const newAmount = parseInt(event.target.value);
                    const productId = event.target.dataset.id;
                    const product = JSON.parse(localStorage.getItem(productId));

                    if (newAmount > 0) {
                        product.amount = newAmount;
                        localStorage.setItem(productId, JSON.stringify(product));
                        fillShoppingCart();
                        cartItemsCount();
                    }
                });
            });

  });

allProducts.forEach(product => {
  totalSum += (product.price * product.amount)
  totalPriceElement.innerHTML = `kr ${totalSum.toFixed(2)}`;
})

  
};


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


 

fillShoppingCart();
cartItemsCount();
