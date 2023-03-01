/** pagina web themealdb.com
 enlace lookup, pasa un id y te trae las instrucciones, ingredientes de la receta    www.themealdb.com/api/json/v1/1/lookup.php?i=52772
 enlace list of meal categories. todas las categorias  www.themealdb.com/api/json/v1/1/categories.php
 enlace filter by category   www.themealdb.com/api/json/v1/1/filter.php?c=Seafood    
 */

document.addEventListener('DOMContentLoaded', iniciarApp)

const resultado = document.querySelector('#resultado');
const modal = new bootstrap.Modal('#modal', {}); // instancia del modal de boostrap con codigo Html 
const divFavoritos = document.querySelector('.favoritos');


function iniciarApp() {
    const selectCategorias = document.querySelector('#categorias');
    if(selectCategorias){
        selectCategorias.addEventListener('change', seleccionarCategoria);
        obtenerCategorias();
    }

    if(divFavoritos){
        obtenerFavoritos();
    }


    function obtenerCategorias(){
        const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';
        fetch(url)
            .then(respuesta => respuesta.json())
            .then( datos => mostrarCategorias(datos.categories));
    }


    function mostrarCategorias(categorias = []) {
        categorias.forEach(categoria => {
            const {strCategory} = categoria;
            const option = document.createElement('OPTION');
            option.value = strCategory;
            option.textContent = strCategory;
            selectCategorias.appendChild(option);
        } )
    }


    function seleccionarCategoria(e) {
        const categoria = e.target.value;
        const url=`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`
        fetch(url)
            .then(respuesta => respuesta.json())
            .then(datos => mostrarRecetas(datos.meals))
    
    }


    function mostrarRecetas(recetas = []) {
        console.log(recetas); 
        
        limpiarHtml(resultado);

        const heading = document.createElement('H2');
        heading.classList.add('text-center', 'text-black', 'my-5');
        heading.textContent = recetas.length ? 'Resultados' : 'No hay resultados';
        resultado.appendChild(heading); 

        recetas.forEach(receta => {
            const {idMeal, strMeal, strMealThumb} = receta;
            const contenedorResetas = document.createElement('DIV');
            contenedorResetas.classList.add('col-md-4');

            const resetaCard = document.createElement('DIV');
            resetaCard.classList.add('card', 'mb-4');

            const resetaImagen = document.createElement('IMG');
            resetaImagen.classList.add('card-img-top');
            resetaImagen.alt = `imagen de la receta ${strMeal ?? receta.titule}`;
            resetaImagen.src = strMealThumb ?? receta.img;
    
            const resetaCardBody = document.createElement('DIV');
            resetaCardBody.classList.add('card-body');

            const resetaHeading = document.createElement('H3');
            resetaHeading.classList.add('card-title', 'mb-3');
            resetaHeading.textContent = strMeal ?? receta.titule;

            const resetaButton = document.createElement('BUTTON');
            resetaButton.classList.add('btn', 'btn-danger', 'w-100');
            resetaButton.textContent = 'Ver reseta';
            resetaButton.onclick = function(){
                seleccionarReseta(idMeal ?? receta.id);
            }
            // resetaButton.dataset.id = idMeal;

            resetaCardBody.appendChild(resetaHeading);
            resetaCardBody.appendChild(resetaButton);

            resetaCard.appendChild(resetaImagen);
            resetaCard.appendChild(resetaCardBody);

            contenedorResetas.appendChild(resetaCard);

            resultado.appendChild(contenedorResetas);
        })
    }

    
    function seleccionarReseta(idReseta) {
        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idReseta}`;
        fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => mostrarRecetaModal(resultado.meals[0]))
    }


    function mostrarRecetaModal(receta) {
        console.log(receta);
        const {idMeal, strInstructions, strMeal, strMealThumb } = receta;

        // Añadir contenido al modal
        const modalTitle = document.querySelector('#modal .modal-title');
        const modalBody = document.querySelector('#modal .modal-body');

        modalTitle.textContent = strMeal;
        modalBody.innerHTML = `
            <img class="img-fluid" src="${strMealThumb}" alt="receta ${strMeal}">
            <h3 class="my-3">Instrucciones</h3>
            <p>${strInstructions}</p>
            <h3 class="my-3">Ingredientes y cantidades</h3>
        `;

        // mostrar ingredientes y cantidades
        const listGroup = document.createElement('UL');
        listGroup.classList.add('list-group');

        for(let i=1; i<=20; i++ ){
            if(receta[`strIngredient${i}`]){
                const ingrediente = receta[`strIngredient${i}`];
                const cantidad = receta[`strMeasure${i}`];

                const ingredienteLi = document.createElement('LI');
                ingredienteLi.classList.add('list-group-item');
                ingredienteLi.textContent = `${ingrediente} - ${cantidad}`

                listGroup.appendChild(ingredienteLi);
            }
        }
        modalBody.appendChild(listGroup);

        const modalFooter = document.querySelector('.modal-footer');
        limpiarHtml(modalFooter);
        
        const btnFavorito = document.createElement('BUTTON');
        btnFavorito.classList.add('btn', 'btn-danger', 'col');
        btnFavorito.textContent = existeRegistro(idMeal) ? 'Eliminar favorito' : 'Guardar favorito';
        btnFavorito.onclick = function(){

            if(existeRegistro(idMeal)){
                eliminarRegistro(idMeal);
                btnFavorito.textContent = 'Guardar Favorito';
                mostrarToast('Receta eliminada correctamente');
                return
            }

            agregarFavorito( {
                id: idMeal,
                titule: strMeal,
                img: strMealThumb 
            });
            btnFavorito.textContent = 'Eliminar Favorito';
            obtenerFavoritos();
            mostrarToast('Receta agregada correctamente');
        }

        const btnCerrar = document.createElement('BUTTON');
        btnCerrar.classList.add('btn', 'btn-secondary', 'col');
        btnCerrar.textContent = 'Cerrar';
        btnCerrar.onclick = function() {
            modal.hide();
        }

        modalFooter.appendChild(btnFavorito);
        modalFooter.appendChild(btnFavorito);

        // Muestra el modal
        modal.show();
    }


    function agregarFavorito(receta) {
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];
        localStorage.setItem('favoritos', JSON.stringify([...favoritos, receta]));   
    }
    

    function existeRegistro(id) {
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];
        return favoritos.some(favorito => favorito.id === id);
    }


    function eliminarRegistro(id) {
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];
        const nuevosFavoritos = favoritos.filter(favorito => favorito.id !== id);
        localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
        mostrarRecetas(nuevosFavoritos);
    }


    function mostrarToast(mensaje){
        const divToast = document.querySelector('#toast');
        const bodyToast = document.querySelector('.toast-body');
        const toast = new bootstrap.Toast(divToast);     // Toast es una api de Boostrap para mostrar mensajes al usuario
        bodyToast.textContent = mensaje;
        toast.show();
    }


    function obtenerFavoritos() {
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];
        if(favoritos.length){
            mostrarRecetas(favoritos);
            return
        }

        const noFavoritos = document.createElement('P');
        noFavoritos.classList.add('fs-4', 'text-center', 'font-bold', 'mt-5');
        noFavoritos.textContent = 'No hay recetas guardadas en favoritos';
        divFavoritos.appendChild(noFavoritos);
    }


    function limpiarHtml(selector) {
        while(selector.firstChild){
            selector.removeChild(selector.firstChild);
        }
    }

}



