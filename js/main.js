var user_info = {
  name: "Mónica",
  surname: "Cristóbal",
  ndoc: "47414040-T",
  birthdate: "17-03-1993",
  carplate: "5467HGV",
  enviclass: "C",
};


function myFunction() {
var x = $("#mySelect").val();
$("#envi").html("" + x);
}


function mostrar() {
$("#datos").html("");
for(var i in user_info) {
  if (typeof user_info[i] !== "function") {
  $("#datos").append("<tr><td>" + i + "</td>" + "<td>" + user_info[i] + "</td></tr>");
  }
}}


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

$("#contenido").append(fila);
}
}

function birth() {
var fecha_hoy = new Date;
var año = fecha_hoy.getFullYear();
var mes = fecha_hoy.getMonth();
var dia = fecha_hoy.getDate();

var fecha_user = $("#birthdate").val();
var cumple = new Date (fecha_user);
var fecha_user = cumple.getFullYear();
var año_user = cumple.getMonth();
var dia_user = cumple.getDate();

var x = fecha_hoy.getTime();
var y = cumple.getTime();

var fin = (x - y) / (1000*60*60*24*365);
$("#edad").html(Math.round(fin) + " years old");
}

function dni_completo() {
  var dni = $("#dni_num").val();
  if (dni.length == 8) {
    var dni_con_numero = parseInt(dni);
    $("#dni_let").html(laletra(dni_con_numero));
  } else {
    $("#dni_let").html("");
  }
}

function laletra(dni) {
  var letras = "TRWAGMYFPDXBNJZSQVHLCKE";
  var resto = dni % 23;
  var compuesto = letras.substr(resto, 1);
  return compuesto;
}


$(document).ready(function() {

//función environment class --> signup//
$("#mySelect").on("change", function(){
  $("#envi").change();
 });

//función tabla datos usuario --> profile//
  $("#datos").on("change", mostrar);
    $("#datos").change();

//función tabla precios --> signup//
$("#contenido").on("change", contenido);
  $("#contenido").change();

//función cumpleaños --> signup//
  $("#birthdate").on("change", function(){
    $("#edad").change();
  });

  //función dni --> signup//
  $("#dni_num").on("change", dni_completo);
    $("#dni_let").change();
   });


   $.validator.addMethod("nif", function(value, element, param){
     var resultado = value.match(/\d{8}[a-zA-Z]/g);

     if (resultado === null) {
       return false;
     }else {
       return true;
     }

   }, "Please enter a valid DNI");


   $.validator.addMethod("plate", function(value, element, param){
     var resultado = value.match(/[0-9]{4}[A-Za-z]{3}/g);
     var resultado2 = value.match(/[A-Za-z]{2}[0-9]{4}[A-Za-z]{2}/g);

     if (resultado === null) {
       return false;
     }else {
       return true;
     }

  
   }, "Please enter a valid carplate");

//validación formulario//
 $("form").validate({
   errorClass:"text-danger",
   rules: {
     email: {
       required: true,
       email: true,
     },

      password: {
       required: true,
       minlength: 8,
     },

      password2: {
       equalTo: "#password",
     },

      dni:{
        required: true,
        nif: true,
      },

      carplate: {
        required: true,
        plate: true,
      },

    },

      messages: {
        dni: {
          required: "Introduce un dni con letra",
          nif: "Introduce un DNI de 8 números y 1 letra",
        },
        carplate: {
          required: "Introduce un número de matrícula",
          plate: "Introduce una matrícula válida",
        },

      },


 });
