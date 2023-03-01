// API Navigator para informar si el usuario tiene o no conexion a internet

window.addEventListener('online', actualizarEstado);
window.addEventListener('offline', actualizarEstado);

function actualizarEstado(){
    if(navigator.onLine){
        console.log('Hay conexion a internet');
    }else{
        console.log('No hay conexion a internet');
    }
}