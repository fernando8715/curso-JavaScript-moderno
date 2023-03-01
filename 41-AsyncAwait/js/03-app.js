function obtenerClientes() {
    return new Promise ( resolve => {
        console.log('Descargando clientes');
        setTimeout(() => {
            resolve('Clientes descargados correctamente') 
        }, 5000);
    })
};


function obtenerPedidos() {
    return new Promise ( resolve => {
        console.log('Descargando pedidos');
        setTimeout(() => {
            resolve('Pedidos descargados correctamente') 
        }, 5000);
    })
};

// Promise.all recibe como parametro un arreglo de promesas para ser consultadas a la vez.
const app = async ()=> {
    try {
        const respuesta = await Promise.all([obtenerClientes(), obtenerPedidos()]);
        console.log(respuesta);
        console.log(respuesta[0]);
        console.log(respuesta[1]);
    } catch (error){
        console.log(error);
    }
};


app();