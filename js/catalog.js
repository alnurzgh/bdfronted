// Catalog Page JavaScript

// Mock product data
const products = [
  {
    id: 1,
    title: "Until August",
    author: "Gabriel García Márquez",
    price: 23.00,
    category: "fiction",
    rating: 5,
    image: "images/v93_62.png",
    inStock: true,
    isNew: true
  },
  {
    id: 2,
    title: "Barren Lives",
    author: "Graciliano Ramos",
    price: 32.00,
    category: "fiction",
    rating: 4,
    image: "images/v93_66.png",
    inStock: true,
    isNew: false
  },
  {
    id: 3,
    title: "Dream Count",
    author: "Chimamanda Ngozi Adichie",
    price: 35.50,
    category: "fiction",
    rating: 5,
    image: "images/v93_70.png",
    inStock: true,
    isNew: false
  },
  {
    id: 4,
    title: "The Blue Hour",
    author: "Paula Hawkins",
    price: 17.50,
    category: "fiction",
    rating: 4,
    image: "images/v93_74.png",
    inStock: true,
    isNew: false
  },
  {
    id: 5,
    title: "Homegoing",
    author: "Yaa Gyasi",
    price: 23.00,
    category: "fiction",
    rating: 5,
    image: "images/v93_78.png",
    inStock: true,
    isNew: false
  },
  {
    id: 6,
    title: "Stay With Me",
    author: "Ayọ̀bámi Adébáyọ̀",
    price: 18.00,
    category: "fiction",
    rating: 4,
    image: "images/v93_82.png",
    inStock: true,
    isNew: false
  },
  {
    id: 7,
    title: "White Teeth",
    author: "Zadie Smith",
    price: 15.00,
    category: "fiction",
    rating: 5,
    image: "images/v93_86.png",
    inStock: false,
    isNew: false
  },
  {
    id: 8,
    title: "Open Water",
    author: "Caleb Azumah Nelson",
    price: 17.50,
    category: "fiction",
    rating: 4,
    image: "images/v93_90.png",
    inStock: true,
    isNew: false
  },
  {
    id: 9,
    title: "Circe",
    author: "Madeline Miller",
    price: 23.50,
    category: "fiction",
    rating: 5,
    image: "images/v93_94.png",
    inStock: true,
    isNew: false
  },
  {
    id: 10,
    title: "There There",
    author: "Tommy Orange",
    price: 18.00,
    category: "fiction",
    rating: 4,
    image: "images/v93_98.png",
    inStock: true,
    isNew: false
  },
  {
    id: 11,
    title: "American Dirt",
    author: "Jeanine Cummins",
    price: 15.00,
    category: "fiction",
    rating: 3,
    image: "images/v93_102.png",
    inStock: true,
    isNew: false
  },
  {
    id: 12,
    title: "Milk And Honey",
    author: "Rupi Kaur",
    price: 17.50,
    category: "psychology",
    rating: 5,
    image: "images/v93_106.png",
    inStock: true,
    isNew: false
  },
  {
    id: 13,
    title: "Atomic Habits",
    author: "James Clear",
    price: 28.00,
    category: "business",
    rating: 5,
    image: "images/v93_110.png",
    inStock: true,
    isNew: true
  },
  {
    id: 14,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    price: 32.00,
    category: "nonfiction",
    rating: 5,
    image: "images/v93_114.png",
    inStock: true,
    isNew: false
  },
  {
    id: 15,
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    price: 29.00,
    category: "psychology",
    rating: 5,
    image: "images/v93_118.png",
    inStock: true,
    isNew: false
  },
  {
    id: 16,
    title: "The Lean Startup",
    author: "Eric Ries",
    price: 26.00,
    category: "business",
    rating: 4,
    image: "images/v93_122.png",
    inStock: true,
    isNew: false
  }
];

// State
let filteredProducts = [...products];
let currentSort = 'popular';
let filters = {
  categories: [],
  priceMin: null,
  priceMax: null,
  ratings: [],
  availability: []
};

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const productCount = document.getElementById('productCount');
const sortSelect = document.getElementById('sortSelect');
const filterToggle = document.getElementById('filterToggle');
const catalogSidebar = document.getElementById('catalogSidebar');
const applyFiltersBtn = document.getElementById('applyFilters');
const resetFiltersBtn = document.getElementById('resetFilters');

// Initialize
function init() {
  renderProducts();
  setupEventListeners();
}

