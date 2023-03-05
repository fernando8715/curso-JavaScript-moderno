import { mostrarAlerta, validar } from './funciones.js';
import { nuevoCliente } from './API.js'

( function() {

    const formulario = document.querySelector('#formulario');
    formulario.addEventListener('submit', validarCliente);

    function validarCliente(e) {
        e.preventDefault();

        const nombre = document.querySelector('#nombre').value.trim().toUpperCase();
        const email = document.querySelector('#email').value.trim();
        const telefono = document.querySelector('#telefono').value.trim();
        const empresa = document.querySelector('#empresa').value.trim();

        const cliente = {
            nombre,
            email,
            telefono,
            empresa
        }
     
        if(validar(cliente)){
            // mostrar mensaje
            mostrarAlerta('todos los campos son obligatorios');
            return;
        }
        
            // agregar cliente
            nuevoCliente(cliente);
    }
    
})();