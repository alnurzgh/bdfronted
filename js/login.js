// ============================================
// VIDEO LOGIN PAGE - JAVASCRIPT
// ============================================

// ============================================
// DOM ELEMENTS
// ============================================

const openingVideo = document.getElementById('openingVideo');
const loopVideo = document.getElementById('loopVideo');
const clickOverlay = document.getElementById('clickOverlay');
const loginFormContainer = document.getElementById('loginFormContainer');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const loginCard = document.getElementById('loginCard');
const signupCard = document.getElementById('signupCard');
const showSignupBtn = document.getElementById('showSignup');
const showLoginBtn = document.getElementById('showLogin');

// ============================================
// STATE
// ============================================

let hasStarted = false;
let isVideoPlaying = false;

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('🎬 Video Login Page initialized');
  
  // Check if mobile device
  const isMobile = window.innerWidth <= 768;
  
  if (isMobile) {
    // On mobile: show form immediately, no video
    console.log('📱 Mobile device detected - showing form immediately');
    if (loginFormContainer) {
      loginFormContainer.classList.add('visible');
    }
    if (clickOverlay) {
      clickOverlay.classList.add('hidden');
    }
  } else {
    // On desktop: prepare videos
    if (openingVideo) {
      openingVideo.pause();
      openingVideo.currentTime = 0;
      console.log('📹 Opening video ready (paused)');
    }
    
    // Preload loop video
    if (loopVideo) {
      loopVideo.load();
      console.log('📹 Loop video preloaded');
    }
  }
});

// ============================================
// CLICK TO START VIDEO
// ============================================

if (clickOverlay) {
  clickOverlay.addEventListener('click', startVideoSequence);
}

async function startVideoSequence() {
  if (hasStarted || !openingVideo) return;
  
  hasStarted = true;
  isVideoPlaying = true;
  
  console.log('▶️ Starting video sequence...');
  
  try {
    // Hide click overlay
    clickOverlay.classList.add('hidden');
    
    // Start first video
    await openingVideo.play();
    console.log('▶️ Opening video playing');
    
    // Show login form after 3.5 seconds (closer to end of video)
    setTimeout(() => {
      if (loginFormContainer) {
        loginFormContainer.classList.add('visible');
        console.log('📝 Login form visible');
      }
    }, 3500);
    
  } catch (error) {
    console.error('❌ Error playing video:', error);
    // Fallback: show form immediately if video fails
    if (loginFormContainer) {
      loginFormContainer.classList.add('visible');
    }
  }
}

// ============================================
// VIDEO ENDED - SWITCH TO LOOP VIDEO
// ============================================

if (openingVideo) {
  openingVideo.addEventListener('ended', () => {
    console.log('✅ Opening video ended, switching to loop video...');
    switchToLoopVideo();
  });
}

async function switchToLoopVideo() {
  if (!loopVideo || !openingVideo) return;
  
  try {
    // Immediately hide opening video and show loop video (no fade)
    openingVideo.classList.remove('active');
    loopVideo.classList.add('active');
    await loopVideo.play();
    
    console.log('🔁 Loop video playing (infinite loop)');
    isVideoPlaying = false;
    
  } catch (error) {
    console.error('❌ Error switching to loop video:', error);
  }
}

// ============================================
// FORM SUBMISSION
// ============================================

if (loginForm) {
  loginForm.addEventListener('submit', handleLogin);
}

async function handleLogin(e) {
  e.preventDefault();
  
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  
  // Basic validation
  if (!username || !password) {
    showNotification('Please fill in all fields', 'error');
    return;
  }
  
  if (username.length < 2) {
    showNotification('Username must be at least 2 characters', 'error');
    return;
  }
  
  if (password.length < 4) {
    showNotification('Password must be at least 4 characters', 'error');
    return;
  }
  
  // Get submit button
  const submitBtn = loginForm.querySelector('.btn-signin');
  const originalText = submitBtn.textContent;
  
  // Show loading state
  submitBtn.textContent = 'Signing In...';
  submitBtn.disabled = true;
  
  console.log('🔐 Attempting login...', { username });
  
  // Simulate login (replace with actual API call)
  await sleep(1500);
  
  // Success
  showNotification('Welcome back!', 'success');
  
  // Redirect after short delay
  setTimeout(() => {
    console.log('✅ Login successful, redirecting...');
    window.location.href = 'index.html';
  }, 1000);
}

