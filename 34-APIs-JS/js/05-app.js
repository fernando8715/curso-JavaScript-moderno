//  API visibilityState para informar si el usuario esta en la pagina web o no

document.addEventListener('visibilitychange', ()=>{
    if(document.visibilityState === 'visible'){
        console.log('Ejecutar la función de reproducir video');
    }else{
        console.log('Ejecutar la función de detener el video');
    }
})