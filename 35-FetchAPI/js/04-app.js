const btnCargarAPI = document.querySelector('#cargarAPI');

btnCargarAPI.addEventListener('click', obtenerDatos);

function obtenerDatos(){
    const url = 'https://picsum.photos/list';
    fetch(url)
        .then(resultado => resultado.json())
        .then(datos => mostrarHtml(datos))
}

function mostrarHtml(datos){
    const contenedor = document.querySelector('.contenido'); 

    datos.forEach(elem => {
        const {author, post_url} = elem;

        const div = document.createElement('div');
        div.innerHTML = `
            <h2>${author}</h2>
            <a href="${post_url} target="blank">ver imagen</a>
        `
        contenedor.appendChild(div);
    })
}