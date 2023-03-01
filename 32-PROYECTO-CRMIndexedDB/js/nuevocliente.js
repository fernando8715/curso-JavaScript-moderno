(function(){

    let DB;
    const formulario = document.querySelector('#formulario');

    document.addEventListener('DOMContentLoaded', ()=>{
        conectarDB();
        formulario.addEventListener('submit', validarCliente);
    });

    function conectarDB(){
        const abrirConexion = window.indexedDB.open('crm', 1);

        abrirConexion.onerror = function(){
            console.log('Hubo un error en la conexion a la DB');
        };

        abrirConexion.onsuccess = function(){
            DB = abrirConexion.result;
        };
    }

    function validarCliente(e){
        e.preventDefault();

        const nombre    = formulario.querySelector('#nombre').value;
        const email     = formulario.querySelector('#email').value;
        const telefono  = formulario.querySelector('#telefono').value;
        const empresa   = formulario.querySelector('#empresa').value;

        if(nombre==='' || email==='' || telefono==='' || empresa===''){
            mostrarMensaje('Todos los campos son obligatorios', 'error');
            return;
        };

        const cliente = {
            nombre,
            email,
            telefono,
            empresa,
            id: Date.now()
        }

        crearCliente(cliente);
        formulario.reset();
    };

        
    function crearCliente(objCliente){

        const transaction = DB.transaction(['crm'], 'readwrite');
        const objectStore = transaction.objectStore('crm');

        objectStore.add(objCliente);
        
        transaction.onerror = function(){
            mostrarMensaje('Hubo un error al crear el cliente', 'error');
        };

        transaction.oncomplete = function(){
            mostrarMensaje('Cliente creado correctamente');
            
            setTimeout(() => {
                window.location.href = 'index.html'; 
            }, 2000);
        };
    };


})();