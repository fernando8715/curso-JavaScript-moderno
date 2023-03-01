const cargarJSONArray = document.querySelector('#cargarJSONArray');

cargarJSONArray.addEventListener('click', obtenerDatos);

function obtenerDatos(){
    const url = 'data/empleados.json';
    fetch(url)
        .then(resultado => resultado.json())
        .then(datos => mostrarHtml(datos))
        .catch(error => console.log(error))
}

function mostrarHtml(datos){
    const contenedor = document.querySelector('.contenido');
    
    datos.forEach(empleado => {
        const {id, nombre, empresa, trabajo} = empleado;

        const divDatos = document.createElement('div');
        divDatos.innerHTML = `
            <h2>${nombre}</h2>
            <p>id: ${id} </p>
            <p>empresa: ${empresa}</p>
            <p>trabajo: ${trabajo}</p>
        `;
        contenedor.appendChild(divDatos);
    });
}
