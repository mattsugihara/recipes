// check to see if the browser supports service workers, then install the 
// service worker on page load. On page load ensure that it can install
// properly, I guess?

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/recipes/service-worker.js').then(function(registration) {
      console.log('Service worker registered with scope: ' + registration.scope);
    }, function(err) {
      console.log('Service worker failed to register: ' + err);
    });
  });
}