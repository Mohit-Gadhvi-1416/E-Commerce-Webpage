document.addEventListener("DOMContentLoaded", function () {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || {};
    let cartContainer = document.getElementById("cart-items");
    let totalItemsDisplay = document.getElementById("total-items");
    let totalPriceDisplay = document.getElementById("total-price");

    function updateCartDisplay() {
        cartContainer.innerHTML = ""; // Clear previous items
        let totalItems = 0;
        let totalPrice = 0;

        if (Object.keys(cartItems).length === 0) {
            cartContainer.innerHTML = "<p class='empty-cart'>Your cart is empty.</p>";
        } else {
            Object.keys(cartItems).forEach((product) => {
                let item = cartItems[product];
                totalItems += item.quantity;
                totalPrice += item.quantity * 20; // Example: Assume each product costs $20

                let cartItem = document.createElement("div");
                cartItem.classList.add("cart-item");
                cartItem.innerHTML = `
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${product}">
                    </div>
                    <div class="cart-item-details">
                        <h3>${product}</h3>
                        <p>Price: $20</p>
                        <p>Quantity: <span class="cart-quantity">${item.quantity}</span></p>
                        <button class="remove-btn" data-product="${product}">Remove</button>
                    </div>
                `;
                cartContainer.appendChild(cartItem);
            });

            // Add event listeners for remove buttons
            document.querySelectorAll(".remove-btn").forEach(button => {
                button.addEventListener("click", function () {
                    let productToRemove = this.getAttribute("data-product");
                    delete cartItems[productToRemove];
                    localStorage.setItem("cartItems", JSON.stringify(cartItems));
                    updateCartDisplay();
                });
            });
        }

        totalItemsDisplay.innerText = totalItems;
        totalPriceDisplay.innerText = totalPrice.toFixed(2);
    }

    document.getElementById("proceed-to-buy").addEventListener("click", function () {
        if (Object.keys(cartItems).length === 0) {
            alert("Your cart is empty!");
            return;
        }

        // Store order details in localStorage
        localStorage.setItem("orderItems", JSON.stringify(cartItems));

        alert("Proceeding to checkout...");
        localStorage.removeItem("cartItems"); // Clear cart after purchase
        window.location.href = "order-tracking.html"; // Redirect to order tracking page
    });

    updateCartDisplay();
});
