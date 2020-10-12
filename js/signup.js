function myFunction() {
  var x = document.getElementById("mySelect").value;
  document.getElementById("envi").innerHTML = "" + x;
}

function letradni() {

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

document.getElementById("edad").innerHTML = fin;

}

function contenido () {

var porcent = 0;
var porcentaje = porcent + 5;
var precio = 75;
var calculo = (porcentaje * precio) / 100;
var i = precio - calculo;


for (var i = 0; i = i <= 37.5; i + 5) {

var fila = "<tr>"
+ "<td>" + porcentaje + "</td>
+ "<td>" + i + "</td>"
+ "</tr>";

document.getElementById("contenido").innerHTML += fila;
}
}

contenido();
