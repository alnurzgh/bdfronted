const fs = require('fs');
const path = require('path');

const basePath = 'c:/Users/hyde/Desktop/bdfrontend';
const catalogJsPath = path.join(basePath, 'js', 'catalog.js');
const productJsPath = path.join(basePath, 'js', 'product.js');
const newbooksPath = path.join(basePath, 'newbooks');
const productsHtmlPath = path.join(basePath, 'products');

// 1. Extract products array from catalog.js
let catalogContent = fs.readFileSync(catalogJsPath, 'utf8');
let productsMatch = catalogContent.match(/const products = \[([\s\S]*?)\];/);
if (!productsMatch) {
    console.error("Could not find products array in catalog.js");
    process.exit(1);
}

// Evaluate the array to get the JS objects
let productsData;
eval(`productsData = [${productsMatch[1]}];`);

// 2. Parse info.txt for each new book (id 17-35)
productsData.forEach(product => {
    if (product.id >= 17) {
        // Extract folder name from image path (e.g. "newbooks/Сумерки/image.png")
        const folderName = product.image.split('/')[1];
        const infoTxtPath = path.join(newbooksPath, folderName, 'info.txt');
        
        if (fs.existsSync(infoTxtPath)) {
            const lines = fs.readFileSync(infoTxtPath, 'utf8').split('\n').map(l => l.trim());
            
            let currentSection = '';
            let description = [];
            let authorBio = [];
            let reviewsText = [];
            let details = {};
            
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                if (!line) continue;
                
                if (line.match(/^1\. О книге/)) {
                    currentSection = 'description';
                } else if (line.match(/^2\. Об авторе/)) {
                    currentSection = 'authorBio';
                    // The line itself might contain author name, but we already have it in product
                } else if (line.match(/^3\. Отзывы/)) {
                    currentSection = 'reviews';
                } else if (line.match(/^Детали/)) {
                    currentSection = 'details';
                } else if (currentSection === 'description') {
                    description.push(line);
                } else if (currentSection === 'authorBio') {
                    authorBio.push(line);
                } else if (currentSection === 'reviews') {
                    reviewsText.push(line);
                } else if (currentSection === 'details') {
                    if (line.match(/1\.ISBN|ISBN/i)) details.isbn = lines[++i]?.trim();
                    else if (line.match(/Формат/i)) details.format = lines[++i]?.trim();
                    else if (line.match(/Страниц/i)) details.pages = lines[++i]?.trim();
                    else if (line.match(/Размер/i)) details.size = lines[++i]?.trim();
                    else if (line.match(/Язык/i)) details.language = lines[++i]?.trim();
                    else if (line.match(/Год издания/i)) details.year = lines[++i]?.trim();
                }
            }
            
            product.description = description.join('\n\n');
            product.authorBio = authorBio.join('\n\n');
            
            // Generate some random reviews based on the text (rudimentary parsing)
            product.reviews = [
                { author: "Читатель", rating: 5, date: "10 апреля 2026", title: "Отличная книга", text: reviewsText.join(' ').substring(0, 100) + '...' },
                { author: "Книголюб", rating: 4, date: "5 апреля 2026", title: "Рекомендую", text: "Очень понравилось, отличная история." }
            ];
            
            Object.assign(product, details);
            
            // Format some numbers
            if (product.pages) product.pages = parseInt(product.pages) || 300;
            if (product.year) product.year = parseInt(product.year) || 2023;
        } else {
            console.warn(`Missing info.txt for ${product.title} at ${infoTxtPath}`);
        }
    }
});

// 3. Generate new products array string
const newProductsStr = JSON.stringify(productsData, null, 2);

// 4. Update product.js
let productJsContent = fs.readFileSync(productJsPath, 'utf8');
const productJsRegex = /const products = \[[\s\S]*?\];/;
productJsContent = productJsContent.replace(productJsRegex, `const products = ${newProductsStr};`);

// 5. Update logic in product.js to read data-product-id
productJsContent = productJsContent.replace(
    /const productId = parseInt\(urlParams.get\('id'\)\) \|\| 1;/,
    "const urlId = urlParams.get('id');\nconst dataId = document.querySelector('main.product-page')?.dataset.productId;\nconst productId = parseInt(urlId) || parseInt(dataId) || 1;"
);

fs.writeFileSync(productJsPath, productJsContent, 'utf8');

// 6. Update the HTML files!
// We'll use productUrls from catalog.js to know which HTML file belongs to which ID.
const productUrlsMatch = catalogContent.match(/const productUrls = ({[\s\S]*?});/);
let productUrls = {};
if (productUrlsMatch) {
    eval(`productUrls = ${productUrlsMatch[1]};`);
}

for (const [idStr, url] of Object.entries(productUrls)) {
    const id = parseInt(idStr);
    const htmlFilename = url.split('/').pop();
    const htmlPath = path.join(productsHtmlPath, htmlFilename);
    const product = productsData.find(p => p.id === id);
    
    if (fs.existsSync(htmlPath) && product) {
        let htmlContent = fs.readFileSync(htmlPath, 'utf8');
        
        // Inject data-product-id into main
        if (!htmlContent.includes('data-product-id')) {
            htmlContent = htmlContent.replace(/<main class="product-page">/, `<main class="product-page" data-product-id="${id}">`);
        } else {
            htmlContent = htmlContent.replace(/data-product-id="\d+"/, `data-product-id="${id}"`);
        }
        
        // Because product.js will dynamically update the page, we don't STRICTLY need to update all the HTML elements.
        // However, we should at least fix the `<title>`, breadcrumb, and image so it looks correct before JS runs.
        htmlContent = htmlContent.replace(/<title>.*?<\/title>/, `<title>${product.title} - Smart Bookshelf</title>`);
        htmlContent = htmlContent.replace(/<meta name="description" content=".*?">/, `<meta name="description" content="${product.title} - ${product.author}">`);
        
        // Replace breadcrumb
        htmlContent = htmlContent.replace(/<div class="breadcrumbs__item">\s*<span>.*?<\/span>\s*<\/div>/s, `<div class="breadcrumbs__item">\n                    <span>${product.title}</span>\n                </div>`);
        
        // Replace main image
        htmlContent = htmlContent.replace(/<img src="\.\.\/images\/products\/.*?" alt=".*?" id="mainImage">/, `<img src="../${product.image}" alt="${product.title}" id="mainImage">`);
        
        // Replace thumbnail
        htmlContent = htmlContent.replace(/<button class="product-gallery__thumb active">\s*<img src="\.\.\/images\/products\/.*?" alt="Thumbnail 1">\s*<\/button>/s, `<button class="product-gallery__thumb active">\n                            <img src="../${product.image}" alt="Thumbnail 1">\n                        </button>`);
        
        fs.writeFileSync(htmlPath, htmlContent, 'utf8');
        console.log(`Updated HTML: ${htmlFilename} with ID ${id}`);
    }
}

console.log("SUCCESS!");
