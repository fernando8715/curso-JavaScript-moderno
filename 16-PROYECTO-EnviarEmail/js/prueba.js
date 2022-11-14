document.addEventListener('DOMContentLoaded', ()=> {

    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const campoMensaje = document.querySelector('#mensaje');
    const btnEnviar = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const formulario = document.querySelector('#formulario');
    const spinner = document.querySelector('#spinner2');
  
    

    const infoEmail = {
            email: '',
            asunto: '',
            mensaje: '',
    }
    


    const validarCampo = (event) =>{

        const value = event.target.value;
        const campo = event.target.name;
        const referencia = event.target.parentElement;
        
              
        if(value.trim() === ''){
            borrarAlerta(referencia);
            mostrarAlerta(`El campo ${campo} esta vacio`, referencia);
            infoEmail[campo] = '';
            validarInfo();
            return;
        };

        if(campo === 'email' && !validarEmail(value)){
            borrarAlerta(referencia);
            mostrarAlerta(`El campo ${campo} es incorrecto`, referencia);
            infoEmail[campo] = '';
            validarInfo();
            return;
        }
        
        borrarAlerta(referencia);
        infoEmail[campo] = value; 
        validarInfo();                
    }


    const mostrarAlerta = (mensaje, referencia) => {

        const alerta = document.createElement('P');
        alerta.textContent = mensaje;
        alerta.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');
        referencia.appendChild(alerta);
    }


    const borrarAlerta = (referencia)=>{

        const validarAlerta = referencia.querySelector('.bg-red-600');

        if(validarAlerta){
            validarAlerta.remove();
        }
    }

    
    const validarEmail = (email) => {

        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);

        return resultado;
    }


    const validarInfo = () => {

        const valores = Object.values(infoEmail).includes('');
        
        if(valores){

            btnEnviar.classList.add('opacity-50');
            btnEnviar.disabled = true;
            return;
        }

        btnEnviar.classList.remove('opacity-50');
        btnEnviar.disabled = false;
    }


    const enviarMensaje = (event) => {

        event.preventDefault();

        spinner.classList.remove('hidden');
        spinner.classList.add('flex');

        btnEnviar.classList.add('opacity-50');
        btnEnviar.disabled = true;
        
        setTimeout( () => {
            
            spinner.classList.add('hidden');
            spinner.classList.remove('flex');
            envioExitoso();
            borrarCampos();
        }, 2000);
    }

    const borrarCampos = () => {

        infoEmail.email = '';
        infoEmail.asunto = '';
        infoEmail.mensaje = '';

        formulario.reset();
        validarInfo();
    }


    const envioExitoso = () => {

        const mensaje = document.createElement('P');

        mensaje.textContent = 'El mensaje fue enviado exitosamente';
        mensaje.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 
        'rounded-lg', 'mt-10', 'text-sm', 'uppercase');
        
        formulario.appendChild(mensaje);

        setTimeout(() => {

            formulario.removeChild(mensaje);
        }, 1300);
    }



    // eventos

    inputEmail.addEventListener('blur', validarCampo);
    inputAsunto.addEventListener('input', validarCampo);
    campoMensaje.addEventListener('input', validarCampo);
    btnEnviar.addEventListener('click', enviarMensaje);
    btnReset.addEventListener('click', (event)=>{
        event.preventDefault();

        const referencia = event.target.parentElement.parentElement;
        const alerta = referencia.querySelector('.bg-red-600');

        alerta.remove();
        borrarCampos();
    });

});
