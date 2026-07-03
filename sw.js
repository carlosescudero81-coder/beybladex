const CACHE_VERSION = 'spin-academy-v20260703-perf2';
const APP_SHELL = [
  './',
  './index.html',
  './index.css?v=20260630-battle-animations',
  './js/audio.js?v=20260630-battle-animations',
  './js/assets.js?v=20260630-battle-animations',
  './js/curriculum-data.js?v=20260630-battle-animations',
  './js/learning-engine.js?v=20260630-battle-animations',
  './js/services.js?v=20260630-battle-animations',
  './js/combat-session.js?v=20260630-battle-animations',
  './js/app-shell.js?v=20260630-battle-animations',
  './index.js?v=20260630-battle-animations',
  './assets/optimized/portada-1280.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE_VERSION).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== location.origin) return;

  if (request.destination === 'document') {
    event.respondWith(fetch(request).catch(() => caches.match('./index.html')));
    return;
  }

  if (['style', 'script', 'image', 'font'].includes(request.destination)) {
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) return cached;
        return fetch(request).then(response => {
          if (!response || response.status !== 200) return response;
          const copy = response.clone();
          caches.open(CACHE_VERSION).then(cache => cache.put(request, copy));
          return response;
        });
      })
    );
  }
});
