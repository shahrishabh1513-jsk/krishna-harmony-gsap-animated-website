// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// Circle animation timeline
const circleAnimation = gsap.timeline({ defaults: { duration: 1 } });

// Animate the circle from big to small (cover to center)
circleAnimation.fromTo('.circle-animation', 
    { 
        scale: 170, 
        opacity: 0.3,
        width: '100vh',
        height: '100vh'
    }, 
    { 
        scale: 0, 
        duration: 2, 
        ease: "power1.inOut",
        width: 0,
        height: 0
    }
);

// Animate header
circleAnimation.fromTo('header',
    { 
        y: -100,
        opacity: 0 
    },
    { 
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out"
    },
    "-=1"
);

// Animate logo
circleAnimation.fromTo('.navbar-brand',
    { 
        x: -50,
        opacity: 0 
    },
    { 
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "back.out(1.7)"
    },
    "-=0.5"
);

// Animate navigation items with stagger
circleAnimation.fromTo('nav ul li',
    { 
        y: 20,
        opacity: 0 
    },
    { 
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)"
    },
    "-=0.3"
);

// Animate CTA button
circleAnimation.fromTo('.cta-button',
    { 
        scale: 0,
        opacity: 0 
    },
    { 
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "back.out(1.7)"
    },
    "-=0.2"
);

// Animate hero content
circleAnimation.fromTo('.hero-content',
    { 
        y: 50,
        opacity: 0 
    },
    { 
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out"
    },
    "-=0.5"
);

// Animate hero image cards with stagger
circleAnimation.fromTo('.floating-card',
    { 
        scale: 0,
        opacity: 0,
        rotation: -180
    },
    { 
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)"
    },
    "-=0.5"
);

// ==================== //
// IMAGE SLIDER FUNCTIONALITY
// ==================== //
class ImageSlider {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        if (!this.container) return;
        
        this.slides = this.container.querySelectorAll('.slide');
        this.prevBtn = this.container.querySelector('.slider-prev');
        this.nextBtn = this.container.querySelector('.slider-next');
        this.currentSlide = 0;
        this.slideInterval = null;
        
        this.init();
    }
    
    init() {
        if (this.slides.length === 0) return;
        
        this.showSlide(0);
        this.startAutoSlide();
        
        // Add event listeners
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        // Pause on hover
        this.container.addEventListener('mouseenter', () => this.stopAutoSlide());
        this.container.addEventListener('mouseleave', () => this.startAutoSlide());
    }
    
    showSlide(index) {
        // Remove active class from all slides
        this.slides.forEach(slide => slide.classList.remove('active'));
        
        // Calculate new slide index
        this.currentSlide = (index + this.slides.length) % this.slides.length;
        
        // Add active class to current slide
        this.slides[this.currentSlide].classList.add('active');
        
        // Animate slide change
        gsap.fromTo(this.slides[this.currentSlide],
            { opacity: 0, scale: 1.1 },
            { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }
        );
    }
    
    nextSlide() {
        this.showSlide(this.currentSlide + 1);
        this.restartAutoSlide();
    }
    
    prevSlide() {
        this.showSlide(this.currentSlide - 1);
        this.restartAutoSlide();
    }
    
    startAutoSlide() {
        if (this.slideInterval) clearInterval(this.slideInterval);
        this.slideInterval = setInterval(() => this.nextSlide(), 5000);
    }
    
    stopAutoSlide() {
        if (this.slideInterval) clearInterval(this.slideInterval);
    }
    
    restartAutoSlide() {
        this.stopAutoSlide();
        this.startAutoSlide();
    }
}

// Initialize image slider
const heroSlider = new ImageSlider('.image-slider');

// ==================== //
// GALLERY MODAL FUNCTIONALITY
// ==================== //
class GalleryModal {
    constructor() {
        this.modal = document.getElementById('imageModal');
        this.modalImage = document.getElementById('modalImage');
        this.modalTitle = document.getElementById('modalTitle');
        this.modalDesc = document.getElementById('modalDesc');
        this.modalClose = document.querySelector('.modal-close');
        
        this.init();
    }
    
