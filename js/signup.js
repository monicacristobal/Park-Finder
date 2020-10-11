function myFunction() {
  var x = document.getElementById("mySelect").value;
  document.getElementById("envi").innerHTML = "" + x;
}

function birth() {
var fecha_hoy = new Date;
var año = fecha_hoy.getFullYear();
var mes = fecha_hoy.getMonth();
var dia = fecha_hoy.getDate();

var fecha_user = document.getElementById("birth").value;
var cumple = new Date (fecha_user);
var fecha_user = cumple.getFullYear();
var año_user = cumple.getMonth();
var dia_user = cumple.getDate();


var age = (fecha_hoy - fechar_user) / (1000*60*60*24*365);
console.log(age);
document.getElementById("edad").innerHTML = age;

}

function contenido() {
var precio_inicial = 75
var i = 75 - 3,75

for (var i = 0; i == 37,5; i + 5) {

  var fila = "<tr>"
  + "<td>"" + i + ""</td>"
  + "<td>"" + i + ""</td>"
  + "</tr>";

document.getElementById("contenido").innerHTML += fila;
}

}

contenido();
