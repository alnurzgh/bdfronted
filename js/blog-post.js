// Blog Post Page JavaScript

// Blog posts data with full content
const blogPostsContent = {
  1: {
    title: 'Мы переехали в новый офис!',
    content: `Smart Bookshelf рад сообщить о важном событии — мы переехали в новый, более просторный и современный офис в центре Алматы. Это решение стало частью нашего стремления улучшить сервис и создать комфортные условия как для сотрудников, так и для наших клиентов.

Новое пространство позволило расширить ассортимент книг, организовать удобную зону самовывоза и создать уютное место для чтения. Теперь у нас больше возможностей для проведения мероприятий: книжных встреч, презентаций и тематических вечеров.

Мы благодарим всех наших клиентов за доверие и поддержку. Ждем вас в новом офисе — уверены, вам у нас понравится ещё больше!`
  },
  2: {
    title: 'История Айгуль: Как книги изменили мою жизнь',
    content: `Меня зовут Айгуль, и я хочу поделиться своей историей. Раньше чтение не занимало важного места в моей жизни, но всё изменилось после случайной покупки книги в Smart Bookshelf.

С каждой новой книгой я начала иначе смотреть на мир: появилось больше уверенности, расширился кругозор, а главное — я нашла вдохновение для смены профессии. Сейчас я работаю в сфере, о которой раньше даже не задумывалась.

Книги стали для меня не просто хобби, а настоящим инструментом развития. Я благодарна магазину за качественную подборку литературы и рекомендации, которые помогли мне начать этот путь.`
  },
  3: {
    title: 'Распаковка заказа от Дамира',
    content: `В этом обзоре наш клиент Дамир делится впечатлениями от своего заказа в Smart Bookshelf. Он подробно показывает процесс распаковки, оценивает качество упаковки и состояние книг.

Особое внимание уделяется скорости доставки и аккуратности оформления заказа. Все книги прибыли в идеальном состоянии, без повреждений, что подтверждает высокий уровень сервиса магазина.

Такие видео помогают нам становиться лучше, а новым клиентам — убедиться в надежности нашей работы.`
  },
  4: {
    title: 'Новая коллекция казахстанских авторов',
    content: `Smart Bookshelf с гордостью представляет новую коллекцию книг современных казахстанских авторов. В подборку вошли произведения разных жанров: от художественной литературы до научно-популярных изданий.

Мы стремимся поддерживать локальных писателей и знакомить наших клиентов с качественной отечественной литературой. Каждая книга в коллекции — это уникальный взгляд, отражающий культуру, историю и современность Казахстана.

Приглашаем вас познакомиться с новинками и открыть для себя новые имена.`
  },
  5: {
    title: 'Отзыв Асель: Лучший книжный магазин в городе',
    content: `Я давно искала книжный магазин с большим выбором и удобным сервисом — и нашла его в Smart Bookshelf. Здесь всегда можно найти как популярные новинки, так и редкие издания.

Отдельно хочу отметить удобство сайта, быструю доставку и вежливую поддержку. Заказы оформляются быстро, а книги приходят аккуратно упакованными.

Теперь я рекомендую этот магазин всем своим друзьям и знакомым.`
  },
  6: {
    title: 'Обзор книг от Ромы',
    content: `Нурлан делится своим мнением о нескольких книгах, приобретённых в Smart Bookshelf. В обзоре он подробно рассказывает о содержании, стиле авторов и своих впечатлениях.

Такие обзоры помогают читателям лучше ориентироваться в выборе литературы и находить действительно стоящие произведения.

Мы всегда рады, когда наши клиенты делятся своим опытом и рекомендациями.`
  },
  7: {
    title: 'Запуск программы лояльности',
    content: `Мы рады объявить о запуске новой программы лояльности для наших клиентов. Теперь за каждую покупку вы получаете бонусные баллы, которые можно использовать при следующих заказах.

Программа создана для того, чтобы сделать покупки ещё более выгодными и приятными. Также участников ждут эксклюзивные акции, персональные предложения и ранний доступ к новинкам.

Присоединяйтесь и получайте больше преимуществ вместе с Smart Bookshelf.`
  },
  8: {
    title: 'Алихан поделился своей коллекцией',
    content: `Наш клиент Ерлан собрал впечатляющую коллекцию книг, значительная часть которой была приобретена в Smart Bookshelf.

В своей истории он рассказывает, как формировалась его библиотека, какие жанры он предпочитает и какие книги оказали на него наибольшее влияние.

Это вдохновляющий пример того, как любовь к чтению может перерасти в настоящее увлечение.`
  },
  9: {
    title: '15 книг за раз!',
    content: `Дина делится эмоциями от крупного заказа в Smart Bookshelf. В видео она показывает процесс распаковки сразу 15 книг и рассказывает, почему выбрала именно эти издания.

Она отмечает удобство заказа, качество сервиса и широкий ассортимент магазина. Такой формат помогает другим читателям находить интересные книги и вдохновляться на новые покупки.`
  }
};

// Get post ID from URL
const urlParams = new URLSearchParams(window.location.search);
const postId = parseInt(urlParams.get('id'));

