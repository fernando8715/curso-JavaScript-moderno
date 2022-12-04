const formulario = document.querySelector('#agregar-gasto');
const listaGastos = document.querySelector('#gastos ul');

class Budget {
    constructor(presupuesto){
        this.presupuesto = presupuesto;
        this.restante = presupuesto;
        this.gastos = [];
    }

    newExpense(gasto){
        this.gastos = [...this.gastos, gasto];
        this.calculateRemaind();
    }

    calculateRemaind(){
        const gastado = this.gastos.reduce((total, gasto)=> total + gasto.amount, 0);
        this.restante = this.presupuesto - gastado;
    }

    deleteSpent(id){
        this.gastos = this.gastos.filter(gasto=>gasto.id !== id);
        this.calculateRemaind();
    }
};

class UI {

    loadBudget(budget){
        const {presupuesto, restante} = budget;

        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;
    }

    showError(mensaje, tipo){ 
        const divError = document.createElement('div');
        divError.classList.add('text-center', 'alert')
        
        if(tipo === 'error'){
            divError.classList.add('alert-danger');
        }else{
            divError.classList.add('alert-success');
        };

        divError.textContent = mensaje;
        document.querySelector('.primario').insertBefore(divError, formulario);

        setTimeout(() => {
           divError.remove(); 
        }, 1000);
    }

    loadHtml(gastos){
        this.cleanHtml();

        gastos.forEach(gasto => {
            const{spent, amount, id} = gasto;
            const lista = document.createElement('li');
            lista.className = ('list-group-item d-flex justify-content-between align-items-center')
            lista.dataset.id = id;
            lista.innerHTML = `${spent} <span class"badge badge-primary badge-pill">$ ${amount}</span>`
            
            const btn = document.createElement('button');
            btn.classList.add('btn', 'btn-danger', 'borrar-gasto');
            btn.innerHTML = `&times`;
            btn.onclick = ()=>{
                deleteSpent(id);
            }
            
            lista.appendChild(btn);
            listaGastos.appendChild(lista);
        });
    }

    cleanHtml(){
        while(listaGastos.firstChild){
            listaGastos.removeChild(listaGastos.firstChild);
        }
    }

    updateRemaind(restante){
        document.querySelector('#restante').textContent = restante;
    }
}


let newBudget;
let newUI = new UI();


// funciones

function askBudget(){
    const budget = prompt('ingrese su presupuesto').trim();

    if(budget === ''|| isNaN(budget) || budget<=0 || budget === null){
        window.location.reload();
        return;
    };

    newBudget = new Budget(budget);
    newUI.loadBudget(newBudget);
};


function enterExpense(e){ // nuevo gasto
    e.preventDefault();

    const spent = document.querySelector('#gasto').value;
    const amount = Number(document.querySelector('#cantidad').value);

    if(spent==='' || amount<= 0 || isNaN(amount)){
        newUI.showError('ambos campos son obligatorios', 'error');
        return;
    };

    const spentObj = { spent, amount, id:Date.now()};
    newBudget.newExpense(spentObj);
    newUI.showError('Gastos guardado');
    formulario.reset();

    const{presupuesto, restante, gastos} = newBudget;

    newUI.loadHtml(gastos);

    newUI.updateRemaind(restante);
    const remainder = newBudget.calculateRemaind();
    
}

function deleteSpent(id){
    newBudget.deleteSpent(id);

    const{presupuesto, restante,gastos} = newBudget;
    newUI.loadHtml(gastos);
    newUI.updateRemaind(restante);
}


function events (){
    document.addEventListener('DOMContentLoaded', askBudget);
    formulario.addEventListener('submit', enterExpense);
};


events();