// funciones como argumentos.

const sumar = (a, b)=> a + b;
const multiplicar = (a, b)=> a * b;

const sumaroMultiplicar = fn => fn(5, 4);

const resultado1 = sumaroMultiplicar(sumar);
console.log(`La suma es: ${resultado1}`);

const resultado2 = sumaroMultiplicar(multiplicar);
console.log(`La multiplicación es: ${resultado2}`);