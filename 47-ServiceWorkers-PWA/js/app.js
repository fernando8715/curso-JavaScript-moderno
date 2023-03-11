if('serviceWorker' in navigator){
    navigator.serviceWorker.register('./sw.js')
        .then(registrado => console.log('Se registro correctamente...', registrado))
        .catch(error => console.log('Ocurrio un error en el registro', error));
} else {
    console.log('El navegador no soporta service worker');
}