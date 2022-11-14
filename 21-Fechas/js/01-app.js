const diaHoy = new Date();

let year = diaHoy.getFullYear();  // año
let month = diaHoy.getMonth();  // mes, inicia con el mes 0
let day = diaHoy.getDay();  // inicia con domingo como 0
let hour = diaHoy.getHours();  // hora
let min = diaHoy.getMinutes();  // minutos

let miliseg = Date.now() // miliseg transcurridos desde 1/1/1970
// Date.now() no necesita instanciar el objeto Date. 

console.log(diaHoy);