    init() {
        // Add click event to gallery items
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', (e) => this.openModal(e, item));
        });
        
        // Close modal events
        if (this.modalClose) {
            this.modalClose.addEventListener('click', () => this.closeModal());
        }
        
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModal();
        });
        
        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeModal();
        });
    }
    
    openModal(e, galleryItem) {
        e.preventDefault();
        
        const img = galleryItem.querySelector('img');
        const title = galleryItem.querySelector('.gallery-overlay h3')?.textContent || '';
        const desc = galleryItem.querySelector('.gallery-overlay p')?.textContent || '';
        
        this.modalImage.src = img.src;
        this.modalImage.alt = img.alt;
        this.modalTitle.textContent = title;
        this.modalDesc.textContent = desc;
        
        // Show modal with animation
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Animate modal entrance
        gsap.fromTo(this.modal,
            { opacity: 0 },
            { opacity: 1, duration: 0.3, ease: "power2.out" }
        );
        
        gsap.fromTo('.modal-content',
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }
        );
    }
    
    closeModal() {
        // Animate modal exit
        gsap.to(this.modal,
            { opacity: 0, duration: 0.3, ease: "power2.in",
                onComplete: () => {
                    this.modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        );
    }
}

// Initialize gallery modal
const galleryModal = new GalleryModal();

// ==================== //
// SCROLL ANIMATIONS
// ==================== //

// Scroll animations for amenity categories
gsap.utils.toArray('.amenity-category').forEach((card, i) => {
    gsap.fromTo(card,
        {
            y: 50,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
                end: "top 50%",
                toggleActions: "play none none reverse"
            }
        }
    );
});

// Scroll animations for specification cards
gsap.utils.toArray('.spec-card').forEach((card, i) => {
    gsap.fromTo(card,
        {
            y: 50,
            opacity: 0,
            rotationY: 90
        },
        {
            y: 0,
            opacity: 1,
            rotationY: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: '.specifications-section',
                start: "top 80%",
                end: "top 50%",
                toggleActions: "play none none reverse"
            }
        }
    );
});

// Animate infrastructure items
gsap.utils.toArray('.infrastructure-item').forEach((item, i) => {
    gsap.fromTo(item,
        {
            x: -50,
            opacity: 0
        },
        {
            x: 0,
            opacity: 1,
            duration: 0.5,
            delay: i * 0.1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.infrastructure-section',
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        }
    );
});

// Animate gallery items
gsap.utils.toArray('.gallery-item').forEach((item, i) => {
    gsap.fromTo(item,
        {
            y: 100,
            opacity: 0,
            rotation: 5
        },
        {
            y: 0,
            opacity: 1,
            rotation: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: '.gallery-section',
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        }
    );
});

// Animate images on scroll
gsap.utils.toArray('.amenity-image img, .specs-image img, .location-map img').forEach((img, i) => {
    gsap.fromTo(img,
        {
            opacity: 0,
            scale: 0.9
        },
        {
            opacity: 1,
            scale: 1,
            duration: 1,
            delay: i * 0.1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: img,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        }
    );
});

// Parallax effect for hero section
gsap.to('.hero-image', {
    y: 100,
    ease: "none",
    scrollTrigger: {
        trigger: '.hero-banner',
        start: "top top",
        end: "bottom top",
        scrub: true
    }
});

// Header scroll effect
ScrollTrigger.create({
    start: "top -80",
    onUpdate: (self) => {
        const header = document.querySelector('header');
        if (self.direction === -1) {
            gsap.to(header, { 
                y: 0, 
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(255, 255, 255, 0.97)',
                duration: 0.3 
            });
        } else if (self.direction === 1 && self.progress > 0.1) {
            gsap.to(header, { 
                y: -100, 
                duration: 0.3 
            });
        }
    }
});

// ==================== //
// MOBILE MENU FUNCTIONALITY
// ==================== //
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('nav');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
        mobileMenuBtn.innerHTML = nav.style.display === 'flex' ? 
            '<i class="fas fa-times"></i>' : 
            '<i class="fas fa-bars"></i>';
        
        if (nav.style.display === 'flex') {
            gsap.fromTo(nav,
                { x: 300, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
            );
        }
    });
}

// Window resize handler
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        if (nav) nav.style.display = '';
        if (mobileMenuBtn) mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

// ==================== //
// BUTTON INTERACTIONS
// ==================== //
// Add hover effect to all buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mouseenter', () => {
        gsap.to(button, { scale: 1.05, duration: 0.2, ease: "power2.out" });
    });
    
    button.addEventListener('mouseleave', () => {
        gsap.to(button, { scale: 1, duration: 0.2, ease: "power2.out" });
    });
});

