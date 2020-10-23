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


function filter(){

var amostrar = document.getElementsByClassName("a-mostrar");
var aocultar = document.getElementsByClassName("a-mostrar");

for (var i = 0; i < amostrar.length; i++){
    amostrar[i].classList.add("d-none");



}


}










function init() {

if (document.getElementById("datos") !== null){
  mostrar();
}
if (document.getElementById("elcupon") !== null){
  cargar_cupons();
}
if (document.getElementById("amostrar") !== null){
  filter();
}
}

init();
