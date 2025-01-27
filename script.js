// Function to add an item to the cart
function addToCart(itemName, itemPrice) {
    const cart = JSON.parse(localStorage.getItem('cart')) || {}; // Retrieve cart from localStorage or initialize

    // Add or update the item in the cart
    if (cart[itemName]) {
        cart[itemName].quantity += 1;
    } else {
        cart[itemName] = { price: itemPrice, quantity: 1 };
    }

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Notify the user
    alert(`${itemName} has been added to the cart!`);

    // Update the cart icon
    updateCartIcon();
}

// Function to remove an item from the cart
function removeFromCart(itemName) {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};

    if (cart[itemName]) {
        delete cart[itemName]; // Remove the item from the cart
    }

    // Save the updated cart or clear localStorage if empty
    if (Object.keys(cart).length === 0) {
        localStorage.removeItem('cart');
    } else {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Update the cart display and icon
    displayCart();
    updateCartIcon();
}

// Function to increase the quantity of an item
function increaseQuantity(itemName) {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};

    if (cart[itemName]) {
        cart[itemName].quantity += 1;
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Update the cart display and icon
    displayCart();
    updateCartIcon();
}

// Function to decrease the quantity of an item
function decreaseQuantity(itemName) {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};

    if (cart[itemName]) {
        cart[itemName].quantity -= 1;

        // Remove the item if quantity reaches 0
        if (cart[itemName].quantity <= 0) {
            delete cart[itemName];
        }

        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Update the cart display and icon
    displayCart();
    updateCartIcon();
}

// Function to display the cart (used in cart.html)
function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    const cartContainer = document.querySelector('.cart-container');

    if (!cartContainer) {
        console.error('Cart container not found!');
        return;
    }

    cartContainer.innerHTML = ''; // Clear the cart container

    // Check if the cart is empty
    if (Object.keys(cart).length === 0) {
        cartContainer.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
        return;
    }

    let total = 0;
    let cartHTML = '<div class="cart-items">';

    // Iterate through the cart and render each item
    for (const [itemName, details] of Object.entries(cart)) {
        const itemTotal = details.quantity * details.price;
        total += itemTotal;

        cartHTML += `
            <div class="cart-item">
                <p><strong>${itemName}</strong></p>
                <p>Price: Rs.${details.price}</p>
                <p>
                    Quantity: 
                    <button onclick="decreaseQuantity('${itemName}')">-</button>
                    ${details.quantity}
                    <button onclick="increaseQuantity('${itemName}')">+</button>
                </p>
                <p>Total: Rs.${itemTotal}</p>
                <button class="remove-item" onclick="removeFromCart('${itemName}')">Remove</button>
            </div>
        `;
    }

    cartHTML += `
        </div>
        <div class="cart-summary">
            <p><strong>Total: Rs.${total}</strong></p>
            <button class="checkout-button" onclick="navigateToWhatsApp()">Checkout on WhatsApp</button>
        </div>
    `;

    cartContainer.innerHTML = cartHTML;
}

// Function to navigate to WhatsApp for checkout
function navigateToWhatsApp() {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    let message = 'Hello, I would like to order:\n';
    let total = 0;

    for (const [itemName, details] of Object.entries(cart)) {
        message += `${itemName} - Quantity: ${details.quantity}, Total: Rs.${details.quantity * details.price}\n`;
        total += details.quantity * details.price;
    }

    message += `Total: Rs.${total}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/919962150198?text=${encodedMessage}`;
    window.open(whatsappLink, '_blank');
}
function toggleMenu() {
    const sideMenu = document.getElementById('sideMenu');
    const overlay = document.getElementById('overlay');
    const menuButton = document.getElementById('menuButton');
    const isActive = sideMenu.classList.contains('active');

    if (isActive) {
        closeMenu();
    } else {
        sideMenu.classList.add('active');
        overlay.classList.add('active');
        menuButton.classList.add('hidden');
    }
}

function toggleDescription(id) {
    const description = document.getElementById(id);
    const fishContainer = description.closest('.fishdetails');

    if (description.style.display === "none") {
        description.style.display = "block";
        fishContainer.style.height = "auto"; // Expand the container height
    } else {
        description.style.display = "none";
        fishContainer.style.height = ""; // Reset to default height
    }
}



// Close Side Menu
function closeMenu() {
    const sideMenu = document.getElementById('sideMenu');
    const overlay = document.getElementById('overlay');
    const menuButton = document.getElementById('menuButton');
    sideMenu.classList.remove('active');
    overlay.classList.remove('active');
    menuButton.classList.remove('hidden');
}
// Smooth scroll to contact section
function scrollToContact() {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

// Function to update the cart icon
function updateCartIcon() {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    let totalItems = 0;

    for (const item in cart) {
        totalItems += cart[item].quantity;
    }

    const cartIcon = document.querySelector('.cart-icon');
    if (totalItems > 0) {
        cartIcon.style.display = 'inline';
        cartIcon.textContent = totalItems;
    } else {
        cartIcon.style.display = 'none';
    }
}

// Initialize the cart display and cart icon on page load
document.addEventListener('DOMContentLoaded', () => {
    displayCart();
    updateCartIcon();
});
