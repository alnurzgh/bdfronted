// Product Page JavaScript

// Mock product data (same as catalog.js)
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
    isNew: true,
    isbn: "978-0-307-47329-9",
    pages: 112,
    publisher: "Knopf",
    year: 2024,
    description: "A posthumous novel by Gabriel García Márquez, discovered among his papers after his death. The story follows Ana Magdalena Bach, a middle-aged woman who embarks on a series of clandestine affairs during her annual August visits to a Caribbean island. Written in Márquez's signature magical realism style, this intimate novella explores themes of desire, freedom, and the complexity of human relationships.",
    authorBio: "Gabriel García Márquez (1927-2014) was a Colombian novelist, short-story writer, and journalist, known affectionately as Gabo throughout Latin America. He was awarded the Nobel Prize in Literature in 1982. His works, including 'One Hundred Years of Solitude' and 'Love in the Time of Cholera', are considered masterpieces of magical realism.",
    reviews: [
      { author: "Мария Петрова", rating: 5, date: "20 марта 2026", title: "Последний подарок от мастера", text: "Невероятно трогательная и честная книга. Márquez до последнего оставался великим писателем." },
      { author: "Алексей Иванов", rating: 5, date: "15 марта 2026", title: "Магический реализм в лучшем виде", text: "Короткая, но очень глубокая история о женской свободе и желаниях." }
    ]
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
    isNew: false,
    isbn: "978-0-292-70182-7",
    pages: 128,
    publisher: "University of Texas Press",
    year: 2023,
    description: "A powerful novel about a family struggling to survive in the harsh Brazilian sertão. Fabiano, his wife Vitória, their two sons, and their dog Baleia face drought, poverty, and exploitation. Ramos's sparse, poetic prose captures the brutal reality of rural poverty while maintaining deep humanity and compassion for his characters.",
    authorBio: "Graciliano Ramos (1892-1953) was a Brazilian modernist writer, politician, and journalist. He is considered one of the greatest Brazilian writers of the 20th century. His works are known for their social realism and psychological depth, often depicting the harsh realities of life in northeastern Brazil.",
    reviews: [
      { author: "Ирина Соколова", rating: 5, date: "18 марта 2026", title: "Жестокая правда жизни", text: "Пронзительная книга о выживании. Ramos не приукрашивает реальность, но пишет с огромным состраданием." },
      { author: "Павел Морозов", rating: 4, date: "12 марта 2026", title: "Сильная проза", text: "Тяжелая, но важная книга. Показывает реальность, о которой многие не знают." }
    ]
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
    isNew: false,
    isbn: "978-0-307-47330-5",
    pages: 256,
    publisher: "Knopf",
    year: 2024,
    description: "Dream Count is a deeply introspective novel exploring the complexities of love, identity, and self-reflection through the intertwined lives of four women. Chiamaka, a Nigerian travel writer living in America, confronts her past relationships and regrets during the isolation of the pandemic. Through vivid storytelling and emotional depth, Adichie weaves a narrative that examines the nature of desire, the weight of choices, and the search for meaning in modern life.",
    authorBio: "Chimamanda Ngozi Adichie was born in Nigeria in 1977. She is the author of the novels Purple Hibiscus, Half of a Yellow Sun, and Americanah, and the short story collection The Thing Around Your Neck. Her work has been translated into over thirty languages and has won numerous awards, including the Orange Prize for Fiction and the National Book Critics Circle Award. She is also a prominent feminist and public speaker, known for her TED talks 'We Should All Be Feminists' and 'The Danger of a Single Story.'",
    reviews: [
      { author: "Анна Михайлова", rating: 5, date: "15 марта 2026", title: "Потрясающая книга!", text: "Адичи снова доказывает, что она мастер своего дела. Глубокая, трогательная история о женщинах, их выборе и последствиях. Читается на одном дыхании." },
      { author: "Дмитрий Ковалев", rating: 4, date: "10 марта 2026", title: "Сильная проза", text: "Очень личная и честная книга. Адичи не боится затрагивать сложные темы. Местами тяжело читать, но это того стоит." }
    ]
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
    isNew: false,
    isbn: "978-0-385-54878-1",
    pages: 320,
    publisher: "Doubleday",
    year: 2024,
    description: "A gripping psychological thriller from the author of The Girl on the Train. Set on a remote Scottish island, the story follows a reclusive artist whose peaceful existence is shattered when a young woman's body washes ashore. As secrets unravel and the past collides with the present, Hawkins masterfully builds tension in this atmospheric tale of obsession, art, and murder.",
    authorBio: "Paula Hawkins is a British author best known for her psychological thriller 'The Girl on the Train', which became a global phenomenon and was adapted into a major motion picture. Born in Zimbabwe and raised in London, Hawkins worked as a journalist before turning to fiction. Her novels are characterized by unreliable narrators, complex female characters, and dark psychological themes.",
    reviews: [
      { author: "Ольга Волкова", rating: 5, date: "22 марта 2026", title: "Захватывающий триллер", text: "Не могла оторваться! Hawkins создает невероятную атмосферу и держит в напряжении до последней страницы." },
      { author: "Сергей Белов", rating: 4, date: "17 марта 2026", title: "Отличный психологический триллер", text: "Мрачная атмосфера шотландского острова идеально подходит для этой истории. Рекомендую!" }
    ]
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
    isNew: false,
    isbn: "978-1-101-94713-3",
    pages: 320,
    publisher: "Knopf",
    year: 2016,
    description: "A sweeping multi-generational novel tracing two branches of a family through centuries. Beginning with two half-sisters in 18th century Ghana—one sold into slavery, one married to a British slaver—the novel follows their descendants through eight generations. Gyasi's debut is an epic exploration of the legacy of slavery, colonialism, and the African diaspora, told through intimate, interconnected stories.",
    authorBio: "Yaa Gyasi was born in Ghana and raised in Huntsville, Alabama. She holds a BA in English from Stanford University and an MFA from the Iowa Writers' Workshop. 'Homegoing' was her debut novel, published when she was just 26 years old. The book won numerous awards and was selected for Oprah's Book Club. Gyasi's work explores themes of race, identity, and the lasting impact of historical trauma.",
    reviews: [
      { author: "Екатерина Новикова", rating: 5, date: "25 марта 2026", title: "Эпическая семейная сага", text: "Невероятно мощная книга о наследии рабства. Каждая глава - отдельная история, но все вместе создают потрясающую картину." },
      { author: "Андрей Смирнов", rating: 5, date: "19 марта 2026", title: "Обязательно к прочтению", text: "Одна из лучших книг, которые я читал. Gyasi талантливо показывает, как история влияет на поколения." }
    ]
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
    isNew: false,
    isbn: "978-1-101-97127-5",
    pages: 272,
    publisher: "Knopf",
    year: 2017,
    description: "A powerful debut novel about a marriage tested by infertility in 1980s Nigeria. Yejide and Akin's love story is complicated when, after four years of marriage without children, Akin's family pressures him to take a second wife. Set against the backdrop of Nigeria's political turmoil, this intimate novel explores themes of love, betrayal, tradition, and the lengths people will go to for family.",
    authorBio: "Ayọ̀bámi Adébáyọ̀ was born in Lagos, Nigeria. She has a BA in Literature in English from Obafemi Awolowo University and an MA in Creative Writing from the University of East Anglia. 'Stay With Me' was her debut novel and won the 9mobile Prize for Literature. Her work explores contemporary Nigerian life, gender roles, and the tension between tradition and modernity.",
    reviews: [
      { author: "Наталья Кузнецова", rating: 5, date: "14 марта 2026", title: "Трогательная история любви", text: "Очень честная книга о браке, традициях и желании иметь детей. Adébáyọ̀ пишет с большой эмпатией." },
      { author: "Виктор Лебедев", rating: 4, date: "9 марта 2026", title: "Сильный дебют", text: "Интересный взгляд на нигерийскую культуру и семейные отношения. Рекомендую." }
    ]
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
    isNew: false,
    isbn: "978-0-375-70386-9",
    pages: 448,
    publisher: "Random House",
    year: 2000,
    description: "A brilliant debut novel about friendship, family, and the complexities of modern London. Following the lives of two families—the Joneses and the Iqbals—over several decades, Smith creates a vibrant portrait of multicultural Britain. With wit, humor, and insight, she explores themes of immigration, identity, religion, and the clash between tradition and modernity in contemporary London.",
    authorBio: "Zadie Smith was born in London in 1975 to a Jamaican mother and English father. She studied English Literature at Cambridge University. 'White Teeth' was published when she was just 24 and became an instant bestseller. Smith has since written several acclaimed novels and essay collections. She is known for her sharp social commentary, diverse characters, and exploration of multicultural identity.",
    reviews: [
      { author: "Светлана Орлова", rating: 5, date: "28 марта 2026", title: "Шедевр современной литературы", text: "Невероятно смешная и умная книга о современном Лондоне. Smith создает живых, запоминающихся персонажей." },
      { author: "Максим Федоров", rating: 5, date: "21 марта 2026", title: "Обязательно к прочтению", text: "Одна из лучших книг о мультикультурализме. Остроумная и глубокая одновременно." }
    ]
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
    isNew: false,
    isbn: "978-0-8021-5794-9",
    pages: 144,
    publisher: "Grove Press",
    year: 2021,
    description: "A tender love story about two young Black artists navigating life in London. The narrator, a photographer, falls in love with a dancer, and together they explore art, identity, and what it means to be Black in contemporary Britain. Written in lyrical, poetic prose, this debut novel is an intimate meditation on love, masculinity, and the power of vulnerability.",
    authorBio: "Caleb Azumah Nelson is a British-Ghanaian writer and photographer born and raised in South East London. He graduated from the University of Westminster with a degree in Politics and International Relations. 'Open Water' is his debut novel and won the Costa First Novel Award. His work explores themes of Black British identity, masculinity, and the intersection of art and life.",
    reviews: [
      { author: "Дарья Романова", rating: 5, date: "26 марта 2026", title: "Поэтичная история любви", text: "Невероятно красивая проза. Nelson пишет о любви с такой нежностью и честностью." },
      { author: "Игорь Васильев", rating: 4, date: "20 марта 2026", title: "Сильный дебют", text: "Короткая, но очень мощная книга. Лиричная и трогательная." }
    ]
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
    isNew: false,
    isbn: "978-0-316-55633-0",
    pages: 400,
    publisher: "Little, Brown",
    year: 2018,
    description: "A stunning reimagining of the life of Circe, the sorceress from Greek mythology. Banished to a deserted island for her powers of witchcraft, Circe hones her craft and encounters famous mythological figures including Odysseus, the Minotaur, and Medea. Miller transforms the story of a minor goddess into an epic tale of female empowerment, independence, and the search for belonging.",
    authorBio: "Madeline Miller is an American novelist and classicist. She studied Classics at Brown University and earned her MA in the same subject from the University of Pennsylvania. Her debut novel 'The Song of Achilles' won the Orange Prize for Fiction. Miller is known for her lyrical prose and her ability to breathe new life into ancient myths, particularly by centering female perspectives.",
    reviews: [
      { author: "Юлия Соловьева", rating: 5, date: "30 марта 2026", title: "Великолепная переработка мифа", text: "Miller превращает Цирцею из злодейки в сложного, многогранного персонажа. Абсолютный шедевр!" },
      { author: "Денис Козлов", rating: 5, date: "24 марта 2026", title: "Лучшая книга о греческой мифологии", text: "Невероятно красивая проза. Даже если вы не любите мифологию, эта книга вас захватит." }
    ]
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
    isNew: false,
    isbn: "978-0-525-52096-5",
    pages: 304,
    publisher: "Knopf",
    year: 2018,
    description: "A powerful novel about urban Native American lives converging at a powwow. Twelve characters from Native communities across Oakland, California, travel to the Big Oakland Powwow, each carrying their own stories of struggle, survival, and identity. Orange weaves together their narratives in a devastating exploration of contemporary Native American life, historical trauma, and the search for connection.",
    authorBio: "Tommy Orange is a Native American author, an enrolled member of the Cheyenne and Arapaho Tribes of Oklahoma. He was born and raised in Oakland, California. He holds an MFA from the Institute of American Indian Arts. 'There There' is his debut novel and was a finalist for the Pulitzer Prize. Orange's work focuses on urban Native American experiences, challenging stereotypes and bringing visibility to often-overlooked communities.",
    reviews: [
      { author: "Алина Петрова", rating: 5, date: "27 марта 2026", title: "Мощная и важная книга", text: "Orange рассказывает истории, которые редко слышны. Честная и пронзительная книга о современных коренных американцах." },
      { author: "Роман Сидоров", rating: 4, date: "22 марта 2026", title: "Сильный дебют", text: "Множество персонажей и историй сплетаются в захватывающее повествование. Рекомендую!" }
    ]
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
    isNew: false,
    isbn: "978-1-250-20976-9",
    pages: 400,
    publisher: "Flatiron Books",
    year: 2020,
    description: "A gripping story of a mother and son fleeing cartel violence in Mexico. Lydia, a bookshop owner in Acapulco, and her eight-year-old son Luca must flee after a cartel massacre kills their family. Their harrowing journey north toward the US border is a tale of survival, resilience, and the desperate search for safety. A controversial but compelling look at the migrant experience.",
    authorBio: "Jeanine Cummins is an American author of Irish and Puerto Rican heritage. She has written several novels and a memoir. 'American Dirt' became a bestseller but also sparked significant controversy regarding cultural representation and who has the right to tell certain stories. Despite the debate, the novel brought attention to the experiences of migrants fleeing violence.",
    reviews: [
      { author: "Марина Григорьева", rating: 4, date: "16 марта 2026", title: "Захватывающая, но спорная", text: "Очень напряженная история о миграции. Читается как триллер, хотя тема серьезная." },
      { author: "Олег Захаров", rating: 3, date: "11 марта 2026", title: "Интересно, но не без проблем", text: "Хорошо написано, но понимаю критику относительно культурной репрезентации." }
    ]
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
    isNew: false,
    isbn: "978-1-449-47425-6",
    pages: 208,
    publisher: "Andrews McMeel",
    year: 2015,
    description: "A collection of poetry and prose about survival, femininity, and love. Divided into four chapters—the hurting, the loving, the breaking, and the healing—Kaur explores themes of trauma, abuse, love, loss, and femininity. Her minimalist style and raw honesty have resonated with millions of readers worldwide, making this one of the most popular poetry collections of the modern era.",
    authorBio: "Rupi Kaur is a Canadian poet, illustrator, and author of Punjabi descent. Born in India and raised in Canada, she began performing poetry at the age of 21. Her Instagram poetry went viral, leading to the publication of 'Milk and Honey'. Kaur's work is characterized by its accessibility, emotional directness, and focus on female empowerment and healing from trauma.",
    reviews: [
      { author: "Анастасия Белова", rating: 5, date: "29 марта 2026", title: "Исцеляющая поэзия", text: "Каждое стихотворение трогает до глубины души. Kaur пишет о боли и исцелении с невероятной честностью." },
      { author: "Кирилл Морозов", rating: 5, date: "23 марта 2026", title: "Простая, но мощная", text: "Минималистичный стиль делает эти стихи еще более сильными. Рекомендую всем." }
    ]
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
    isNew: true,
    isbn: "978-0-7352-1129-2",
    pages: 320,
    publisher: "Avery",
    year: 2018,
    description: "A practical guide to building good habits and breaking bad ones. Clear presents a proven framework for improving every day through tiny changes. Drawing on neuroscience, psychology, and real-world examples, he explains how small habits compound into remarkable results. The book offers actionable strategies for habit formation, making it easier to stick to good habits and break bad ones.",
    authorBio: "James Clear is an author, speaker, and entrepreneur focused on habits, decision-making, and continuous improvement. His work has appeared in the New York Times, Time, and Entrepreneur. 'Atomic Habits' has sold millions of copies worldwide and has been translated into over 50 languages. Clear's website receives millions of visitors each month, and his newsletter has hundreds of thousands of subscribers.",
    reviews: [
      { author: "Татьяна Волкова", rating: 5, date: "31 марта 2026", title: "Лучшая книга о привычках", text: "Практичная и понятная. Clear дает конкретные инструменты, которые реально работают. Изменила мою жизнь!" },
      { author: "Артем Николаев", rating: 5, date: "25 марта 2026", title: "Must-read для всех", text: "Если вы хотите что-то изменить в своей жизни, начните с этой книги. Очень рекомендую!" }
    ]
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
    isNew: false,
    isbn: "978-0-062-31609-7",
    pages: 464,
    publisher: "Harper",
    year: 2015,
    description: "A brief history of humankind from the Stone Age to the modern age. Harari explores how Homo sapiens came to dominate the world, examining the Cognitive Revolution, the Agricultural Revolution, and the Scientific Revolution. He challenges our assumptions about progress, happiness, and what it means to be human, offering a sweeping narrative that connects biology, history, and philosophy.",
    authorBio: "Yuval Noah Harari is an Israeli historian and professor at the Hebrew University of Jerusalem. He specializes in world history, medieval history, and military history. 'Sapiens' became an international bestseller and has been translated into over 60 languages. Harari has since written 'Homo Deus' and '21 Lessons for the 21st Century'. His work is known for its broad scope and provocative insights.",
    reviews: [
      { author: "Владимир Соколов", rating: 5, date: "28 марта 2026", title: "Переворачивает представление о мире", text: "Harari заставляет по-новому взглянуть на историю человечества. Увлекательно и познавательно!" },
      { author: "Елена Павлова", rating: 5, date: "21 марта 2026", title: "Обязательно к прочтению", text: "Одна из самых важных книг нашего времени. Меняет взгляд на прошлое, настоящее и будущее." }
    ]
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
    isNew: false,
    isbn: "978-0-374-53355-7",
    pages: 512,
    publisher: "Farrar, Straus and Giroux",
    year: 2011,
    description: "A groundbreaking exploration of the two systems that drive the way we think. Kahneman, a Nobel Prize winner, explains how our minds work through two systems: System 1 (fast, intuitive, emotional) and System 2 (slow, deliberate, logical). He reveals the biases and heuristics that influence our decisions, offering insights into how we can make better choices in business, life, and relationships.",
    authorBio: "Daniel Kahneman is an Israeli-American psychologist and economist notable for his work on the psychology of judgment and decision-making. He was awarded the Nobel Memorial Prize in Economic Sciences in 2002. His research with Amos Tversky on cognitive biases has profoundly influenced economics, psychology, and behavioral science. 'Thinking, Fast and Slow' synthesizes decades of his groundbreaking research.",
    reviews: [
      { author: "Михаил Петров", rating: 5, date: "26 марта 2026", title: "Меняет понимание мышления", text: "Kahneman объясняет, почему мы принимаем иррациональные решения. Обязательна к прочтению для всех!" },
      { author: "Ирина Федорова", rating: 5, date: "20 марта 2026", title: "Фундаментальная работа", text: "Сложная, но невероятно важная книга. Помогает понять себя и других людей." }
    ]
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
    isNew: false,
    isbn: "978-0-307-88789-4",
    pages: 336,
    publisher: "Crown Business",
    year: 2011,
    description: "How today's entrepreneurs use continuous innovation to create radically successful businesses. Ries introduces the Lean Startup methodology, which emphasizes rapid experimentation, validated learning, and iterative product releases. The book teaches entrepreneurs how to build sustainable businesses by testing hypotheses, measuring progress, and pivoting when necessary, minimizing waste and maximizing learning.",
    authorBio: "Eric Ries is an entrepreneur and author who pioneered the Lean Startup movement. He served as a senior software engineer at There.com and co-founded IMVU, where he developed many of the Lean Startup principles. Ries has been a consultant to startups, venture capital firms, and large companies. His work has influenced how startups and established companies approach innovation and product development worldwide.",
    reviews: [
      { author: "Александр Ковалев", rating: 5, date: "24 марта 2026", title: "Библия для стартапов", text: "Ries создал методологию, которая изменила мир стартапов. Обязательна для всех предпринимателей!" },
      { author: "Ольга Семенова", rating: 4, date: "18 марта 2026", title: "Практичная и полезная", text: "Много конкретных советов и примеров. Помогла мне запустить свой проект." }
    ]
  }
];

