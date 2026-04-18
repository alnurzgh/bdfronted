// Catalog Page JavaScript

// Mock product data
const products = [
  {
    id: 1,
    title: "Until August",
    author: "Gabriel García Márquez",
    price: 23.00,
    category: "fiction",
    genre: "literary-fiction",
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
    genre: "literary-fiction",
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
    genre: "literary-fiction",
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
    genre: "thriller",
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
    genre: "historical",
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
    genre: "literary-fiction",
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
    genre: "literary-fiction",
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
    genre: "literary-fiction",
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
    genre: "mythology",
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
    genre: "literary-fiction",
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
    genre: "thriller",
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
    genre: "poetry",
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
    genre: "self-help",
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
    genre: "historical",
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
    genre: "self-help",
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
    genre: "self-help",
    rating: 4,
    image: "images/v93_122.png",
    inStock: true,
    isNew: false
  },
  {
    id: 17,
    title: "Дневники вампира. Пробуждение",
    author: "Лиза Джейн Смит",
    price: 18.50,
    category: "fiction",
    genre: "literary-fiction",
    rating: 5,
    image: "newbooks/Дневники вампира. Пробуждение/image.jpg",
    inStock: true,
    isNew: true
  },
  {
    id: 18,
    title: "Божественная комедия",
    author: "Данте Алигьери",
    price: 35.00,
    category: "fiction",
    genre: "poetry",
    rating: 5,
    image: "newbooks/Божественная комедия/image.png",
    inStock: true,
    isNew: true
  },
  {
    id: 19,
    title: "Сага о Форсайтах",
    author: "Джон Голсуорси",
    price: 42.00,
    category: "fiction",
    genre: "historical",
    rating: 5,
    image: "newbooks/Сага о Форсайтах/image.png",
    inStock: true,
    isNew: true
  },
  {
    id: 20,
    title: "Спеши любить",
    author: "Николас Спаркс",
    price: 16.00,
    category: "fiction",
    genre: "literary-fiction",
    rating: 5,
    image: "newbooks/Спеши любить/image.png",
    inStock: true,
    isNew: true
  },
  {
    id: 21,
    title: "Земля",
    author: "Эмиль Золя",
    price: 28.00,
    category: "fiction",
    genre: "historical",
    rating: 4,
    image: "newbooks/Земля/image.png",
    inStock: true,
    isNew: true
  },
  {
    id: 22,
    title: "Незнакомка из Уайлдфелл-Холла",
    author: "Энн Бронте",
    price: 22.00,
    category: "fiction",
    genre: "literary-fiction",
    rating: 4,
    image: "newbooks/Незнакомка из Уайлдфелл-Холла/image.png",
    inStock: true,
    isNew: true
  },
  {
    id: 23,
    title: "Убить пересмешника",
    author: "Харпер Ли",
    price: 24.00,
    category: "fiction",
    genre: "literary-fiction",
    rating: 5,
    image: "newbooks/Убить пересменщика/image.png",
    inStock: true,
    isNew: true
  },
  {
    id: 24,
    title: "Таинственный сад",
    author: "Фрэнсис Бёрнетт",
    price: 19.00,
    category: "fiction",
    genre: "literary-fiction",
    rating: 5,
    image: "newbooks/Таинственный сад/image.png",
    inStock: true,
    isNew: true
  },
  {
    id: 25,
    title: "Убийство на поле для гольфа",
    author: "Агата Кристи",
    price: 21.00,
    category: "fiction",
    genre: "thriller",
    rating: 4,
    image: "newbooks/Убийство на поле для гольфа/image.png",
    inStock: true,
    isNew: true
  },
  {
    id: 26,
    title: "Invincible Vol. 23: Full House",
    author: "Роберт Киркман",
    price: 28.00,
    category: "fiction",
    genre: "comics",
    rating: 5,
    image: "newbooks/Invincible Vol 23 Full House/image.png",
    inStock: true,
    isNew: true
  },
  {
    id: 27,
    title: "Непобедимый. Том 1: Семейные дела",
    author: "Роберт Киркман",
    price: 25.00,
    category: "fiction",
    genre: "comics",
    rating: 5,
    image: "newbooks/Непобедимый Том 1 Семейные дела/image.png",
    inStock: true,
    isNew: true
  },
  {
    id: 28,
    title: "Непобедимый. Том 12: Всё ещё стоим",
    author: "Роберт Киркман",
    price: 27.00,
    category: "fiction",
    genre: "comics",
    rating: 5,
    image: "newbooks/Непобедимый том 12 Всё ещё стоим/image.png",
    inStock: true,
    isNew: true
  },
  {
    id: 29,
    title: "Магическая битва. Том 28",
    author: "Гэгэ Акутами",
    price: 22.00,
    category: "fiction",
    genre: "comics",
    rating: 5,
    image: "newbooks/Магическая битва Том 28/image.png",
    inStock: true,
    isNew: true
  },
  {
    id: 30,
    title: "Сумерки",
    author: "Стефани Майер",
    price: 19.50,
    category: "fiction",
    genre: "fantasy",
    rating: 5,
    image: "newbooks/Сумерки/image.png",
    inStock: true,
    isNew: true
  },
  {
    id: 31,
    title: "Ведьмак. Крещение огнем",
    author: "Анджей Сапковский",
    price: 26.00,
    category: "fiction",
    genre: "fantasy",
    rating: 5,
    image: "newbooks/Ведьмак. Крещение огнем/image.png",
    inStock: true,
    isNew: true
  },
  {
    id: 32,
    title: "Бегущий в лабиринте",
    author: "Джеймс Дашнер",
    price: 21.00,
    category: "fiction",
    genre: "dystopian",
    rating: 5,
    image: "newbooks/Бегущий в лабиринте/image.png",
    inStock: true,
    isNew: true
  },
  {
    id: 33,
    title: "Hunter X Hunter, Vol. 9",
    author: "Ёсихиро Тогаси",
    price: 18.00,
    category: "fiction",
    genre: "manga",
    rating: 5,
    image: "newbooks/Hunter X Hunter, Vol. 9/image.png",
    inStock: true,
    isNew: true
  },
  {
    id: 34,
    title: "Атака на Титанов, том 1",
    author: "Хадзиме Исаяма",
    price: 24.00,
    category: "fiction",
    genre: "manga",
    rating: 5,
    image: "newbooks/Атака на Титанов/image.png",
    inStock: true,
    isNew: true
  },
  {
    id: 35,
    title: "Человек-бензопила том 4",
    author: "Тацуки Фудзимото",
    price: 20.00,
    category: "fiction",
    genre: "manga",
    rating: 5,
    image: "newbooks/Человек-бензопила том 4 Оружие могущественнее/image.png",
    inStock: true,
    isNew: true
  }
];

