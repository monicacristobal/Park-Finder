function myFunction() {
var x = document.getElementById("mySelect").value;
document.getElementById("envi").innerHTML = "" + x;
}

function letradni() {
cadena = "TRWAGMYFPDXBNJZSQVHLCKET"
posicion = dniform.dni.value % 23
letra = cadena.substring(posicion, posicion + 1)
document.dniform.dni.value = dniform.dni.value + " - " + letra
}


function birth() {
var fecha_hoy = new Date;
var año = fecha_hoy.getFullYear();
var mes = fecha_hoy.getMonth();
var dia = fecha_hoy.getDate();

var fecha_user = document.getElementById("birthdate").value;
var cumple = new Date (fecha_user);
var fecha_user = cumple.getFullYear();
var año_user = cumple.getMonth();
var dia_user = cumple.getDate();

var x = fecha_hoy.getTime();
var y = cumple.getTime();

var fin = (x - y) / (1000*60*60*24*365);
console.log(fin);
document.getElementById("edad").innerHTML = Math.round(fin) + " years old";
}



function contenido() {
var i = 0;

for (var i = 0; i < 55; i = i + 5){
var precio = 75;
var calculo = (i * precio)/100;
var resultado = precio - calculo;

var fila = "<tr>"
+ "<td>" + i +"%" + "</td>"
+ "<td>" + resultado + "</td>"
+ "</tr>";

document.getElementById("contenido").innerHTML += fila;
}
}
contenido();
