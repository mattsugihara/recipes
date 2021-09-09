---
layout: null
---
var cacheName = "recipes";

// List of files to cache
self.addEventListener('install', function(e) {
  e.waitUntil(
    precache()
  );
});

// Listens for fetch events and returns request from cache, if possible, and
// otherwise sends out the request
self.addEventListener('fetch', function(e) {
  e.respondWith(fromCache(e.request));
  e.waitUntil(update(e.request));
});

function precache() {
  caches.open(cacheName).then(function(cache) {
    return cache.addAll([
      '/recipes/',
      '/recipes/css/main.css',
      {% for post in site.posts %}
      '/recipes{{ post.url }}',
      {% endfor %}
    ]);
  })
}

function fromCache(request) {
  return caches.open(cacheName).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}

function update(request) {
  return caches.open(cacheName).then(function (cache) {
    return fetch(request).then(function (response){
      return cache.put(request,response);
    });
  });
}
