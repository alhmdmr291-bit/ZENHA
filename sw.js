const CACHE_NAME = "ZENHA-v1";

const FILES_TO_CACHE = [
  "/ZENHA/",
  "/ZENHA/index.html",
  "/ZENHA/manifest.json",
  "/ZENHA/icon-192.png",
  "/ZENHA/icon-512.png"
];

// تثبيت Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// تشغيل Service Worker
self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// جلب الملفات من الكاش عند الحاجة
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
