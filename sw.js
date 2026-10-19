/**
 * JDFit Service Worker
 * Network-first strategy to ensure code updates are always immediately visible,
 * with cache fallback for offline PWA operation.
 */

const CACHE_NAME = 'jdfit-cache-v3';

const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/jdfit.html',
  '/css/styles.css',
  '/js/main.js',
  '/js/exerciseVisualizer.js',
  '/js/workoutEngine.js',
  '/js/exerciseData.js',
  '/js/oneRmCalculator.js',
  '/js/player.js',
  '/js/storage.js',
  '/js/utils.js'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS_TO_CACHE).catch(err => {
        console.warn('[JDFit SW] Pre-cache warning:', err);
      });
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches
      .keys()
      .then(keys =>
        Promise.all(
          keys.map(key => {
            if (key !== CACHE_NAME) {
              console.log('[JDFit SW] Removing stale cache:', key);
              return caches.delete(key);
            }
          })
        )
      )
      .then(() => self.clients.claim())
  );
});

// Network-first strategy: always fetch fresh from network, fall back to cache when offline
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then(networkResponse => {
        if (networkResponse && networkResponse.status === 200) {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, clone).catch(() => {});
          });
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request).then(cached => {
          if (cached) return cached;
          if (event.request.headers.get('accept')?.includes('text/html')) {
            return caches.match('/index.html') || caches.match('/jdfit.html');
          }
        });
      })
  );
});
