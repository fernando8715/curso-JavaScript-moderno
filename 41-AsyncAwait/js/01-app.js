// El await se utiliza con funciones asincronas, y la aplicación se detiene hasta obtener 
// la respuesta de la promesa antes de poder continuar con la siguiente linea de codigo.

function obtenerClientes() {
    return new Promise ( (resolve, reject) => {
        const error = false;

        setTimeout(() => {
            if(!error){
                resolve('El listado de clientes se descargo correctamente');
            }else{
                reject('Error en la conexión')
            }
        }, 5000);
    })
}

async function ejecutar() {
    try {
        console.log(1 + 1);
        const respuesta = await obtenerClientes();
        console.log(2 + 2);
        console.log(respuesta);
    } catch (error) {
        console.log(error);
    }
}    

ejecutar();