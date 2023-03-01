const courseList = document.querySelector('#lista-cursos');
const shopCart = document.querySelector('#lista-carrito tbody');
const cart = document.querySelector('#carrito');
const cleanCart = document.querySelector('#vaciar-carrito');

let elementsCar = [];

function events() {
    document.addEventListener('DOMContentLoaded', loadLocalStorage);
    courseList.addEventListener('click', addCourse);
    cart.addEventListener('click', deleteCourse);
    cleanCart.addEventListener('click', cleanAll);
}

function addCourse(e){
    e.preventDefault();
    const course = e.target.parentElement.parentElement;
    
    if(e.target.text === 'Agregar Al Carrito'){
        infCourse(course);
    }
}

function infCourse(course){
    const infoCourse = {
        name: course.querySelector('h4').textContent,
        img: course.querySelector('img').src,
        price: course.querySelector('p span').textContent,
        id: course.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    
    const exist = elementsCar.some(course => course.id === infoCourse.id);
    
    if(exist){
        const courseCar = elementsCar.map(course => {
            if(course.id === infoCourse.id){
                course.cantidad ++;
                return course
            }else{
                return course;
            }
        });
        elementsCar = [...courseCar];
    }else{
        elementsCar = [...elementsCar, infoCourse]
    }
    saveLocalstorage();
    showHtml();
}

function showHtml() {
    cleanHtml(shopCart);

    elementsCar.forEach(course => {
        const {name, img, price, id, cantidad} = course;
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>
                <img src="${img}" alt="imagen ${name}" width="100"> 
            </td>
            <td>${name}</td>
            <td>${price}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </td>
        `
        shopCart.appendChild(row);
    })
}

function cleanHtml(selector){
    while(selector.firstChild){
        selector.removeChild(selector.firstChild);
    }
}

function deleteCourse(e) {
    const exist = e.target.classList.contains('borrar-curso');
    const idCourse = e.target.getAttribute('data-id');
    
    if(exist){
        elementsCar = elementsCar.filter(course => course.id !== idCourse);
        saveLocalstorage();
        showHtml();
    }
}

function cleanAll(e) {
    e.preventDefault();
    elementsCar = [];
    saveLocalstorage();
    showHtml();
}

function saveLocalstorage() {
    localStorage.setItem('shopCart', JSON.stringify(elementsCar));
}

function loadLocalStorage(){
    elementsCar = JSON.parse(localStorage.getItem('shopCart')) || [];
    showHtml();
}



events();