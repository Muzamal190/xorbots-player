// ==================== SMOOTH SCROLLING ==================== 
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

// ==================== HAMBURGER MENU ==================== 
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        menu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close menu when a link is clicked
document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ==================== NAVBAR STICKY EFFECT ==================== 
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// ==================== FORM SUBMISSION ==================== 
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const subject = contactForm.querySelectorAll('input[type="text"]')[1].value;
        const message = contactForm.querySelector('textarea').value;
        
        // Show success message
        alert(`Thank you ${name}! We've received your message and will get back to you soon at ${email}.`);
        
        // Reset form
        contactForm.reset();
    });
}

// ==================== SCROLL ANIMATIONS ==================== 
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all service cards, portfolio cards, etc.
document.querySelectorAll('.service-card, .portfolio-card, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// ==================== COUNTER ANIMATION ==================== 
const animateCounter = (element, target, duration = 2000) => {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
};

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.stats');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            statsAnimated = true;
            document.querySelectorAll('.stat-item h3').forEach((el, index) => {
                const target = parseInt(el.textContent);
                if (!isNaN(target)) {
                    animateCounter(el, target);
                }
            });
        }
    });
});

if (statsSection) {
    statsObserver.observe(statsSection);
}

// ==================== PROGRESS BAR ANIMATION ==================== 
const skillBars = document.querySelectorAll('.skill-progress');
let skillsAnimated = false;

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !skillsAnimated) {
            skillsAnimated = true;
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
        }
    });
});

if (document.querySelector('.about-skills')) {
    skillsObserver.observe(document.querySelector('.about-skills'));
}

// ==================== TESTIMONIALS CAROUSEL ==================== 
let currentSlide = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');

const showTestimonial = (n) => {
    testimonialCards.forEach(card => {
        card.style.display = 'none';
    });
    
    if (testimonialCards.length > 0) {
        testimonialCards[n].style.display = 'block';
    }
};

// Auto-rotate testimonials
setInterval(() => {
    currentSlide = (currentSlide + 1) % testimonialCards.length;
    if (testimonialCards.length > 0) {
        showTestimonial(currentSlide);
    }
}, 5000);

// Show first testimonial on load
if (testimonialCards.length > 0) {
    showTestimonial(0);
}

// ==================== ACTIVE NAV LINK ==================== 
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ==================== LAZY LOADING FOR IMAGES ==================== 
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ==================== FORM VALIDATION ==================== 
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const validateForm = () => {
    const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#ef4444';
        } else {
            input.style.borderColor = '#e5e7eb';
            
            if (input.type === 'email' && !validateEmail(input.value)) {
                isValid = false;
                input.style.borderColor = '#ef4444';
            }
        }
    });
    
    return isValid;
};

// Add real-time validation
document.querySelectorAll('.contact-form input, .contact-form textarea').forEach(input => {
    input.addEventListener('blur', () => {
        if (!input.value.trim()) {
            input.style.borderColor = '#ef4444';
        } else if (input.type === 'email' && !validateEmail(input.value)) {
            input.style.borderColor = '#ef4444';
        } else {
            input.style.borderColor = '#e5e7eb';
        }
    });
});

// ==================== CTA BUTTON ANIMATION ==================== 
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ==================== PAGE LOAD ANIMATION ==================== 
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
});

// ==================== MOBILE MENU RESPONSIVE ==================== 
const handleResize = () => {
    const menu = document.querySelector('.menu');
    const hamburger = document.querySelector('.hamburger');
    
    if (window.innerWidth > 768) {
        menu.style.display = 'flex';
        hamburger.classList.remove('active');
    } else {
        menu.style.display = 'none';
    }
};

window.addEventListener('resize', handleResize);
window.addEventListener('load', handleResize);

// ==================== CONSOLE LOG ==================== 
console.log('🚀 XorBots Player Homepage loaded successfully!');
console.log('Thank you for visiting our website.');
