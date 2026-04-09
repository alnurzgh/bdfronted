// Cart Page JavaScript

// DOM Elements
const cartItemsContainer = document.getElementById('cartItems');
const emptyCartSection = document.getElementById('emptyCart');
const cartLayout = document.getElementById('cartLayout');
const itemCountEl = document.getElementById('itemCount');
const subtotalEl = document.getElementById('subtotal');
const totalEl = document.getElementById('total');
const buyNowBtn = document.getElementById('buyNowBtn');
const promoInput = document.getElementById('promoInput');
const applyPromoBtn = document.getElementById('applyPromoBtn');
const promoMessage = document.getElementById('promoMessage');
const giftWrapCheckbox = document.getElementById('giftWrapCheckbox');
const purchaseModal = document.getElementById('purchaseModal');
const continueShopping = document.getElementById('continueShopping');
const viewOrder = document.getElementById('viewOrder');

// State
let appliedPromo = null;
const validPromoCodes = {
  'SAVE10': { discount: 0.10, type: 'percentage' },
  'BOOK20': { discount: 0.20, type: 'percentage' },
  'FREESHIP': { discount: 0, type: 'shipping' }
};

// Initialize
function init() {
  console.log('=== Cart Page Init ===');
  console.log('cartItemsContainer:', cartItemsContainer);
  console.log('emptyCartSection:', emptyCartSection);
  console.log('cartLayout:', cartLayout);
  
  // Wait for cart to be available
  if (typeof cart === 'undefined') {
    console.error('Cart not initialized');
    showEmptyCart();
    return;
  }
  
  console.log('Cart is available, items:', cart.items);
  
  renderCart();
  setupEventListeners();
}

// Render cart
function renderCart() {
  console.log('=== renderCart called ===');
  console.log('cart object:', cart);
  console.log('cart.items:', cart ? cart.items : 'cart is undefined');
  console.log('cart.items.length:', cart && cart.items ? cart.items.length : 'no items');
  
  if (!cart || !cart.items || cart.items.length === 0) {
    console.log('Showing empty cart');
    showEmptyCart();
    return;
  }

  console.log('Showing cart items');
  showCartItems();
  renderCartItems();
  updateSummary();
}

// Show empty cart
function showEmptyCart() {
  console.log('showEmptyCart called');
  if (cartLayout) {
    cartLayout.style.display = 'none';
    console.log('cartLayout hidden');
  }
  if (emptyCartSection) {
    emptyCartSection.style.display = 'block';
    console.log('emptyCartSection shown');
  }
}

// Show cart items
function showCartItems() {
  console.log('showCartItems called');
  if (cartLayout) {
    cartLayout.style.display = 'grid';
    console.log('cartLayout shown');
  }
  if (emptyCartSection) {
    emptyCartSection.style.display = 'none';
    console.log('emptyCartSection hidden');
  }
}

// Render cart items
function renderCartItems() {
  console.log('Rendering cart items:', cart.items);
  
  if (!cart.items || cart.items.length === 0) {
    console.log('No items to render');
    showEmptyCart();
    return;
  }
  
  const itemsHTML = cart.items.map(item => {
    console.log('Rendering item:', item);
    return `
    <article class="cart-item" data-item-id="${item.id}">
      <img src="${item.image}" alt="${item.title}" class="cart-item__image">
      
      <div class="cart-item__details">
        <div>
          <h3 class="cart-item__title">${item.title}</h3>
          <p class="cart-item__author">${item.author}</p>
        </div>
        <div class="cart-item__price">$${(item.price * item.quantity).toFixed(2)}</div>
      </div>
      
      <div class="cart-item__actions">
        <button class="cart-item__remove" data-item-id="${item.id}" aria-label="Удалить товар">
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
          </svg>
        </button>
        
        <div class="cart-item__quantity">
          <button class="cart-item__quantity-btn" data-action="decrease" data-item-id="${item.id}" ${item.quantity <= 1 ? 'disabled' : ''}>
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>
            </svg>
          </button>
          <span class="cart-item__quantity-value">${item.quantity}</span>
          <button class="cart-item__quantity-btn" data-action="increase" data-item-id="${item.id}" ${item.quantity >= 10 ? 'disabled' : ''}>
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
          </button>
        </div>
      </div>
    </article>
  `;
  }).join('');
  
  console.log('Setting innerHTML with', cart.items.length, 'items');
  cartItemsContainer.innerHTML = itemsHTML;
}

