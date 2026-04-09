// Blog Page JavaScript

// Blog posts data
const blogPosts = [
  {
    id: 1,
    type: 'news',
    title: 'Мы переехали в новый офис!',
    excerpt: 'Рады сообщить, что Smart Bookshelf переехал в новое просторное помещение в центре Алматы. Теперь у нас еще больше книг и комфортная зона для чтения.',
    image: 'images/blog-office.jpg',
    author: 'Администрация',
    date: '2026-04-05',
    readTime: '3 мин',
    featured: true
  },
  {
    id: 2,
    type: 'customer',
    title: 'История Айгуль: Как книги изменили мою жизнь',
    excerpt: 'Айгуль Клиновская — это не только талантливый писатель, но и человек, который живёт литературой, вдохновляя других своим примером.',
    image: 'blog/Айгуль 1 история/image.png',
    author: 'Айгуль Клиновская',
    date: '2026-04-03',
    readTime: '5 мин',
    videoUrl: 'https://el.kz/ru/pervyy-gonorar-mne-prislali-v-vide-semyan-sparzhi-intervyu-s-pisatelnitsey-aygul-klinovskoy_400035676/',
    featured: false
  },
  {
    id: 3,
    type: 'video',
    title: 'Распаковка заказа от Дамира',
    excerpt: 'Дамир заказал книги и поделился своими впечатлениями. Смотрите видео-обзор его покупок!',
    image: 'https://img.youtube.com/vi/OvCXT0cGbpQ/maxresdefault.jpg',
    author: 'Дамир',
    date: '2026-04-01',
    readTime: '2 мин',
    videoUrl: 'https://youtu.be/OvCXT0cGbpQ?si=fEyKLS-bmdpc5TsV',
    featured: false
  },
  {
    id: 4,
    type: 'news',
    title: 'Новая коллекция казахстанских авторов',
    excerpt: 'В нашем каталоге появилась эксклюзивная коллекция книг современных казахстанских писателей. Более 50 новых произведений!',
    image: 'blog/Новая коллекция казахстанских авторов/image.png',
    author: 'Редакция',
    date: '2026-03-28',
    readTime: '4 мин',
    featured: false
  },
  {
    id: 5,
    type: 'video',
    title: 'Отзыв от Асель',
    excerpt: 'Асель рассказывает о своем опыте покупок в Smart Bookshelf и делится впечатлениями о прочитанных книгах.',
    image: 'https://img.youtube.com/vi/bxfrvFL-MzI/maxresdefault.jpg',
    author: 'Асель',
    date: '2026-03-25',
    readTime: '3 мин',
    videoUrl: 'https://youtu.be/bxfrvFL-MzI?si=5-fFNICCg_opmtjK',
    featured: false
  },
  {
    id: 6,
    type: 'video',
    title: 'Обзор книг от Ромы',
    excerpt: 'Рома купил серию книг и записал подробный видео-обзор. Полезные рекомендации для всех!',
    image: 'https://img.youtube.com/vi/1S3-tFkUJBE/maxresdefault.jpg',
    author: 'Рома',
    date: '2026-03-22',
    readTime: '6 мин',
    videoUrl: 'https://youtu.be/1S3-tFkUJBE?si=5uefchK2BPBt0Jlz',
    featured: false
  },
  {
    id: 7,
    type: 'news',
    title: 'Запуск программы лояльности',
    excerpt: 'Представляем новую программу лояльности для наших постоянных клиентов. Накапливайте баллы и получайте скидки на любимые книги!',
    image: 'blog/Запуск программы лояльности/image.png',
    author: 'Администрация',
    date: '2026-03-20',
    readTime: '4 мин',
    featured: false
  },
  {
    id: 8,
    type: 'video',
    title: 'Алихан поделился своей коллекцией',
    excerpt: 'Алихан собрал впечатляющую коллекцию книг, купленных в нашем магазине. Смотрите видео его библиотеки!',
    image: 'https://img.youtube.com/vi/K1QVgm8R-TE/maxresdefault.jpg',
    author: 'Алихан',
    date: '2026-03-18',
    readTime: '3 мин',
    videoUrl: 'https://youtu.be/K1QVgm8R-TE?si=vygmxtIk0UUGjmKx',
    featured: false
  },
  {
    id: 9,
    type: 'video',
    title: '15 книг за раз!',
    excerpt: 'Большой заказ и видео распаковки. Посмотрите, как аккуратно мы упаковываем книги для доставки!',
    image: 'https://img.youtube.com/vi/hbhpqpzjFWk/maxresdefault.jpg',
    author: 'Клиент',
    date: '2026-03-15',
    readTime: '4 мин',
    videoUrl: 'https://youtu.be/hbhpqpzjFWk?si=hK7TOhMVPdy7_saz',
    featured: false
  }
];

// State
let currentFilter = 'all';

// DOM Elements
const blogGrid = document.getElementById('blogGrid');
const filterButtons = document.querySelectorAll('.blog-filter');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  renderBlogPosts();
  setupEventListeners();
});

// Render blog posts
function renderBlogPosts() {
  const filteredPosts = currentFilter === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.type === currentFilter);

  if (filteredPosts.length === 0) {
    blogGrid.innerHTML = `
      <div class="blog-empty">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
        </svg>
        <h3>Постов не найдено</h3>
        <p>Попробуйте выбрать другую категорию</p>
      </div>
    `;
    return;
  }

  blogGrid.innerHTML = filteredPosts.map(post => {
    const badgeClass = `blog-card__badge--${post.type}`;
    const badgeText = {
      'news': 'Новости',
      'customer': 'История клиента',
      'video': 'Видео'
    }[post.type];

    const authorInitial = post.author.charAt(0).toUpperCase();
    const formattedDate = formatDate(post.date);

    return `
      <article class="blog-card ${post.featured ? 'blog-card--featured' : ''}" data-post-id="${post.id}">
        <div class="blog-card__image-wrapper">
          <span class="blog-card__badge ${badgeClass}">${badgeText}</span>
          ${post.videoUrl ? `
            <div class="blog-card__video-icon">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          ` : ''}
          <img src="${post.image}" alt="${post.title}" class="blog-card__image" onerror="this.src='images/placeholder.jpg'">
        </div>
        <div class="blog-card__content">
          <div class="blog-card__meta">
            <div class="blog-card__meta-item">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              <span>${formattedDate}</span>
            </div>
            <div class="blog-card__meta-item">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>${post.readTime}</span>
            </div>
          </div>
          <h2 class="blog-card__title">${post.title}</h2>
          <p class="blog-card__excerpt">${post.excerpt}</p>
          <div class="blog-card__footer">
            <div class="blog-card__author">
              <div class="blog-card__author-avatar">${authorInitial}</div>
              <span class="blog-card__author-name">${post.author}</span>
            </div>
            <div class="blog-card__read-more">
              <span>Читать</span>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');

  // Add click handlers
  document.querySelectorAll('.blog-card').forEach(card => {
    card.addEventListener('click', () => {
      const postId = card.dataset.postId;
      // In a real app, navigate to blog post detail page
      console.log('Opening blog post:', postId);
      alert('Страница поста будет доступна в следующей версии');
    });
  });
}

// Setup event listeners
function setupEventListeners() {
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      currentFilter = button.dataset.filter;
      
      // Update active state
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Re-render posts
      renderBlogPosts();
    });
  });
}

// Format date
function formatDate(dateString) {
  const date = new Date(dateString);
  const months = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
  ];
  
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  
  return `${day} ${month} ${year}`;
}

console.log('Blog page initialized');
