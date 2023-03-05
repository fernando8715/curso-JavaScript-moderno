// funciones puras: son las que reciben un valor y devuelven un valor

const numero = 20;

const duplicar = num => num * 2;

const resultado = duplicar(numero);
console.log(`duplicado: ${resultado}`);

// la constante numero no cambia, siguiendo los conceptos de programación funcional