// Update summary
function updateSummary() {
  const itemCount = cart.getItemCount();
  const subtotal = cart.getTotal();
  let discount = 0;
  
  // Apply promo code discount
  if (appliedPromo && appliedPromo.type === 'percentage') {
    discount = subtotal * appliedPromo.discount;
  }
  
  // Add gift wrap cost
  const giftWrapCost = giftWrapCheckbox && giftWrapCheckbox.checked ? 5.00 : 0;
  
  const total = subtotal - discount + giftWrapCost;
  
  itemCountEl.textContent = itemCount;
  subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  totalEl.textContent = `$${total.toFixed(2)}`;
  
  // Show discount row if promo applied
  const existingDiscountRow = document.querySelector('.cart-summary__discount');
  if (discount > 0) {
    if (!existingDiscountRow) {
      const discountRow = document.createElement('div');
      discountRow.className = 'cart-summary__row cart-summary__discount';
      discountRow.innerHTML = `
        <span>Скидка:</span>
        <span style="color: #10b981;">-$${discount.toFixed(2)}</span>
      `;
      document.querySelector('.cart-summary__divider').insertAdjacentElement('beforebegin', discountRow);
    } else {
      existingDiscountRow.querySelector('span:last-child').textContent = `-$${discount.toFixed(2)}`;
    }
  } else if (existingDiscountRow) {
    existingDiscountRow.remove();
  }
}

