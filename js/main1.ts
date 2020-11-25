
//* DEFINICIONES TYPESCRIPT *//

type Cupons = [ {
  imagen: string,
  texto: string,
}]

type PositionMap = {
 longitude:number,
 latitude: number
}


//* VARIABLES GLOBALES *//
let marker:any;
let mis_cupons:Cupons;

const coord: [number, number] = [-3.70325, 40.4167];

let map: any;
map = <string> $("#map").val();

const user_info = {
 name: "Mónica",
 surname: "Cristóbal",
 ndoc: "47414040-T",
 birthdate: "17-03-1993",
 carplate: "5467HGV",
 enviclass: "C",
};



//* FUNCIONES *//

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
let longitude = position.coords.longitude;
let latitude = position.coords.latitude;
map = position.coords.latitude + position.coords.longitude;

mapboxgl.accessToken = 'pk.eyJ1IjoibW9uaWNhY3IiLCJhIjoiY2toYWY4NDJsMGk5aTMxcGp4NTNqYmV4biJ9.YsLfhM-CtAFILBqvjVEZPQ';
map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: coord,
  zoom: 15
 });



$("#boton_park").on("click", function(){
     $.ajax({
       url: "https://cors-anywhere.herokuapp.com/https://datos.madrid.es/egob/catalogo/202625-0-aparcamientos-publicos.json",
       method: "GET"

     }).done(function(response){

     const data = response["@graph"];
     data.forEach(function(item){
       let contenedor = <string>$("#buscador_park").val();
       contenedor = contenedor.toUpperCase();
       let text = item.title.toUpperCase().includes(contenedor);
       if (text) {
           let longitude = item.location.longitude;
           let latitude = item.location.latitude;
           let title = item.title;
           let popup = new mapboxgl.Popup({ offset: 25 }).setText(
               title
           );
           marker = new mapboxgl.Marker()
               .setLngLat([longitude, latitude])
               .setPopup(popup)
               .addTo(map);
       }
     });

     }).fail(function(){
     });
   });
}


/*Función Login-Logout*/

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
  window.location.href = "index.html";
}

function initIsLoggedIn() {
  if (localStorage["is_logged_in"] === undefined) {
    localStorage["is_logged_in"] = false;
  }
}


//PÁGINA PROFILE//
function mostrar() {
document.getElementById("datos").innerHTML = "";

for(let i in user_info) {
  if (typeof user_info[i] !== "function") {
 document.getElementById("datos").innerHTML +="<td>" + i + "</td>" + "<td>" + user_info[i] + "</td>";
  }
}
}

//PÁGINA CUPONS//

function cargar_cupons() {

let contenedor:any;
contenedor = $("#elcupon")[0];
contenedor.classList.add("card-columns");

mis_cupons.forEach(function(item){
console.log("dentro de la iteracion", item);

let divcard = document.createElement("div");
divcard.classList.add("card");
contenedor.appendChild(divcard)

let div1 = document.createElement("div");
div1.classList.add("mx-auto", "d-block");
div1.style.height= "100px";
div1.style.width= "100px";
div1.style.overflow= "hidden"
divcard.appendChild(div1)

let imagen = document.createElement("img");
imagen.classList.add("card-img-top");
imagen.src = item.imagen;
div1.appendChild(imagen);

let divcardbody = document.createElement("div");
divcardbody.classList.add("card-body", "text-center");
divcard.appendChild(divcardbody);

let texto = document.createElement("span");
texto.classList.add("card-text");
texto.innerHTML = item.texto;
divcardbody.appendChild(texto);

let contboton = document.createElement("anchor");
contboton.setAttribute("href", "#");
divcardbody.appendChild(contboton);

let boton = document.createElement("button");
boton.setAttribute("type","button");
boton.classList.add("btn", "btn-primary","btn-sm");
boton.innerHTML="See cupon";
contboton.appendChild(boton);
});

}



//*Página de signup*//

/*Tabla Show Prices*/
function contenido() {
let i = 0;

for (let i = 0; i < 55; i = i + 5){
let precio = 75;
let calculo = (i * precio)/100;
let resultado = precio - calculo;

const fila = "<tr>"
+ "<td>" + i +"%" + "</td>"
+ "<td>" + resultado + "</td>"
+ "</tr>";

document.getElementById("contenido").innerHTML += fila;
}}


/*DOCUMENT READY*/
$(document).ready(function() {
initIsLoggedIn();
  if ($("#datos").length > 0) {
    mostrar();
  }
  if ($("#contenido").length > 0) {
    contenido();
  }
  if ($("#map").length > 0) {
  getLocation();
  }
  if ($("#contenido").length > 0) {
  contenido();
  }

  $.ajax({
    url:"json/cupons.json",
  }).done(function(data){
    mis_cupons = data;
    cargar_cupons();
  });

});
