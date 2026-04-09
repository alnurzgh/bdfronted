// Main JavaScript File

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function for performance optimization
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ============================================
// HEADER FUNCTIONALITY
// ============================================

// Header scroll effect
const header = document.getElementById('header');
const scrollProgress = document.getElementById('scrollProgress');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  // Update scroll progress bar
  const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (currentScroll / windowHeight) * 100;
  if (scrollProgress) {
    scrollProgress.style.width = scrolled + '%';
  }
  
  lastScroll = currentScroll;
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  });

  // Close mobile menu when clicking outside
  mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) {
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

// ============================================
// SEARCH FUNCTIONALITY
// ============================================

const searchInput = document.querySelector('.header__search-input');

if (searchInput) {
  searchInput.addEventListener('input', debounce((e) => {
    const query = e.target.value.trim();
    if (query.length > 2) {
      console.log('Searching for:', query);
      // TODO: Implement search functionality
    }
  }, 300));
}

// ============================================
// CART FUNCTIONALITY
// ============================================

class Cart {
  constructor() {
    this.items = this.loadCart();
    this.updateCartBadge();
  }

  loadCart() {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  }

  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.items));
    this.updateCartBadge();
  }

  addItem(product) {
    const existingItem = this.items.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }
    
    this.saveCart();
    this.showNotification('Товар добавлен в корзину');
  }

  removeItem(productId) {
    this.items = this.items.filter(item => item.id !== productId);
    this.saveCart();
  }

  updateQuantity(productId, quantity) {
    const item = this.items.find(item => item.id === productId);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        this.removeItem(productId);
      } else {
        this.saveCart();
      }
    }
  }

  getTotal() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getItemCount() {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }

  clearCart() {
    this.items = [];
    this.saveCart();
  }

  updateCartBadge() {
    const badge = document.querySelector('.header__cart-badge');
    if (badge) {
      const count = this.getItemCount();
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    }
  }

  showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: var(--color-black);
      color: var(--color-white);
      padding: 1rem 1.5rem;
      border-radius: 8px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
      z-index: 10000;
      animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
}

// Initialize cart
const cart = new Cart();

// Add to cart button handlers
document.addEventListener('click', (e) => {
  if (e.target.closest('.product-card__add-btn')) {
    e.preventDefault();
    const card = e.target.closest('.product-card');
    const product = {
      id: Date.now(), // In real app, use actual product ID
      title: card.querySelector('.product-card__title').textContent,
      author: card.querySelector('.product-card__author').textContent,
      price: parseFloat(card.querySelector('.product-card__price').textContent.replace('$', '')),
      image: card.querySelector('.product-card__image').src
    };
    
    cart.addItem(product);
    
    // Add animation to button
    const btn = e.target.closest('.product-card__add-btn');
    btn.style.transform = 'scale(1.2)';
    setTimeout(() => {
      btn.style.transform = '';
    }, 200);
  }
});

// ============================================
// WISHLIST FUNCTIONALITY
// ============================================

class Wishlist {
  constructor() {
    this.items = this.loadWishlist();
    this.updateWishlistButtons();
  }

  loadWishlist() {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  }

  saveWishlist() {
    localStorage.setItem('wishlist', JSON.stringify(this.items));
    this.updateWishlistButtons();
  }

  toggleItem(productId) {
    const index = this.items.indexOf(productId);
    if (index > -1) {
      this.items.splice(index, 1);
      cart.showNotification('Удалено из избранного');
    } else {
      this.items.push(productId);
      cart.showNotification('Добавлено в избранное');
    }
    this.saveWishlist();
  }

  isInWishlist(productId) {
    return this.items.includes(productId);
  }

  updateWishlistButtons() {
    document.querySelectorAll('.product-card__wishlist').forEach(btn => {
      const card = btn.closest('.product-card');
      const productId = card.dataset.productId || card.querySelector('.product-card__title').textContent;
      
      if (this.isInWishlist(productId)) {
        btn.querySelector('svg').style.fill = 'currentColor';
      } else {
        btn.querySelector('svg').style.fill = 'none';
      }
    });
  }
}

