// API speech recognition, para reconocer lo que hablo por microfono y se genere el texto.

const btnMicrofono = document.querySelector('#microfono');
const divSalida = document.querySelector('#salida');

btnMicrofono.addEventListener('click', ejecutarSpeechAPI);

function ejecutarSpeechAPI(){

    const SpeechRecognition = webkitSpeechRecognition;
    const recognition = new SpeechRecognition;

    recognition.start();

    recognition.onstart = function(){
        divSalida.classList.add('.mostrar');
        divSalida.textContent = 'Escuchando';
    }

    recognition.onspeechend = function(){
        divSalida.textContent = 'se dejo de grabar';
        recognition.stop();
    }

    recognition.onresult = function(e){
        console.log(e.results);
    }
}