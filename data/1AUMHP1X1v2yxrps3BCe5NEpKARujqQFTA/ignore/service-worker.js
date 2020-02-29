var dataCacheName = 'frameworkData';
var cacheName = 'frameworkPWA';
var filesToCache = [
  '/',
  '/index.html',
  '/elements.html',
  '/icon.png',
  '/css/page-common.css',
  '/css/app-common.css',
  '/css/page-custom.css',
  '/css/app-custom.css',
  '/js/app.js',
  '/Fonts/Material Icons/font.css',
  '/Fonts/Material Icons/font.eot',
  '/Fonts/Material Icons/font.ttf',
  '/Fonts/Material Icons/font.woff',
  '/Fonts/Material Icons/font.woff2',
  '/Fonts/Roboto/font.css',
  '/Fonts/Roboto/roboto-cyrillic.woff2',
  '/Fonts/Roboto/roboto-cyrillicext.woff2',
  '/Fonts/Roboto/roboto-greek.woff2',
  '/Fonts/Roboto/roboto-greekext.woff2',
  '/Fonts/Roboto/roboto-latin.woff2',
  '/Fonts/Roboto/roboto-latinext.woff2',
  '/Fonts/Roboto/roboto-vietnamese.woff2',
  '/img/release-stable.png',
  '/img/release-pre.png',
  '/img/seal-1.png',
  '/img/social/github.svg',
  '/img/social/facebook.svg',
  '/img/social/twitter.svg',
  '/img/social/ask.svg',
  '/img/social/deviantart.svg',
  '/img/showcase/plasnerd.png',
  '/img/showcase/pehtml.svg',
  '/img/showcase/ultracreator.png',
  '/img/showcase/gittex.png',
  '/img/showcase/notestick.png',
  '/img/showcase/universavpoke.png',
  '/img/showcase/400x350.png',
  '/img/showcase/100x100.png',
  '/img/showcase/fullwidth.png',
  '/js/jquery.min.js',
  '/js/page-common.js',
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  /*
   * Fixes a corner case in which the app wasn't returning the latest data.
   * You can reproduce the corner case by commenting out the line below and
   * then doing the following steps: 1) load app for first time so that the
   * initial New York City data is shown 2) press the refresh button on the
   * app 3) go offline 4) reload the app. You expect to see the newer NYC
   * data, but you actually see the initial data. This happens because the
   * service worker is not yet activated. The code below essentially lets
   * you activate the service worker faster.
   */
  return self.clients.claim();
});