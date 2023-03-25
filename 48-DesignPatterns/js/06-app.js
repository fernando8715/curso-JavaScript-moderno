// pattern mixing, permite agregar funciones a las clases utilizando el Object.assign
// donde se envia a la funcion el nombre de la clase.prototype, seguido del objeto que tiene las funciones 

class Persona {
    constructor(nombre, email){
        this.nombre = nombre;
        this.email = email;
    }
}

class Cliente {
    constructor(nombre, email){
        this.nombre = nombre;
        this.email = email;
    }
}

const funcionesPersona = {
    mostrarInfo(){
        console.log(`nombre: ${this.nombre} email: ${this.email}`);
    },

    mostrarNombre(){
        console.log(`nombre: ${this.nombre}`);
    },
}

Object.assign(Persona.prototype, funcionesPersona);
Object.assign(Cliente.prototype, funcionesPersona);

const persona1 = new Persona('Fernando', 'fer@h.com');
persona1.mostrarInfo();

const cliente1 = new Cliente('Franco', 'Frank@h.com');
cliente1.mostrarNombre();