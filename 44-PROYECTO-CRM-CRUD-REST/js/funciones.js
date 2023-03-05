export const mostrarAlerta = msj=> {
    const alerta = document.querySelector('.bg-red-200');
    
    if(!alerta){
        const alerta = document.createElement('P');
        
        alerta.classList.add('bg-red-200', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-5', 'text-center');
        
        alerta.innerHTML = `
        <strong class="font-bold">Error!! </strong>
        <span class="block sm:inline">${msj}</span> 
        `;

        const formulario = document.querySelector('#formulario');
        formulario.appendChild(alerta);

        setTimeout(() => {
           alerta.remove(); 
        }, 3000);
        return;
    }    
}

export  const validar = obj => {
    return  !Object.values(obj).every(input => input !== '');
}
