const listaCursos = document.querySelector('#lista-cursos')
const carrito = document.querySelector('#carrito');
const pedido = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');

let elementosCarrito = [];


const agregarCurso = (event) => {

    event.preventDefault();

    if(event.target.text === 'Agregar Al Carrito'){
        const curso = event.target.parentElement.parentElement;
        informacionCurso(curso);
    }
};



const eliminarCurso = (event) => {
    const borrar = event.target.classList.contains('borrar-curso');

    const cursoId = event.target.getAttribute('data-id');
    
    if(borrar){
        elementosCarrito = elementosCarrito.filter(curso => curso.id !== cursoId );
    }

    crearCarritoHtml(elementosCarrito);   
}





const informacionCurso = (curso)=> {
    
    const infoCurso = {

        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    }

    const existe = elementosCarrito.some(curso => curso.id === infoCurso.id);

    if(existe){
        const curso = elementosCarrito.map( curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;
            }else{
                return curso;
            }
        })
        elementosCarrito = [...curso];
    }else{
        elementosCarrito = [...elementosCarrito, infoCurso];
    }
    crearCarritoHtml(elementosCarrito);
}


const crearCarritoHtml = () => {

    limpiarHtml();

    elementosCarrito.forEach(curso => {

        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">            
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
                <a href ="#" class= "borrar-curso" data-id="${id}"> X </a>
            </td>
        `
        pedido.appendChild(row);
    });
    guardarLocalStorage();
};



const limpiarHtml = () => {

    while(pedido.firstChild){
        pedido.removeChild(pedido.firstChild)
    }
};



const guardarLocalStorage = ()=>{
    localStorage.setItem('cursos', JSON.stringify(elementosCarrito));
};


const cargarLocalStorage = ()=>{
    elementosCarrito = JSON.parse( localStorage.getItem('cursos')) || [];
    crearCarritoHtml();
}




// Eventos

const eventos = () => {
    listaCursos.addEventListener('click', agregarCurso);
    
    carrito.addEventListener('click', eliminarCurso);

    document.addEventListener('DOMContentLoaded', cargarLocalStorage);

    vaciarCarrito.addEventListener('click', ()=>{
        elementosCarrito = [];
        limpiarHtml();
    });   
}


eventos();