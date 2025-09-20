document.addEventListener('DOMContentLoaded', () => {

    // --- Hamburger Menu Logic ---
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.main-nav');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.main-nav a').forEach(navLink => {
        navLink.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });


    // --- Scroll Animation Logic (Intersection Observer) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.1
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

});

window.addEventListener('scroll', function() {
    const fade = document.querySelector('.hero-fade');
    // Fade more as you scroll down, max opacity 0.5
    let opacity = Math.min(window.scrollY / 400, 0.5);
    fade.style.background = `rgba(0,0,0,${opacity})`;
});

document.querySelectorAll('.service-hero').forEach((hero, idx, arr) => {
    window.addEventListener('scroll', () => {
        const rect = hero.getBoundingClientRect();
        if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
            hero.classList.remove('shrink');
        } else {
            hero.classList.add('shrink');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const contactNavBtn = document.querySelector('.main-nav a[href="#"]');
    const contactHeroBtn = document.querySelector('.hero-buttons .btn-secondary');
    const modal = document.getElementById('contact-modal');
    const closeBtn = document.querySelector('.close-btn');

    function openModal(e) {
        e.preventDefault();
        modal.style.display = 'block';
    }

    contactNavBtn.addEventListener('click', openModal);
    if (contactHeroBtn) contactHeroBtn.addEventListener('click', openModal);

    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});