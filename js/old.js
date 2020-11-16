var user_info = {
  name: "Mónica",
  surname: "Cristóbal",
  ndoc: "47414040-T",
  birthdate: "17-03-1993",
  carplate: "5467HGV",
  enviclass: "C",
};

function cargar_cupons() {
var mis_cupons = JSON.parse(cupons);
console.log(mis_cupons);

var contenedor = document.getElementById("elcupon");
contenedor.classList.add("card-columns");

mis_cupons.forEach(function(item){
console.log("dentro de la iteracion", item);

var divcard = document.createElement("div");
divcard.classList.add("card");
contenedor.appendChild(divcard)

var div1 = document.createElement("div");
div1.classList.add("mx-auto", "d-block");
div1.style="height: 100px; width: 100px;overflow: hidden;"
divcard.appendChild(div1)

var imagen = document.createElement("img");
imagen.classList.add("card-img-top");
imagen.src = item.imagen;
div1.appendChild(imagen);

var divcardbody = document.createElement("div");
divcardbody.classList.add("card-body", "text-center");
divcard.appendChild(divcardbody);

var texto = document.createElement("span");
texto.classList.add("card-text");
texto.innerHTML = item.texto;
divcardbody.appendChild(texto);

var contboton = document.createElement("anchor");
contboton.setAttribute("href", "#");
divcardbody.appendChild(contboton);

var boton = document.createElement("button");
boton.setAttribute("type","button");
boton.classList.add("btn", "btn-primary","btn-sm");
boton.innerHTML="See cupon";
contboton.appendChild(boton);
});

}

function start_user() {
  document.querySelectorAll("#nombre_usuario")[0].innerHTML = user_info.name + " " + user_info.surname;
  var elements = document.getElementsByClassName("a-mostrar");
  for (var i = 0; i < elements.length; i++) {
    if (localStorage["is_logged_in"] === "true") {
      elements[i].classList.remove("d-none");
    } else {
      elements[i].classList.add("d-none");
    }
  }
  var elements = document.getElementsByClassName("a-ocultar");
  for (var i = 0; i < elements.length; i++) {
    if (localStorage["is_logged_in"] === "true") {
      elements[i].classList.add("d-none");
    } else {
      elements[i].classList.remove("d-none");
    }
  }
}
function login() {
  localStorage["is_logged_in"] = true;
  start_user();
}

function logout() {
  localStorage["is_logged_in"] = false;
  window.location = "index.html";
}

function initIsLoggedIn() {
  if (localStorage["is_logged_in"] === undefined) {
    localStorage["is_logged_in"] = false;
  }
}

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

// function laletra(dni) {
//   var letras = "TRWAGMYFPDXBNJZSQVHLCKE";
//   var resto = dni % 23;
//   var compuesto = letras.substr(resto, 1);
//   return compuesto;
// }


$(document).ready(function() {

//función tabla datos usuario --> profile//
  $("#datos").on("change", mostrar);
    $("#datos").change();

//función tabla precios --> signup//
$("#contenido").on("change", contenido);
  $("#contenido").change();

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
     var resultado = value.match(/([0-9]{4}[A-Za-z]{3})|([A-Za-z]{2}[0-9]{4}[A-Za-z]{2})/g);

     if (resultado === null) {
       return false;

     }else {
       return true;
     }
   }, "Please enter a valid carplate");

   $.validator.addMethod("envclass", function(value, element, param){
     var resultado = $("#mySelect").val();

     if (resultado === null) {
       return false;

     }else {
       return true;
     }
   }, "Please choose an option");

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
      environment:{
        required:true,
      }

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


/// pueba///


var user_info = {
  name: "Mónica",
  surname: "Cristóbal",
  ndoc: "47414040-T",
  birthdate: "17-03-1993",
  carplate: "5467HGV",
  enviclass: "C",
};


function mostrar() {
document.getElementById("datos").innerHTML = "";

for(var i in user_info) {
  if (typeof user_info[i] !== "function") {
 document.getElementById("datos").innerHTML +="<td>" + i + "</td>" + "<td>" + user_info[i] + "</td>";
  }
}
}



function start_user() {
  document.querySelectorAll("#nombre_usuario")[0].innerHTML = user_info.name + " " + user_info.surname;
  var elements = document.getElementsByClassName("a-mostrar");
  for (var i = 0; i < elements.length; i++) {
    if (localStorage["is_logged_in"] === "true") {
      elements[i].classList.remove("d-none");
    } else {
      elements[i].classList.add("d-none");
    }
  }
  var elements = document.getElementsByClassName("a-ocultar");
  for (var i = 0; i < elements.length; i++) {
    if (localStorage["is_logged_in"] === "true") {
      elements[i].classList.add("d-none");
    } else {
      elements[i].classList.remove("d-none");
    }
  }
}
function login() {
  localStorage["is_logged_in"] = true;
  start_user();
}

function logout() {
  localStorage["is_logged_in"] = false;
  window.location = "index.html";
}

function initIsLoggedIn() {
  if (localStorage["is_logged_in"] === undefined) {
    localStorage["is_logged_in"] = false;
  }
}

function change_dni() {
  var dni = document.getElementById("dni").value;
  if (dni.length == 8) {
    var dni_num = parseInt(dni);
    document.getElementById("dnil").innerHTML = dni_letter(dni_num);
  } else {
    document.getElementById("dnil").innerHTML = "";
  }
}


function cargar_cupons() {
var mis_cupons = JSON.parse(cupons);
console.log(mis_cupons);

var contenedor = document.getElementById("elcupon");
contenedor.classList.add("card-columns");

mis_cupons.forEach(function(item){
console.log("dentro de la iteracion", item);

var divcard = document.createElement("div");
divcard.classList.add("card");
contenedor.appendChild(divcard)

var div1 = document.createElement("div");
div1.classList.add("mx-auto", "d-block");
div1.style="height: 100px; width: 100px;overflow: hidden;"
divcard.appendChild(div1)

var imagen = document.createElement("img");
imagen.classList.add("card-img-top");
imagen.src = item.imagen;
div1.appendChild(imagen);

var divcardbody = document.createElement("div");
divcardbody.classList.add("card-body", "text-center");
divcard.appendChild(divcardbody);

var texto = document.createElement("span");
texto.classList.add("card-text");
texto.innerHTML = item.texto;
divcardbody.appendChild(texto);

var contboton = document.createElement("anchor");
contboton.setAttribute("href", "#");
divcardbody.appendChild(contboton);

var boton = document.createElement("button");
boton.setAttribute("type","button");
boton.classList.add("btn", "btn-primary","btn-sm");
boton.innerHTML="See cupon";
contboton.appendChild(boton);
});

}


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






function init() {
initIsLoggedIn();

if (document.getElementById("contenido") !== null){
  contenido();
}

if (document.getElementById("elcupon") !== null){
  cargar_cupons();
}

if (document.getElementById("datos") !== null){
  mostrar();
}


if (document.getElementById("datos") === null) {
  start_user();
}


}



init();
