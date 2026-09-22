gsap.registerPlugin(ScrollTrigger);

/* ==================== */
/* PAGE-LOAD SEQUENCE   */
/* ==================== */
const intro = gsap.timeline({ defaults: { ease: 'power2.out' } });

intro.fromTo('.circle-animation',
    { scale: 1, opacity: 1 },
    { scale: 0, duration: 1.4, ease: 'power1.inOut' }
);

intro.fromTo('header', { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.8');
intro.fromTo('.navbar-brand', { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6 }, '-=0.5');
intro.fromTo('nav ul li', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 }, '-=0.35');
intro.fromTo('.cta-button', { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }, '-=0.25');

intro.fromTo('.hero-eyebrow', { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.3');
intro.fromTo('.hero-title', { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.25');
intro.to('.underline-swash path', { strokeDashoffset: 0, duration: 0.9, ease: 'power2.inOut' }, '-=0.35');
intro.fromTo('.hero-subtitle', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.4');
intro.fromTo('.hero-buttons', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55 }, '-=0.35');
intro.fromTo('.stat-item', { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 }, '-=0.3');

intro.fromTo('.image-slider', { scale: 0.92, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.9, ease: 'power3.out' }, '-=0.9');
intro.fromTo('.floating-card', { scale: 0, opacity: 0, rotation: -60 },
    { scale: 1, opacity: 1, rotation: 0, duration: 0.7, stagger: 0.18, ease: 'back.out(1.6)' }, '-=0.5');

intro.add(() => animateStats(), '-=0.2');

/* ==================== */
/* STAT COUNTERS        */
/* ==================== */
function animateStats() {
    document.querySelectorAll('.stat-number').forEach((el) => {
        const target = parseInt(el.dataset.count, 10) || 0;
        const counter = { val: 0 };
        gsap.to(counter, {
            val: target,
            duration: 1.4,
            ease: 'power1.out',
            onUpdate: () => { el.textContent = Math.round(counter.val); }
        });
    });
}

/* ==================== */
/* FLOATING CARDS LOOP   */
/* ==================== */
gsap.to('.card-1', { y: 16, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' });
gsap.to('.card-2', { y: -14, duration: 3.4, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.4 });
gsap.to('.card-3', { y: 18, duration: 3.8, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.8 });

/* ==================== */
/* IMAGE SLIDER          */
/* ==================== */
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
        if (!this.slides.length) return;
        this.showSlide(0);
        this.startAutoSlide();
        this.prevBtn?.addEventListener('click', () => this.prevSlide());
        this.nextBtn?.addEventListener('click', () => this.nextSlide());
        this.container.addEventListener('mouseenter', () => this.stopAutoSlide());
        this.container.addEventListener('mouseleave', () => this.startAutoSlide());
    }
    showSlide(index) {
        this.slides.forEach((s) => s.classList.remove('active'));
        this.currentSlide = (index + this.slides.length) % this.slides.length;
        const slide = this.slides[this.currentSlide];
        slide.classList.add('active');
        gsap.fromTo(slide, { opacity: 0, scale: 1.06 }, { opacity: 1, scale: 1, duration: 0.7, ease: 'power2.out' });
    }
    nextSlide() { this.showSlide(this.currentSlide + 1); this.restartAutoSlide(); }
    prevSlide() { this.showSlide(this.currentSlide - 1); this.restartAutoSlide(); }
    startAutoSlide() { this.stopAutoSlide(); this.slideInterval = setInterval(() => this.nextSlide(), 5000); }
    stopAutoSlide() { if (this.slideInterval) clearInterval(this.slideInterval); }
    restartAutoSlide() { this.stopAutoSlide(); this.startAutoSlide(); }
}
new ImageSlider('.image-slider');

/* ==================== */
/* GALLERY MODAL         */
/* ==================== */
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
        document.querySelectorAll('.gallery-item').forEach((item) => {
            item.addEventListener('click', (e) => this.openModal(e, item));
        });
        this.modalClose?.addEventListener('click', () => this.closeModal());
        this.modal?.addEventListener('click', (e) => { if (e.target === this.modal) this.closeModal(); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') this.closeModal(); });
    }
    openModal(e, item) {
        e.preventDefault();
        const img = item.querySelector('img');
        const title = item.querySelector('.gallery-overlay h3')?.textContent || '';
        const desc = item.querySelector('.gallery-overlay p')?.textContent || '';
        this.modalImage.src = img.src;
        this.modalImage.alt = img.alt;
        this.modalTitle.textContent = title;
        this.modalDesc.textContent = desc;
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        gsap.fromTo(this.modal, { opacity: 0 }, { opacity: 1, duration: 0.3 });
        gsap.fromTo('.modal-content', { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' });
    }
    closeModal() {
        gsap.to(this.modal, {
            opacity: 0, duration: 0.25, ease: 'power2.in',
            onComplete: () => { this.modal.classList.remove('active'); document.body.style.overflow = ''; }
        });
    }
}
new GalleryModal();

/* ==================== */
/* SCROLL REVEALS         */
/* ==================== */
gsap.utils.toArray('.section-head').forEach((el) => {
    gsap.fromTo(el, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 82%' }
    });
});

gsap.utils.toArray('.gallery-item').forEach((el, i) => {
    gsap.fromTo(el, { y: 24, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, delay: (i % 3) * 0.08, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 90%' }
    });
});

gsap.utils.toArray('.amenity-category').forEach((el, i) => {
    gsap.fromTo(el, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.65, delay: i * 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%' }
    });
});

gsap.fromTo('.infrastructure-section', { y: 30, opacity: 0 }, {
    y: 0, opacity: 1, duration: 0.7, ease: 'power2.out',
    scrollTrigger: { trigger: '.infrastructure-section', start: 'top 88%' }
});

gsap.utils.toArray('.spec-card').forEach((el, i) => {
    gsap.fromTo(el, { y: 24, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.55, delay: (i % 3) * 0.08, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 90%' }
    });
});

gsap.fromTo('.contact-box', { y: 60, opacity: 0, rotationX: 10 }, {
    y: 0, opacity: 1, rotationX: 0, duration: 0.9, ease: 'power2.out',
    scrollTrigger: { trigger: '.location-section', start: 'top 70%' }
});

/* ==================== */
/* STICKY HEADER HIDE     */
/* ==================== */
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const current = window.scrollY;
    const header = document.querySelector('header');
    if (current > lastScroll && current > 200) {
        gsap.to(header, { y: -100, duration: 0.3 });
    } else {
        gsap.to(header, { y: 0, duration: 0.3 });
    }
    lastScroll = current;
});

/* ==================== */
/* MOBILE MENU            */
/* ==================== */
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('nav');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        const isOpen = nav.style.display === 'flex';
        nav.style.display = isOpen ? 'none' : 'flex';
        mobileMenuBtn.innerHTML = isOpen ? '<i class="fas fa-bars"></i>' : '<i class="fas fa-times"></i>';
        if (!isOpen) {
            gsap.fromTo(nav, { x: 300, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' });
        }
    });
}

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        if (nav) nav.style.display = '';
        if (mobileMenuBtn) mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

/* ==================== */
/* BUTTON MICRO-INTERACTIONS */
/* ==================== */
document.querySelectorAll('button').forEach((button) => {
    button.addEventListener('mouseenter', () => gsap.to(button, { scale: 1.04, duration: 0.2, ease: 'power2.out' }));
    button.addEventListener('mouseleave', () => gsap.to(button, { scale: 1, duration: 0.2, ease: 'power2.out' }));
    button.addEventListener('click', () => gsap.to(button, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 }));
});

/* ==================== */
/* SMOOTH SCROLL          */
/* ==================== */
document.querySelectorAll('nav a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#' || targetId.length < 2) return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
            gsap.to(window, { duration: 1, scrollTo: { y: targetPosition, autoKill: false }, ease: 'power2.out' });
            if (window.innerWidth <= 768 && nav) {
                nav.style.display = 'none';
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
});

