const fs = require('fs-extra');
const path = require('path');
const { marked } = require('marked');
const { generateSEOTags } = require('./assets/js/seo-config.js');

// Configure marked for security
marked.setOptions({
    headerIds: false,
    mangle: false
});

// Function to extract excerpt from markdown content
function extractExcerpt(content, length = 150) {
    // Remove HTML tags and markdown syntax
    const text = content
        .replace(/<[^>]*>/g, '')
        .replace(/[#*_`]/g, '')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/\n/g, ' ')
        .trim();
    return text.length > length ? text.slice(0, length) + '...' : text;
}

// Function to generate a color based on category
function getCategoryColor(category) {
    const colors = {
        'AI': '#2c3e50',
        'Technology': '#c0392b',
        'Digital Transformation': '#27ae60',
        'AdTech': '#8e44ad',
        'default': '#34495e'
    };
    return colors[category] || colors.default;
}

// Template for blog index page
const blogIndexTemplate = (blogPosts, categories) => {
    const postsPerPage = 3;
    const totalPages = Math.ceil(blogPosts.length / postsPerPage);
    
    // Function to generate pagination HTML
    const generatePagination = (currentPage) => {
        let paginationHtml = '<div class="pagination">';
        
        // Previous button
        if (currentPage > 1) {
            paginationHtml += `<a href="?page=${currentPage - 1}" data-page="${currentPage - 1}">Previous</a>`;
        } else {
            paginationHtml += '<a class="disabled">Previous</a>';
        }
        
        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (i === currentPage) {
                paginationHtml += `<a class="active" data-page="${i}">${i}</a>`;
            } else {
                paginationHtml += `<a href="?page=${i}" data-page="${i}">${i}</a>`;
            }
        }
        
        // Next button
        if (currentPage < totalPages) {
            paginationHtml += `<a href="?page=${currentPage + 1}" data-page="${currentPage + 1}">Next</a>`;
        } else {
            paginationHtml += '<a class="disabled">Next</a>';
        }
        
        paginationHtml += '</div>';
        return paginationHtml;
    };
    
    // Get current page from URL or default to 1
    const currentPage = 1;
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    
    // Get posts for current page
    const currentPagePosts = blogPosts.slice(startIndex, endIndex);

    // Add client-side JavaScript for pagination
    const paginationScript = `
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Handle pagination
            const urlParams = new URLSearchParams(window.location.search);
            const currentPage = parseInt(urlParams.get('page')) || 1;
            
            // Update active state and URLs
            const paginationLinks = document.querySelectorAll('.pagination a');
            paginationLinks.forEach(link => {
                const page = link.getAttribute('data-page');
                if (page && parseInt(page) === currentPage) {
                    link.classList.add('active');
                }
                
                // Update Previous/Next buttons
                if (link.textContent === 'Previous' && currentPage > 1) {
                    link.href = '?page=' + (currentPage - 1);
                    link.classList.remove('disabled');
                }
                if (link.textContent === 'Next' && currentPage < ${totalPages}) {
                    link.href = '?page=' + (currentPage + 1);
                    link.classList.remove('disabled');
                }
            });

            // Handle category filter
            const categoryLinks = document.querySelectorAll('.sidebar-widget a[href^="?category="]');
            categoryLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const category = this.getAttribute('href').split('=')[1];
                    window.location.href = '?category=' + encodeURIComponent(category);
                });
            });
        });
    </script>`;

    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            ${generateSEOTags('blog')}
            <title>Blog - Ronnie Lutaro</title>
            <link rel="stylesheet" href="assets/css/style.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
        </head>
        <body>
            <header>
                <nav class="navbar">
                    <div class="logo">Ronnie Lutaro</div>
                    <ul class="nav-links">
                        <li><a href="index.html">Home</a></li>
                        <li><a href="about.html">About</a></li>
                        <li><a href="portfolio.html">Portfolio</a></li>
                        <li><a href="blog.html" class="active">Blog</a></li>
                        <li><a href="contact.html">Contact</a></li>
                    </ul>
                    <div class="hamburger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </nav>
            </header>

            <main class="blog-page">
                <section class="blog-hero">
                    <h1>Blog</h1>
                    <p>Insights on Digital Transformation & Technology</p>
                </section>

                <div class="blog-content">
                    <div class="blog-grid">
                        ${currentPagePosts.map(post => `
                            <article class="blog-post">
                                <div class="blog-post-content">
                                    <h2><a href="blog/${post.filename}.html">${post.title}</a></h2>
                                    <p class="excerpt">${post.excerpt}</p>
                                    <div class="blog-post-meta">
                                        <span class="date">${post.date}</span>
                                        <span class="category">${post.category}</span>
                                    </div>
                                    <a href="blog/${post.filename}.html" class="read-more">Read More →</a>
                                </div>
                            </article>
                        `).join('')}
                        ${generatePagination(currentPage)}
                    </div>

                    <aside class="blog-sidebar">
                        <div class="sidebar-widget">
                            <h3>Categories</h3>
                            <ul>
                                ${Object.entries(categories).map(([category, count]) => `
                                    <li><a href="?category=${category}">
                                        ${category}
                                        <span class="count">${count}</span>
                                    </a></li>
                                `).join('')}
                            </ul>
                        </div>
                    </aside>
                </div>
            </main>

            <footer>
                <div class="footer-content">
                    <div class="footer-section">
                        <h3>Contact</h3>
                        <p>Email: ronnielutaro@outlook.com</p>
                        <p>Location: Kampala, Uganda - Africa</p>
                    </div>
                    <div class="footer-section">
                        <h3>Social</h3>
                        <div class="social-links">
                            <a href="#"><i class="fab fa-linkedin"></i></a>
                            <a href="#"><i class="fab fa-twitter"></i></a>
                            <a href="#"><i class="fab fa-github"></i></a>
                        </div>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; 2025 Ronnie Lutaro. All rights reserved.</p>
                </div>
            </footer>

            <script src="assets/js/main.js"></script>
            ${paginationScript}
        </body>
        </html>
    `;
};

// Template for blog posts
const blogTemplate = (content, title, date, category) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    ${generateSEOTags('blog')}
    <title>${title} - Ronnie Lutaro</title>
    <link rel="stylesheet" href="../assets/css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <header>
        <nav class="navbar">
            <div class="logo">Ronnie Lutaro</div>
            <ul class="nav-links">
                <li><a href="../index.html">Home</a></li>
                <li><a href="../about.html">About</a></li>
                <li><a href="../portfolio.html">Portfolio</a></li>
                <li><a href="../blog.html" class="active">Blog</a></li>
                <li><a href="../contact.html">Contact</a></li>
            </ul>
            <div class="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </nav>
    </header>

    <main class="blog-post-page">
        <article class="blog-post-content">
            <div class="blog-post-meta">
                <span class="date">${date}</span>
                <span class="category">${category}</span>
            </div>
            <h1>${title}</h1>
            ${content}
        </article>
    </main>

    <footer>
        <div class="footer-content">
            <div class="footer-section">
                <h3>Contact</h3>
                <p>Email: ronnielutaro@outlook.com</p>
                <p>Location: Kampala, Uganda - Africa</p>
            </div>
            <div class="footer-section">
                <h3>Social</h3>
                <div class="social-links">
                    <a href="#"><i class="fab fa-linkedin"></i></a>
                    <a href="#"><i class="fab fa-twitter"></i></a>
                    <a href="#"><i class="fab fa-github"></i></a>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2025 Ronnie Lutaro. All rights reserved.</p>
        </div>
    </footer>

    <script src="../assets/js/main.js"></script>
</body>
</html>
`;

// Template for about page
const aboutTemplate = (content, title) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    ${generateSEOTags('about')}
    <title>${title} - Ronnie Lutaro</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <header>
        <nav class="navbar">
            <div class="logo">Ronnie Lutaro</div>
            <ul class="nav-links">
                <li><a href="index.html">Home</a></li>
                <li><a href="about.html" class="active">About</a></li>
                <li><a href="portfolio.html">Portfolio</a></li>
                <li><a href="blog.html">Blog</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
            <div class="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </nav>
    </header>

    <main class="about-page">
        <div class="about-content">
            ${content}
        </div>
    </main>

    <footer>
        <div class="footer-content">
            <div class="footer-section">
                <h3>Contact</h3>
                <p>Email: ronnielutaro@outlook.com</p>
                <p>Location: Kampala, Uganda</p>
            </div>
            <div class="footer-section">
                <h3>Social</h3>
                <div class="social-links">
                    <a href="#"><i class="fab fa-linkedin"></i></a>
                    <a href="#"><i class="fab fa-twitter"></i></a>
                    <a href="#"><i class="fab fa-github"></i></a>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2025 Ronnie Lutaro. All rights reserved.</p>
        </div>
    </footer>

    <script src="assets/js/main.js"></script>
</body>
</html>
`;

// Function to process a markdown file
async function processMarkdownFile(filePath, blogPosts) {
    try {
        const content = await fs.readFile(filePath, 'utf-8');
        const fileName = path.basename(filePath, '.md');

        console.log(`\nProcessing file: ${fileName}`);

        // Extract frontmatter if it exists
        const frontmatterRegex = /^[\s\r\n]*---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
        const frontmatterMatch = content.match(frontmatterRegex);
        
        let title = fileName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        let date = new Date().toLocaleDateString();
        let category = 'Technology';
        let template = 'blog';
        let markdownContent = content;
        let image = '';

        if (frontmatterMatch) {
            const frontmatter = frontmatterMatch[1];
            markdownContent = frontmatterMatch[2];
            
            console.log('Frontmatter found:', frontmatter);
            
            // Parse frontmatter
            const getFrontmatterValue = (key) => {
                const match = frontmatter.match(new RegExp(`${key}:\\s*([^\\r\\n]+)`));
                return match ? match[1].trim() : null;
            };

            const frontmatterTitle = getFrontmatterValue('title');
            const frontmatterDate = getFrontmatterValue('date');
            const frontmatterCategory = getFrontmatterValue('category');
            const frontmatterTemplate = getFrontmatterValue('template');
            const frontmatterImage = getFrontmatterValue('image');

            if (frontmatterTitle) title = frontmatterTitle;
            if (frontmatterDate) date = frontmatterDate;
            if (frontmatterCategory) category = frontmatterCategory;
            if (frontmatterTemplate) template = frontmatterTemplate;
            if (frontmatterImage) image = frontmatterImage;
        }

        // Convert markdown to HTML
        const htmlContent = marked(markdownContent);
        
        // Generate the full HTML page based on template
        let fullHtml;
        let outputPath;

        if (template === 'about') {
            console.log('Using about template');
            fullHtml = aboutTemplate(htmlContent, title);
            outputPath = 'about.html';
        } else {
            console.log('Using blog template');
            fullHtml = blogTemplate(htmlContent, title, date, category);
            outputPath = path.join('blog', `${fileName}.html`);
            
            // Add to blog posts array for index page
            if (template === 'blog') {
                blogPosts.push({
                    title,
                    date,
                    category,
                    excerpt: extractExcerpt(markdownContent),
                    filename: fileName,
                    image
                });
            }
            
            // Ensure blog directory exists
            await fs.ensureDir('blog');
        }

        // Write the HTML file
        await fs.writeFile(outputPath, fullHtml);
        console.log(`Processed: ${filePath} -> ${outputPath}`);
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error);
    }
}

// Function to process all markdown files and generate blog index
async function processAllMarkdownFiles() {
    const blogPosts = [];
    const files = await fs.readdir('content');
    
    // Process all markdown files
    for (const file of files) {
        if (file.endsWith('.md')) {
            await processMarkdownFile(path.join('content', file), blogPosts);
        }
    }
    
    // Sort blog posts by date (newest first)
    blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Count categories
    const categories = blogPosts.reduce((acc, post) => {
        acc[post.category] = (acc[post.category] || 0) + 1;
        return acc;
    }, {});
    
    // Generate blog index page
    const blogIndexHtml = blogIndexTemplate(blogPosts, categories);
    await fs.writeFile('blog.html', blogIndexHtml);
    console.log('Generated blog index page');
}

// Build mode
processAllMarkdownFiles(); 