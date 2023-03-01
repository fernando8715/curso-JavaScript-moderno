function obtenerClientes() {
    return new Promise ( (resolve, reject) => {
        const error = false;

        setTimeout(() => {
            if(!error){
                resolve('El listado de clientes se descargo correctamente');
            } else {
                reject('Ocurrio un error de conexión')
            }
        }, 5000);
    })
}

const ejecutar = async ()=> {

    try {
        console.log( 1 + 1);
        const respuesta = await obtenerClientes();
        console.log(respuesta);
        console.log( 2 + 2);
    } catch (error) {
        console.log(error);
    }
    
}

ejecutar();
