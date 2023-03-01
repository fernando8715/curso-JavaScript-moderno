// promises

const paises = [];

const nuevoPais = (pais)=> new Promise(resolve => {
    setTimeout(() => {
        paises.push(pais); 
        resolve(`${pais} agregado correctamente`)
    }, 2000);
});

nuevoPais('Alemania')
    .then(resultado => {
        console.log(resultado);
        console.log(paises);
        return nuevoPais('Francia');
    })
    .then(resultado=>{
        console.log(resultado);
        console.log(paises);
        return nuevoPais('Colombia')
    })
    .then(resultado => {
        console.log(resultado);
        console.log(paises);
    })


const comidas = [];

const nuevaComida = (comida)=>{
    comidas.push(comida);
    return new Promise( (resolve, reject)=>{
        setTimeout(() => {
            if(comidas.length>0){
                resolve('se agrego correctamente', comidas);
            }else{
                reject('Ocurrio un error')
            }
        }, 4000);
    })
}

nuevaComida('Carne')
    .then(resultado => console.log(resultado))
    .catch(error => console.log(error));