// ============================================
// FORM SWITCHING (LOGIN <-> SIGNUP)
// ============================================

if (showSignupBtn) {
  showSignupBtn.addEventListener('click', (e) => {
    e.preventDefault();
    switchToSignup();
  });
}

if (showLoginBtn) {
  showLoginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    switchToLogin();
  });
}

function switchToSignup() {
  if (loginCard && signupCard) {
    loginCard.classList.remove('active');
    signupCard.classList.add('active');
    console.log('📝 Switched to signup form');
  }
}

function switchToLogin() {
  if (loginCard && signupCard) {
    signupCard.classList.remove('active');
    loginCard.classList.add('active');
    console.log('📝 Switched to login form');
  }
}

// ============================================
// SIGNUP FORM SUBMISSION
// ============================================

if (signupForm) {
  signupForm.addEventListener('submit', handleSignup);
}

async function handleSignup(e) {
  e.preventDefault();
  
  const username = document.getElementById('signupUsername').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPassword').value.trim();
  
  // Basic validation
  if (!username || !email || !password) {
    showNotification('Please fill in all fields', 'error');
    return;
  }
  
  if (username.length < 2) {
    showNotification('Username must be at least 2 characters', 'error');
    return;
  }
  
  if (!validateEmail(email)) {
    showNotification('Please enter a valid email', 'error');
    return;
  }
  
  if (password.length < 4) {
    showNotification('Password must be at least 4 characters', 'error');
    return;
  }
  
  // Get submit button
  const submitBtn = signupForm.querySelector('.btn-signin');
  const originalText = submitBtn.textContent;
  
  // Show loading state
  submitBtn.textContent = 'Creating Account...';
  submitBtn.disabled = true;
  
  console.log('🔐 Creating account...', { username, email });
  
  // Simulate signup (replace with actual API call)
  await sleep(1500);
  
  // Success
  showNotification('Account created successfully!', 'success');
  
  // Redirect after short delay
  setTimeout(() => {
    console.log('✅ Signup successful, redirecting...');
    window.location.href = 'index.html';
  }, 1000);
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification--${type}`;
  notification.textContent = message;
  
  // Styles
  const bgColors = {
    error: '#ef4444',
    success: '#10b981',
    info: '#d4880a'
  };
  
  notification.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: ${bgColors[type] || bgColors.info};
    color: white;
    padding: 16px 24px;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    z-index: 10000;
    font-size: 15px;
    font-weight: 500;
    animation: slideInUp 0.3s ease-out;
    max-width: 300px;
  `;
  
  document.body.appendChild(notification);
  
  // Auto remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOutDown 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ============================================
// ANIMATIONS
// ============================================

const style = document.createElement('style');
style.textContent = `
  @keyframes slideInUp {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutDown {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

document.addEventListener('keydown', (e) => {
  // Press Space or Enter to start video (if not started)
  if ((e.code === 'Space' || e.code === 'Enter') && !hasStarted) {
    e.preventDefault();
    startVideoSequence();
  }
});

// ============================================
// ERROR HANDLING
// ============================================

// Handle video errors
if (openingVideo) {
  openingVideo.addEventListener('error', (e) => {
    console.error('❌ Opening video error:', e);
    showNotification('Video failed to load', 'error');
    // Show form anyway
    if (loginFormContainer) {
      loginFormContainer.classList.add('visible');
    }
  });
}

if (loopVideo) {
  loopVideo.addEventListener('error', (e) => {
    console.error('❌ Loop video error:', e);
  });
}

// ============================================
// ACCESSIBILITY
// ============================================

// Announce to screen readers when form appears
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.target === loginFormContainer && 
        loginFormContainer.classList.contains('visible')) {
      const announcement = document.createElement('div');
      announcement.setAttribute('role', 'status');
      announcement.setAttribute('aria-live', 'polite');
      announcement.className = 'sr-only';
      announcement.textContent = 'Login form is now visible';
      document.body.appendChild(announcement);
      setTimeout(() => announcement.remove(), 1000);
    }
  });
});

if (loginFormContainer) {
  observer.observe(loginFormContainer, { attributes: true, attributeFilter: ['class'] });
}

// ============================================
// INITIALIZATION LOG
// ============================================

console.log('✨ Video Login Page ready');
console.log('👆 Click anywhere to start the experience');
