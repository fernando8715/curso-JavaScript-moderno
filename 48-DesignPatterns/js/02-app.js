// constructor pattern: se utiliza una clase base para que las demás hereden de esta.
/* en JavaScript se crea la clase padre y se hereda de ella. se utilizan las palabras reservadas
    extends y super
*/

class Persona {
    constructor(nombre, email){
        this.nombre = nombre;
        this.email = email;
    }
}

class Cliente extends Persona {
    constructor(nombre, email, empresa){
        super(nombre, email);
        this.empresa = empresa;
    }
}

const cliente = new Cliente('Fernando', 'fer@hot.com', 'Ejército');
console.log(cliente);