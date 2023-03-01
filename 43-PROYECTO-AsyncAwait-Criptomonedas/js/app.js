const formulario = document.querySelector('#formulario');
const selectCripto = document.querySelector('#criptomonedas');
const selectMoneda = document.querySelector('#moneda');
const resultado = document.querySelector('#resultado');

const objBusqueda = {
    moneda: '',
    criptomoneda: ''
}

// la promesa se va a resolver cuando las promesas se descarguen correctamente
const obtenerDatos = criptomonedas => new Promise ( resolve => {
    resolve(criptomonedas);
});

document.addEventListener('DOMContentLoaded', ()=>{
    
    consultarApi();

    selectCripto.addEventListener('change', leerDatos);
    selectMoneda.addEventListener('change', leerDatos);
    formulario.addEventListener('submit', enviarInfo);

})

async function consultarApi() {

    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

    try {
      const respuesta = await fetch(url);
      const datos = await respuesta.json();
      const criptomoneda = await obtenerDatos(datos.Data);
      selectorCripto(criptomoneda);
    } catch (error) {
        console.log(error);
    }
}

function selectorCripto(criptomonedas) {
    criptomonedas.forEach(cripto => {
        const {FullName, Name} = cripto.CoinInfo;
        const option = document.createElement('option');
        option.value = Name;
        option.textContent = FullName;

        selectCripto.appendChild(option);
    })
}

function enviarInfo(e) {
    e.preventDefault();
    const {moneda, criptomoneda} = objBusqueda;

    if(moneda === '' || criptomoneda === ''){
        mostrarAlerta('Ambos campos son obligatorios');
        return;
    }
    convertir();
}

function leerDatos(e) {
    objBusqueda[e.target.name] = e.target.value;
}

function mostrarAlerta(mensaje) {
    const existe = document.querySelector('.error');

    if(!existe){
        const alerta = document.createElement('P');
        alerta.classList.add('error');
        alerta.textContent = mensaje
    
        resultado.appendChild(alerta);
    
        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }

}

async function convertir() {
    const {moneda, criptomoneda} = objBusqueda;

    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`

    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        mostrarDatos(datos.DISPLAY[criptomoneda][moneda])
    } catch (error) {
        console.log(error);
    }
}

function mostrarDatos(datos) {
    limpiarHtml(resultado);

    const {PRICE, OPENDAY, HIGHDAY, LOWDAY} = datos

    const precio = document.createElement('P');
    precio.classList.add('precio');
    precio.innerHTML = `El precio es: <span>${PRICE}</span>`

    const openDay = document.createElement('P');
    openDay.innerHTML = `El precio de apertura es: <span>${OPENDAY}</span>`;

    const highPrice = document.createElement('P');
    highPrice.innerHTML = `Precio mas alto del día: <span>${HIGHDAY}</span>` 

    const lowPrice = document.createElement('P');
    lowPrice.innerHTML = `El precio más bajo del día: <span>${LOWDAY}</span>`

    resultado.appendChild(precio);
    resultado.appendChild(openDay);
    resultado.appendChild(highPrice);
    resultado.appendChild(lowPrice);
}

function limpiarHtml(selector) {
    while(selector.firstChild){
        selector.removeChild(selector.firstChild)
    }
}