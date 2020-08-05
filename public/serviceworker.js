const CACHE_NAME = "pomodoro";

const urlsToCache = ['./index.html', '/dist/build/static/js/bundle.min.js'];

const self = this;

//Install SW
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    )
});

//Listen for request
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(() => {
                return fetch(event.request)
                    .catch(() => caches.match('../dist/build/static/js/bundle.min.js'))
            })
    )
});

//Activate the SW
self.addEventListener('activate', (event) => {
    const cacheWhitlelist = [];
    cacheWhitlelist.push(CACHE_NAME);

    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if(!cacheWhitlelist.includes(cacheName)){
                    return caches.delete(cacheName);
                }
            })
        ))
    )
});