// Initialize wishlist
const wishlist = new Wishlist();

// Wishlist button handlers
document.addEventListener('click', (e) => {
  if (e.target.closest('.product-card__wishlist')) {
    e.preventDefault();
    const card = e.target.closest('.product-card');
    const productId = card.dataset.productId || card.querySelector('.product-card__title').textContent;
    wishlist.toggleItem(productId);
  }
});

// ============================================
// ORDERS FUNCTIONALITY
// ============================================

class Orders {
  constructor() {
    this.orders = this.loadOrders();
  }

  loadOrders() {
    const saved = localStorage.getItem('orders');
    return saved ? JSON.parse(saved) : [];
  }

  saveOrders() {
    localStorage.setItem('orders', JSON.stringify(this.orders));
  }

  createOrder(items, total, discount = 0, giftWrap = false) {
    const order = {
      id: Date.now(),
      number: `#${10000 + this.orders.length + 1}`,
      date: new Date().toISOString(),
      items: items.map(item => ({
        id: item.id,
        title: item.title,
        author: item.author,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      })),
      subtotal: total,
      discount: discount,
      giftWrap: giftWrap ? 5.00 : 0,
      total: total - discount + (giftWrap ? 5.00 : 0),
      status: 'processing' // processing, shipped, delivered
    };

    this.orders.unshift(order); // Add to beginning
    this.saveOrders();
    return order;
  }

  getOrders() {
    return this.orders;
  }

  getOrderById(orderId) {
    return this.orders.find(order => order.id === orderId);
  }

  updateOrderStatus(orderId, status) {
    const order = this.getOrderById(orderId);
    if (order) {
      order.status = status;
      this.saveOrders();
    }
  }
}

// Initialize orders
const orders = new Orders();

// ============================================
// SCROLL ANIMATIONS
// ============================================

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
  observer.observe(section);
});

// ============================================
// SMOOTH SCROLL
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href !== '') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// ============================================
// FORM VALIDATION
// ============================================

// Newsletter form
const newsletterForm = document.querySelector('.newsletter__form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value;
    
    if (email) {
      cart.showNotification('Спасибо за подписку!');
      newsletterForm.reset();
    }
  });
}

// ============================================
// MODAL FUNCTIONALITY
// ============================================

class Modal {
  constructor(modalId) {
    this.modal = document.getElementById(modalId);
    if (!this.modal) return;
    
    this.backdrop = this.modal.querySelector('.modal__backdrop');
    this.closeBtn = this.modal.querySelector('.modal__close');
    
    this.init();
  }

  init() {
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }
    
    if (this.backdrop) {
      this.backdrop.addEventListener('click', () => this.close());
    }
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('active')) {
        this.close();
      }
    });
  }

  open() {
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// ============================================
// IMAGE LAZY LOADING
// ============================================

if ('loading' in HTMLImageElement.prototype) {
  // Browser supports lazy loading
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.src = img.dataset.src;
  });
} else {
  // Fallback for browsers that don't support lazy loading
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img.lazy').forEach(img => {
    imageObserver.observe(img);
  });
}

// ============================================
// ANIMATIONS
// ============================================

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
document.head.appendChild(style);

// Hero banner parallax effect
const heroBanner = document.querySelector('.hero-banner__image-placeholder svg');
if (heroBanner) {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.3;
    if (heroBanner) {
      heroBanner.style.transform = `translateY(${rate}px)`;
    }
  });
}

// ============================================
// 3D BOOK CARDS INTERACTION
// ============================================

// Add 3D tilt effect to book cards
const bookCards = document.querySelectorAll('.product-card');

bookCards.forEach(card => {
  const imageWrapper = card.querySelector('.product-card__image-wrapper');
  
  if (imageWrapper) {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      imageWrapper.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
      imageWrapper.style.transform = 'rotateY(0deg) rotateX(0deg)';
    });
  }
});

// ============================================
// INITIALIZATION
// ============================================

console.log('Smart Bookshelf initialized');
console.log('Cart items:', cart.getItemCount());
console.log('Wishlist items:', wishlist.items.length);
