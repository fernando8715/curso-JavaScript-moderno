// Closure, es una función que encapsula una serie de variables que son accedidas si son devueltas con return

const obtenerCliente = (()=>{
    const nombre = 'Fernando';

    function mostrarNombre(){
        console.log(nombre);
    }

    return mostrarNombre;
})()

const cliente = obtenerCliente;
cliente();
