// API para hacer seguimiento a un lugar de la pagina web o hacer scroll infinito o lazyLoading

document.addEventListener('DOMContentLoaded', ()=>{

    const observer = new IntersectionObserver(entries => {
        if(entries[0].isIntersecting){
            console.log('Ya está visible');
        }else{
            console.log('No esta visible');
        }
    })

    observer.observe(document.querySelector('.premium'));
})