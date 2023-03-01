import {datosCita, crearCita} from '../funciones.js';
import {
    inputMascota,
    inputPropietario,
    inputTelefono,
    inputFecha,
    inputHora,
    inputSintomas,
    formulario,
} 
from '../selectores.js'

class App{
    constructor(){
        this.initApp();
    }

    initApp(){
        inputMascota.addEventListener('change', datosCita);
        inputPropietario.addEventListener('change', datosCita);
        inputTelefono.addEventListener('change', datosCita);
        inputFecha.addEventListener('change', datosCita);
        inputHora.addEventListener('change', datosCita);
        inputSintomas.addEventListener('change', datosCita);

        formulario.addEventListener('submit', crearCita);
    }
};

export default App;