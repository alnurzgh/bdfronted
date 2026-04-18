// Profile Page JavaScript

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {

// Check for URL parameters to open specific tab
const urlParams = new URLSearchParams(window.location.search);
const tabParam = urlParams.get('tab');
if (tabParam) {
  const tabButton = document.querySelector(`[data-tab="${tabParam}"]`);
  if (tabButton) {
    tabButton.click();
  }
}

// ============================================
// TAB SWITCHING
// ============================================

const profileTabs = document.querySelectorAll('.profile-tab');
const profileTabContents = document.querySelectorAll('.profile-tab-content');

profileTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const targetTab = tab.dataset.tab;
    
    // Remove active class from all tabs and contents
    profileTabs.forEach(t => t.classList.remove('active'));
    profileTabContents.forEach(content => content.classList.remove('active'));
    
    // Add active class to clicked tab and corresponding content
    tab.classList.add('active');
    document.getElementById(targetTab).classList.add('active');
    
    // Save active tab to localStorage
    localStorage.setItem('activeProfileTab', targetTab);
  });
});

// Restore active tab from localStorage
const savedTab = localStorage.getItem('activeProfileTab');
if (savedTab) {
  const savedTabButton = document.querySelector(`[data-tab="${savedTab}"]`);
  if (savedTabButton) {
    savedTabButton.click();
  }
}

// ============================================
// PROFILE EDITING
// ============================================

const editProfileBtn = document.getElementById('editProfileBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');
const profileForm = document.getElementById('profileForm');
const profileInputs = profileForm.querySelectorAll('input, textarea');
const formActions = profileForm.querySelector('.profile-form__actions');

let originalValues = {};

// Save original values
profileInputs.forEach(input => {
  originalValues[input.name || input.type] = input.value;
});

editProfileBtn.addEventListener('click', () => {
  // Enable all inputs
  profileInputs.forEach(input => {
    input.disabled = false;
  });
  
  // Show form actions
  formActions.style.display = 'flex';
  editProfileBtn.style.display = 'none';
});

cancelEditBtn.addEventListener('click', () => {
  // Restore original values
  profileInputs.forEach(input => {
    input.value = originalValues[input.name || input.type];
    input.disabled = true;
  });
  
  // Hide form actions
  formActions.style.display = 'none';
  editProfileBtn.style.display = 'inline-flex';
});

profileForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Save new values
  profileInputs.forEach(input => {
    originalValues[input.name || input.type] = input.value;
    input.disabled = true;
  });
  
  // Hide form actions
  formActions.style.display = 'none';
  editProfileBtn.style.display = 'inline-flex';
  
  // Show success notification
  if (typeof cart !== 'undefined') {
    cart.showNotification('Профиль успешно обновлен');
  }
});

// ============================================
// WISHLIST MANAGEMENT
// ============================================

