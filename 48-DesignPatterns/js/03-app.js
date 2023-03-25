// patron singleton: su caracteristica principal es que solo hay una sola instancia de la clase
// singleton no va a permitir crear multiples objetos de la misma clase

let instancia = null;

class Persona {
    constructor(nombre, email){
        if(!instancia){
            this.nombre = nombre;
            this.email = email;
            instancia = this;
        }else {
            return instancia;
        }
    }
}

const persona = new Persona('Fernando', 'fer@hot.com');
console.log(persona);

const persona2 = new Persona('Karen', 'karen@hot.com');
console.log(persona2);

// al trtar de crear una nueva instancia no va adejar y va a devolver la primera instancia.
// previniendo que se creen multiples instancias 
