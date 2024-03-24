document.addEventListener("DOMContentLoaded", function() {
    const cart = document.getElementById('cart');
    const total = document.getElementById('total');
    
    cart.addEventListener('click', function(event) {
      const target = event.target;
      if (target.classList.contains('increment') || target.classList.contains('decrement')) {
        const item = target.parentElement;
        const quantityElement = item.querySelector('.quantity');
        const quantity = parseInt(quantityElement.textContent);
        const price = parseFloat(item.dataset.price);
        const increment = target.classList.contains('increment') ? 1 : -1;
        const newQuantity = Math.max(0, quantity + increment);
        quantityElement.textContent = newQuantity;
        updateTotal();
      } else if (target.classList.contains('remove')) {
        target.parentElement.remove();
        updateTotal();
      } else if (target.classList.contains('heart')) {
        target.classList.toggle('liked');
      }
    });
  
    function updateTotal() {
      let sum = 0;
      cart.querySelectorAll('.item').forEach(function(item) {
        const price = parseFloat(item.dataset.price);
        const quantity = parseInt(item.querySelector('.quantity').textContent);
        sum += price * quantity;
      });
      total.textContent = sum.toFixed(2);
    }
    
    // Sample items
    const item1 = createItem("Item 1", 10);
    const item2 = createItem("Item 2", 15);
    cart.appendChild(item1);
    cart.appendChild(item2);
  
    function createItem(name, price) {
      const item = document.createElement('div');
      item.classList.add('item');
      item.dataset.price = price;
      item.innerHTML = `
        <span>${name}</span>
        <button class="decrement">-</button>
        <span class="quantity">1</span>
        <button class="increment">+</button>
        <span class="heart">&hearts;</span>
        <button class="remove">Remove</button>
      `;
      return item;
    }
  });
  