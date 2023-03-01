const listaCursos =     document.querySelector('#lista-cursos');
const listaCarrito =    document.querySelector('#lista-carrito tbody');
const carrito =         document.querySelector('#carrito');
const limpiarCarrito =  document.querySelector('#vaciar-carrito');

let elementosCarrito = [];


function eventos(){
    listaCursos.addEventListener('click', agregarCurso);
    carrito.addEventListener('click', eliminarCurso);
    limpiarCarrito.addEventListener('click', vaciarCarrito);
    document.addEventListener('DOMContentLoaded', loadLocalStorage);
}


function agregarCurso(event){
    event.preventDefault();

    const curso = event.target.parentElement.parentElement;
    
    if(event.target.text === 'Agregar Al Carrito'){
        informacionCurso(curso);
    }
}

function informacionCurso(curso){

    const infoCurso = {
        titulo: curso.querySelector('h4').textContent,
        imagen: curso.querySelector('img').src,
        precio: curso.querySelector('p span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    
    const existe = elementosCarrito.some(curso => curso.id === infoCurso.id);
    
    if(existe){
        const cursos = elementosCarrito.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;
            }else{
                return curso
            }
        })
        elementosCarrito = [...cursos];

    }else{
        elementosCarrito = [...elementosCarrito, infoCurso]
    }
    
    crearCarritoHtml();
}

function crearCarritoHtml(){
    limpiarHtml();

    elementosCarrito.forEach(curso=> {
        const {titulo, imagen, precio, id, cantidad} = curso;
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100" alt="curso de ${titulo}">
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}">X </a>
            </td>
        `
        listaCarrito.appendChild(row);
    })
    saveLocalstorage();
};

function limpiarHtml(){
    while(listaCarrito.firstChild){
        listaCarrito.removeChild(listaCarrito.firstChild);
    }
};

function eliminarCurso(event){
    const existe = event.target.classList.contains('borrar-curso');
    const cursoId = event.target.getAttribute('data-id');

    if(existe){
        elementosCarrito = elementosCarrito.filter(curso => curso.id !== cursoId);
        crearCarritoHtml();
    }
}

function vaciarCarrito(event){
    event.preventDefault();

    elementosCarrito = [];
    crearCarritoHtml();
}

function saveLocalstorage(){
    localStorage.setItem('udemy', JSON.stringify(elementosCarrito));
}

function loadLocalStorage(){
    elementosCarrito = JSON.parse(localStorage.getItem('udemy')) || [];
    crearCarritoHtml();
}



eventos();