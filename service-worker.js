---
layout: null
---
// List of files to cache
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('recipes').then(function(cache) {
      return cache.addAll([
        '/recipes/',
        '/recipes/css/main.css',
        {% for post in site.posts %}
        '/recipes{{ post.url }}',
        {% endfor %}
      ]);
    })
  );
});

// Listens for fetch events and returns request from cache, if possible, and
// otherwise sends out the request
self.addEventListener('fetch', function(e) {
  console.log('Request: ' + e.request.url);

  e.respondWith(
    caches.match(e.request).then(function(response) {
      if (response) {
        console.log('Served from local: ' + e.request.url)
        return response;
      } else {
        console.log('Served from remote: ' + e.request.url)
        return fetch(e.request);
      }
    })
  );
});