// Product Data (This would typically come from a database)
const products = [
    { id: 1, name: "Laptop", price: 999.99, image: "images2/images-1.webp" },
    { id: 2, name: "Smartphone", price: 699.99, image: "images2/61L1ItFgFHL.jpg" },
    { id: 3, name: "Headphones", price: 199.99, image: "images2/239033_0_aq6dfy.png" },
    { id: 4, name: "Smartwatch", price: 249.99, image: "images2/Hammerglidebluetoothcallingsmartwatch_1.webp" },
    { id: 5, name: "Tablet", price: 499.99, image: "images2/images.jpeg" },
];

// Cart data
let cart = [];

// Render Product List
const productContainer = document.querySelector(".products-container");
const recommendationContainer = document.querySelector("#recommendations .products-container");
const cartLink = document.getElementById("cart-link");
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");

// Render all products
function renderProducts() {
    products.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("product-item");
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productContainer.appendChild(productElement);
    });
}

// Render Recommended Products (just showcasing a few)
function renderRecommendations() {
    products.slice(0, 3).forEach(product => {
        const recommendedElement = document.createElement("div");
        recommendedElement.classList.add("product-item");
        recommendedElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        recommendationContainer.appendChild(recommendedElement);
    });
}

// Add to Cart Functionality
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCart();
}

// Update Cart Display
function updateCart() {
    // Update cart count
    cartCount.textContent = cart.length;

    // Update cart items list
    cartItems.innerHTML = "";
    cart.forEach(product => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button onclick="removeFromCart(${product.id})">Remove</button>
        `;
        cartItems.appendChild(cartItem);
    });

    // Update total price
    const total = cart.reduce((sum, product) => sum + product.price, 0);
    totalPrice.textContent = total.toFixed(2);
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(p => p.id !== productId);
    updateCart();
}

// Checkout Button
document.getElementById("checkout").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        alert("Proceeding to checkout...");
    }
});

// Show Cart when clicked
cartLink.addEventListener("click", () => {
    const cartSection = document.getElementById("cart");
    cartSection.style.display = cartSection.style.display === "none" ? "block" : "none";
});

// Initialize
renderProducts();
renderRecommendations();
