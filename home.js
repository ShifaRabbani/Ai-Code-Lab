// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.getElementById('main-nav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            // Toggle between menu and close icons
            const icon = mobileMenuToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close the mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mainNav.classList.contains('active') && 
            !mainNav.contains(event.target) && 
            !mobileMenuToggle.contains(event.target)) {
            mainNav.classList.remove('active');
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu after clicking a link
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    const icon = mobileMenuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // Here you would typically send this to your backend
                // For now, we'll just show an alert
                alert(`Thank you for subscribing with ${email}!`);
                emailInput.value = '';
                
                // You could also add a success message to the DOM
                const successMessage = document.createElement('p');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Successfully subscribed!';
                successMessage.style.color = '#4caf50';
                successMessage.style.marginTop = '1rem';
                
                // Remove any existing messages
                const existingMessage = newsletterForm.querySelector('.success-message');
                if (existingMessage) {
                    existingMessage.remove();
                }
                
                newsletterForm.appendChild(successMessage);
                
                // Remove the message after 3 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 3000);
            }
        });
    }
    
    // Add active class to current page link in navigation
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('#main-nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // Simple animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.card, .technique-card, .use-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    };
    
    // Add CSS for the animation
    const style = document.createElement('style');
    style.textContent = `
        .card, .technique-card, .use-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .card.animate, .technique-card.animate, .use-item.animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Initialize animations
    window.addEventListener('scroll', animateOnScroll);
    // Run once on page load
    animateOnScroll();
});

// Testimonials slider (if you decide to add testimonials later)
class TestimonialsSlider {
    constructor(sliderSelector) {
        this.slider = document.querySelector(sliderSelector);
        if (!this.slider) return;
        
        this.slides = this.slider.querySelectorAll('.testimonial-slide');
        this.currentSlide = 0;
        this.slideCount = this.slides.length;
        this.interval = null;
        
        this.init();
    }
    
    init() {
        if (this.slideCount <= 1) return;
        
        // Create navigation dots
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'slider-dots';
        
        for (let i = 0; i < this.slideCount; i++) {
            const dot = document.createElement('button');
            dot.className = 'slider-dot';
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            dot.addEventListener('click', () => this.goToSlide(i));
            dotsContainer.appendChild(dot);
        }
        
        this.slider.appendChild(dotsContainer);
        this.dots = dotsContainer.querySelectorAll('.slider-dot');
        
        // Set initial active state
        this.updateSlideState();