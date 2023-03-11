const nombreCache = 'apv-v1';
const archivos = [
    '/',
    '/index.html',
    '/error.html',
    '/css/bootstrap.css',
    '/css/styles.css',
    '/js/app.js',
    '/js/apv.js'
];


self.addEventListener('install', e=> {
    console.log('Instalando service worker');
    e.waitUntil(
        caches.open(nombreCache)
            .then( cache => {
                console.log('cacheando');
                cache.addAll(archivos)
            })
    )
});

self.addEventListener('activate', e=> {
    console.log('activando service worker');
    
    e.waitUntil(
        caches.keys()
            .then( keys => {
                return Promise.all(
                    keys.filter(key => key !== nombreCache)
                        .map(key => caches.delete(key)) // borra versiones anteriores
                )
            })
    )
});


self.addEventListener('fetch', e=> {
    console.log('configurando fetch...', e);
    
    e.respondWith(
        caches.match(e.request)
            .then( respuesta => respuesta ? respuesta : caches.match('/error.html') )
    )
})