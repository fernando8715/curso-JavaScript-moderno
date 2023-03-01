import Cita from './clases/Cita.js';
import UI from './clases/UI.js';

import { 
    formulario, 
    mascotaInput,   
    propietarioInput,
    telefonoInput,  
    fechaInput,     
    horaInput,      
    sintomasInput,
 }from './selectores.js';



const administrarCita = new Cita();
const ui = new UI();

let editando;


const objCita = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '', 
    sintomas: '',
};


export const datosCita = (e)=>{
    objCita[e.target.name] = e.target.value;
};

export const crearCita = (e)=>{
    e.preventDefault();

    const {mascota, propietario, telefono, fecha, hora, sintomas} = objCita;

    if( mascota === '' || propietario === '' || telefono === '' || fecha===''|| hora==='' || sintomas==='' ){
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
        return;
    };

    if(editando){
        //modo edicion
        administrarCita.editarCita( {...objCita}); // pasa una copia de la cita
        ui.mostrarMensaje('Cita actualizada correctamente');
        formulario.querySelector('button[type="submit"]').textContent = 'Crear cita';

        // salir modo edicion
        editando = false;
    }else{
        //modo creacion
        objCita.id = Date.now();
        administrarCita.addCita({...objCita});
        ui.mostrarMensaje('Mensaje guardado correctamente');
    }

    reiniciarObj();
    formulario.reset();
    ui.mostrarCitas(administrarCita);
};

const reiniciarObj = ()=>{
    objCita.mascota = '';
    objCita.propietario = '';
    objCita.telefono = '';
    objCita.fecha = '';
    objCita.hora = '';
    objCita.sintomas = '';
}

export const eliminarCita = (id)=>{
    administrarCita.removeCita(id);

    ui.mostrarMensaje('Cita eliminada correctamente');
    ui.mostrarCitas(administrarCita);
};

export const cargarEdicion = (cita)=>{

    const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

    mascotaInput.value = mascota;  
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;       
    sintomasInput.value = sintomas
    
    // llenando el objeto global
    objCita.mascota = mascota;
    objCita.propietario = propietario;
    objCita.telefono = telefono;
    objCita.fecha = fecha;
    objCita.hora = hora;
    objCita.sintomas = sintomas;
    objCita.id = id;

    // una vez se cambie un dato en un input se ejecuta la funcion datosCita;
    
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar cambios';

    editando = true;
}