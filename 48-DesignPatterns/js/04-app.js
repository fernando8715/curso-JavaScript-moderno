// patron Factory, permite crear objetos basados en cierta condicion, algunos se pueden reutilizar

class InputHTML {
    constructor(tipo, nombre){
        this.tipo = tipo;
        this.nombre = nombre;
    }

    crearInput(){
        return `<input type="${this.tipo}" name="${this.nombre}" id="${this.nombre}">`;
    }
}

class factoryHTML {
    crearElemento(tipo, nombre){
        switch(tipo){
            case 'text': 
                return new InputHTML(tipo, nombre); 
            case 'email':
                return new InputHTML(tipo, nombre);
            default:
                return;
        } 

    }
}

const elemento = new factoryHTML();
const inputText = elemento.crearElemento('text', 'nombreCliente');
const inputEmail = elemento.crearElemento('email', 'emailCliente');

console.log(inputText.crearInput());
console.log(inputEmail.crearInput());