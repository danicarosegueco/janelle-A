const menu = [
    { name: 'Shawarma Pie Chicken', category: 'burrito', price: 45.00, img: 'fpimg/shawarma-chicken.jpg' },
    { name: 'Shawarma Pie Beef', category: 'burrito', price: 50.00, img: 'fpimg/shawarma-beef.jpg' },
     { name: 'Pburrit-O w/rice(Chicken)', category: 'burrito', price: 89.00, img: 'fpimg/pburrit-chickenrice.jpg' },
     { name: 'Pburrit-O w/rice(Beef)', category: 'burrito', price: 109.00, img: 'fpimg/pburrit-beefrice.jpg' },
     { name: 'Mi Pburrit-O w/orice(Chicken)', category: 'burrito', price: 119.00, img: 'fpimg/pburrit-wochicken.jpg' },
    { name: 'Pburrit-O w/orice(Beef)', category: 'burrito', price: 139.00, img: 'fpimg/pburrit-wobeef.jpg' },
    
    { name: 'Halo-halo', category: 'halohalo', price: 50.00, img: 'fpimg/halohalo.jpg' },
    
    { name: 'Strawberry Soda', category: 'soda', price: 24.00, img: 'fpimg/strawberry.jpg' },
    { name: 'Blueberry Soda', category: 'soda', price: 24.00, img: 'fpimg/blueberry.jpg' },
    { name: 'Lemon Soda', category: 'soda', price: 24.00, img: 'fpimg/lemon.jpg' },
    
    { name: 'Strawberry', category: 'milk', price: 39.00, img: 'fpimg/strawberryfm.jpg' },
    { name: 'Passion Fruit', category: 'milk', price: 39.00, img: 'fpimg/passionfm.jpg' },
    { name: 'Blueberry', category: 'milk', price: 39.00, img: 'fpimg/blueberryfm.jpg' },
    
   ];
   
   
   let cart = [];
   
   function showSection(id) {
     document.querySelectorAll('section').forEach(sec => sec.classList.remove('active'));
     document.getElementById(id).classList.add('active');
   
     const testimonialWrapper = document.getElementById('testimonial-section');
     if (id === 'testimonials') {
       testimonialWrapper.style.display = 'flex';
       setTimeout(() => {
         testimonialWrapper.style.opacity = 1;
       }, 50);
     } else {
       testimonialWrapper.style.opacity = 0;
       setTimeout(() => {
         testimonialWrapper.style.display = 'none';
       }, 500);
     }
   }
   
   
   function renderMenu(filter = 'all') {
     const container = document.getElementById('menuItems');
     container.innerHTML = '';
     const filtered = filter === 'all' ? menu : menu.filter(item => item.category === filter);
     filtered.forEach(item => {
       const card = document.createElement('div');
       card.className = 'item-card';
       card.innerHTML = `
         <img src="${item.img}" alt="${item.name}" />
         <h3>${item.name}</h3>
         <p>₱${item.price.toFixed(2)}</p>
         <button onclick="addToCart('${item.name}', ${item.price})">Add to Cart</button>
       `;
       container.appendChild(card);
     });
   }
   
   function addToCart(name, price) {
     const existing = cart.find(item => item.name === name);
     if (existing) {
       existing.quantity++;
     } else {
       cart.push({ name, price, quantity: 1 });
     }
     updateCart();
   }
   
   function removeFromCart(index) {
     cart.splice(index, 1);
     updateCart();
   }
   
   function clearCart() {
     cart = [];
     updateCart();
   }
   
   function updateCart() {
     const cartDiv = document.getElementById('cart');
     if (cart.length === 0) {
       cartDiv.innerHTML = '<p>Your cart is empty.</p>';
       return;
     }
     const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
     cartDiv.innerHTML = `
       <h3>Your Cart</h3>
       <ul>
         ${cart.map((item, i) => `
           <li>
             ${item.name} - ₱${item.price.toFixed(2)} x ${item.quantity}
             <button onclick="decreaseQty(${i})">-</button>
             <button onclick="increaseQty(${i})">+</button>
             <button onclick="removeFromCart(${i})">Remove</button>
           </li>
         `).join('')}
       </ul>
       <p><strong>Total: ₱${total.toFixed(2)}</strong></p>
       <button class='checkout-btn' onclick='checkout()'>Checkout</button>
       <button class='checkout-btn' onclick='clearCart()'>Clear All</button>
     `;
   }
   
   function increaseQty(index) {
     cart[index].quantity++;
     updateCart();
   }
   
   function decreaseQty(index) {
     if (cart[index].quantity > 1) {
       cart[index].quantity--;
     } else {
       removeFromCart(index);
     }
     updateCart();
   }
   
   function filterMenu(category) {
     renderMenu(category);
   }
   
   function checkout() {
     cart = [];
     updateCart();
     document.getElementById('thankYouPopup').style.display = 'flex';
   }
   
   function closePopup() {
     document.getElementById('thankYouPopup').style.display = 'none';
   }
   
   // Initial Load
   renderMenu();
   
   window.addEventListener('scroll', () => {
     const gallery = document.getElementById('gallery');
     const galleryPosition = gallery.getBoundingClientRect().top;
     const windowHeight = window.innerHeight;
   
     if (galleryPosition < windowHeight) {
       gallery.classList.add('fade-in');
     }
   });