// Get product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get('id')) || 1;

// Find the product
const currentProduct = products.find(p => p.id === productId) || products[0];

// Update page with product data
function loadProductData() {
  // Update title
  document.title = `${currentProduct.title} - Smart Bookshelf`;
  
  // Update breadcrumb
  const breadcrumbTitle = document.querySelector('.breadcrumbs__item:last-child span');
  if (breadcrumbTitle) {
    breadcrumbTitle.textContent = currentProduct.title;
  }
  
  // Update main image
  const mainImage = document.getElementById('mainImage');
  if (mainImage) {
    mainImage.src = currentProduct.image;
    mainImage.alt = currentProduct.title;
  }
  
  // Update thumbnails
  const thumbs = document.querySelectorAll('.product-gallery__thumb img');
  thumbs.forEach(thumb => {
    thumb.src = currentProduct.image;
    thumb.alt = currentProduct.title;
  });
  
  // Update product info
  const titleElement = document.querySelector('.product-info__title');
  if (titleElement) titleElement.textContent = currentProduct.title;
  
  const authorElement = document.querySelector('.product-info__author');
  if (authorElement) authorElement.textContent = currentProduct.author;
  
  const priceElement = document.querySelector('.product-info__price');
  if (priceElement) priceElement.textContent = `$${currentProduct.price.toFixed(2)}`;
  
  // Update rating
  const ratingValue = document.querySelector('.product-info__rating-value');
  if (ratingValue) ratingValue.textContent = currentProduct.rating.toFixed(1);
  
  // Update stock status
  const stockElement = document.querySelector('.product-info__stock');
  if (stockElement) {
    if (currentProduct.inStock) {
      stockElement.innerHTML = '<svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg> В наличии';
      stockElement.style.color = '#10b981';
    } else {
      stockElement.innerHTML = '<svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/></svg> Нет в наличии';
      stockElement.style.color = '#ef4444';
    }
  }
  
  // Update details
  const isbnElement = document.querySelector('.product-details__item:nth-child(1) .product-details__value');
  if (isbnElement) isbnElement.textContent = currentProduct.isbn || 'N/A';
  
  const pagesElement = document.querySelector('.product-details__item:nth-child(2) .product-details__value');
  if (pagesElement) pagesElement.textContent = currentProduct.pages || 'N/A';
  
  const publisherElement = document.querySelector('.product-details__item:nth-child(3) .product-details__value');
  if (publisherElement) publisherElement.textContent = currentProduct.publisher || 'N/A';
  
  const yearElement = document.querySelector('.product-details__item:nth-child(4) .product-details__value');
  if (yearElement) yearElement.textContent = currentProduct.year || 'N/A';
  
  // Update description tab
  const descriptionPanel = document.querySelector('.tabs__panel#description');
  if (descriptionPanel && currentProduct.description) {
    descriptionPanel.innerHTML = `
      <h2>О книге</h2>
      <p>${currentProduct.description}</p>
    `;
  }
  
  // Update author tab
  const authorPanel = document.querySelector('.tabs__panel#author');
  if (authorPanel && currentProduct.authorBio) {
    authorPanel.innerHTML = `
      <h2>${currentProduct.author}</h2>
      <p>${currentProduct.authorBio}</p>
    `;
  }
  
  // Update reviews tab
  const reviewsPanel = document.querySelector('.tabs__panel#reviews');
  if (reviewsPanel && currentProduct.reviews) {
    const reviewsHTML = currentProduct.reviews.map(review => `
      <article class="review">
        <div class="review__header">
          <div class="review__avatar">${review.author.split(' ').map(n => n[0]).join('')}</div>
          <div class="review__info">
            <div class="review__author">${review.author}</div>
            <div class="review__rating">${'⭐'.repeat(review.rating)}</div>
            <div class="review__date">${review.date}</div>
          </div>
        </div>
        <div class="review__content">
          <h4 class="review__title">${review.title}</h4>
          <p class="review__text">${review.text}</p>
        </div>
        <div class="review__footer">
          <button class="review__helpful">Полезно (${Math.floor(Math.random() * 30) + 10})</button>
        </div>
      </article>
    `).join('');
    
    const avgRating = currentProduct.rating.toFixed(1);
    const reviewCount = currentProduct.reviews.length;
    
    reviewsPanel.innerHTML = `
      <div class="reviews">
        <div class="reviews__summary">
          <div class="reviews__rating">
            <div class="reviews__rating-number">${avgRating}</div>
            <div class="reviews__rating-stars">${'⭐'.repeat(Math.round(currentProduct.rating))}</div>
            <div class="reviews__rating-count">На основе ${reviewCount} отзывов</div>
          </div>
          <button class="btn btn--primary" id="writeReviewBtn">Написать отзыв</button>
        </div>
        <div class="reviews__list">
          ${reviewsHTML}
        </div>
        <button class="btn btn--outline" style="margin-top: var(--spacing-6);">Показать еще отзывы</button>
      </div>
    `;
  }
}

