const CACHE_VERSION = 'spin-academy-v20260812-unlimited5';
const APP_SHELL = [
  './',
  './index.html',
  './index.css?v=20260812-unlimited5',
  './js/audio.js?v=20260812-unlimited5',
  './js/assets.js?v=20260812-unlimited5',
  './js/curriculum-data.js?v=20260812-unlimited5',
  './js/learning-engine.js?v=20260812-unlimited5',
  './js/services.js?v=20260812-unlimited5',
  './js/combat-session.js?v=20260812-unlimited5',
  './js/app-shell.js?v=20260812-unlimited5',
  './index.js?v=20260812-unlimited5',
  './PORTADA.png',
  './assets/torre/torre_x_del_conocimiento.png'
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

  if (['style', 'script'].includes(request.destination)) {
    event.respondWith(
      fetch(request).then(response => {
        if (!response || response.status !== 200) return response;
        const copy = response.clone();
        caches.open(CACHE_VERSION).then(cache => cache.put(request, copy));
        return response;
      }).catch(() => caches.match(request))
    );
    return;
  }

  if (['image', 'font'].includes(request.destination)) {
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
