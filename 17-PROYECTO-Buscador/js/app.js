const marca         = document.querySelector('#marca');
const year          = document.querySelector('#year');
const precioMin     = document.querySelector('#minimo');
const precioMax     = document.querySelector('#maximo');
const puertas       = document.querySelector('#puertas');
const transmision   = document.querySelector('#transmision');
const color         = document.querySelector('#color');


const resultado     = document.querySelector('#resultado');
const yearMax       = new Date().getFullYear();
const yearMin       = yearMax - 10;

const datosBusqueda = {
    marca: '',
    year: '',
    precioMin: '',
    precioMax: '',
    puertas: '',
    transmision: '',
    color: '',
};


const mostrarAutos = (autos)=>{
    limpiarHtml();

    autos.forEach(auto => {
        
        const {marca, modelo, year, precio, puertas, color, transmision} = auto;
        const autosHtml = document.createElement('P')
        
        autosHtml.textContent = `
            ${marca} - ${modelo} - año ${year} - transmisión ${transmision} - ${puertas} puertas - color ${color}  - USD ${precio} 
        `
        resultado.appendChild(autosHtml);
    });
};

const limpiarHtml = () =>{
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    };
};

const sinResultados = () => {

    limpiarHtml();

    const div = document.createElement('div');
    div.classList.add('alerta', 'error');
    div.textContent = 'No se encontro resultados establecidos, intente con otros';
    resultado.appendChild(div);
}


const opcionYear = () => {
    for(let i=yearMax; i>=yearMin; i--){
        const opcion = document.createElement('option');
        opcion.textContent = i;
        opcion.value = i;
        year.appendChild(opcion);
    }
};

const opcionMarca = ()=> {
    const setMarca = new Set();
    const marcas = [];
    
    for(let auto of autos){
        setMarca.add(auto.marca);
    };

    for(let set of setMarca){
        marcas.push(set);
    };

    marcas.sort();

    for(let mark of marcas){
        const marcaHtml = document.createElement('option');
        marcaHtml.value = mark;
        marcaHtml.textContent = mark;
        marca.appendChild(marcaHtml);            
    };
};

const filtrarAuto = ()=> {
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarPrecioMin).filter(filtrarPrecioMax).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);
    return (resultado.length) ? mostrarAutos(resultado) : sinResultados();
};

const filtrarMarca = (auto)=>{
    const {marca} = datosBusqueda;
    return (marca) ? auto.marca === marca
                : auto;
};

const filtrarYear = (auto) => {
    const {year} = datosBusqueda;
    return (year) ? auto.year === year : auto;
};

const filtrarPrecioMin = (auto)=>{
    const {precioMin} = datosBusqueda;
    return (precioMin) ? auto.precio >= precioMin : auto;
};

const filtrarPrecioMax = (auto)=>{
    const {precioMax} = datosBusqueda;
    return (precioMax) ? auto.precio <= precioMax : auto;
};

const filtrarPuertas = (auto) => {
    const {puertas} = datosBusqueda;
    return (puertas) ? auto.puertas === puertas : auto;
};

const filtrarTransmision = (auto) => {
    const {transmision} = datosBusqueda;
    return (transmision) ? auto.transmision === transmision : auto;
};

const filtrarColor = (auto) => {
    const {color} = datosBusqueda;
    return (color) ? auto.color === color : auto;
} 





document.addEventListener('DOMContentLoaded', ()=>{

    mostrarAutos(autos);
    opcionMarca();
    opcionYear();
});



marca.addEventListener('change', e=>{
    datosBusqueda.marca = e.target.value;
    filtrarAuto();
});      

year.addEventListener('change', e=>{
    datosBusqueda.year = parseInt(e.target.value);
    filtrarAuto();
});
       
precioMin.addEventListener('change', e=>{
    datosBusqueda.precioMin = parseInt(e.target.value);
    filtrarAuto();
});  

precioMax.addEventListener('change', e=>{
    datosBusqueda.precioMax = parseInt(e.target.value);
    filtrarAuto();
});  

puertas.addEventListener('change', e=>{
    datosBusqueda.puertas = parseInt(e.target.value);
    filtrarAuto();
});    

transmision.addEventListener('change', e=>{
    datosBusqueda.transmision = e.target.value;
    filtrarAuto();
});

color.addEventListener('change', e=>{
    datosBusqueda.color = e.target.value;
    filtrarAuto();
});      