// Load product data on page load
loadProductData();

// Gallery functionality
const mainImage = document.getElementById('mainImage');
const thumbs = document.querySelectorAll('.product-gallery__thumb');

thumbs.forEach((thumb, index) => {
  thumb.addEventListener('click', () => {
    // Remove active class from all thumbs
    thumbs.forEach(t => t.classList.remove('active'));
    
    // Add active class to clicked thumb
    thumb.classList.add('active');
    
    // Update main image
    const img = thumb.querySelector('img');
    mainImage.src = img.src;
    
    // Add animation
    mainImage.style.opacity = '0';
    setTimeout(() => {
      mainImage.style.opacity = '1';
    }, 100);
  });
});

// Quantity selector
const quantityInput = document.getElementById('quantity');
const decreaseBtn = document.getElementById('decreaseQty');
const increaseBtn = document.getElementById('increaseQty');

if (decreaseBtn && increaseBtn && quantityInput) {
  decreaseBtn.addEventListener('click', () => {
    const currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
      quantityInput.value = currentValue - 1;
    }
  });

  increaseBtn.addEventListener('click', () => {
    const currentValue = parseInt(quantityInput.value);
    const maxValue = parseInt(quantityInput.max);
    if (currentValue < maxValue) {
      quantityInput.value = currentValue + 1;
    }
  });

  quantityInput.addEventListener('change', () => {
    let value = parseInt(quantityInput.value);
    const min = parseInt(quantityInput.min);
    const max = parseInt(quantityInput.max);
    
    if (isNaN(value) || value < min) {
      quantityInput.value = min;
    } else if (value > max) {
      quantityInput.value = max;
    }
  });
}

