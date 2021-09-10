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

// Listens for fetch events
// calls fromCache to either respod from the cache (or fail)
// then calls the server to update the cache
self.addEventListener('fetch', function(e) {
  e.respondWith(fromCache(e.request));
  e.waitUntil(update(e.request));
});


// caches files for future use
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

// Responds to requests with asset from cache or falls back to requesting the
// asset from the networ
function fromCache(request) {
  return caches.open(cacheName).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || fetch(request);
    });
  });
}

// Updates assets in cache
// If the extension of the request URL is empty (i.e. html), js, or css, then
// this updates the asset in cache.
function update(request) {
  const url = new URL (request.url);
  const extension = url.pathname.split('.').pop();

  if (( '' == extension || 'css' == extension) || 'js' == extension ) {
    return caches.open(cacheName).then(function (cache) {
      return fetch(request).then(function (response){
        return cache.put(request,response);
      });
    });
  }
}
