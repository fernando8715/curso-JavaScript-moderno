// implicit binding, se usa this para referirse a un dato en un objeto, 
// de esta forma puede ser usado en alguna funcion dentro de ese objeto

const usuario = {
    nombre: 'Fernando',
    cargo: 'Desarrollador',
    mostrarNombre(){
        console.log(`Nombre: ${this.nombre}`);
    }
}

usuario.mostrarNombre();