document.addEventListener("DOMContentLoaded", function () {
    let orderItems = JSON.parse(localStorage.getItem("orderItems")) || {};
    let orderContainer = document.getElementById("order-items");

    if (!orderContainer) {
        console.error("Error: Order container not found!");
        return;
    }

    if (Object.keys(orderItems).length === 0) {
        orderContainer.innerHTML = "<p class='empty-order'>No orders placed yet.</p>";
    } else {
        Object.keys(orderItems).forEach((product) => {
            let item = orderItems[product];

            let orderItem = document.createElement("div");
            orderItem.classList.add("order-item");
            orderItem.innerHTML = `
                <div class="order-item-image">
                    <img src="${item.image}" alt="${product}">
                </div>
                <div class="order-item-details">
                    <h3>${product}</h3>
                    <p>Quantity: <span class="order-quantity">${item.quantity}</span></p>
                    <p>Price: $${item.price || "20"}</p>
                    <p class="status">Status: <span class="delivered">Delivered</span></p>
                </div>
            `;
            orderContainer.appendChild(orderItem);
        });
    }
});

// Redirect to feedback page
window.redirectToFeedback = function () {
    window.location.href = "https://cloth-defect-detection.streamlit.app/";
};


document.addEventListener("DOMContentLoaded", function () {
    displayOrderItems();
});

function displayOrderItems() {
    const orderItemsContainer = document.getElementById("order-items");
    const emptyCartMessage = document.querySelector(".empty-cart-message");
    
    // Fetch cart items from localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // If cart is empty, show message
    if (cart.length === 0) {
        emptyCartMessage.style.display = "block";
        return;
    }

    emptyCartMessage.style.display = "none";
    orderItemsContainer.innerHTML = ""; // Clear previous content

    // Create order items dynamically
    cart.forEach(item => {
        const itemCard = document.createElement("div");
        itemCard.classList.add("order-item");

        itemCard.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="order-item-img">
            <div class="order-item-details">
                <h3>${item.name}</h3>
                <p>Quantity: ${item.quantity}</p>
                <p>Price: ₹${item.price}</p>
            </div>
        `;

        orderItemsContainer.appendChild(itemCard);
    });
}