// Export products globally for wishlist page
window.catalogProducts = products;

// State
let filteredProducts = [...products];
let currentSort = 'popular';
let currentPage = 1;
const itemsPerPage = 16;
let filters = {
  categories: [],
  genres: [],
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
    renderPagination();
    return;
  }

  // Calculate pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  productsGrid.innerHTML = paginatedProducts.map(product => `
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

  // Product URL mapping
  const productUrls = {
    17: 'products/дневники-вампира-пробуждение.html',
    18: 'products/божественная-комедия.html',
    19: 'products/сага-о-форсайтах.html',
    20: 'products/спеши-любить.html',
    21: 'products/земля.html',
    22: 'products/незнакомка-из-уайлдфелл-холла.html',
    23: 'products/убить-пересменщика.html',
    24: 'products/таинственный-сад.html',
    25: 'products/убийство-на-поле-для-гольфа.html',
    26: 'products/invincible-vol-23.html',
    27: 'products/непобедимый-том-1.html',
    28: 'products/непобедимый-том-12.html',
    29: 'products/магическая-битва-том-28.html',
    30: 'products/сумерки.html',
    31: 'products/ведьмак-крещение-огнем.html',
    32: 'products/бегущий-в-лабиринте.html',
    33: 'products/hunter-x-hunter-vol-9.html',
    34: 'products/атака-на-титанов.html',
    35: 'products/человек-бензопила-том-4.html'
  };

  // Add click handlers to product cards
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (!e.target.closest('.product-card__wishlist') && !e.target.closest('.product-card__add-btn')) {
        const productId = parseInt(card.dataset.productId);
        const productUrl = productUrls[productId] || `product.html?id=${productId}`;
        window.location.href = productUrl;
      }
    });
  });

  renderPagination();
}

// Render pagination
function renderPagination() {
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginationContainer = document.querySelector('.pagination');
  
  if (!paginationContainer || totalPages <= 1) {
    if (paginationContainer) paginationContainer.style.display = 'none';
    return;
  }

  paginationContainer.style.display = 'flex';

  let paginationHTML = `
    <button class="pagination__btn" data-page="prev" ${currentPage === 1 ? 'disabled' : ''} aria-label="Предыдущая страница">
      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
      </svg>
    </button>
  `;

  for (let i = 1; i <= totalPages; i++) {
    paginationHTML += `
      <button class="pagination__btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>
    `;
  }

  paginationHTML += `
    <button class="pagination__btn" data-page="next" ${currentPage === totalPages ? 'disabled' : ''} aria-label="Следующая страница">
      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
      </svg>
    </button>
  `;

  paginationContainer.innerHTML = paginationHTML;

  // Add pagination click handlers
  paginationContainer.querySelectorAll('.pagination__btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const page = btn.dataset.page;
      if (page === 'prev' && currentPage > 1) {
        currentPage--;
      } else if (page === 'next' && currentPage < totalPages) {
        currentPage++;
      } else if (page !== 'prev' && page !== 'next') {
        currentPage = parseInt(page);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      renderProducts();
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

    // Genre filter
    if (filters.genres.length > 0 && !filters.genres.includes(product.genre)) {
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

  currentPage = 1; // Reset to first page when filters change
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
    genres: [],
    priceMin: null,
    priceMax: null,
    ratings: [],
    availability: []
  };

  // Reset form inputs
  document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
  document.getElementById('priceMin').value = '';
  document.getElementById('priceMax').value = '';

  currentPage = 1; // Reset to first page
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
      currentPage = 1; // Reset to first page when sorting
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
      
      filters.genres = Array.from(document.querySelectorAll('input[name="genre"]:checked'))
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

// Initialize on page load (only if catalog page elements exist)
if (productsGrid) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}
