import{ mostrarCliente, editarCliente } from './API.js'
import { mostrarAlerta, validar } from './funciones.js';

( ()=>{

    const inputNombre   = document.querySelector('#nombre');
    const inputEmail    = document.querySelector('#email');
    const inputTelefono = document.querySelector('#telefono');
    const inputEmpresa  = document.querySelector('#empresa');
    const inputId       = document.querySelector('#id');

    document.addEventListener('DOMContentLoaded', async()=>{

        const parametroURL = new URLSearchParams(window.location.search);
        const idCliente = parametroURL.get('id');
        const cliente = await mostrarCliente(idCliente);
        llenarFormulario(cliente);        

        const formulario = document.querySelector('#formulario');
        formulario.addEventListener('submit', validarCliente);
    })

    function llenarFormulario(cliente){
        const {nombre, email, telefono, empresa, id} = cliente;
        inputNombre.value = nombre; 
        inputEmail.value = email; 
        inputTelefono.value = telefono; 
        inputEmpresa.value = empresa; 
        inputId.value = id; 
    }

    function validarCliente(e) {
        e.preventDefault();

        const cliente = {
            nombre: inputNombre.value.trim().toUpperCase(),  
            email: inputEmail.value.trim(),   
            telefono: inputTelefono.value.trim(),
            empresa: inputEmpresa.value.trim(), 
            id: parseInt(inputId.value)      
        }
     
        if(validar(cliente)){
            // mostrar mensaje
            mostrarAlerta('todos los campos son obligatorios');
            return;
        }
        
        // editar cliente
        editarCliente(cliente);
    }

})()