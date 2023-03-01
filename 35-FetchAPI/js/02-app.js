const cargarJSONBtn = document.querySelector('#cargarJSON');

cargarJSONBtn.addEventListener('click', obtenerDatos);

function obtenerDatos(){
     
    const url = 'data/empleado.json'
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => mostrardatos(datos));
}

function mostrardatos( {id, nombre, empresa, trabajo} ){
    const contenedor = document.querySelector('.contenido');
    const divDatos = document.createElement('div');
    
    divDatos.innerHTML = `
        <h2>${nombre}</h2>
        <p>id: ${id} </p>
        <p>empresa: ${empresa}</p>
        <p>trabajo: ${trabajo}</p>
    `
    contenedor.appendChild(divDatos);
}