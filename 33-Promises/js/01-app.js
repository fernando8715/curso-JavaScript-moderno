// Callbacks

const paises = ['Francia', 'Colombia', 'Brazil'];

const nuevoPais = (pais, callback)=> {
    setTimeout(()=>{
        paises.push(pais);
        callback();
    }, 2000);
}


const mostrarResultado = ()=>{ 
    setTimeout( ()=>{
        paises.forEach(pais => console.log(pais));
    }, 1000);
}

mostrarResultado();
nuevoPais('Argentina', mostrarResultado);