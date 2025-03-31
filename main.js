document.addEventListener("DOMContentLoaded", function () {
    const cart = [];
    const cartItemsList = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const totalPrice = document.getElementById("total-price");
    const modal = document.getElementById("order-modal");
    const closeModal = document.querySelector(".close-btn");
    const confirmOrderBtn = document.getElementById("confirm-order");
    const orderSummary = document.getElementById("order-summary");
    const orderTotal = document.getElementById("order-total");

    function updateCart() {
        cartItemsList.innerHTML = "";
        let total = 0;
        
        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                ${item.name} ($${item.price.toFixed(2)}) x ${item.quantity}
                <button class="remove" data-index="${index}">❌</button>
            `;
            cartItemsList.appendChild(listItem);
        });

        cartCount.innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
        totalPrice.innerText = total.toFixed(2);
    }

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            let itemElement = this.closest('.item');
            let itemName = itemElement.getAttribute("data-name");
            let itemPrice = parseFloat(itemElement.getAttribute("data-price"));
            
            let existingItem = cart.find(item => item.name === itemName);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ name: itemName, price: itemPrice, quantity: 1 });
            }
            updateCart();      
            this.style.display = 'none';
            let counter = this.nextElementSibling;
            counter.style.opacity = '1';
            counter.style.visibility = 'visible';
        });
    });

    cartItemsList.addEventListener("click", function (event) {
        const index = event.target.getAttribute("data-index");
        if (index === null) return;

        if (event.target.classList.contains("plus")) {
            cart[index].quantity++;
        } else if (event.target.classList.contains("minus")) {
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            } else {
                cart.splice(index, 1);
            }
        } else if (event.target.classList.contains("remove")) {
            cart.splice(index, 1);
        }

        updateCart();
    });

    confirmOrderBtn.addEventListener("click", function () {
        if (cart.length === 0) {
            alert("Savatcha bo'sh!");
        } else {
            orderSummary.innerHTML = "";
            let total = 0;
            cart.forEach(item => {
                let listItem = document.createElement("li");
                listItem.textContent = `${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
                orderSummary.appendChild(listItem);
                total += item.price * item.quantity;
            });
            orderTotal.innerText = total.toFixed(2);
            
            modal.style.display = "block";
            cart.length = 0;
            updateCart();
        }
    });

    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