// Add to cart
const addToCartBtn = document.getElementById('addToCartBtn');
if (addToCartBtn) {
  addToCartBtn.addEventListener('click', () => {
    const quantity = parseInt(quantityInput.value);
    const product = {
      id: currentProduct.id,
      title: currentProduct.title,
      author: currentProduct.author,
      price: currentProduct.price,
      image: currentProduct.image,
      quantity: quantity
    };
    
    // Add to cart (using cart from main.js)
    if (typeof cart !== 'undefined') {
      for (let i = 0; i < quantity; i++) {
        cart.addItem({ ...product, quantity: 1 });
      }
    }
    
    // Visual feedback
    addToCartBtn.textContent = 'Добавлено!';
    addToCartBtn.style.background = '#10b981';
    
    setTimeout(() => {
      addToCartBtn.innerHTML = `
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
        </svg>
        Добавить в корзину
      `;
      addToCartBtn.style.background = '';
    }, 2000);
  });
}

// Tabs functionality
const tabButtons = document.querySelectorAll('.tabs__btn');
const tabPanels = document.querySelectorAll('.tabs__panel');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const targetTab = button.dataset.tab;
    
    // Remove active class from all buttons and panels
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabPanels.forEach(panel => panel.classList.remove('active'));
    
    // Add active class to clicked button and corresponding panel
    button.classList.add('active');
    document.getElementById(targetTab).classList.add('active');
  });
});

