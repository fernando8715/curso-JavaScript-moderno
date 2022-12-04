// referencias
const formulario = document.querySelector('#agregar-gasto');
const listaGastos = document.querySelector('#gastos ul');


// clases

class Presupuesto {
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }

    nuevoGasto(gasto){
        this.gastos = [...this.gastos, gasto];
        this.calcularRestante();
    }

    calcularRestante(){
        const gastado = this.gastos.reduce((total, gasto)=> total + gasto.cantidad, 0 );
        this.restante = this.presupuesto - gastado;
    }

    eliminarGasto(id){
        this.gastos = this.gastos.filter(gasto => gasto.id !== id);
        this.calcularRestante();
    }

};


class UI {

    insertarPresupuesto(cantidad){
        const {presupuesto, restante} = cantidad;
        
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;
    }

    imprimirAlerta(mensaje, tipo){
        const divAlert = document.createElement('div');
        divAlert.classList.add('text-center', 'alert');

        if(tipo === 'error'){
            divAlert.classList.add('alert-danger')
        }else{
            divAlert.classList.add('alert-success')
        };

        divAlert.textContent = mensaje;
        document.querySelector('.primario').insertBefore(divAlert, formulario);
        let btn = formulario.querySelector('button[type="submit"]');
        btn.disabled = true;
        
        setTimeout(() => {
            formulario.reset();
            divAlert.remove();
            btn.disabled = false;
        }, 1000);
    };

    cargarGastoHtml(gastos){
        
        this.limpiarHtml();

        gastos.forEach(elem => {
            const {gasto, cantidad, id} = elem;
            
            const liGasto = document.createElement('li');
            liGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
            liGasto.dataset.id = id;

            liGasto.innerHTML = `${gasto} <span class="badge badge-primary badge-pill ">$ ${cantidad}</span>`

            const btn = document.createElement('button');
            btn.classList.add('btn', 'btn-danger', 'borrar-gasto');
            btn.innerHTML = 'Borrar &times;'

            btn.onclick = ()=>{
                eliminarGasto(id);
            }
            liGasto.appendChild(btn);
            listaGastos.appendChild(liGasto);
        });    
    }

    actualizarRestante(restante){
        document.querySelector('#restante').textContent = restante;
    }

    comprobarPresupuesto(presupuestoObj){

        const restanteDiv = document.querySelector('.restante');
        const btn = formulario.querySelector('button[type="submit"]');

        const {presupuesto, restante} = presupuestoObj;
        if( (presupuesto/4) > restante){
            restanteDiv.classList.remove('alert-success', 'alert-warning');
            restanteDiv.classList.add('alert-danger');
        }else if( (presupuesto/2) > restante){
            restanteDiv.classList.remove('alert-success');
            restanteDiv.classList.add('alert-warning');
        }else{
            restanteDiv.classList.remove('alert-danger', 'alert-warning');
            restanteDiv.classList.add('alert-success');
        }
        
        if(restante<=0){
            this.imprimirAlerta('Excediste tu presupuesto', 'error');
            setTimeout(() => {
                btn.disabled = true;
            }, 1000);
        }else{
            btn.disabled = false;
        }
    }
    
    limpiarHtml(){
        while(listaGastos.firstChild){
            listaGastos.removeChild(listaGastos.firstChild);
        }
    }
    
};

const ui = new UI();
let presupuesto;


// funciones
const preguntarPresupuesto = ()=>{
    const presupuestoUsuario = prompt('Ingrese su presupuesto');

    if(presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario)|| presupuestoUsuario<=0){
        window.location.reload();
    };

    presupuesto = new Presupuesto(presupuestoUsuario);
    ui.insertarPresupuesto(presupuesto);
};

const agregarGasto = (e)=>{
    e.preventDefault();

    const gasto = document.querySelector('#gasto').value;
    const cantidad = Number(document.querySelector('#cantidad').value);
    
    if(gasto === '' || cantidad === ''){
        ui.imprimirAlerta('ambos campos son obligatorios', 'error');
        return;
    }else if(cantidad <=0 || isNaN(cantidad)){
        ui.imprimirAlerta('cantidad invalida', 'error');
        return;
    };
    
    const objGasto = {gasto, cantidad, id:Date.now()};
    
    presupuesto.nuevoGasto(objGasto);
    
    ui.imprimirAlerta('Gasto agregado');

    const {gastos, restante} = presupuesto;

    ui.cargarGastoHtml(gastos);

    ui.actualizarRestante(restante);

    ui.comprobarPresupuesto(presupuesto);
};


const eliminarGasto = (id)=>{
    presupuesto.eliminarGasto(id);

    const {gastos, restante} = presupuesto;
    ui.cargarGastoHtml(gastos);
    ui.actualizarRestante(restante);
    ui.comprobarPresupuesto(presupuesto);

    
}




// eventos
const eventos = ()=>{
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
    formulario.addEventListener('submit', agregarGasto);
    
};



eventos();


// para ingresar el data-id en el html, se utiliza el dataset que agrega el data, luego .id para agregarle el -id y le pasamos el id del objeto

// consultar la diferencia entre classList y className

// hacer referencia a un boton con type="submit"   ejm. formulario.querySelector('button [type="submit"]').disabled = true;