// Render products
function renderProducts() {
  if (filteredProducts.length === 0) {
    productsGrid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <svg class="empty-state__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <h2 class="empty-state__title">Ничего не найдено</h2>
        <p class="empty-state__text">Попробуйте изменить фильтры или поисковый запрос</p>
        <button class="btn btn--primary" onclick="resetFilters()">Сбросить фильтры</button>
      </div>
    `;
    productCount.textContent = '0';
    return;
  }

  productsGrid.innerHTML = filteredProducts.map(product => `
    <article class="product-card" data-product-id="${product.id}">
      <div class="product-card__image-wrapper">
        <div class="book-3d">
          <img src="${product.image}" alt="${product.title}" class="product-card__image">
        </div>
      </div>
      ${product.isNew ? '<div class="product-card__badge">Новинка</div>' : ''}
      ${!product.inStock ? '<div class="product-card__badge" style="background: var(--color-gray-500);">Нет в наличии</div>' : ''}
      <button class="product-card__wishlist" aria-label="Добавить в избранное">
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
        </svg>
      </button>
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

  productCount.textContent = filteredProducts.length;

  // Add click handlers to product cards
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (!e.target.closest('.product-card__wishlist') && !e.target.closest('.product-card__add-btn')) {
        const productId = card.dataset.productId;
        window.location.href = `product.html?id=${productId}`;
      }
    });
  });
}

// Apply filters
function applyFilters() {
  filteredProducts = products.filter(product => {
    // Category filter
    if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
      return false;
    }

    // Price filter
    if (filters.priceMin !== null && product.price < filters.priceMin) {
      return false;
    }
    if (filters.priceMax !== null && product.price > filters.priceMax) {
      return false;
    }

    // Rating filter
    if (filters.ratings.length > 0) {
      const hasMatchingRating = filters.ratings.some(rating => {
        if (rating === '5') return product.rating === 5;
        if (rating === '4') return product.rating >= 4;
        if (rating === '3') return product.rating >= 3;
        return false;
      });
      if (!hasMatchingRating) return false;
    }

    // Availability filter
    if (filters.availability.length > 0) {
      if (filters.availability.includes('in-stock') && !product.inStock) {
        return false;
      }
      if (filters.availability.includes('pre-order') && product.inStock) {
        return false;
      }
    }

    return true;
  });

  sortProducts();
  renderProducts();
  
  // Close mobile sidebar
  if (catalogSidebar.classList.contains('mobile-active')) {
    catalogSidebar.classList.remove('mobile-active');
    document.body.style.overflow = '';
  }
}

// Sort products
function sortProducts() {
  switch (currentSort) {
    case 'price-asc':
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case 'newest':
      filteredProducts.sort((a, b) => b.isNew - a.isNew);
      break;
    case 'name':
      filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'popular':
    default:
      filteredProducts.sort((a, b) => b.rating - a.rating);
      break;
  }
}

// Reset filters
function resetFilters() {
  filters = {
    categories: [],
    priceMin: null,
    priceMax: null,
    ratings: [],
    availability: []
  };

  // Reset form inputs
  document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
  document.getElementById('priceMin').value = '';
  document.getElementById('priceMax').value = '';

  filteredProducts = [...products];
  sortProducts();
  renderProducts();
}

// Setup event listeners
function setupEventListeners() {
  // Sort select
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      sortProducts();
      renderProducts();
    });
  }

  // Filter toggle (mobile)
  if (filterToggle) {
    filterToggle.addEventListener('click', () => {
      catalogSidebar.classList.toggle('mobile-active');
      document.body.style.overflow = catalogSidebar.classList.contains('mobile-active') ? 'hidden' : '';
    });
  }

  // Apply filters button
  if (applyFiltersBtn) {
    applyFiltersBtn.addEventListener('click', () => {
      // Collect filter values
      filters.categories = Array.from(document.querySelectorAll('input[name="category"]:checked'))
        .map(cb => cb.value);
      
      filters.ratings = Array.from(document.querySelectorAll('input[name="rating"]:checked'))
        .map(cb => cb.value);
      
      filters.availability = Array.from(document.querySelectorAll('input[name="availability"]:checked'))
        .map(cb => cb.value);
      
      const priceMin = document.getElementById('priceMin').value;
      const priceMax = document.getElementById('priceMax').value;
      filters.priceMin = priceMin ? parseFloat(priceMin) : null;
      filters.priceMax = priceMax ? parseFloat(priceMax) : null;

      applyFilters();
    });
  }

  // Reset filters button
  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener('click', resetFilters);
  }

  // Close sidebar when clicking outside (mobile)
  document.addEventListener('click', (e) => {
    if (catalogSidebar.classList.contains('mobile-active') &&
        !catalogSidebar.contains(e.target) &&
        !filterToggle.contains(e.target)) {
      catalogSidebar.classList.remove('mobile-active');
      document.body.style.overflow = '';
    }
  });
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Export for use in other scripts
window.catalogProducts = products;
