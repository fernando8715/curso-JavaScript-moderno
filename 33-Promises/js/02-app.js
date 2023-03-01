// promises

const aplicarDescuento = new Promise( (resolve, reject)=>{
    const descuento = true;

    if(descuento){
        resolve('Descuento aplicado');
    }else{
        reject('Ocurrio un error');
    }
});

aplicarDescuento
    .then(result => mostrarResultado(`${result} con exito`))
    .catch(error => console.log(error));

const mostrarResultado = (mensaje)=>{console.log(mensaje);}

