// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Portfolio Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your form submission logic here
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Add animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll, .hero-content, .work-item, .blog-card, .portfolio-item, .about-grid, .timeline-item, .education-item, .info-card, .contact-form-container');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.remove('hidden');
        } else {
            element.classList.add('hidden');
        }
    });
};

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    // Add initial hidden class to elements
    const elements = document.querySelectorAll('.animate-on-scroll, .hero-content, .work-item, .blog-card, .portfolio-item, .about-grid, .timeline-item, .education-item, .info-card, .contact-form-container');
    elements.forEach(element => {
        element.classList.add('hidden');
    });
    
    // Trigger initial animation
    animateOnScroll();
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll); 