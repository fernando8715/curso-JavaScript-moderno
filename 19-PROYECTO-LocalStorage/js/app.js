const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');

let tweets = [];


const nuevoTweet = (e)=>{
    e.preventDefault();
    
    const tweet = document.querySelector('#tweet').value.trim();
    if(tweet !== ''){

        const tweetObj = {
            id: Date.now(),
            tweet,
        };

        tweets = [...tweets, tweetObj];
        crearHtml();
        formulario.reset();
        return;
    };
    mensajeError('El campo del mensaje esta vacio');   
};


const crearHtml = ()=>{
    limpiarHtml();

    if(tweets.length>0){
        tweets.forEach(tweet => {

            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.textContent = 'X';

            btnEliminar.onclick = ()=>{
                eliminarTweet(tweet.id);
            }

            const li = document.createElement('li');
            li.textContent = tweet.tweet;

            li.appendChild(btnEliminar);
            listaTweets.appendChild(li);
        });
    }
    guardarLocalStorage();
};


const limpiarHtml = ()=> {
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    };
};


const mensajeError = (error) => {
    const mensaje = document.createElement('P');
    mensaje.classList.add('error');
    mensaje.textContent = error;

    const contenedor = document.querySelector('#contenido');
    contenedor.appendChild(mensaje);
    
    setTimeout(()=>{
        contenedor.removeChild(mensaje);
    }, 1000);
};


const eliminarTweet = (id)=>{
    tweets = tweets.filter(tweet => tweet.id !== id);
    crearHtml();
}


const guardarLocalStorage = ()=> {
    localStorage.setItem('tweet', JSON.stringify(tweets));
};


const cargarLocalStorage = ()=> {
    tweets = JSON.parse(localStorage.getItem('tweet')) || [];
    crearHtml();
}




const eventos = ()=>{

    formulario.addEventListener('submit', nuevoTweet);

    document.addEventListener('DOMContentLoaded', ()=>{
        cargarLocalStorage();
    })
}


eventos();