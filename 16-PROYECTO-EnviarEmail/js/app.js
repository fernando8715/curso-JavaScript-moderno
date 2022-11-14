
document.addEventListener('DOMContentLoaded', ()=> {

    const infoEmail = {
        email: '',
        copia: '',
        asunto: '',
        mensaje: '',
    };

    

    const inputEmail = document.querySelector('#email');
    const inputCopia = document.querySelector('#copia');
    const inputAsunto = document.querySelector('#asunto');
    const campoMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnEnviar = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');

    
    

    const validarCampo = (event) => {
        const value = event.target.value;
        const campo = event.target.name;
        const referencia = event.target.parentElement;

        if(value.trim() === ''){
            mostrarError(`el campo ${campo} esta vacio`, referencia);
            infoEmail[campo] = '';
            delete infoEmail.copia;
            validarInfo();
            return;
        }

        if(campo === 'email' && !validarEmail(value)){
            mostrarError('El email no es valido', referencia);
            infoEmail[campo] = '';
            delete infoEmail.copia;
            validarInfo();
            return;
        };

        
        if(campo === 'copia' && !validarEmail(value)){
            mostrarError('El email no es valido', referencia);
            infoEmail[campo] = '';
            validarInfo();
            return;
        }

        limpiarAlerta(referencia);
        infoEmail[campo] = value.trim().toLowerCase();
        
        if(infoEmail.copia === ''){
            delete infoEmail.copia;
            validarInfo();
        }else{
            validarInfo();
        }

    }

    
    const mostrarError = (mensaje, referencia) => {

        limpiarAlerta(referencia);
        
        const alerta = document.createElement('P');
        alerta.textContent = mensaje;
        alerta.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center')
        referencia.appendChild(alerta);
    }


    const limpiarAlerta = (referencia) => {

        const validarAlerta = referencia.querySelector('.bg-red-600');

        if(validarAlerta){
            validarAlerta.remove();
        }
    }


    const validarEmail = (email) => {

        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado;
    }


    const validarInfo = () => {

        const validar = Object.values(infoEmail).includes('');        
        
        if(validar){
            btnEnviar.classList.add('opacity-50');
            btnEnviar.disabled = true;
            return;
        }

        btnEnviar.classList.remove('opacity-50');
        btnEnviar.disabled = false;
    }


    const enviarEmail = (event) => {

        event.preventDefault();

        spinner.classList.remove('hidden');
        spinner.classList.add('flex');
        
        setTimeout(() => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');
            
            mensajeEnviado();
            borrarDatos();
            
        }, 3000);
        
    };


    const mensajeEnviado = () => {

        const alertaExito = document.createElement('P');
        alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 
        'rounded-lg', 'mt-10', 'text-sm', 'uppercase');
        alertaExito.textContent = 'Mensaje enviado correctamente';

        formulario.appendChild(alertaExito);
        setTimeout(() => {
            formulario.removeChild(alertaExito);
        }, 1300);
    }


    const borrarDatos = () => {
        infoEmail.email = '';
        infoEmail.copia = '';
        infoEmail.asunto = '';
        infoEmail.mensaje = '';

        formulario.reset();
        validarInfo();
    }

    


    // Eventos

    inputEmail.addEventListener('input', validarCampo);

    inputCopia.addEventListener('input', validarCampo);

    inputAsunto.addEventListener('input', validarCampo);    
    
    campoMensaje.addEventListener('input', validarCampo);
    
    formulario.addEventListener('submit', enviarEmail);

    btnReset.addEventListener('click', (event)=>{
        event.preventDefault();
        
        borrarDatos();
    });

})

