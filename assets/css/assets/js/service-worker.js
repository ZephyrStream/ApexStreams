const CACHE_NAME = 'streamverse-iptv-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/features.html',
    '/channels.html',
    '/pricing.html',
    '/faq.html',
    '/contact.html',
    '/about.html',
    '/terms.html',
    '/privacy.html',
    '/assets/css/styles.css',
    '/assets/js/main.js',
    '/assets/images/icon.png',
    '/assets/images/logo.png',
    '/assets/images/hero-bg.webp',
    '/assets/images/sports-channel.webp',
    '/assets/images/movie-channel.webp',
    '/assets/images/news-channel.webp'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
