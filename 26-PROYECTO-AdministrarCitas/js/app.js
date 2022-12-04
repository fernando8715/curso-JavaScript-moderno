const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');

const inputMascota = document.querySelector('#mascota');
const inputPropietario = document.querySelector('#propietario');
const inputTelefono = document.querySelector('#telefono');
const inputFecha = document.querySelector('#fecha');
const inputHora = document.querySelector('#hora');
const inputSintomas = document.querySelector('#sintomas');

let editando;


class Cita {
    constructor(){
        this.citas = [];
    }

    agregarCita(cita){
        this.citas = [...this.citas, cita];
    };

    eliminarCita(id){
        this.citas = this.citas.filter(cita => cita.id !== id);
    };

    editarCita(citaActualizada){
        this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada : cita);
    };
};


class UI {
    
    mostrarMensaje(mensaje, tipo){
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

        if(tipo){
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success');
        }
        divMensaje.textContent = mensaje;
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));
        
        setTimeout( ()=>{
            divMensaje.remove();
        }, 2000);
    }

    mostrarCitas({citas}){ // desestructuro para acceder al arreglo
        
        this.limpiarHtml();

        citas.forEach(cita => {
            const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;
            
            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;

            // scripting de cada elemento
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder')
            mascotaParrafo.textContent = mascota.toUpperCase();

            const propietarioMascota = document.createElement('p');
            propietarioMascota.innerHTML=`
                <span class="font-weight-bolder">Propietario: </span>${propietario.toUpperCase()}   
            `;

            const telefonoPropietario = document.createElement('p');
            telefonoPropietario.innerHTML=`
                <span class="font-weight-bolder">Telefono: </span>${telefono}   
            `;

            const fechaCita = document.createElement('p');
            fechaCita.innerHTML=`
                <span class="font-weight-bolder">fecha: </span>${fecha}   
            `;

            const horaCita = document.createElement('p');
            horaCita.innerHTML=`
                <span class="font-weight-bolder">Hora: </span>${hora}   
            `;

            const sintoma = document.createElement('p');
            sintoma.innerHTML=`
                <span class="font-weight-bolder">Sintomas: </span>${sintomas}   
            `;

            const btnBorrar = document.createElement('button');
            btnBorrar.classList.add('btn', 'btn-danger', 'mr-2');
            //iconos de https://heroicons.dev/
            btnBorrar.innerHTML = 'Eliminar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
            btnBorrar.onclick = ()=>eliminarCita(id);

            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn', 'btn-primary', 'mr-2');
            btnEditar.innerHTML = 'Editar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>';
            btnEditar.onclick = ()=> editarCita(cita);
            

            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioMascota);
            divCita.appendChild(telefonoPropietario);
            divCita.appendChild(fechaCita);
            divCita.appendChild(horaCita);
            divCita.appendChild(sintoma);        
            divCita.appendChild(btnBorrar);
            divCita.appendChild(btnEditar);

            contenedorCitas.appendChild(divCita);
        });
    }

    limpiarHtml(){
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
    }

}

const administrarCita = new Cita();
const ui = new UI();


const objCita = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
};


// llena el objeto
const datosCita = (e)=>{
    objCita[e.target.name] = e.target.value;
}


const crearCita = (e)=>{
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

}


const reiniciarObj = ()=>{
    objCita.mascota = '',
    objCita.propietario = '',
    objCita.telefono = '',
    objCita.fecha = '',
    objCita.hora = '',
    objCita.sintomas = ''
}


const eliminarCita = (id)=>{
    administrarCita.eliminarCita(id);
    ui.mostrarMensaje('La cita se elimino correctamente');
    ui.mostrarCitas(administrarCita);
}

const editarCita = (cita)=>{
    
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



const eventos = ()=>{

    inputMascota.addEventListener('change', datosCita);
    inputPropietario.addEventListener('change', datosCita);
    inputTelefono.addEventListener('change', datosCita);
    inputFecha.addEventListener('change', datosCita);
    inputHora.addEventListener('change', datosCita);
    inputSintomas.addEventListener('change', datosCita);

    formulario.addEventListener('submit', crearCita);
}



eventos ();





