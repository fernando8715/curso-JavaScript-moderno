const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');
const paginacion = document.querySelector('#paginacion');

const imgxPagina = 40;
let totalpaginas;
let paginaActual = 1;
let iterador;

window.onload = ()=>{
    formulario.addEventListener('submit', validarInfo);
}

function validarInfo(e) {
    e.preventDefault();
    
    const existe = document.querySelector('.bg-red-100');

    if(!existe){
        const entrada = document.querySelector('#termino').value;
        
        if(entrada === ''){
            mostrarMensaje('Debe ingresar una busqueda');
            return
        }
        buscarImagenes();
    }
}   

function mostrarMensaje(mensaje) {
    const alerta = document.createElement('P');
    alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center');
    alerta.innerHTML = `
        <strong class="font-bold">Error</strong>
        <span class="block">${mensaje}</span>
    `

    formulario.appendChild(alerta);

    setTimeout(() => {
       alerta.remove(); 
    }, 2000);
}

function buscarImagenes() {

    const busqueda = document.querySelector('#termino').value;
    console.log(busqueda);

    const key = '33403423-1beb71eb1e9c4439c6f22035b'
    const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imgxPagina}&page=${paginaActual}`;
    
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            totalpaginas = calcularImg(datos.totalHits);
            mostrarImagenes(datos.hits)});
}

function mostrarImagenes(datos) {
    console.log(datos);
    limpiarHtml(resultado);
  
    datos.forEach(dato => {
        const {id, previewURL, views, likes, largeImageURL} = dato;

        resultado.innerHTML += `
        <div class="w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4">
            <div class="bg-white">
                <img class="w-full" src="${previewURL}">
                <div class="p-4">
                    <p class="font-bold">${views} <span class="font-light">visitas</span> </p>
                    <p class="font-bold">${likes} <span class="font-light">likes</span> </p>
                    <a class=" block w-full bg-blue-800 hover:bg-blue-500 text-white uppercase font-bold text-center rounded mt-5 py-2" href="${largeImageURL}" target="_blank" rel="noopener noreferrer">
                        Ver imagen
                    </a>
                </div>
            </div>
        </div>
        `
    })
    limpiarHtml(paginacion);
    imprimirPaginador();
}

function imprimirPaginador() { 
    iterador = generadorPaginas(totalpaginas);
    
    while(true){
        const { value, done } = iterador.next();
        if(done) return;

        // caso contrario genera un boton por cada elemento del generador
        const boton = document.createElement('A');
        boton.href='#';
        boton.dataset.pagina = value;
        boton.textContent = value;
        boton.classList.add('siguiente', 'block', 'bg-yellow-400', 'px-4', 'py-1', 'mr-2', 'rounded', 'font-bold', 'mb-10');

        boton.onclick = ()=> {
            paginaActual = value;
            buscarImagenes();
        }

        paginacion.appendChild(boton);
    }

}


function *generadorPaginas(totalPaginas) {
    // console.log(`total paginas: ${totalPaginas}`);
    for(let i=1; i<=totalPaginas; i++){
        yield i;
    }
}


function calcularImg(numImagenes){
    return parseInt(Math.ceil(numImagenes/imgxPagina));
}

function limpiarHtml(selector) {
    while(selector.firstChild){
        selector.removeChild(selector.firstChild);
    }
}
