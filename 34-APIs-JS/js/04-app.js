// API para abrir la pantalla completa y cerrarla

const btnPantallaCompleta = document.querySelector('#abrir-pantalla-completa');
const btnCerrarPantalla = document.querySelector('#salir-pantalla-completa');

btnPantallaCompleta.addEventListener('click', fullscreen);
btnCerrarPantalla.addEventListener('click', exitFullscreen);

function fullscreen(){
    document.documentElement.requestFullscreen();
}

function exitFullscreen(){
    document.exitFullscreen();
}