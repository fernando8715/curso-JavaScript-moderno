import Cita from './clases/Cita.js';
import UI from './clases/UI.js';

import {
    inputMascota,
    inputPropietario,
    inputTelefono,
    inputFecha,
    inputHora,
    inputSintomas,
    formulario
} 
from './selectores.js'



let editando;

const administrarCita = new Cita();
const ui = new UI(administrarCita);


const objCita = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
};

export const reiniciarObj = ()=>{
    objCita.mascota = '',
    objCita.propietario = '',
    objCita.telefono = '',
    objCita.fecha = '',
    objCita.hora = '',
    objCita.sintomas = ''
}

// llena el objeto
export const datosCita = (e)=>{
    objCita[e.target.name] = e.target.value;
}


export const crearCita = (e)=>{
    e.preventDefault();

    const {mascota, propietario, telefono, fecha, hora, sintomas} = objCita;

    if(mascota==='' || propietario==='' || telefono==='' || fecha==='' || hora==='' || sintomas===''){
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
        return;
    }

    if(editando){
        administrarCita.editarCita({...objCita});
        ui.mostrarMensaje('Los datos se editaron correctamente');
        formulario.querySelector('button[type="submit"]').textContent = 'Crear cita';
        editando = false;
    }else{
        objCita.id = Date.now();
        administrarCita.agregarCita({...objCita}); // copia del objeto para no pasar por referencia
        ui.mostrarMensaje('Los datos se almacenaron correctamente');
    }
    

    formulario.reset();
    reiniciarObj();

    ui.mostrarCitas(administrarCita);

};

export const eliminarCita = (id)=>{
    administrarCita.eliminarCita(id);
    ui.mostrarMensaje('La cita se elimino correctamente');
    ui.mostrarCitas(administrarCita);
}

export const cargarCita = (cita)=>{
    
    const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;
    
    inputMascota.value = mascota;
    inputPropietario.value = propietario;
    inputTelefono.value = telefono;
    inputFecha.value = fecha;
    inputHora.value = hora
    inputSintomas.value = sintomas;
    
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

    objCita.mascota = mascota;
    objCita.propietario = propietario;
    objCita.telefono = telefono;
    objCita.fecha = fecha;
    objCita.hora = hora;
    objCita.sintomas = sintomas;
    objCita.id = id;

    editando = true;
}
