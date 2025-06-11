// Preloader
window.addEventListener('load', () => {
    document.querySelector('.preloader').classList.add('loaded');
});

// Header Scroll Effect
let lastScrollY = window.scrollY;
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (lastScrollY < window.scrollY && window.scrollY > 100) {
        header.classList.add('hidden');
    } else {
        header.classList.remove('hidden');
    }
    lastScrollY = window.scrollY;
});

// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');
hamburger.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    hamburger.classList.toggle('fa-bars');
    hamburger.classList.toggle('fa-times');
});

// Particle Background (Home Page Only)
if (document.getElementById('hero-particles')) {
    const canvas = document.getElementById('hero-particles');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];
    const mouse = { x: null, y: null, radius: 150 };

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        update() {
            if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
            if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < mouse.radius + this.size) {
                if (mouse.x < this.x && this.x < canvas.width - this.size * 10) this.x += 5;
                if (mouse.x > this.x && this.x > this.size * 10) this.x -= 5;
                if (mouse.y < this.y && this.y < canvas.height - this.size * 10) this.y += 5;
                if (mouse.y > this.y && this.y > this.size * 10) this.y -= 5;
            }
            this.x += this.directionX;
            this.y += this.directionY;
            this.draw();
        }
    }

    function initParticles() {
        particlesArray = [];
        let numberOfParticles = (canvas.height * canvas.width) / 8000;
        for (let i = 0; i < numberOfParticles; i++) {
            let size = Math.random() * 3 + 1;
            let x = Math.random() * (innerWidth - size * 2) + size;
            let y = Math.random() * (innerHeight - size * 2) + size;
            let directionX = (Math.random() * 0.5) - 0.25;
            let directionY = (Math.random() * 0.5) - 0.25;
            let color = 'rgba(124, 58, 237, 0.3)';
            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    function connectParticles() {
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = ((particlesArray[a].x - particlesArray[b].x) ** 2) + ((particlesArray[a].y - particlesArray[b].y) ** 2);
                if (distance < 10000) {
                    ctx.strokeStyle = `rgba(124, 58, 237, ${1 - distance / 10000})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animateParticles() {
        requestAnimationFrame(animateParticles);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connectParticles();
    }

    initParticles();
    animateParticles();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });
}

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

gsap.from('.reveal-text', {
    y: 60,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'power3.out'
});

gsap.from('.feature-card', {
    scrollTrigger: {
        trigger: '.features-grid',
        start: 'top 80%'
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power3.out'
});

gsap.from('.channel-card', {
    scrollTrigger: {
        trigger: '.channels-grid',
        start: 'top 80%'
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power3.out'
});

gsap.from('.pricing-card', {
    scrollTrigger: {
        trigger: '.pricing-grid',
        start: 'top 80%'
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power3.out'
});

gsap.from('.faq-item', {
    scrollTrigger: {
        trigger: '.faq',
        start: 'top 80%'
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power3.out'
});

gsap.from('.contact-form, .contact-info', {
    scrollTrigger: {
        trigger: '.contact-grid',
        start: 'top 80%'
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out'
});

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(item => {
    item.addEventListener('click', () => {
        const parent = item.parentElement;
        parent.classList.toggle('active');
    });
});

// Client-Side Search
const searchInput = document.getElementById('search-input');
const searchButton = document.querySelector('.btn-search');
if (searchInput && searchButton) {
    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim().toLowerCase();
        if (query) {
            fetch('/assets/data/channels.json')
                .then(response => response.json())
                .then(channels => {
                    const results = channels.filter(channel => 
                        channel.name.toLowerCase().includes(query) || 
                        channel.category.toLowerCase().includes(query)
                    );
                    if (results.length > 0) {
                        alert(`Found ${results.length} channel(s): ${results.map(c => c.name).join(', ')}`);
                    } else {
                        alert('No channels found for your search.');
                    }
                })
                .catch(error => console.error('Error fetching channels:', error));
        } else {
            alert('Please enter a search term.');
        }
    });
}

// PWA Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(reg => console.log('Service Worker Registered'))
        .catch(err => console.error('Service Worker Error:', err));
}
