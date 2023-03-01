const contenedor = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', ()=>{
    formulario.addEventListener('submit', buscarClima);
})


function buscarClima(e){
    e.preventDefault();

    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if(ciudad === '' || pais === ''){
        mostrarMensaje('Los datos son obligatorios');
        return;
    }

    consultarAPI(ciudad, pais);
}


function mostrarMensaje(mensaje) {
    const alerta = document.querySelector('.bg-red-100');
    
    if(!alerta){

        const divMensaje = document.createElement('div');
    
        divMensaje.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');
    
        divMensaje.innerHTML = `
        <strong>!ERROR!</strong>
        <span class="block">${mensaje}</span>
        
        `
        contenedor.appendChild(divMensaje);
    
        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }
    
}


function consultarAPI(ciudad, pais){

    const appId = '7c281593821a8faf2cb1696d24fd9fe8';
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    spinner();

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            if(datos.cod === '404'){
                mostrarMensaje('Ciudad no encontrada');
                return;
            }
            mostrarClima(datos);
        });
}


function mostrarClima(datos) {
    
    limpiarHtml(resultado);

    const { name, main: {temp, temp_max, temp_min}, weather:[{description}] } = datos;

    const tempActual = kelvinACentigrados(temp);
    const tempMax = kelvinACentigrados(temp_max);
    const tempMin = kelvinACentigrados(temp_min);

    const ciudad = document.createElement('p');
    ciudad.textContent = `clima en ${name}`;
    ciudad.classList.add('font-bold', 'text-2xl');

    const actual = document.createElement('p');
    actual.innerHTML = `${tempActual} &#8451;`;
    actual.classList.add('font-bold', 'text-6xl');

    const min = document.createElement('p');
    min.innerHTML = `Max: ${tempMax} &#8451;`;
    min.classList.add('text-xl');

    const max = document.createElement('p');
    max.innerHTML = `Min: ${tempMin} &#8451;`;
    max.classList.add('text-xl');

    const clouds = document.createElement('P');
    clouds.innerHTML = `${description}`;
    clouds.classList.add('text-x2');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');

    resultadoDiv.appendChild(ciudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(min);
    resultadoDiv.appendChild(max);
    resultadoDiv.appendChild(clouds);

    resultado.appendChild(resultadoDiv);
}


const kelvinACentigrados = temp => parseInt(temp - 273.15);


function limpiarHtml(selector) {
    while(selector.firstChild){
        selector.removeChild(selector.firstChild);
    }
}

function spinner() {
    limpiarHtml(resultado);

    const divSpinner = document.createElement('DIV');
    divSpinner.classList.add('sk-fading-circle');
    
    divSpinner.innerHTML = `
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
    `
    resultado.appendChild(divSpinner);
}