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

// --- Populate video services grid (runs on page load) ---
document.addEventListener('DOMContentLoaded', function() {
    const videoList = [
        'background-video/SnapInsta.to_AQNaST8Zn9TQEpRA6TozlRiwuPL5vV2-dQw3NJv_1w27DS2q-rzbHESf_Se_UWFfn2hNCYkCi85Lx11cxs9Yvg0Cf6LQJbEc5_mPD8U.mp4',
        'background-video/berto.mp4',
        'background-video/redhelcat.mp4',
        'background-video/beigehellcat.mp4'
    ];

    const container = document.getElementById('video-services');
    if (!container) return;

    // Function to pick next index cyclically
    function nextIndex(i) { return (i + 1) % videoList.length; }

    videoList.forEach((src, idx) => {
        const card = document.createElement('div');
        card.className = 'video-card';

        const vid = document.createElement('video');
        vid.muted = true;
        vid.autoplay = true;
        vid.loop = false; // we'll handle cycling ourselves
        vid.playsInline = true;
        vid.setAttribute('playsinline', '');
        vid.src = src;
        vid.preload = 'auto';
        vid.style.transition = 'opacity 0.6s';

        // Randomize playback rate a bit for variety
        const rates = [0.75, 0.9, 1, 1.1, 1.25];
        vid.playbackRate = rates[idx % rates.length];

        // Staggered start: small timeout so not all start in sync
        const startDelay = idx * 300 + Math.floor(Math.random() * 400);
        vid.style.opacity = '0';
        setTimeout(() => {
            // Try to play; browsers may block autoplay if not muted — it's muted so should play
            vid.play().catch(() => {});
            vid.style.opacity = '1';
            // Seek slightly to create variety (if duration allows)
            try { if (vid.duration && vid.duration > 2) vid.currentTime = Math.min(0.5 + Math.random() * 2, vid.duration - 0.1); } catch(e) {}
        }, startDelay);

        // On ended, swap to next video source to cycle different videos in the same card
        vid.addEventListener('ended', function onEnd() {
            // find next src index and set it
            const current = videoList.indexOf(vid.src.split('/').slice(-1)[0]) ;
            // current detection fallback: use idx variable closure
            let next = nextIndex(idx);
            // rotate sources: pick a random other video to keep things dynamic
            next = Math.floor(Math.random() * videoList.length);
            vid.src = videoList[next];
            vid.load();
            // slightly vary playbackRate on each loop
            const newRate = rates[Math.floor(Math.random() * rates.length)];
            vid.playbackRate = newRate;
            vid.play().catch(() => {});
        });

        const overlay = document.createElement('div');
        overlay.className = 'video-overlay';

        card.appendChild(vid);
        card.appendChild(overlay);
        container.appendChild(card);
    });
});