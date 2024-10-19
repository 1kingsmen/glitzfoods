
   // Retrieve the data from localStorage
   document.getElementById('customerName').textContent = localStorage.getItem('customerName');
   document.getElementById('customerNumber').textContent = localStorage.getItem('customerNumber');
   const deliveryType = localStorage.getItem('deliveryType');
   document.getElementById('deliveryType').textContent = deliveryType;

   // Containers for pickup and delivery addresses
   const restaurantAddressContainer = document.getElementById('restaurantAddressContainer');
   const deliveryAddressContainer = document.getElementById('deliveryAddressContainer');

   // Show the correct address based on delivery type
   if (deliveryType === 'Pick Up') {
       restaurantAddressContainer.style.display = 'block'; // Show pickup address
       deliveryAddressContainer.style.display = 'none'; // Hide delivery address
       document.getElementById('restaurantAddress').textContent = localStorage.getItem('restaurantAddress');
   } else if (deliveryType === 'Delivery') {
       deliveryAddressContainer.style.display = 'block'; // Show delivery address
       restaurantAddressContainer.style.display = 'none'; // Hide pickup address
       document.getElementById('deliveryAddress').textContent = localStorage.getItem('deliveryAddress');
   }

   // Show total items and price
   document.getElementById('totalItems').textContent = localStorage.getItem('totalItems');
   document.getElementById('totalPrice').textContent = localStorage.getItem('totalPrice');

   // Retrieve orders from localStorage and display them
   const orders = JSON.parse(localStorage.getItem('orders'));
   const orderList = document.getElementById('orderList');
   orders.forEach(order => {
       const listItem = document.createElement('li');
       listItem.innerHTML = `
       <div class="items">
           <div class="image">
               <img class="order-image" src="${order.itemImage}" alt="${order.itemName}" />
           </div>
           <div class="words">
               <div class="name">
                   <p class="order-item-name">${order.itemName}</p>
               </div>
               <div class="quantity"> 
                   <p class="order-quantity">Quantity: ${order.itemQuantity}</p>
               </div>
           </div>
           <div class="price">
               <p class="order-price">${order.itemPrice}</p>
           </div>
       </div>
       `;
       orderList.appendChild(listItem);
   });
