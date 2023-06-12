self.addEventListener("install", event => {
    console.log("SW (či jeho nová verze) nainstalován")
})
self.addEventListener("activate", event => {
    console.log("SW (či jeho nová verze) aktivován")
    return self.clients.claim();
})

/*
self.addEventListener("fetch", event => {
    console.log("HTTP požadavek ze stránky");
    event.respondWith(new Response("Hello world!"))
})

 */

self.addEventListener('fetch', function(event) {

    console.log("FETCH")
    event.respondWith(
        fetch(event.request).then(function(response) {
            // Clone the response
            var responseClone = response.clone();

            // Cache the response
            caches.open('cache').then(function(cache) {
                cache.put(event.request, responseClone);
                console.log(responseClone)
            });

            return response;
        }).catch(function() {
            // If fetching fails
            console.log("you are offline, file taken from cache")
            console.log(caches.match(event.request))
            return caches.match(event.request);
        })
    );
});

/*
self.addEventListener('fetch', function(event) {

    if (event.request.url.endsWith('.mp3')) {
        console.log("FETCH")
        event.respondWith(
            fetch(event.request).then(function(response) {
                // Clone the response
                var responseClone = response.clone();

                // Cache the response
                caches.open('mp3-cache').then(function(cache) {
                    cache.put(event.request, responseClone);
                    console.log(responseClone)
                });

                return response;
            }).catch(function() {
                // If fetching the MP3 file fails
                console.log("you are offline, file taken from cache")
                console.log(caches.match(event.request))
                return caches.match(event.request);
            })
        );
    }
});

 */


//http://localhost:8000/