// Render orders
function renderOrders() {
  const ordersContainer = document.querySelector('#orders .orders-list');
  if (!ordersContainer) return;

  // Get orders from localStorage
  const ordersData = typeof orders !== 'undefined' ? orders.getOrders() : [];
  
  if (ordersData.length === 0) {
    ordersContainer.innerHTML = `
      <div style="text-align: center; padding: var(--spacing-12) 0; color: var(--color-text-secondary);">
        <svg width="64" height="64" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="margin: 0 auto var(--spacing-4);">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
        </svg>
        <h3 style="font-size: var(--font-size-xl); margin-bottom: var(--spacing-2);">У вас пока нет заказов</h3>
        <p>Начните покупки в нашем каталоге</p>
        <a href="catalog.html" class="btn btn--primary" style="margin-top: var(--spacing-6); display: inline-flex;">Перейти в каталог</a>
      </div>
    `;
    return;
  }

  // Render orders
  ordersContainer.innerHTML = ordersData.map(order => {
    const orderDate = new Date(order.date);
    const formattedDate = orderDate.toLocaleDateString('ru-RU', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });

    // Status badge
    let statusBadge = '';
    let statusText = '';
    switch(order.status) {
      case 'processing':
        statusBadge = 'badge--white';
        statusText = 'Обработка';
        break;
      case 'shipped':
        statusBadge = 'badge--white';
        statusText = 'В пути';
        break;
      case 'delivered':
        statusBadge = 'badge--black';
        statusText = 'Доставлен';
        break;
      default:
        statusBadge = 'badge--white';
        statusText = 'Обработка';
    }

    // Render products
    const productsHTML = order.items.map(item => `
      <div class="order-product">
        <img src="${item.image}" alt="${item.title}">
        <div class="order-product__info">
          <h4>${item.title}</h4>
          <p>${item.author}</p>
          ${item.quantity > 1 ? `<p style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">Количество: ${item.quantity}</p>` : ''}
        </div>
        <div class="order-product__price">$${(item.price * item.quantity).toFixed(2)}</div>
      </div>
    `).join('');

    // Build order details with gift wrap info
    let orderDetailsHTML = '';
    if (order.discount > 0) {
      orderDetailsHTML += `<div style="font-size: var(--font-size-sm); color: var(--color-text-secondary); margin-top: var(--spacing-2);">Скидка: -$${order.discount.toFixed(2)}</div>`;
    }
    if (order.giftWrap > 0) {
      orderDetailsHTML += `<div style="font-size: var(--font-size-sm); color: var(--color-text-secondary); margin-top: var(--spacing-2);">🎁 Подарочная упаковка: +$${order.giftWrap.toFixed(2)}</div>`;
    }

    return `
      <div class="order-item">
        <div class="order-item__header">
          <div>
            <div class="order-item__number">Заказ ${order.number}</div>
            <div class="order-item__date">${formattedDate}</div>
          </div>
          <span class="badge ${statusBadge}">${statusText}</span>
        </div>
        <div class="order-item__products">
          ${productsHTML}
        </div>
        ${orderDetailsHTML}
        <div class="order-item__footer">
          <div class="order-item__total">Итого: $${order.total.toFixed(2)}</div>
          <button class="btn btn--outline btn--sm" onclick="reorderItems(${order.id})">Повторить заказ</button>
        </div>
      </div>
    `;
  }).join('');
}

// Reorder function
window.reorderItems = function(orderId) {
  if (typeof orders === 'undefined' || typeof cart === 'undefined') return;
  
  const order = orders.getOrderById(orderId);
  if (!order) return;

  // Add all items from order to cart
  order.items.forEach(item => {
    for (let i = 0; i < item.quantity; i++) {
      cart.addItem(item);
    }
  });

  cart.showNotification('Товары добавлены в корзину');
  
  // Redirect to cart
  setTimeout(() => {
    window.location.href = 'cart.html';
  }, 1000);
};

// Initialize orders rendering when orders tab is clicked
const ordersTab = document.querySelector('[data-tab="orders"]');
if (ordersTab) {
  ordersTab.addEventListener('click', () => {
    setTimeout(renderOrders, 100);
  });
}

// Render orders on page load if orders tab is active
if (document.getElementById('orders').classList.contains('active')) {
  renderOrders();
}

// ============================================
// WISHLIST MANAGEMENT
// ============================================

// Remove from wishlist
document.addEventListener('click', (e) => {
  if (e.target.closest('.product-card__wishlist')) {
    const wishlistTab = document.getElementById('wishlist');
    if (wishlistTab.classList.contains('active')) {
      e.preventDefault();
      const card = e.target.closest('.product-card');
      
      // Animate removal
      card.style.animation = 'fadeOut 0.3s ease-out';
      setTimeout(() => {
        card.remove();
        
        // Check if wishlist is empty
        const remainingCards = wishlistTab.querySelectorAll('.product-card');
        if (remainingCards.length === 0) {
          const emptyMessage = document.createElement('div');
          emptyMessage.style.cssText = `
            text-align: center;
            padding: var(--spacing-12) 0;
            color: var(--color-text-secondary);
          `;
          emptyMessage.innerHTML = `
            <svg width="64" height="64" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="margin: 0 auto var(--spacing-4);">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
            <h3 style="font-size: var(--font-size-xl); margin-bottom: var(--spacing-2);">Список избранного пуст</h3>
            <p>Добавьте книги в избранное, чтобы не потерять их</p>
            <a href="catalog.html" class="btn btn--primary" style="margin-top: var(--spacing-6); display: inline-flex;">Перейти в каталог</a>
          `;
          wishlistTab.querySelector('.grid').replaceWith(emptyMessage);
        }
        
        if (typeof cart !== 'undefined') {
          cart.showNotification('Удалено из избранного');
        }
      }, 300);
    }
  }
});

// ============================================
// SETTINGS
// ============================================

// Password change form
const settingsTab = document.getElementById('settings');
const passwordForm = settingsTab.querySelector('form');

passwordForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const currentPassword = passwordForm.querySelector('input[placeholder*="текущий"]').value;
  const newPassword = passwordForm.querySelector('input[placeholder*="новый пароль"]').value;
  const confirmPassword = passwordForm.querySelector('input[placeholder*="Повторите"]').value;
  
  // Validation
  if (!currentPassword || !newPassword || !confirmPassword) {
    alert('Пожалуйста, заполните все поля');
    return;
  }
  
  if (newPassword !== confirmPassword) {
    alert('Пароли не совпадают');
    return;
  }
  
  if (newPassword.length < 6) {
    alert('Пароль должен содержать минимум 6 символов');
    return;
  }
  
  // Success
  passwordForm.reset();
  if (typeof cart !== 'undefined') {
    cart.showNotification('Пароль успешно изменен');
  }
});

// Notification checkboxes
const notificationCheckboxes = settingsTab.querySelectorAll('input[type="checkbox"]');
notificationCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    const setting = checkbox.id;
    const enabled = checkbox.checked;
    
    // Save to localStorage
    localStorage.setItem(`notification_${setting}`, enabled);
    
    if (typeof cart !== 'undefined') {
      cart.showNotification(enabled ? 'Уведомления включены' : 'Уведомления отключены');
    }
  });
  
  // Restore from localStorage
  const saved = localStorage.getItem(`notification_${checkbox.id}`);
  if (saved !== null) {
    checkbox.checked = saved === 'true';
  }
});

// Delete account button
const deleteAccountBtn = settingsTab.querySelector('.btn--outline[style*="ef4444"]');
if (deleteAccountBtn) {
  deleteAccountBtn.addEventListener('click', () => {
    const confirmed = confirm('Вы уверены, что хотите удалить аккаунт? Это действие необратимо.');
    if (confirmed) {
      const doubleConfirm = confirm('Это окончательное подтверждение. Все ваши данные будут удалены.');
      if (doubleConfirm) {
        alert('Функция удаления аккаунта будет доступна в следующей версии');
      }
    }
  });
}

// ============================================
// ANIMATIONS
// ============================================

const style = document.createElement('style');
style.textContent = `
  @keyframes fadeOut {
    from {
      opacity: 1;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(0.9);
    }
  }
`;
document.head.appendChild(style);

console.log('Profile page initialized');

}); // End of DOMContentLoaded
