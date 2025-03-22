const fs = require('fs-extra');
const path = require('path');
const { marked } = require('marked');
const { generateSEOTags } = require('./assets/js/seo-config.js');

// Configure marked for security
marked.setOptions({
    headerIds: false,
    mangle: false
});

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
async function processMarkdownFile(filePath) {
    try {
        const content = await fs.readFile(filePath, 'utf-8');
        const fileName = path.basename(filePath, '.md');

        console.log(`\nProcessing file: ${fileName}`);

        // Extract frontmatter if it exists (more robust regex)
        const frontmatterRegex = /^[\s\r\n]*---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
        const frontmatterMatch = content.match(frontmatterRegex);
        
        let title = fileName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        let date = new Date().toLocaleDateString();
        let category = 'Technology';
        let template = 'blog';
        let markdownContent = content;

        if (frontmatterMatch) {
            const frontmatter = frontmatterMatch[1];
            markdownContent = frontmatterMatch[2];
            
            console.log('Frontmatter found:', frontmatter);
            
            // Parse frontmatter (more robust regex)
            const getFrontmatterValue = (key) => {
                const match = frontmatter.match(new RegExp(`${key}:\\s*([^\\r\\n]+)`));
                return match ? match[1].trim() : null;
            };

            const frontmatterTitle = getFrontmatterValue('title');
            const frontmatterDate = getFrontmatterValue('date');
            const frontmatterCategory = getFrontmatterValue('category');
            const frontmatterTemplate = getFrontmatterValue('template');

            if (frontmatterTitle) title = frontmatterTitle;
            if (frontmatterDate) date = frontmatterDate;
            if (frontmatterCategory) category = frontmatterCategory;
            if (frontmatterTemplate) {
                template = frontmatterTemplate;
                console.log('Template found:', template);
            }
        } else {
            console.log('No frontmatter found');
            console.log('Content starts with:', content.substring(0, 100));
        }

        // Convert markdown to HTML
        const htmlContent = marked(markdownContent);
        
        // Generate the full HTML page based on template
        let fullHtml;
        let outputPath;

        console.log(`Using template: ${template}`);

        if (template === 'about') {
            console.log('Using about template');
            fullHtml = aboutTemplate(htmlContent, title);
            outputPath = 'about.html';
        } else {
            console.log('Using blog template');
            fullHtml = blogTemplate(htmlContent, title, date, category);
            outputPath = path.join('blog', `${fileName}.html`);
            // Ensure the blog directory exists for blog posts
            await fs.ensureDir('blog');
        }

        // Write the HTML file
        await fs.writeFile(outputPath, fullHtml);
        console.log(`Processed: ${filePath} -> ${outputPath}`);
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error);
    }
}

// Function to process all markdown files
async function processAllMarkdownFiles() {
    const files = await fs.readdir('content');
    for (const file of files) {
        if (file.endsWith('.md')) {
            await processMarkdownFile(path.join('content', file));
        }
    }
}

// Build mode
processAllMarkdownFiles(); 