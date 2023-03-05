// separar los datos de las funciones

const carrito = [
    { nombre: 'Monitor 20 Pulgadas', precio: 500},
    { nombre: 'Televisión 50 Pulgadas', precio: 700},
    { nombre: 'Tablet', precio: 300},
    { nombre: 'Audifonos', precio: 200},
    { nombre: 'Teclado', precio: 50},
    { nombre: 'Celular', precio: 500},
    { nombre: 'Bocinas', precio: 300},
    { nombre: 'Laptop', precio: 800},
];

const mayor400 = p => p.precio > 400;

const resultadoFilter = carrito.filter(mayor400);
console.log(resultadoFilter);

const obtenerNombre = p => p.nombre;

const resultadoMap = carrito.map(obtenerNombre);
console.log(resultadoMap);

