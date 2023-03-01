(function(){

    let DB;
    let idCliente;

    const nombreInput   = document.querySelector('#nombre');
    const emailInput    = document.querySelector('#email');
    const telefonoInput = document.querySelector('#telefono');
    const empresaInput  = document.querySelector('#empresa');
    const formulario    = document.querySelector('#formulario');

    document.addEventListener('DOMContentLoaded', ()=>{
        conectarDB();
        
        formulario.addEventListener('submit', actualizarCliente);

        // verificar el ID de la URL
        const parametrosURL = new URLSearchParams(window.location.search);
        idCliente = parametrosURL.get('id');
        if(idCliente){
            setTimeout(() => {
                obtenerCliente(idCliente);
            }, 200);
        }
        
    });

    function actualizarCliente(e){
        e.preventDefault();
        
        if(nombreInput.value==='' || emailInput.value==='' || telefonoInput.value==='' || empresaInput.value===''){
            mostrarMensaje('Todos los campos obligatorios', 'error');
            return;
        };

        const editarCliente={
            nombre: nombreInput.value,
            email: emailInput.value,
            telefono: telefonoInput.value,
            empresa: empresaInput.value,
            id: Number(idCliente)
        };

        const transaction = DB.transaction(['crm'], 'readwrite');
        const objectStore = transaction.objectStore('crm');
        objectStore.put(editarCliente);

        transaction.onerror = function(){
            mostrarMensaje('Hubo un error');
        };

        transaction.oncomplete = function(){
            mostrarMensaje('Cliente actualizado correctamente');
        };

        setTimeout(() => {
            window.location.href = 'index.html'
        }, 1500);

    }

    function obtenerCliente(id){
        const transaction = DB.transaction(['crm'], 'readwrite');
        const objectStore = transaction.objectStore('crm');
        const cliente = objectStore.openCursor();

        cliente.onsuccess = function(e){
            const cursor = e.target.result
            
            if(cursor){
                if(cursor.value.id === Number(id)){
                    llenarFormulario(cursor.value);
                }
                cursor.continue();
            }           
        }
    };

    function llenarFormulario(datosCliente){
        const {nombre, email, telefono, empresa} = datosCliente;

        nombreInput.value   = nombre;
        emailInput.value    = email;
        telefonoInput.value = telefono;
        empresaInput.value  = empresa;
    }

    function conectarDB(){
        const abrirConexion = window.indexedDB.open('crm', 1);

        abrirConexion.onerror = function(){
            console.log('Hubo un error en la conexion a la DB');
        };

        abrirConexion.onsuccess = function(){
            DB = abrirConexion.result;
        };
    }


})();