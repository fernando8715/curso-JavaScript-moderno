// API para enviar notificaciones al usuario.

const btnNotificar = document.querySelector('#notificar');

btnNotificar.addEventListener('click', ()=>{
    Notification
    .requestPermission()
    .then(resultado => console.log(resultado))
});

const verNotificacion = document.querySelector('#verNotificacion');
verNotificacion.addEventListener('click', ()=>{
    if(Notification.permission === 'granted'){
        const notificacion = new Notification('Esta es la notificacion', {
            icon:'img/ccj.png',
            body: 'aprendiendo API'
    });

    notificacion.onclick = function(){
    window.open('https://www.udemy.com');
   }

   }
});

