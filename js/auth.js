// Auth Page JavaScript

// ============================================
// FORM SWITCHING
// ============================================

const loginCard = document.getElementById('loginCard');
const registerCard = document.getElementById('registerCard');
const forgotPasswordCard = document.getElementById('forgotPasswordCard');

const showRegisterLink = document.getElementById('showRegisterLink');
const showLoginLink = document.getElementById('showLoginLink');
const forgotPasswordLink = document.getElementById('forgotPasswordLink');
const backToLoginLink = document.getElementById('backToLoginLink');

function hideAllCards() {
  loginCard.style.display = 'none';
  registerCard.style.display = 'none';
  forgotPasswordCard.style.display = 'none';
}

function showCard(card) {
  hideAllCards();
  card.style.display = 'block';
  card.style.animation = 'slideUp 0.4s ease-out';
}

showRegisterLink.addEventListener('click', (e) => {
  e.preventDefault();
  showCard(registerCard);
});

showLoginLink.addEventListener('click', (e) => {
  e.preventDefault();
  showCard(loginCard);
});

forgotPasswordLink.addEventListener('click', (e) => {
  e.preventDefault();
  showCard(forgotPasswordCard);
});

backToLoginLink.addEventListener('click', (e) => {
  e.preventDefault();
  showCard(loginCard);
});

// ============================================
// PASSWORD TOGGLE
// ============================================

document.querySelectorAll('.password-toggle').forEach(button => {
  button.addEventListener('click', () => {
    const input = button.previousElementSibling;
    const type = input.type === 'password' ? 'text' : 'password';
    input.type = type;
    
    // Toggle icon (optional - you can add different icons for show/hide)
    button.style.opacity = type === 'text' ? '1' : '0.6';
  });
});

// ============================================
// LOGIN FORM
// ============================================

const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  const rememberMe = document.getElementById('rememberMe').checked;
  
  // Validation
  if (!email || !password) {
    alert('Пожалуйста, заполните все поля');
    return;
  }
  
  if (!validateEmail(email)) {
    alert('Пожалуйста, введите корректный email');
    return;
  }
  
  // Simulate login
  console.log('Login:', { email, password, rememberMe });
  
  // Save to localStorage (in real app, use proper authentication)
  if (rememberMe) {
    localStorage.setItem('userEmail', email);
  }
  
  // Show success message
  if (typeof cart !== 'undefined') {
    cart.showNotification('Вход выполнен успешно!');
  }
  
  // Redirect to profile page
  setTimeout(() => {
    window.location.href = 'profile.html';
  }, 1000);
});

// ============================================
// REGISTER FORM
// ============================================

const registerForm = document.getElementById('registerForm');

registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const firstName = document.getElementById('registerFirstName').value;
  const lastName = document.getElementById('registerLastName').value;
  const email = document.getElementById('registerEmail').value;
  const phone = document.getElementById('registerPhone').value;
  const password = document.getElementById('registerPassword').value;
  const confirmPassword = document.getElementById('registerConfirmPassword').value;
  const agreeTerms = document.getElementById('agreeTerms').checked;
  
  // Validation
  if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
    alert('Пожалуйста, заполните все поля');
    return;
  }
  
  if (!validateEmail(email)) {
    alert('Пожалуйста, введите корректный email');
    return;
  }
  
  if (!validatePhone(phone)) {
    alert('Пожалуйста, введите корректный номер телефона');
    return;
  }
  
  if (password.length < 6) {
    alert('Пароль должен содержать минимум 6 символов');
    return;
  }
  
  if (password !== confirmPassword) {
    alert('Пароли не совпадают');
    return;
  }
  
  if (!agreeTerms) {
    alert('Пожалуйста, примите условия использования');
    return;
  }
  
  // Simulate registration
  console.log('Register:', { firstName, lastName, email, phone, password });
  
  // Show success message
  if (typeof cart !== 'undefined') {
    cart.showNotification('Регистрация успешна! Добро пожаловать!');
  }
  
  // Redirect to profile page
  setTimeout(() => {
    window.location.href = 'profile.html';
  }, 1000);
});

// ============================================
// FORGOT PASSWORD FORM
// ============================================

const forgotPasswordForm = document.getElementById('forgotPasswordForm');

forgotPasswordForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const email = document.getElementById('forgotEmail').value;
  
  // Validation
  if (!email) {
    alert('Пожалуйста, введите email');
    return;
  }
  
  if (!validateEmail(email)) {
    alert('Пожалуйста, введите корректный email');
    return;
  }
  
  // Simulate sending reset link
  console.log('Forgot password:', { email });
  
  // Show success message
  if (typeof cart !== 'undefined') {
    cart.showNotification('Ссылка для восстановления отправлена на email');
  }
  
  // Clear form and go back to login
  forgotPasswordForm.reset();
  setTimeout(() => {
    showCard(loginCard);
  }, 2000);
});

// ============================================
// VALIDATION FUNCTIONS
// ============================================

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePhone(phone) {
  // Simple validation for Kazakhstan phone numbers
  const re = /^\+?7\s?\(?\d{3}\)?\s?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/;
  return re.test(phone);
}

// ============================================
// PHONE INPUT FORMATTING
// ============================================

const phoneInput = document.getElementById('registerPhone');

if (phoneInput) {
  phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    
    // Add +7 prefix if not present
    if (value.length > 0 && !value.startsWith('7')) {
      value = '7' + value;
    }
    
    // Format: +7 (XXX) XXX-XX-XX
    let formatted = '+7';
    if (value.length > 1) {
      formatted += ' (' + value.substring(1, 4);
    }
    if (value.length >= 4) {
      formatted += ') ' + value.substring(4, 7);
    }
    if (value.length >= 7) {
      formatted += '-' + value.substring(7, 9);
    }
    if (value.length >= 9) {
      formatted += '-' + value.substring(9, 11);
    }
    
    e.target.value = formatted;
  });
}

// ============================================
// SOCIAL LOGIN
// ============================================

document.querySelectorAll('.auth-social .btn').forEach(button => {
  button.addEventListener('click', () => {
    alert('Вход через социальные сети будет доступен в следующей версии');
  });
});

// ============================================
// AUTO-FILL FROM LOCALSTORAGE
// ============================================

const savedEmail = localStorage.getItem('userEmail');
if (savedEmail) {
  document.getElementById('loginEmail').value = savedEmail;
  document.getElementById('rememberMe').checked = true;
}

console.log('Auth page initialized');
