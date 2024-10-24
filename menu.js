
    const list = document.querySelector('.list');
    const orderHeader = document.querySelector('.ordered .h2 h2'); // Select the header to show the total number of items

    // Function to update the order count in the header
    function updateOrderCount() {
        const totalItems = list.querySelectorAll('.list-item').length; // Count the number of items
        orderHeader.textContent = `Ordered Menu (${totalItems})`; // Update the header text with the count
        updateTotalPrice(); // Update total price after counting items
    }

    // Function to update the total price including delivery if applicable
   // Function to update the total price including delivery and plate cost
   // Function to update the total price including delivery and plate cost
function updateTotalPrice() {
    let totalPrice = 0;
    const listItems = document.querySelectorAll('.list-item');

    listItems.forEach(item => {
        const itemName = item.querySelector('.item-name').textContent.trim();
        const itemPriceText = item.querySelector('.item-price').textContent.trim();
        const itemPrice = parseFloat(itemPriceText.replace(/[^0-9.-]+/g, '')); // Clean price
        const itemQuantity = parseInt(item.querySelector('.quantity').textContent); // Get quantity
        
        console.log(`Item: ${itemName}, Price: ${itemPrice}, Quantity: ${itemQuantity}`);
        
        if (!isNaN(itemPrice) && !isNaN(itemQuantity)) {
            let plateCost = 0;

            // Apply 400 Naira extra cost only for "Rice and beans"
            if (itemName === 'Rice and beans'  || itemName === 'fried and jellof rice' || itemName === 'white Rice' || itemName === 'fried rice' || itemName === 'jellof rice' || itemName === 'moi moi' || itemName === 'salad' || itemName === 'fried plantain' || itemName === 'chips and eggs' || itemName === 'indomie and egg' || itemName === 'semovita' || itemName === 'amala'  || itemName === 'pounded yam' || itemName === 'eba' || itemName === 'akpu' || itemName === 'beef' || itemName === 'pomo' || itemName === 'intestine' || itemName === 'fish' || itemName === 'goat meat' || itemName === 'cow leg' || itemName === 'cow tail' || itemName === 'chicken' || itemName === 'cow leg pepper soup' || itemName === 'intestine pepper soup' || itemName === 'goat meat pepper soup') {
                plateCost = 400;
                console.log(`Plate cost applied for ${itemName}: ₦${plateCost}`);
            }

            totalPrice += (itemPrice + plateCost) * itemQuantity; // Multiply by quantity and add to total price
        }
    });

    // Check if delivery is selected and add delivery cost
    const deliveryOption = document.getElementById('delivery-option');
    if (deliveryOption && deliveryOption.checked) {
        const deliveryCost = 1500; // Example delivery cost
        totalPrice += deliveryCost;
        console.log(`Delivery cost added: ₦${deliveryCost}`);
    }

    // Update the total price on the page
    console.log(`Total Price Before Update: ₦${totalPrice.toFixed(2)}`);
    document.querySelector('.total-price').textContent = `Total: ₦${totalPrice.toFixed(2)}`;
    console.log(`Total Price Updated: ₦${totalPrice.toFixed(2)}`);
}




    /// Function to handle adding items to the order list
function addItemToOrder(imageSrc, itemName, itemPrice, itemCategory) {
    const hasSwallow = list.querySelector('.list-item.swallow'); // Check if there is any swallow in the cart

    // Only apply the restriction to the "soups" category
    if (itemCategory === 'soups' && !hasSwallow) {
        alert('You must order a swallow before adding soup!');
        return; // Prevent adding the soup if no swallow is in the cart
    }

    // Create a new list item
    const listItem = document.createElement('div');
    listItem.classList.add('list-item');
    if (itemCategory === 'swallows') listItem.classList.add('swallow'); // Mark the item as swallow if applicable

    // Handle invalid or missing image path
    const safeImageSrc = imageSrc || 'https://via.placeholder.com/50'; // Use a valid placeholder URL

    listItem.innerHTML = `
        <div class="image-container">
            <img src="${safeImageSrc}" alt="${itemName}" class="item-image" onerror="this.src='https://via.placeholder.com/50'" />
        </div>
        <div class="details">
            <div class="item-name">${itemName}</div> 
            <div class="item-price">${itemPrice}</div>
        </div>
        <div class="help">
            <div class="quantity-controls">
                <button class="decrease quantity-btn">-</button>
                <span class="quantity">1</span>
                <button class="increase quantity-btn">+</button>
            </div>
            <div class="delete">
                <span class="material-symbols-outlined delete-icon">delete</span>
            </div>
        </div>
    `;

    // Append the new list item to the .list container
    list.appendChild(listItem);
    updateOrderCount(); // Update the order count after adding a new item
}

// Event delegation for dynamic content
document.querySelector('.list').addEventListener('click', function(event) {
    const listItem = event.target.closest('.list-item');

    // Increase quantity
    if (event.target.classList.contains('increase')) {
        const quantityElement = listItem.querySelector('.quantity');
        let quantity = parseInt(quantityElement.textContent);
        quantityElement.textContent = ++quantity; // Increment quantity
        updateTotalPrice(); // Recalculate the total price
    }

    // Decrease quantity
    if (event.target.classList.contains('decrease')) {
        const quantityElement = listItem.querySelector('.quantity');
        let quantity = parseInt(quantityElement.textContent);
        if (quantity > 1) {
            quantityElement.textContent = --quantity; // Decrement quantity
            updateTotalPrice(); // Recalculate the total price
        }
    }

    // Delete item
    if (event.target.classList.contains('delete-icon')) {
        listItem.remove(); // Remove the item from the cart
        updateOrderCount(); // Update the order count after removing an item
        updateTotalPrice(); // Update total price after removing an item
    }
});

// Add click event listener to each shopping basket icon
const basketIcons = document.querySelectorAll('.shopping-basket');
basketIcons.forEach(icon => {
    icon.addEventListener('click', function() {
        // Find the parent card element
        const card = this.closest('.card');
        const imageSrc = card.querySelector('.image img').src;
        const itemName = card.querySelector('.name').textContent;
        const itemPrice = card.querySelector('.price').textContent;

        // Get the category from the card's data-category attribute
        const itemCategory = card.getAttribute('data-category');

        addItemToOrder(imageSrc, itemName, itemPrice, itemCategory);
    });
});



    // Get references to the checkboxes and address fields
    const pickupOption = document.getElementById('pickup-option');
    const deliveryOption = document.getElementById('delivery-option');
    const restaurantAddress = document.querySelector('.restaurant-address');
    const deliveryAddress = document.querySelector('.delivery-address');

    // Add event listeners to both checkboxes
    pickupOption.addEventListener('change', function() {
        if (this.checked) {
            deliveryOption.checked = false; // Uncheck 'Delivery'
            restaurantAddress.style.display = 'block'; // Show restaurant address
            deliveryAddress.style.display = 'none'; // Hide delivery address
        } else {
            restaurantAddress.style.display = 'none'; // Hide restaurant address
        }
        updateTotalPrice(); // Recalculate total price without delivery
    });

    deliveryOption.addEventListener('change', function() {
        if (this.checked) {
            pickupOption.checked = false; // Uncheck 'Pick Up'
            deliveryAddress.style.display = 'block'; // Show delivery address
            restaurantAddress.style.display = 'none'; // Hide restaurant address
        } else {
            deliveryAddress.style.display = 'none'; // Hide delivery address
        }
        updateTotalPrice(); // Recalculate total price with delivery
    })


    // Add functionality for quantity increase, decrease, and delete

// Ensure that you also check if any other event listeners might be causing the issue