// Shipping calculator
const calculateShippingBtn = document.getElementById('calculateShipping');
const zipCodeInput = document.getElementById('zipCode');

if (calculateShippingBtn && zipCodeInput) {
  calculateShippingBtn.addEventListener('click', () => {
    const zipCode = zipCodeInput.value.trim();
    
    if (!zipCode) {
      alert('Пожалуйста, введите почтовый индекс');
      return;
    }
    
    // Simulate shipping calculation
    calculateShippingBtn.textContent = 'Расчет...';
    calculateShippingBtn.disabled = true;
    
    setTimeout(() => {
      const shippingCost = Math.random() > 0.5 ? 'Бесплатно' : '$5.00';
      const deliveryDays = Math.floor(Math.random() * 3) + 2;
      
      if (typeof cart !== 'undefined') {
        cart.showNotification(`Доставка: ${shippingCost}, ${deliveryDays}-${deliveryDays + 2} дня`);
      } else {
        alert(`Доставка: ${shippingCost}\nСрок доставки: ${deliveryDays}-${deliveryDays + 2} дня`);
      }
      
      calculateShippingBtn.textContent = 'Рассчитать';
      calculateShippingBtn.disabled = false;
    }, 1000);
  });
}

// Write review button
const writeReviewBtn = document.getElementById('writeReviewBtn');
if (writeReviewBtn) {
  writeReviewBtn.addEventListener('click', () => {
    // Switch to reviews tab
    const reviewsTab = document.querySelector('[data-tab="reviews"]');
    if (reviewsTab) {
      reviewsTab.click();
    }
    
    // Show notification (in real app, would open a modal)
    if (typeof cart !== 'undefined') {
      cart.showNotification('Функция написания отзывов будет доступна в следующей версии');
    }
  });
}

