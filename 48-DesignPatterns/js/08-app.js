// patron Mediador o intermediario, es un patron que se comunica con diferentes objetos a la vez.
// el mediador va a requerir de diferentes objetor para poder comunicarlos

function Vendedor(nombre) {
    this.nombre = nombre;
    this.sala = null
}

Vendedor.prototype = {
    oferta: (articulo, precio)=> {
        console.log(`Tenemos el siguiente articulo ${articulo} y el precio inicial es $${precio}`);
    },
    vendido: comprador => {
        console.log(`Articulo vendido a ${comprador.nombre}`);
    }
}

function Comprador(nombre) {
    this.nombre = nombre;
    this.sala = null;
}

Comprador.prototype = {
    oferta: (comprador, precio)=>{
        console.log(`${comprador.nombre}: $${precio}`);
    }
}

function Subasta(){
    const compradores = {};

    return {
        registrar: usuario => {
            compradores[usuario.nombre] = usuario;
            usuario.sala = this;
        }
    }
}


const vendedor = new Vendedor('Vendedor de autos');
const juan = new Comprador('Juan');
const pedro = new Comprador('Pedro');
const subasta = new Subasta();

subasta.registrar(vendedor);
subasta.registrar(juan);
subasta.registrar(pedro);

vendedor.oferta('BMW modelo Z3', 300);
juan.oferta(juan, 320);
pedro.oferta(pedro, 335);
vendedor.vendido(juan);