// Setup event listeners
function setupEventListeners() {
  // Remove item
  cartItemsContainer.addEventListener('click', (e) => {
    const removeBtn = e.target.closest('.cart-item__remove');
    if (removeBtn) {
      const itemId = parseInt(removeBtn.dataset.itemId);
      removeItem(itemId);
    }
    
    // Quantity buttons
    const quantityBtn = e.target.closest('.cart-item__quantity-btn');
    if (quantityBtn) {
      const itemId = parseInt(quantityBtn.dataset.itemId);
      const action = quantityBtn.dataset.action;
      updateQuantity(itemId, action);
    }
  });
  
  // Add test items button
  const addTestItemsBtn = document.getElementById('addTestItems');
  if (addTestItemsBtn) {
    addTestItemsBtn.addEventListener('click', () => {
      addTestItems();
    });
  }
  
  // Buy Now button
  if (buyNowBtn) {
    buyNowBtn.addEventListener('click', handleBuyNow);
  }
  
  // Gift wrap checkbox
  if (giftWrapCheckbox) {
    giftWrapCheckbox.addEventListener('change', updateSummary);
  }
  
  // Modal close handlers
  if (continueShopping) {
    continueShopping.addEventListener('click', () => {
      purchaseModal.classList.remove('active');
      document.body.style.overflow = '';
      window.location.href = 'catalog.html';
    });
  }
  
  if (viewOrder) {
    viewOrder.addEventListener('click', () => {
      purchaseModal.classList.remove('active');
      document.body.style.overflow = '';
      window.location.href = 'profile.html';
    });
  }
  
  // Close modal on background click
  if (purchaseModal) {
    purchaseModal.addEventListener('click', (e) => {
      if (e.target === purchaseModal) {
        purchaseModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
  
  // Promo code
  if (applyPromoBtn) {
    applyPromoBtn.addEventListener('click', applyPromoCode);
  }
  
  if (promoInput) {
    promoInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        applyPromoCode();
      }
    });
  }
}

// Add test items to cart
function addTestItems() {
  const testProducts = [
    {
      id: 1,
      title: "Dream Count",
      author: "Chimamanda Ngozi Adichie",
      price: 35.50,
      image: "images/v93_70.png",
      quantity: 1
    },
    {
      id: 2,
      title: "Until August",
      author: "Gabriel García Márquez",
      price: 23.00,
      image: "images/v93_62.png",
      quantity: 1
    },
    {
      id: 3,
      title: "Barren Lives",
      author: "Graciliano Ramos",
      price: 32.00,
      image: "images/v93_66.png",
      quantity: 1
    }
  ];
  
  testProducts.forEach(product => {
    cart.addItem(product);
  });
  
  renderCart();
}

// Remove item
function removeItem(itemId) {
  const item = cart.items.find(i => i.id === itemId);
  if (!item) return;
  
  // Add fade out animation
  const itemEl = document.querySelector(`[data-item-id="${itemId}"]`);
  if (itemEl) {
    itemEl.style.animation = 'fadeOut 0.3s ease-out';
    setTimeout(() => {
      cart.removeItem(itemId);
      renderCart();
    }, 300);
  }
}

// Update quantity
function updateQuantity(itemId, action) {
  const item = cart.items.find(i => i.id === itemId);
  if (!item) return;
  
  const newQuantity = action === 'increase' ? item.quantity + 1 : item.quantity - 1;
  
  if (newQuantity < 1 || newQuantity > 10) return;
  
  cart.updateQuantity(itemId, newQuantity);
  renderCart();
}

// Apply promo code
function applyPromoCode() {
  const code = promoInput.value.trim().toUpperCase();
  
  if (!code) {
    showPromoMessage('Введите промокод', 'error');
    return;
  }
  
  if (validPromoCodes[code]) {
    appliedPromo = validPromoCodes[code];
    let message = '';
    
    if (appliedPromo.type === 'percentage') {
      message = `Промокод применен! Скидка ${(appliedPromo.discount * 100).toFixed(0)}%`;
    } else if (appliedPromo.type === 'shipping') {
      message = 'Промокод применен! Бесплатная доставка';
    }
    
    showPromoMessage(message, 'success');
    updateSummary();
    promoInput.value = '';
    applyPromoBtn.textContent = 'Применено';
    applyPromoBtn.disabled = true;
  } else {
    showPromoMessage('Неверный промокод', 'error');
  }
}

// Show promo message
function showPromoMessage(message, type) {
  promoMessage.textContent = message;
  promoMessage.className = `promo-code__message ${type}`;
  
  setTimeout(() => {
    if (type === 'error') {
      promoMessage.textContent = '';
      promoMessage.className = 'promo-code__message';
    }
  }, 3000);
}

// Handle Buy Now
function handleBuyNow() {
  if (!cart || cart.items.length === 0) {
    cart.showNotification('Корзина пуста');
    return;
  }
  
  const subtotal = cart.getTotal();
  let discount = 0;
  
  if (appliedPromo && appliedPromo.type === 'percentage') {
    discount = subtotal * appliedPromo.discount;
  }
  
  const giftWrapCost = giftWrapCheckbox && giftWrapCheckbox.checked ? 5.00 : 0;
  const total = subtotal - discount + giftWrapCost;
  
  // Show loading state
  buyNowBtn.innerHTML = '<span class="loading-spinner"></span> Обработка...';
  buyNowBtn.disabled = true;
  
  // Simulate purchase process
  setTimeout(() => {
    // Reset button
    buyNowBtn.innerHTML = 'Купить сейчас';
    buyNowBtn.disabled = false;
    
    // Create order and save to orders
    if (typeof orders !== 'undefined') {
      const order = orders.createOrder(
        cart.items,
        subtotal,
        discount,
        giftWrapCheckbox && giftWrapCheckbox.checked
      );
      console.log('Order created:', order);
    }
    
    // Build purchase details
    let detailsHTML = `
      <div class="purchase-modal__detail-row">
        <span class="purchase-modal__detail-label">Товары:</span>
        <span class="purchase-modal__detail-value">${cart.getItemCount()} шт.</span>
      </div>
      <div class="purchase-modal__detail-row">
        <span class="purchase-modal__detail-label">Сумма:</span>
        <span class="purchase-modal__detail-value">$${subtotal.toFixed(2)}</span>
      </div>
    `;
    
    if (discount > 0) {
      detailsHTML += `
        <div class="purchase-modal__detail-row">
          <span class="purchase-modal__detail-label">Скидка:</span>
          <span class="purchase-modal__detail-value" style="color: #10b981;">-$${discount.toFixed(2)}</span>
        </div>
      `;
    }
    
    if (giftWrapCost > 0) {
      detailsHTML += `
        <div class="purchase-modal__detail-row">
          <span class="purchase-modal__detail-label">Подарочная упаковка:</span>
          <span class="purchase-modal__detail-value">$${giftWrapCost.toFixed(2)}</span>
        </div>
      `;
    }
    
    detailsHTML += `
      <div class="purchase-modal__detail-row">
        <span class="purchase-modal__detail-label">Итого:</span>
        <span class="purchase-modal__detail-value">$${total.toFixed(2)}</span>
      </div>
    `;
    
    // Show purchase details in modal
    const purchaseDetails = document.getElementById('purchaseDetails');
    purchaseDetails.innerHTML = detailsHTML;
    
    // Show modal
    purchaseModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Clear cart after successful purchase
    setTimeout(() => {
      cart.clearCart();
    }, 500);
  }, 1500);
}

// Add fade out animation
const fadeOutStyle = document.createElement('style');
fadeOutStyle.textContent = `
  @keyframes fadeOut {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(-20px);
    }
  }
`;
document.head.appendChild(fadeOutStyle);

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

console.log('Cart page initialized');
console.log('Cart object:', typeof cart !== 'undefined' ? cart : 'undefined');
console.log('Cart items:', typeof cart !== 'undefined' && cart.items ? cart.items : 'no items');
