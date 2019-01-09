// show cart

(function(){
  const cartInfo = document.getElementById('cart-info');
  const cart = document.getElementById('cart');

  cartInfo.addEventListener('click', function(){
    cart.classList.toggle('show-cart');
  })
})();

// add items to cart

(function(){
  const cartBtn = document.querySelectorAll('.store-item-icon');

  cartBtn.forEach(function(btn){
    btn.addEventListener('click', function(event){

      if (event.target.parentElement.classList.contains('store-item-icon')){
        let fullPath = event.target.parentElement.previousElementSibling.src;
        let pos = fullPath.indexOf('img') + 3; // 3 removes the img part of the path
        let partPath = fullPath.slice(pos); // /cake-2.jpeg

        const item = {}; // object literal
        item.img = `img-cart${partPath}`; // template string

        let name = event.target.parentElement.parentElement.nextElementSibling.children[0].children[0].textContent;
        item.name = name;

        let price = event.target.parentElement.parentElement.nextElementSibling.children[0].children[1].textContent; // $ 10
        let finalPrice = price.slice(1).trim(); // 10

        item.price = finalPrice;

        const cartItem = document.createElement('div');
        cartItem.classList.add(
          'cart-item',
          'd-flex',
          'justify-content-between',
          'text-capitalize',
          'my-3'
        );

        cartItem.innerHTML = `
          <img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
          <div class="item-text">

            <p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p>
            <span>$</span>
            <span id="cart-item-price" class="cart-item-price" class="mb-0">${item.price}</span>
          </div>
          <a href="#" id='cart-item-remove' class="cart-item-remove">
            <i class="fas fa-trash"></i>
          </a>
        </div>
`;

        // select cart
        const cart = document.getElementById('cart');
        const total = document.querySelector('.cart-total-container');

        cart.insertBefore(cartItem, total);
        alert('Item added to the cart');
        showTotals();
      }
    })
  })

  // show totals
  function showTotals(){
    const total = [];
    const items = document.querySelectorAll('.cart-item-price');

    items.forEach(function(item){
      total.push(parseFloat(item.textContent));
    });

    const totalMoney = total.reduce(function(total, item){
      total += item;
      return total;
    },0)

    const finalMoney = totalMoney.toFixed(2);

    document.getElementById('cart-total').textContent = finalMoney;
    document.querySelector('.item-total').textContent = finalMoney;
    document.getElementById('item-count').textContent = total.length;
  }
})();