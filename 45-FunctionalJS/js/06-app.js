// composition, es tener varias funciones e ir implementandola en los objetos que se requieran.
// es una alternativa a las clases

const obtenerNombre = info => ({
    mostrarNombre(){
        console.log(`Nombre: ${info.nombre}`);
    }
});

const guardarEmail = info => ({
    agregarEmail(email){
        console.log(`Guardando email en ${info.nombre}`);
        info.email = email;
    },
});

const obtenerEmpresa = info => ({
    mostrarEmpresa(){
        console.log(`Empresa: ${info.empresa}`);
    }
});

const obtenerPuesto = info => ({
    mostrarPuesto(){
        console.log(`Puesto: ${info.puesto}`);
    }
});



function Cliente(nombre, email, empresa){
    info = {
        nombre,
        email,
        empresa
    }

    return Object.assign(
        info,
        obtenerNombre(info),
        guardarEmail(info),
        obtenerEmpresa(info)
    )
}

function Empleado(nombre, email, puesto){
    info = {
        nombre,
        email,
        puesto
    }

    return Object.assign(
        info,
        obtenerNombre(info),
        guardarEmail(info),
        obtenerPuesto(info)
    );
}


const cliente1 = Cliente('Fernando', 'null', 'Desarrollando');
cliente1.mostrarNombre();
cliente1.agregarEmail('fer@h.com');
cliente1.mostrarEmpresa();

console.log('======================');

const empleado1 = Empleado('Juan', 'null', 'Desarrollador');
empleado1.mostrarNombre();
empleado1.agregarEmail('juan@h.com');
empleado1.mostrarPuesto();