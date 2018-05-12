// boo2!
var newCacheName = 'v10';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(newCacheName).then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/restaurant.html',
        '/css/styles.css',
        '/data/restaurants.json',
        '/img/1.jpg',
        '/img/2.jpg',
        '/img/3.jpg',
        '/img/4.jpg',
        '/img/5.jpg',
        '/img/6.jpg',
        '/img/7.jpg',
        '/img/8.jpg',
        '/img/9.jpg',
        '/img/10.jpg',
        '/js/dbhelper.js',
        '/js/main.js',
        '/js/restaurant_info.js',
        '/sw.js'
      ]);
    }).catch(function(error) {
      console.log('install with error ' + error)
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  )
})

self.addEventListener('activate', function(event) {
  var cacheWhiteList = [newCacheName];

  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (cacheWhiteList.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});
