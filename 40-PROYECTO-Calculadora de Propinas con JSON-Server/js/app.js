const contenido = document.querySelector('#resumen .contenido');

let cliente = {
    mesa: '',
    hora: '',
    pedido: [],
}

const categorias = {
    1: 'comida',
    2: 'bebida',
    3: 'postre'
}

const infoPlatillos = platillos => new Promise ( resolve => {
    resolve(platillos);
})

const btnGuardarCliente = document.querySelector('#guardar-cliente');

btnGuardarCliente.addEventListener('click', guardarCliente)

function guardarCliente() {
    const mesa = document.querySelector('#mesa').value
    const hora = document.querySelector('#hora').value

    const verificar = [mesa, hora].some(campo => campo === '');
    const existe = document.querySelector('.invalid-feedback');

    if(verificar){
        if(!existe){
            mostrarAlerta('Ambos campos son obligatorios');
            return;
        }
    }

    guardarInfo({...cliente, mesa, hora});
    const modalForm = document.querySelector('#formulario');
    const modalBootstrap = bootstrap.Modal.getInstance(modalForm);
    modalBootstrap.hide();
    limpiarForm();  
    mostrarSection();
    obtenerPlatillos();  
}

function mostrarAlerta(msj) {
    const formulario = document.querySelector('.modal-body form');
    const divMensaje = document.createElement('DIV');
    divMensaje.classList.add('invalid-feedback', 'd-block', 'text-center');
    divMensaje.textContent = msj;
    formulario.appendChild(divMensaje);
    setTimeout(() => {
        divMensaje.remove();
    }, 2000);
}

function guardarInfo(obj) {
    cliente = obj
}

function limpiarForm() {
    const mesa = document.querySelector('#mesa').value = '';
    const hora = document.querySelector('#hora').value = '';
}


function mostrarSection() {
    const platillos = document.querySelectorAll('.d-none');
    platillos.forEach(section => section.classList.remove('d-none'));
}

function obtenerPlatillos(){

    const url = 'http://localhost:4000/platillos'

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => infoPlatillos(datos))
        .then(platillos => mostrarPlatillos(platillos))
}


function mostrarPlatillos(platillos) {
    const contenido = document.querySelector('#platillos .contenido');

    platillos.forEach(platillo => {
        const {id, nombre, precio, categoria} = platillo;
        const row = document.createElement('DIV');
        row.classList.add('row', 'py-3', 'border-top');
        
        const name = document.createElement('DIV');
        name.classList.add('col-md-6')
        name.textContent = nombre;

        const price = document.createElement('DIV');
        price.classList.add('col-md-2', 'fw-bold')
        price.textContent = `$ ${precio}`;

        const category = document.createElement('DIV');
        category.classList.add('col-md-2');
        category.textContent = categorias[categoria];

        const inputCantidad = document.createElement('INPUT');
        inputCantidad.classList.add('form-control');
        inputCantidad.id = `producto-${id}`
        inputCantidad.type = 'number';
        inputCantidad.min = 0;
        inputCantidad.value = 0;
        
        inputCantidad.onchange = ()=> {
            const cantidad = parseInt( inputCantidad.value );
            const subtotal = calcularSubtotal(precio, cantidad);
            agregarPlatillo({...platillo, cantidad, total: subtotal});
        }

        const divInput = document.createElement('DIV');
        divInput.classList.add('col-md-2');
        divInput.appendChild(inputCantidad);

        row.appendChild(name);
        row.appendChild(price);
        row.appendChild(category);
        row.appendChild(divInput);

        contenido.appendChild(row);
    })
}

function agregarPlatillo(producto) {
    const {id, cantidad, precio} = producto   
    let {pedido} = cliente;

    // actualizar cantidad
    if(cantidad > 0){
        if(cliente.pedido.some(elem => elem.id === id)){
            const pedidoActualizado = pedido.map(elem => {
                if(elem.id === id){
                    elem.cantidad = cantidad;
                    elem.total = calcularSubtotal(precio, cantidad)
                }
                return elem
            });
            cliente.pedido = [...pedidoActualizado];
        }else{
            cliente.pedido = [...pedido, producto];
        }
    // si la cantidad es menor a cero
    }else {
        eliminarProducto(id)
    }

    if(cliente.pedido.length){
        mostrarResultado();
    }else {
        mensajePedidoVacio()
    }
}

