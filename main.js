const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const scrollRevealOption = {
  origin: "bottom",
  distance: "50px",
  duration: 1000,
};

ScrollReveal().reveal(".header__image img", {
  ...scrollRevealOption,
  origin: "right",
});
ScrollReveal().reveal(".header__content h1", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".header__content p", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".header__btns", {
  ...scrollRevealOption,
  delay: 1500,
});

const banner = document.querySelector(".banner__container");

const bannerContent = Array.from(banner.children);

bannerContent.forEach((item) => {
  const duplicateNode = item.cloneNode(true);
  duplicateNode.setAttribute("aria-hidden", true);
  banner.appendChild(duplicateNode);
});

ScrollReveal().reveal(".arrival__card", {
  ...scrollRevealOption,
  interval: 500,
});

ScrollReveal().reveal(".sale__image img", {
  ...scrollRevealOption,
  origin: "left",
});
ScrollReveal().reveal(".sale__content h2", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".sale__content p", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".sale__content h4", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".sale__btn", {
  ...scrollRevealOption,
  delay: 1500,
});

ScrollReveal().reveal(".favourite__card", {
  ...scrollRevealOption,
  interval: 500,
});



document.addEventListener("DOMContentLoaded", function () {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || {}; // Load cart from storage

  // Function to update the cart count display (counts unique products)
  function updateCartCount() {
    let uniqueProductsCount = Object.keys(cartItems).filter((key) => cartItems[key].quantity > 0).length;
    document.getElementById("cart-count").innerText = uniqueProductsCount;
  }

  // Loop through all arrival cards
  document.querySelectorAll(".arrival__card").forEach((card) => {
    let productImage = card.querySelector(".arrival__image img").src;
    let productName = card.querySelector(".arrival__image img").alt;
    let quantitySpan = card.querySelector(".quantity");
    let decrementBtn = card.querySelector(".decrement");
    let incrementBtn = card.querySelector(".increment");
    let addToCartBtn = card.querySelector(".add-to-cart");
    let quantityControl = card.querySelector(".quantity-control");

    let quantity = 0; // Default quantity (should be 0 on page load)
    
    // Ensure UI starts with everything deselected
    quantityControl.style.display = "none";
    quantitySpan.innerText = "0";

    // If the product was already in cart, load its quantity
    if (cartItems[productName]) {
      quantity = cartItems[productName].quantity;
      quantitySpan.innerText = quantity;
      if (quantity > 0) {
        quantityControl.style.display = "flex"; // Show + - buttons if selected
      }
    }

    // Add to Cart button click
    addToCartBtn.addEventListener("click", function () {
      if (!(productName in cartItems) || quantity === 0) {
        quantity = 1; // Start with 1
        cartItems[productName] = { image: productImage, quantity: quantity };
        quantityControl.style.display = "flex"; // Show + - buttons
      }
      quantitySpan.innerText = quantity;
      localStorage.setItem("cartItems", JSON.stringify(cartItems)); // Save cart
      updateCartCount(); // Ensure cart count updates instantly
    });

    // Decrease quantity
    decrementBtn.addEventListener("click", function () {
      if (quantity > 1) {
        quantity--;
        cartItems[productName].quantity = quantity;
      } else {
        quantity = 0;
        delete cartItems[productName]; // Remove product from cart
        quantityControl.style.display = "none"; // Hide + - buttons
      }
      quantitySpan.innerText = quantity;
      localStorage.setItem("cartItems", JSON.stringify(cartItems)); // Save cart
      updateCartCount(); // Ensure cart count updates instantly
    });

    // Increase quantity
    incrementBtn.addEventListener("click", function () {
      quantity++;
      cartItems[productName].quantity = quantity;
      quantitySpan.innerText = quantity;
      localStorage.setItem("cartItems", JSON.stringify(cartItems)); // Save cart
      updateCartCount(); // Ensure cart count updates instantly
    });
  });

  // Redirect to cart page when cart icon is clicked
  document.querySelector(".cart-container").addEventListener("click", function () {
    window.location.href = "cart.html"; // Redirect to cart page
  });

  // Initialize cart count
  updateCartCount();
});

document.addEventListener("DOMContentLoaded", function () {
  let cartIcon = document.querySelector(".cart-container");
  
  if (cartIcon) {
    cartIcon.addEventListener("click", function () {
      window.location.href = "./cart.html"; // Ensure the correct file path
    });
  } else {
    console.error("Cart container not found. Check the selector.");
  }
});

