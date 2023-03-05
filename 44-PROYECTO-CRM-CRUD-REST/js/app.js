import { obtenerCliente, eliminarCliente } from './API.js'

( ()=>{
    const listaClientes = document.querySelector('#listado-clientes');

    document.addEventListener('DOMContentLoaded', mostrarClientes);
    
    listaClientes.addEventListener('click', confirmarEliminar);

    async function mostrarClientes() {
        const clientes = await obtenerCliente();

        clientes.forEach(cliente => {
            const {nombre, email, telefono, empresa, id} = cliente;
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <p class="text-sm leading-5 font-medium text-gray-700 text-lg font-bold">${nombre}</p>
                    <p class="text-gray-600">${email}</p>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <p class="text-gray-700">${telefono}</p>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 leading-5">
                    <p class="text-gray-600">${empresa}</p>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5" >
                    <a href="editar-cliente.html?id=${id}" class="mr-5 text-teal-600 hover:text-teal-900">Editar</a>
                    <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900 eliminar">Eliminar</a>
                </td>
            `
            listaClientes.appendChild(row);
        })

        listaClientes.addEventListener('click', confirmarEliminar);
    }

    function confirmarEliminar(e) {
        if(e.target.classList.contains('eliminar')){
            const clienteId = parseInt( e.target.dataset.cliente );
            const aceptar = confirm('Desea eliminar el registro');

            if(aceptar){
                eliminarCliente(clienteId);
            }
        }
    }
})();