function mostrarResultado() {
    limpiarHtml(contenido);

    const resumen = document.createElement('DIV');
    resumen.classList.add('col-md-6', 'card', 'py-3', 'px-3', 'shadow');   

    const heading = crearH4('Productos consumidos');

    const mesa = crearParrafo('Mesa');
    const mesaSpan = crearSpan(cliente.mesa);
    mesa.appendChild(mesaSpan);

    const hora = crearParrafo('Hora');
    const horaSpan = crearSpan(cliente.hora);
    hora.appendChild(horaSpan);
    
    const grupo = document.createElement('UL');
    grupo.classList.add('list-group');

    const {pedido} = cliente;

    pedido.forEach(producto => {
        const {nombre, cantidad, precio, id, total} = producto;

        const lista = document.createElement('LI');
        lista.classList.add('list-group-item');
        
        const nombreEl = crearH4(nombre);
      
        const cantidadEl = document.createElement('P');
        cantidadEl.classList.add('fw-normal', 'mx-3');
        cantidadEl.textContent = 'Cantidad: '
    
        const spanCantidad = document.createElement('SPAN');
        spanCantidad.classList.add('fw-bold');
        spanCantidad.textContent = cantidad;
    
        cantidadEl.appendChild(spanCantidad);        
    
        const precioEl = document.createElement('P');
        precioEl.classList.add('fw-normal', 'mx-3');
        precioEl.textContent = `Precio unitario: `;
    
        const spanPrecio = document.createElement('SPAN');
        spanPrecio.classList.add('fw-bold');
        spanPrecio.textContent = `$ ${precio}`;
    
        precioEl.appendChild(spanPrecio);
                
        const subtotalEl = document.createElement('P');
        subtotalEl.classList.add('fw-normal', 'mx-3');
        subtotalEl.textContent = `Subtotal: `;
        
        const spanSubtotal = document.createElement('SPAN');
        spanSubtotal.classList.add('fw-bold');
        spanSubtotal.textContent = `$ ${total}`;
        
        subtotalEl.appendChild(spanSubtotal);
    
        const btnEliminar = document.createElement('BUTTON');
        btnEliminar.classList.add('btn', 'btn-danger', 'col-md-6', 'my-2');
        btnEliminar.textContent = 'Eliminar comida';
               
        btnEliminar.onclick = ()=>{
            eliminarProducto(id);
        }
    
        lista.appendChild(nombreEl);
        lista.appendChild(cantidadEl);
        lista.appendChild(precioEl);
        lista.appendChild(subtotalEl);
        lista.appendChild(btnEliminar);

        grupo.appendChild(lista);
    });

    resumen.appendChild(heading);
    resumen.appendChild(mesa);
    resumen.appendChild(hora);
    resumen.appendChild(grupo);

    contenido.appendChild(resumen);

    // mostrar formulario propinas
    formularioPropinas();
}


function calcularSubtotal(precio, cantidad) {
    return precio * cantidad;
}

function eliminarProducto(id) {
    const {pedido} = cliente;

    const pedidoActual = pedido.filter(producto => producto.id !== id);
    cliente.pedido = [...pedidoActual];

    limpiarCantidad(id);
    mostrarResultado();
    mensajePedidoVacio();
}

// limpiar campo de cantidad al eliminar el elemento
function limpiarCantidad(id) {
    const productoId = `#producto-${id}`

    const selectProducto = document.querySelector(productoId);
    selectProducto.value = 0;
}

// mostrar el "añade elementos del pedido"
function mensajePedidoVacio(){
        const anuncio = document.createElement('P');
        anuncio.classList.add('text-center');
        anuncio.textContent = 'Añade los elemento del pedido'
        
        contenido.appendChild(anuncio);
}


function formularioPropinas(){
    
    const formulario = document.createElement('DIV');
    formulario.classList.add('col-md-6', 'formulario');

    const divFormulario = document.createElement('DIV');
    divFormulario.classList.add('card', 'py-3', 'px-3', 'shadow');
    
    const headingPropina = crearH4('Propina');

    const propina10 = crearRadioButton(10);
    const label10 = crearLabel('10 %');
    const divPropina10 = crearDivPropina();

    const propina25 = crearRadioButton(25);
    const label25 = crearLabel('25 %');
    const divPropina25 = crearDivPropina();

    const propina50 = crearRadioButton(50);
    const label50 = crearLabel('50 %');
    const divPropina50 = crearDivPropina();

    divPropina10.appendChild(propina10);
    divPropina10.appendChild(label10);
    divPropina25.appendChild(propina25);
    divPropina25.appendChild(label25);
    divPropina50.appendChild(propina50);
    divPropina50.appendChild(label50);

    divFormulario.appendChild(headingPropina);
    divFormulario.appendChild(divPropina10);
    divFormulario.appendChild(divPropina25);
    divFormulario.appendChild(divPropina50);

    formulario.appendChild(divFormulario);
    
    contenido.appendChild(formulario);
}

