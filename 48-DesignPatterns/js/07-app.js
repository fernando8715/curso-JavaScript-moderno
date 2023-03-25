// patron Namespace, este patron de diseño se utiliza para la organización de codigo. Ayuda a evitar colición de nombres en el scope global de JS. es util en aplicaciones que tienden a crecer bastante y la idea de este patron es crear un objeto global y poder agregar todas las funciones dentro de el, en lugar de crear multiples funciones y objetos que se puedan acceder de forma global.

// siempre inicia con un objeto global, que puede estar vacio para poco a poco irle agregando funciones, arreglos, objetos, por eso es llamado namespace.
const restaurantApp = {}

// definiendo una nueva propiedad en el objeto global
restaurantApp.platillos = [
    {
        plato: 'pizza',
        precio: 20
    },
    {
        plato: 'hamburguer',
        precio: 30
    },
    {
        plato: 'hot dog',
        precio: 20
    }
]

console.log(restaurantApp); // podemos verificar que se añadio el arreglo platillos al objeto global

// agregando un objeto que va a contener funciones
restaurantApp.funciones = {
    mostrarMenu: (platillos)=> {
        console.log('Bienvenidos a nuestro menu');
        platillos.forEach((platillo, index) => {
            console.log(`${index} : ${platillo.plato} $${platillo.precio}`);
        })
    },
    ordenar: (id)=>{
        console.log(`Tu pedido: ${restaurantApp.platillos[id].plato} se esta preparando`);
    },
    agregarPlatillo: (plato, precio)=>{
        const nuevo = {
            plato, 
            precio
        };
        restaurantApp.platillos.push(nuevo);
    }
}

restaurantApp.funciones.ordenar(1);
restaurantApp.funciones.agregarPlatillo('patacon', 50);

// puede que los nombres de las funciones esten ya definidas en otro lugar del proyecto, pero al estar dentro del scope y utilizar el namespace va a evitar que choquen. puedes definir varios namespace para diferentes objetos.

const {platillos} = restaurantApp; // desestructuración

// para llamar la funcion de mostrarMenu se utiliza la notación de punto
restaurantApp.funciones.mostrarMenu(platillos); // dificilmente va a chocar con otra funcion que se llame igual.