/* ==================== */
/* ACTION BUTTONS         */
/* ==================== */
document.querySelectorAll('.primary-btn, .secondary-btn, .contact-btn, .footer-cta, .cta-button').forEach((button) => {
    button.addEventListener('click', function () {
        const text = this.textContent.trim();
        if (text.includes('Visit') || text.includes('Book') || text.includes('Schedule')) {
            showVisitForm();
        } else if (text.includes('Call')) {
            alert('Calling Krishna Harmony at +91 8734 97 8114');
        } else if (text.includes('brochure') || text.includes('Brochure')) {
            downloadBrochure();
        } else if (text.includes('villas') || text.includes('Villas')) {
            document.querySelector('#gallery')?.scrollIntoView({ behavior: 'smooth' });
        } else {
            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

function showVisitForm() {
    const formHTML = `
        <div class="visit-form-modal">
            <div class="form-content">
                <h3>Schedule a site visit</h3>
                <form id="visitForm">
                    <input type="text" placeholder="Your name" required>
                    <input type="tel" placeholder="Phone number" required>
                    <input type="email" placeholder="Email address">
                    <input type="date" placeholder="Preferred date" required>
                    <button type="submit" class="primary-btn">Submit request</button>
                </form>
                <button class="close-form">Close</button>
            </div>
        </div>`;
    const formContainer = document.createElement('div');
    formContainer.innerHTML = formHTML;
    document.body.appendChild(formContainer);

    const formStyles = `
        .visit-form-modal { position: fixed; inset: 0; background: rgba(7,30,28,0.85); display: flex; align-items: center; justify-content: center; z-index: 3500; padding: 20px; }
        .form-content { background: #FBF8F0; padding: 2rem; border-radius: 20px; max-width: 400px; width: 100%; }
        .form-content h3 { font-family: 'Fraunces', serif; color: #0F3D3B; margin-bottom: 1.4rem; text-align: center; font-weight: 500; }
        #visitForm input { width: 100%; padding: 0.8rem 1rem; margin-bottom: 1rem; border: 1px solid #E3D7B4; border-radius: 10px; font-family: 'Manrope', sans-serif; }
        #visitForm input:focus { outline: 2px solid #C9A227; }
        #visitForm .primary-btn { width: 100%; justify-content: center; }
        .close-form { width: 100%; margin-top: 1rem; padding: 0.75rem; background: #F1EAD6; border-radius: 999px; font-weight: 600; }
    `;
    const styleEl = document.createElement('style');
    styleEl.textContent = formStyles;
    document.head.appendChild(styleEl);

    document.getElementById('visitForm').addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Thank you! Our team will contact you shortly to confirm your site visit.');
        document.querySelector('.visit-form-modal').remove();
        styleEl.remove();
    });
    document.querySelector('.close-form').addEventListener('click', function () {
        document.querySelector('.visit-form-modal').remove();
        styleEl.remove();
    });
}

function downloadBrochure() {
    alert('Brochure download started. Check your downloads folder.');
}

/* ==================== */
/* INIT                   */
/* ==================== */
document.addEventListener('DOMContentLoaded', () => {
    console.log('Krishna Harmony (Real Assets) website loaded.');
});