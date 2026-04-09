// Login Page - Book Animation JavaScript

// ============================================
// DOM ELEMENTS
// ============================================

const bookContainer = document.getElementById('bookContainer');
const closedBook = document.getElementById('closedBook');
const openBook = document.getElementById('openBook');
const clickHint = document.getElementById('clickHint');
const authFormWrapper = document.getElementById('authFormWrapper');
const backToBookBtn = document.getElementById('backToBook');
const loginForm = document.getElementById('loginForm');
const loginPage = document.querySelector('.login-page');

// ============================================
// STATE
// ============================================

let animationPlayed = false;
let isAnimating = false;

// ============================================
// UTILITY FUNCTIONS
// ============================================

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ============================================
// ANIMATION SEQUENCE
// ============================================

async function playOpeningSequence() {
  if (isAnimating) return;
  isAnimating = true;
  animationPlayed = true;
  
  // Disable click during animation
  bookContainer.classList.add('animating');
  bookContainer.style.cursor = 'default';
  
  try {
    // Step 1: Hide click hint (0.3s)
    await hideClickHint();
    
    // Step 2: Open the book (1.5s)
    await openBookAnimation();
    
    // Step 3: Glow pulse effect (1s)
    await glowAnimation();
    
    // Step 4: Move book to background and show form (0.8s)
    await showAuthForm();
    
  } catch (error) {
    console.error('Animation error:', error);
  } finally {
    isAnimating = false;
  }
}

// Step 1: Hide Click Hint
function hideClickHint() {
  return new Promise(resolve => {
    clickHint.classList.add('hidden');
    setTimeout(resolve, 300);
  });
}

// Step 2: Open Book Animation
function openBookAnimation() {
  return new Promise(resolve => {
    // Fade out closed book
    closedBook.style.opacity = '0';
    
    // Fade in open book with animation
    setTimeout(() => {
      openBook.style.opacity = '1';
      openBook.style.animation = 'openBook 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
    }, 100);
    
    // Change background
    loginPage.classList.add('book-opened');
    
    setTimeout(resolve, 1500);
  });
}

// Step 3: Glow Pulse Animation
function glowAnimation() {
  return new Promise(resolve => {
    openBook.style.animation = 'glowPulse 1s ease-in-out';
    setTimeout(resolve, 1000);
  });
}

// Step 4: Show Auth Form
function showAuthForm() {
  return new Promise(resolve => {
    // Move book to background
    bookContainer.classList.add('background');
    
    // Show form with animation
    authFormWrapper.classList.add('visible');
    authFormWrapper.style.animation = 'fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    
    // Focus on first input after animation
    setTimeout(() => {
      const emailInput = document.getElementById('loginEmail');
      if (emailInput) {
        emailInput.focus();
      }
      resolve();
    }, 800);
  });
}

// ============================================
// REVERSE ANIMATION (Back to Book)
// ============================================

async function backToBookAnimation() {
  if (isAnimating) return;
  isAnimating = true;
  
  try {
    // Hide form
    authFormWrapper.style.animation = 'fadeOut 0.5s ease-out';
    await sleep(500);
    authFormWrapper.classList.remove('visible');
    
    // Bring book back to center
    bookContainer.classList.remove('background');
    await sleep(300);
    
    // Reset state
    animationPlayed = false;
    bookContainer.classList.remove('animating');
    bookContainer.style.cursor = 'pointer';
    
    // Show hint again
    clickHint.classList.remove('hidden');
    
    // Reset animations
    openBook.style.animation = '';
    authFormWrapper.style.animation = '';
    
  } catch (error) {
    console.error('Back animation error:', error);
  } finally {
    isAnimating = false;
  }
}

// ============================================
// EVENT LISTENERS
// ============================================

// Click on book to start animation
bookContainer.addEventListener('click', () => {
  if (!animationPlayed && !isAnimating) {
    playOpeningSequence();
  }
});

// Hover effect on book (only when not animated)
bookContainer.addEventListener('mouseenter', () => {
  if (!animationPlayed && !isAnimating) {
    bookContainer.style.transform = 'scale(1.05)';
  }
});

bookContainer.addEventListener('mouseleave', () => {
  if (!animationPlayed && !isAnimating) {
    bookContainer.style.transform = 'scale(1)';
  }
});

// Back to book button
if (backToBookBtn) {
  backToBookBtn.addEventListener('click', (e) => {
    e.preventDefault();
    backToBookAnimation();
  });
}

// ESC key to go back
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && authFormWrapper.classList.contains('visible')) {
    backToBookAnimation();
  }
});

// ============================================
// PASSWORD TOGGLE
// ============================================

const passwordToggle = document.querySelector('.password-toggle');
const passwordInput = document.getElementById('loginPassword');

if (passwordToggle && passwordInput) {
  passwordToggle.addEventListener('click', () => {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    passwordToggle.style.opacity = type === 'text' ? '1' : '0.6';
  });
}

// ============================================
// FORM SUBMISSION
// ============================================

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // Basic validation
    if (!email || !password) {
      showNotification('Пожалуйста, заполните все поля', 'error');
      return;
    }
    
    if (!validateEmail(email)) {
      showNotification('Пожалуйста, введите корректный email', 'error');
      return;
    }
    
    // Show loading state
    const submitBtn = loginForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Вход...';
    submitBtn.disabled = true;
    
    // Simulate login (replace with actual API call)
    await sleep(1500);
    
    // Save to localStorage if remember me is checked
    if (rememberMe) {
      localStorage.setItem('userEmail', email);
    }
    
    // Show success notification
    showNotification('Вход выполнен успешно!', 'success');
    
    // Redirect to profile page
    setTimeout(() => {
      window.location.href = 'profile.html';
    }, 1000);
  });
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification--${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: ${type === 'error' ? '#ef4444' : type === 'success' ? '#10b981' : '#000000'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    z-index: 10000;
    animation: slideInRight 0.3s ease-out;
    font-size: 14px;
    font-weight: 500;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// ============================================
// ADDITIONAL ANIMATIONS
// ============================================

// Add fadeOut animation dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeOut {
    from {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
    to {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.95);
    }
  }
  
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
`;
document.head.appendChild(style);

// ============================================
// INITIALIZATION
// ============================================

console.log('Login page initialized');
console.log('Click on the book to start the animation');

// Optional: Auto-play animation after 2 seconds (uncomment if needed)
// setTimeout(() => {
//   if (!animationPlayed) {
//     playOpeningSequence();
//   }
// }, 2000);
