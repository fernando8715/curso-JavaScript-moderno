const url = 'https://picsum.photos/list';


const obtenerDatos = async ()=> {
    try {
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        console.log(resultado);
    } catch (error){
        console.log('Ocurrio un error de conexión');
    }
}


document.addEventListener('DOMContentLoaded', obtenerDatos);