// Get post data from blog.js
const blogPosts = [
  {
    id: 1,
    type: 'news',
    title: 'Мы переехали в новый офис!',
    image: 'images/blog-office.jpg',
    author: 'Администрация',
    date: '2026-04-05',
    readTime: '3 мин',
    videoUrl: null
  },
  {
    id: 2,
    type: 'customer',
    title: 'История Айгуль: Как книги изменили мою жизнь',
    image: 'blog/Айгуль 1 история/image.png',
    author: 'Айгуль Клиновская',
    date: '2026-04-03',
    readTime: '5 мин',
    videoUrl: 'https://el.kz/ru/pervyy-gonorar-mne-prislali-v-vide-semyan-sparzhi-intervyu-s-pisatelnitsey-aygul-klinovskoy_400035676/'
  },
  {
    id: 3,
    type: 'video',
    title: 'Распаковка заказа от Дамира',
    image: 'https://img.youtube.com/vi/OvCXT0cGbpQ/maxresdefault.jpg',
    author: 'Дамир',
    date: '2026-04-01',
    readTime: '2 мин',
    videoUrl: 'https://youtu.be/OvCXT0cGbpQ?si=fEyKLS-bmdpc5TsV'
  },
  {
    id: 4,
    type: 'news',
    title: 'Новая коллекция казахстанских авторов',
    image: 'blog/Новая коллекция казахстанских авторов/image.png',
    author: 'Редакция',
    date: '2026-03-28',
    readTime: '4 мин',
    videoUrl: null
  },
  {
    id: 5,
    type: 'video',
    title: 'Отзыв от Асель',
    image: 'https://img.youtube.com/vi/bxfrvFL-MzI/maxresdefault.jpg',
    author: 'Асель',
    date: '2026-03-25',
    readTime: '3 мин',
    videoUrl: 'https://youtu.be/bxfrvFL-MzI?si=5-fFNICCg_opmtjK'
  },
  {
    id: 6,
    type: 'video',
    title: 'Обзор книг от Ромы',
    image: 'https://img.youtube.com/vi/1S3-tFkUJBE/maxresdefault.jpg',
    author: 'Рома',
    date: '2026-03-22',
    readTime: '6 мин',
    videoUrl: 'https://youtu.be/1S3-tFkUJBE?si=5uefchK2BPBt0Jlz'
  },
  {
    id: 7,
    type: 'news',
    title: 'Запуск программы лояльности',
    image: 'blog/Запуск программы лояльности/image.png',
    author: 'Администрация',
    date: '2026-03-20',
    readTime: '4 мин',
    videoUrl: null
  },
  {
    id: 8,
    type: 'video',
    title: 'Алихан поделился своей коллекцией',
    image: 'https://img.youtube.com/vi/K1QVgm8R-TE/maxresdefault.jpg',
    author: 'Алихан',
    date: '2026-03-18',
    readTime: '3 мин',
    videoUrl: 'https://youtu.be/K1QVgm8R-TE?si=vygmxtIk0UUGjmKx'
  },
  {
    id: 9,
    type: 'video',
    title: '15 книг за раз!',
    image: 'https://img.youtube.com/vi/hbhpqpzjFWk/maxresdefault.jpg',
    author: 'Клиент',
    date: '2026-03-15',
    readTime: '4 мин',
    videoUrl: 'https://youtu.be/hbhpqpzjFWk?si=hK7TOhMVPdy7_saz'
  }
];

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

// Convert YouTube URL to embed URL
function getYouTubeEmbedUrl(url) {
  if (!url) return null;
  
  // Extract video ID from various YouTube URL formats
  let videoId = null;
  
  if (url.includes('youtu.be/')) {
    videoId = url.split('youtu.be/')[1].split('?')[0];
  } else if (url.includes('youtube.com/watch')) {
    videoId = url.split('v=')[1]?.split('&')[0];
  }
  
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;
  }
  
  return null;
}

// Render post
function renderPost() {
  const post = blogPosts.find(p => p.id === postId);
  const postContent = blogPostsContent[postId];
  
  if (!post || !postContent) {
    document.getElementById('blogPost').innerHTML = `
      <div style="text-align: center; padding: var(--spacing-16) 0;">
        <h2>Пост не найден</h2>
        <p style="margin: var(--spacing-4) 0;">К сожалению, запрошенный пост не существует.</p>
        <a href="blog.html" class="btn btn--primary">Вернуться к блогу</a>
      </div>
    `;
    return;
  }
  
  // Update breadcrumb
  document.getElementById('postBreadcrumb').textContent = post.title;
  
  // Badge type
  const badgeClass = `blog-post__badge--${post.type}`;
  const badgeText = {
    'news': 'Новости',
    'customer': 'История клиента',
    'video': 'Видео'
  }[post.type];
  
  // Author initial
  const authorInitial = post.author.charAt(0).toUpperCase();
  
  // Format date
  const formattedDate = formatDate(post.date);
  
  // Build HTML
  let html = `
    <div class="blog-post__header">
      <span class="blog-post__badge ${badgeClass}">${badgeText}</span>
      <h1 class="blog-post__title">${post.title}</h1>
      <div class="blog-post__meta">
        <div class="blog-post__meta-item">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
          <span>${formattedDate}</span>
        </div>
        <div class="blog-post__meta-item">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span>${post.readTime}</span>
        </div>
      </div>
      <div class="blog-post__author">
        <div class="blog-post__author-avatar">${authorInitial}</div>
        <span class="blog-post__author-name">${post.author}</span>
      </div>
    </div>
  `;
  
  // Add video or image
  if (post.videoUrl) {
    const embedUrl = getYouTubeEmbedUrl(post.videoUrl);
    if (embedUrl) {
      html += `
        <div class="blog-post__video">
          <iframe src="${embedUrl}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      `;
    }
  } else {
    html += `<img src="${post.image}" alt="${post.title}" class="blog-post__image" onerror="this.style.display='none'">`;
  }
  
  // Add content
  html += `
    <div class="blog-post__content">
      ${postContent.content.split('\n\n').map(p => `<p>${p}</p>`).join('')}
    </div>
  `;
  
  document.getElementById('blogPost').innerHTML = html;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderPost();
});

console.log('Blog post page initialized');