// Load related products
const relatedProductsGrid = document.getElementById('relatedProducts');
if (relatedProductsGrid) {
  // Get 4 random products excluding current product
  const relatedProducts = products
    .filter(p => p.id !== currentProduct.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  relatedProductsGrid.innerHTML = relatedProducts.map(product => `
    <article class="product-card" data-product-id="${product.id}">
      <div class="product-card__image-wrapper">
        <div class="book-3d">
          <button class="product-card__wishlist" aria-label="Добавить в избранное">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
          </button>
          <img src="${product.image}" alt="${product.title}" class="product-card__image">
        </div>
      </div>
      <div class="product-card__content">
        <h3 class="product-card__title">${product.title}</h3>
        <p class="product-card__author">${product.author}</p>
        <div class="product-card__footer">
          <span class="product-card__price">$${product.price.toFixed(2)}</span>
          <button class="product-card__add-btn" aria-label="Добавить в корзину">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
          </button>
        </div>
      </div>
    </article>
  `).join('');

  // Add click handlers
  relatedProductsGrid.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (!e.target.closest('.product-card__wishlist') && !e.target.closest('.product-card__add-btn')) {
        const productId = card.dataset.productId;
        window.location.href = `product.html?id=${productId}`;
      }
    });
  });
}

// Review helpful buttons
document.querySelectorAll('.review__helpful').forEach(btn => {
  btn.addEventListener('click', function() {
    const currentText = this.textContent;
    const match = currentText.match(/\d+/);
    if (match) {
      const count = parseInt(match[0]) + 1;
      this.textContent = currentText.replace(/\d+/, count);
      this.style.color = 'var(--color-black)';
      this.style.borderColor = 'var(--color-black)';
      this.disabled = true;
    }
  });
});

console.log('Product page initialized');
