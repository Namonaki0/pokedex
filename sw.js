
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("staticApp").then((cache) => {
      return cache.addAll(["./", "./style.css", "./assets/pokeball-192x192.png"]);
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});