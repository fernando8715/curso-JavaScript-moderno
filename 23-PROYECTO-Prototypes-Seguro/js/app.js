function Seguro (marca, year, tipo){
    this.marca = marca;
    this.year = year
    this.tipo = tipo;
};

Seguro.prototype.cotizar = function(){
    /*
        1. americano; aumenta valor 1.15
        2. asiatico; aumenta 1.05
        3. europeo; aumenta en 1.35
    */
    let base = 2000;
    let cantidad;

   switch(this.marca){
        case '1': 
            cantidad = base + (base*0.0115);
            break; 
        case '2': 
            cantidad = base + (base*0.0105);
            break;
        case '3': 
            cantidad = base + (base*0.0135);
            break;
        default:
            break;
   }

   // Descuento del 3% por año.
   let diferencia = new Date().getFullYear()-this.year;

   cantidad -= ((diferencia*0.03)*cantidad)/100;
   
  /*
    basico aumenta en 30%;
    completo aumenta en 50%;
  */
   if(this.tipo === 'basico'){
        cantidad += cantidad * 0.3;
    }else{
        cantidad += cantidad * 0.5;
   }

   return parseInt(cantidad);
};


function UI (){};

UI.prototype.optionYear = ()=>{
    const max = new Date().getFullYear();
    const min = max -20;
    
    const optYear = document.querySelector('#year');

    for(let i=max; i>=min; i--){
        let year = document.createElement('option');
        year.value = i;
        year.textContent = i;
        optYear.appendChild(year);
    }
};


UI.prototype.mostrarmensaje = (mensaje, tipo)=>{
    const div = document.createElement('div');
    div.textContent = mensaje;
    if(tipo === 'error'){
        div.classList.add('error');
    }else {
        div.classList.add('correcto');
    };

    div.classList.add('mensaje', 'mt-10');

    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado')); 

    setTimeout( ()=>{
        div.remove();
    },1500);

};

UI.prototype.mostrarResultado = (seguro, total)=>{
    const resultado = document.querySelector('#resultado');
    const spinner = document.querySelector('#cargando');
    
    const div = document.createElement('div');
    const {marca, year, tipo} = seguro;
    let textoMarca;

    switch(marca){
        case '1':
            textoMarca= 'Americano';
            break; 
        case '2':
            textoMarca= 'Asiatico';
            break; 
        case '3':
            textoMarca= 'Europeo';
            break;
        default:
            break;
    }
    
    div.innerHTML = `
        <p class="header">Resultado</p>
        <p class="font-bold">Marca:<span class="font-normal"> ${textoMarca}</span></p>  
        <p class="font-bold">Año:<span class="font-normal"> ${year}</span></p>  
        <p class="font-bold">Tipo:<span class="font-normal capitalize"> ${tipo}</span></p>  
        <p class="font-bold">Total:<span class="font-normal"> ${total}</span></p>  
    `
    spinner.classList.remove('hidden');
    
    setTimeout(() => {
        spinner.classList.add('hidden');
        resultado.appendChild(div);
    }, 1500);

}



const ui = new UI();

document.addEventListener('DOMContentLoaded', ()=>{
    ui.optionYear();
});



function eventos (){   
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);
}
    
    function cotizarSeguro(e){
        e.preventDefault();
        
        const marca = document.querySelector('#marca').value;
        
        const year = document.querySelector('#year').value;
        
        const tipo = document.querySelector('input[name=tipo]:checked').value;

        if(marca === '' || year === ''){
            ui.mostrarmensaje('Todos los campos son obligatorios', 'error');
        }else{
            const seguro = new Seguro(marca, year, tipo);
            const total = seguro.cotizar();
            ui.mostrarmensaje('cotizando', 'correcto');
            
            const resultado = document.querySelector('#resultado div');
            if(resultado !== null){
                resultado.remove();
            }
            ui.mostrarResultado(seguro, total);
        }
    
    };

eventos();
