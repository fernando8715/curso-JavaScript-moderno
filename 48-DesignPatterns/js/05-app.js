// module patron, este patron es para organizar codigo, este patron sirve para proteger las variables 

// modulo en ES6
const mostrarCliente = nombre => {
    console.log(nombre);
}

export default mostrarCliente;

// modulo antes de ES&
const modulo1 = (function(){
    const nombre = 'Juan';

    function hola(){
        console.log('hola');
    }

    return {
        nombre,
        hola
    }
})();