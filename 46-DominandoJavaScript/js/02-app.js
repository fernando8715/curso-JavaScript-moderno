// explicit binding, utiliza los metodos call, apply, bind para referirse a un dato en un objeto

function persona(el1, el2) {
    console.log(`nombre: ${this.nombre} y escucho ${el1} y ${el2}`);
}

const informacion = {
    nombre: 'Fernando'
}

const musicaFavorita = ['rock', 'Latino'];

// uso de CALL
persona.call(informacion, musicaFavorita[0], musicaFavorita[1]);

// uso de APPLY, recibe el objeto de donde se hara referencia al this y un arreglo 
// sin necesidad de pasar elemento por elemento
persona.apply(informacion, musicaFavorita);

// uso de bind
