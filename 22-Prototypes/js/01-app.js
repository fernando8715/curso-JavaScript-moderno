function Cliente (nombre, valor){
    this.nombre = nombre;
    this.valor = valor;
};

// si no se va a hacer referencia a this se puede utilizar el array function
// con la function tradicional hace referencia al objeto instanciado y no al objeto global como array function 
Cliente.prototype.getInfo = function (){
    console.log(`nombre:${this.nombre} - saldo:${this.valor}`);
};

function Persona(nombre, valor, telefono){
    Cliente.call(this, nombre, valor); // funcion para heredar propiedades de otro objeto
    this.telefono;
}

// para heredar los metodos del Cliente se debe escribir este codigo antes de instanciarla
Persona.prototype = Object.create(Cliente.prototype);


const c1 = new Cliente('fernando', 5000);
c1.getInfo();

const p1 = new Persona('Juan', 4000, '3502210098');
p1.getInfo();


