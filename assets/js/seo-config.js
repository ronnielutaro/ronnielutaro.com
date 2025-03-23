const seoConfig = {
    default: {
        title: 'Ronnie Lutaro - Data-Driven Product & Project Manager | Building AI-Powered Advertising Technology in Africa (AdTech) | Software Engineer',
        description: 'Professional portfolio of Ronnie Lutaro, specializing in Digital Transformation, AI Solutions, and Product Management in African markets.',
        keywords: 'Ronnie Lutaro, Product Manager, Project Manager, Software Engineer, Digital Transformation, Expert, Advertising, Technology, AdTech, C#, .NET, JavaScript, React, Python, AI Solutions, Azure, Innovation, Kampala, Uganda, Africa',
        author: 'Ronnie Lutaro',
        ogImage: 'https://ronnielutaro.github.io/assets/images/og-image.jpg',
        twitterHandle: '@r_lutaro',
        canonicalUrl: 'https://ronnielutaro.github.io'
    },
    pages: {
        home: {
            title: 'Ronnie Lutaro - Portfolio',
            description: 'Welcome to my portfolio. I help businesses scale and automate through Digital Transformation in African markets.',
            keywords: 'portfolio, digital transformation, AI solutions, project management, software engineering, Africa',
            canonicalUrl: 'https://ronnielutaro.github.io'
        },
        about: {
            title: 'About Ronnie Lutaro - Professional Background',
            description: 'Learn about my professional journey, expertise in Digital Transformation, and experience in African markets.',
            keywords: 'about, professional background, experience, expertise, digital transformation, Kampala, Uganda, Africa',
            canonicalUrl: 'https://ronnielutaro.github.io/about.html'
        },
        portfolio: {
            title: 'Portfolio - Projects & Work by Ronnie Lutaro',
            description: 'Explore my portfolio of successful projects in Digital Transformation, AI Solutions, Product and Product Management.',
            keywords: 'portfolio, projects, work, digital transformation, AI solutions, case studies',
            canonicalUrl: 'https://ronnielutaro.github.io/portfolio.html'
        },
        blog: {
            title: 'Blog - Insights on Digital Transformation & Technology',
            description: 'Read my latest insights on Digital Transformation, AI, and technology trends in African markets.',
            keywords: 'blog, digital transformation, AI, technology trends, Africa, insights',
            canonicalUrl: 'https://ronnielutaro.github.io/blog.html'
        },
        contact: {
            title: 'Contact Ronnie Lutaro',
            description: 'Get in touch with me for collaboration opportunities, speaking engagements, or project inquiries.',
            keywords: 'contact, collaboration, speaking engagements, project inquiries, Africa',
            canonicalUrl: 'https://ronnielutaro.github.io/contact.html'
        }
    }
};

// Function to generate SEO meta tags
function generateSEOTags(page) {
    const config = seoConfig.pages[page] || seoConfig.default;
    return `
        <title>${config.title}</title>
        <meta name="description" content="${config.description}">
        <meta name="keywords" content="${config.keywords}">
        <meta name="author" content="${config.author}">
        
        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website">
        <meta property="og:url" content="${config.canonicalUrl}">
        <meta property="og:title" content="${config.title}">
        <meta property="og:description" content="${config.description}">
        <meta property="og:image" content="${config.ogImage}">
        
        <!-- Twitter -->
        <meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:url" content="${config.canonicalUrl}">
        <meta property="twitter:title" content="${config.title}">
        <meta property="twitter:description" content="${config.description}">
        <meta property="twitter:image" content="${config.ogImage}">
        <meta name="twitter:creator" content="${config.twitterHandle}">
        
        <!-- Canonical URL -->
        <link rel="canonical" href="${config.canonicalUrl}">
        
        <!-- Additional SEO Meta Tags -->
        <meta name="robots" content="index, follow">
        <meta name="language" content="English">
        <meta name="revisit-after" content="7 days">
        <meta name="generator" content="Custom Build System">
    `;
}

// Export the function for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { generateSEOTags };
} 