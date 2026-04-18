// Wishlist Page JavaScript

// DOM Elements
const wishlistGrid = document.getElementById('wishlistGrid');
const wishlistEmpty = document.getElementById('wishlistEmpty');
const wishlistCount = document.getElementById('wishlistCount');

// Get wishlist from localStorage
function getWishlistItems() {
  const wishlistIds = JSON.parse(localStorage.getItem('wishlist') || '[]');
  const allProducts = window.catalogProducts || [];
  
  console.log('Wishlist IDs from localStorage:', wishlistIds);
  console.log('All products available:', allProducts.length);
  
  // Filter products that are in wishlist - use loose comparison
  const items = allProducts.filter(product => 
    wishlistIds.some(id => id == product.id || id == product.title)
  );
  
  console.log('Filtered wishlist items:', items.length, items);
  return items;
}

// Render wishlist
function renderWishlist() {
  const items = getWishlistItems();
  
  if (items.length === 0) {
    wishlistGrid.style.display = 'none';
    wishlistEmpty.style.display = 'block';
    wishlistCount.textContent = '0';
    return;
  }
  
  wishlistGrid.style.display = 'grid';
  wishlistEmpty.style.display = 'none';
  wishlistCount.textContent = items.length;
  
  wishlistGrid.innerHTML = items.map(product => `
    <article class="product-card" data-product-id="${product.id}">
      <div class="product-card__image-wrapper">
        ${product.isNew ? '<div class="product-card__badge">Новинка</div>' : ''}
        <button class="product-card__wishlist product-card__wishlist--active" aria-label="Удалить из избранного" data-product-id="${product.id}">
          <svg width="20" height="20" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
        </button>
        <div class="book-3d">
          <img src="${product.image}" alt="${product.title}" class="product-card__image">
        </div>
      </div>
      <div class="product-card__content">
        <h3 class="product-card__title">${product.title}</h3>
        <p class="product-card__author">${product.author}</p>
        <div class="product-card__footer">
          <span class="product-card__price">$${product.price.toFixed(2)}</span>
          <button class="product-card__add-btn" aria-label="Добавить в корзину" ${!product.inStock ? 'disabled' : ''}>
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
          </button>
        </div>
      </div>
    </article>
  `).join('');
  
  // Add click handlers to product cards
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (!e.target.closest('.product-card__wishlist') && !e.target.closest('.product-card__add-btn')) {
        const productId = card.dataset.productId;
        window.location.href = `product.html?id=${productId}`;
      }
    });
  });
  
  // Add wishlist button handlers
  document.querySelectorAll('.product-card__wishlist').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const productId = btn.dataset.productId;
      removeFromWishlist(productId);
    });
  });
}

// Remove from wishlist
function removeFromWishlist(productId) {
  const wishlistIds = JSON.parse(localStorage.getItem('wishlist') || '[]');
  const index = wishlistIds.findIndex(id => id == productId);
  
  if (index > -1) {
    wishlistIds.splice(index, 1);
    localStorage.setItem('wishlist', JSON.stringify(wishlistIds));
    
    // Show notification
    if (typeof cart !== 'undefined') {
      cart.showNotification('Удалено из избранного');
    }
    
    // Re-render
    renderWishlist();
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  console.log('Wishlist page loading...');
  console.log('catalogProducts available:', !!window.catalogProducts);
  console.log('Products count:', window.catalogProducts ? window.catalogProducts.length : 0);
  renderWishlist();
});

console.log('Wishlist page initialized');
