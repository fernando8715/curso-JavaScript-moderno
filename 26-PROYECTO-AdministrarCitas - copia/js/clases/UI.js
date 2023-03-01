import { contenedorCitas } from "../selectores.js";
import {eliminarCita, cargarEdicion} from '../funciones.js'


class UI{
    
    mostrarMensaje(mensaje, error){
        const div = document.createElement('div');
        div.classList.add('text-center', 'd-block', 'alert', 'col-12');
        div.textContent = mensaje;
        if(error){
            div.classList.add('alert-danger')
        }else{
            div.classList.add('alert-success');
        }
        document.querySelector('#contenido').insertBefore(div, document.querySelector('.agregar-cita'));

        setTimeout( ()=>{
            div.remove();
        }, 2000);
    }

    mostrarCitas({citas}){

        this.limpiarHtml();

            citas.forEach(cita => {
            const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;
           
            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;

            const nombreMascota = document.createElement('h2');
            nombreMascota.classList.add('card-title', 'text-center', 'font-weight-bolder');
            nombreMascota.textContent = mascota.toUpperCase();

            const nombrePropietario = document.createElement('p');
            nombrePropietario.innerHTML= `
            <span class="font-weight-bolder">Propietario: </span>${propietario}
            `;

            const tel = document.createElement('p');
            tel.innerHTML= `
            <span class="font-weight-bolder">Telefono: </span>${telefono}
            `;

            const fechaCita = document.createElement('p');
            fechaCita.innerHTML= `<span class="font-weight-bolder">Fecha: </span>${fecha}
            `;

            const horaCita = document.createElement('p');
            horaCita.innerHTML= `
            <span class="font-weight-bolder">Hora: </span>${hora}
            `;           

            const sintoma = document.createElement('p');
            sintoma.innerHTML= `<span class="font-weight-bolder">Sintomas: </span>${sintomas}`;

            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnEliminar.innerHTML = 'Eliminar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
            btnEliminar.onclick = ()=> eliminarCita(id);

            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn', 'btn-primary', 'mr-2');
            btnEditar.innerHTML = 'Editar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>';
            btnEditar.onclick = ()=>cargarEdicion(cita);


            divCita.appendChild(nombreMascota);
            divCita.appendChild(nombrePropietario);
            divCita.appendChild(tel);
            divCita.appendChild(fechaCita);
            divCita.appendChild(horaCita);
            divCita.appendChild(sintoma);
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnEditar);

            contenedorCitas.appendChild(divCita);
        });
    };

    limpiarHtml(){
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
    };
}

export default UI;