class Seguro {
    constructor(marca, year, tipo){
        this.marca = marca;
        this.year = year;
        this.tipo = tipo;
    }

    calcular(){
        const base = 2000;
        let total;

        /*
            Americano 1.15%
            Asiatico 1.05%
            Europeo 1.30%
        */

        switch (this.marca) {
            case '1':
                total = base + (base*0.0115); // 2023
                break;
        
            case '2':
                total = base + (base*0.0105);
                break;
                
            case '3':
                total = base + (base*0.013);
            break;
        
            default:
                break;
        }

        // antiguedad del vehiculo 3% descuento por año
        const old = new Date().getFullYear() - this.year;
        total -= (old*0.03*total); //
        
        // tipo seguro: basico +10% y completo +30%
        if(this.tipo === 'basico'){
            total += total*0.1
        }else{
            total += total*0.3
        }
        return total;
    }

};

class UI {
    constructor(){};
    
    loadYear (){
        
        const yearMax = new Date().getFullYear();
        const yearMin = yearMax - 10;
        for(let i=yearMax; i>=yearMin; i--){
            const option = document.createElement('option');
            option.textContent = i;
            option.value = i;
            selectYear.appendChild(option);
        }
    }

    mensaje(mensaje,tipo){
        const div = document.createElement('div');
        div.textContent = mensaje;
        if(tipo === 'error'){
            div.classList.add('error');
        }else{
            div.classList.add('correcto');
        }
        div.classList.add('mt-10');
        
        formulario.insertBefore(div, document.querySelector('#resultado'));
        
        setTimeout(()=>{
            div.remove();
        }, 2000)
    }

    mostrarCotizacion(seguro, total){
        const spinner = document.querySelector('#cargando');
        const resultado = document.querySelector('#resultado');

        const div = document.createElement('div');
        const {marca, year, tipo} = seguro;
        let textoMarca;

        switch (marca) {
            case '1':
                textoMarca = 'Americano'
                break;
            case '2':
                textoMarca = 'Asiatico'
                break;
            case '3':
                textoMarca = 'Europeo'
                break;
        
            default:
                break;
        }
        div.innerHTML = `
            <p class="font-bold">Resultado</p>
            <p class="font-bold">Marca:<span class="font-normal"> ${textoMarca}</span></p>
            <p class="font-bold">Año:<span class="font-normal"> ${year}</span></p>
            <p class="font-bold">Tipo:<span class="font-normal capitalize"> ${tipo}</span></p>
            <p class="font-bold">Total:<span class="font-normal"> $ ${total}</span></p>
        `
        
        spinner.classList.remove('hidden');
        let btn = document.querySelector('button');
        btn.disabled = true;
        
        
        setTimeout(() => {
            resultado.appendChild(div);
            spinner.classList.add('hidden');
            btn.disabled = false;    
        }, 2000);
    };

};


const formulario = document.querySelector('#cotizar-seguro');
const selectYear = document.querySelector('#year');


const ui = new UI();


const cotizacion = (e)=>{
    
    e.preventDefault();
    const marca = document.querySelector('#marca').value;
    const year = document.querySelector('#year').value;
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    
    if(marca==='' || year===''){
        ui.mensaje('Todos los campos son obligatorios', 'error')
    }else{
        ui.mensaje('Cargando')
    }

    const seguro = new Seguro(marca, year, tipo);
    const total = seguro.calcular();
    
    ui.mostrarCotizacion(seguro, total);
    
    const resultado = document.querySelector('#resultado div');
    if(resultado !== null){
        resultado.remove();
    }
    
}



const eventos = ()=>{
    
    document.addEventListener('DOMContentLoaded', ()=>{
        ui.loadYear();
    });
    
    formulario.addEventListener('submit', cotizacion);
    

}

eventos();