// Add click effect to all buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        gsap.to(button, { 
            scale: 0.95, 
            duration: 0.1,
            yoyo: true,
            repeat: 1 
        });
    });
});

// Initialize floating cards animation
gsap.to('.card-1', {
    y: 20,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});

gsap.to('.card-2', {
    y: -15,
    duration: 3.5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: 0.5
});

gsap.to('.card-3', {
    y: 25,
    duration: 4,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: 1
});

// Animate contact box on scroll
gsap.fromTo('.contact-box',
    {
        y: 100,
        opacity: 0,
        rotationX: 15
    },
    {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '.location-section',
            start: "top 70%",
            toggleActions: "play none none reverse"
        }
    }
);

// ==================== //
// SMOOTH SCROLLING
// ==================== //
// Smooth scroll for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Calculate offset for fixed header
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            // Smooth scroll
            gsap.to(window, {
                duration: 1,
                scrollTo: { y: targetPosition, autoKill: false },
                ease: "power2.out"
            });
            
            // Close mobile menu if open
            if (window.innerWidth <= 768 && nav) {
                nav.style.display = 'none';
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
});

// ==================== //
// FORM SUBMISSION (Optional)
// ==================== //
// Add form submission functionality for contact buttons
document.querySelectorAll('.primary-btn, .secondary-btn, .contact-btn, .footer-cta, .cta-button').forEach(button => {
    button.addEventListener('click', function() {
        const buttonText = this.textContent.trim();
        
        // Different actions based on button type
        switch(true) {
            case buttonText.includes('Visit'):
            case buttonText.includes('Book'):
                showVisitForm();
                break;
            case buttonText.includes('Call'):
                // Simulate phone call
                alert('Calling Krishna Harmony at +91 8734 97 8114');
                break;
            case buttonText.includes('Brochure'):
                downloadBrochure();
                break;
            default:
                // Default action - scroll to contact
                document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
        }
    });
});

function showVisitForm() {
    // Create a simple form modal
    const formHTML = `
        <div class="visit-form-modal">
            <div class="form-content">
                <h3>Schedule a Site Visit</h3>
                <form id="visitForm">
                    <input type="text" placeholder="Your Name" required>
                    <input type="tel" placeholder="Phone Number" required>
                    <input type="email" placeholder="Email Address">
                    <input type="date" placeholder="Preferred Date" required>
                    <button type="submit" class="primary-btn">Submit Request</button>
                </form>
                <button class="close-form">Close</button>
            </div>
        </div>
    `;
    
    // Add form to page
    const formContainer = document.createElement('div');
    formContainer.innerHTML = formHTML;
    document.body.appendChild(formContainer);
    
    // Add form styles
    const formStyles = `
        .visit-form-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 3000;
        }
        .form-content {
            background: white;
            padding: 2rem;
            border-radius: var(--radius-lg);
            max-width: 400px;
            width: 90%;
        }
        .form-content h3 {
            color: var(--property-blue);
            margin-bottom: 1.5rem;
            text-align: center;
        }
        #visitForm input {
            width: 100%;
            padding: 0.75rem;
            margin-bottom: 1rem;
            border: 1px solid #ddd;
            border-radius: var(--radius-md);
            font-family: 'Poppins', sans-serif;
        }
        .close-form {
            width: 100%;
            margin-top: 1rem;
            padding: 0.75rem;
            background: #f0f0f0;
            border: none;
            border-radius: var(--radius-md);
            cursor: pointer;
        }
    `;
    
    const styleEl = document.createElement('style');
    styleEl.textContent = formStyles;
    document.head.appendChild(styleEl);
    
    // Handle form submission
    document.getElementById('visitForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you! Our team will contact you shortly to confirm your site visit.');
        document.querySelector('.visit-form-modal').remove();
        styleEl.remove();
    });
    
    // Handle close button
    document.querySelector('.close-form').addEventListener('click', function() {
        document.querySelector('.visit-form-modal').remove();
        styleEl.remove();
    });
}

function downloadBrochure() {
    // Simulate brochure download
    alert('Brochure download started. Check your downloads folder.');
    
    // In a real implementation, this would link to a PDF file
    // window.open('brochure.pdf', '_blank');
}

// ==================== //
// INITIALIZE ON LOAD
// ==================== //
document.addEventListener('DOMContentLoaded', function() {
    console.log('Krishna Harmony website loaded successfully!');
    
    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            gsap.to(this, { opacity: 1, duration: 0.5 });
        });
    });
});