function crearHeading(nombre) {
    const titulo = document.createElement('H3');
    titulo.classList.add('my-2', 'text-center');
    titulo.textContent = nombre;
    return titulo;
}

function crearH4(nombre) {
    const titulo = document.createElement('H4');
    titulo.classList.add('my-4', 'text-center');
    titulo.textContent = nombre;
    return titulo;
}

function crearParrafo(nombre) {
    const parrafo = document.createElement('P');
    parrafo.classList.add('fw-bold', 'mx-3');
    parrafo.textContent = `${nombre}: `;
    return parrafo;
}

function crearSpan(valor) {
    spanParrafo = document.createElement('SPAN');
    spanParrafo.classList.add('fw-normal');
    spanParrafo.textContent = valor;
    return spanParrafo;
}

function crearRadioButton(valor) {
    const btnRadio = document.createElement('INPUT');
    btnRadio.type = 'radio';
    btnRadio.name = 'propina';
    btnRadio.value = valor;
    btnRadio.classList.add('form-check-input');

    btnRadio.onclick = calcularTotal;

    return btnRadio;
}

function calcularTotal(){
    const {pedido} = cliente;
    let subtotal = 0;
    
    pedido.forEach(elem => {
        subtotal += elem.total;
    })
    
    const propinaValue = parseInt(document.querySelector('[name="propina"]:checked').value);

    const propina = ((subtotal * propinaValue ) / 100 );
    const total = subtotal + propina;
    
    mostrarTotal(subtotal, propina, total);

}

function crearLabel(nombre) {
    const etiqueta = document.createElement('LABEL');
    etiqueta.classList.add('px-2', 'form-check-label');
    etiqueta.textContent = nombre;
    return etiqueta;
}

function crearDivPropina(){
    const propinaDiv = document.createElement('DIV');
    propinaDiv.classList.add('form-check');
    return propinaDiv;
}

function mostrarTotal( subtotal, propina, total ) {
    
    const divTotal = document.createElement('DIV');
    divTotal.classList.add('total-pagar', 'my-5');
    
    // subtotal
    const parrafoSubtotal = document.createElement('P');
    parrafoSubtotal.classList.add('fs-4', 'fw-bold', 'mt-2');
    parrafoSubtotal.textContent = 'Subtotal: ';
    
    const SpanSubtotal = document.createElement('SPAN');
    SpanSubtotal.classList.add('fw-normal');
    SpanSubtotal.textContent = `$ ${subtotal}`;
    
    parrafoSubtotal.appendChild(SpanSubtotal);
    divTotal.appendChild(parrafoSubtotal);
   
    //propina
    const parrafoPropina = document.createElement('P');
    parrafoPropina.classList.add('fs-4', 'fw-bold', 'mt-2');
    parrafoPropina.textContent = 'Propina: ';
    
    const SpanPropina = document.createElement('SPAN');
    SpanPropina.classList.add('fw-normal');
    SpanPropina.textContent = `$ ${propina}`;
    
    parrafoPropina.appendChild(SpanPropina);
    divTotal.appendChild(parrafoPropina);
    
    // total
    const parrafoTotal = document.createElement('P');
    parrafoTotal.classList.add('fs-4', 'fw-bold', 'mt-2');
    parrafoTotal.textContent = 'Total: ';
    
    const SpanTotal = document.createElement('SPAN');
    SpanTotal.classList.add('fw-normal');
    SpanTotal.textContent = `$ ${total}`;
    
    parrafoTotal.appendChild(SpanTotal);
    divTotal.appendChild(parrafoTotal);

    const existeDiv = document.querySelector('.total-pagar');
    
    if(existeDiv){
        existeDiv.remove();
    }
    
    const formulario = document.querySelector('.formulario > div');
    formulario.appendChild(divTotal);
}


function limpiarHtml(selector) {
    while(selector.firstChild){
        selector.removeChild(selector.firstChild);
    }
}