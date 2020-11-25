//* DEFINICIONES TYPESCRIPT *//
//* VARIABLES GLOBALES *//
var marker;
var mis_cupons;
var coord = [-3.70325, 40.4167];
var map;
map = $("#map").val();
var user_info = {
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
    }
    else {
        alert("Geolocation is not supported by this browser.");
    }
}
function showPosition(position) {
    var longitude = position.coords.longitude;
    var latitude = position.coords.latitude;
    map = position.coords.latitude + position.coords.longitude;
    mapboxgl.accessToken = 'pk.eyJ1IjoibW9uaWNhY3IiLCJhIjoiY2toYWY4NDJsMGk5aTMxcGp4NTNqYmV4biJ9.YsLfhM-CtAFILBqvjVEZPQ';
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: coord,
        zoom: 15
    });
    $("#boton_park").on("click", function () {
        $.ajax({
            url: "https://cors-anywhere.herokuapp.com/https://datos.madrid.es/egob/catalogo/202625-0-aparcamientos-publicos.json",
            method: "GET"
        }).done(function (response) {
            var data = response["@graph"];
            data.forEach(function (item) {
                var contenedor = $("#buscador_park").val();
                contenedor = contenedor.toUpperCase();
                var text = item.title.toUpperCase().includes(contenedor);
                if (text) {
                    var longitude_1 = item.location.longitude;
                    var latitude_1 = item.location.latitude;
                    var title = item.title;
                    var popup = new mapboxgl.Popup({ offset: 25 }).setText(title);
                    marker = new mapboxgl.Marker()
                        .setLngLat([longitude_1, latitude_1])
                        .setPopup(popup)
                        .addTo(map);
                }
            });
        }).fail(function () {
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
        }
        else {
            elements[i].classList.add("d-none");
        }
    }
    var elements = document.getElementsByClassName("a-ocultar");
    for (var i = 0; i < elements.length; i++) {
        if (localStorage["is_logged_in"] === "true") {
            elements[i].classList.add("d-none");
        }
        else {
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
    for (var i in user_info) {
        if (typeof user_info[i] !== "function") {
            document.getElementById("datos").innerHTML += "<td>" + i + "</td>" + "<td>" + user_info[i] + "</td>";
        }
    }
}
//PÁGINA CUPONS//
function cargar_cupons() {
    var contenedor;
    contenedor = $("#elcupon")[0];
    contenedor.classList.add("card-columns");
    mis_cupons.forEach(function (item) {
        console.log("dentro de la iteracion", item);
        var divcard = document.createElement("div");
        divcard.classList.add("card");
        contenedor.appendChild(divcard);
        var div1 = document.createElement("div");
        div1.classList.add("mx-auto", "d-block");
        div1.style.height = "100px";
        div1.style.width = "100px";
        div1.style.overflow = "hidden";
        divcard.appendChild(div1);
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
        boton.setAttribute("type", "button");
        boton.classList.add("btn", "btn-primary", "btn-sm");
        boton.innerHTML = "See cupon";
        contboton.appendChild(boton);
    });
}
//*Página de signup*//
/*Tabla Show Prices*/
function contenido() {
    var i = 0;
    for (var i_1 = 0; i_1 < 55; i_1 = i_1 + 5) {
        var precio = 75;
        var calculo = (i_1 * precio) / 100;
        var resultado = precio - calculo;
        var fila = "<tr>"
            + "<td>" + i_1 + "%" + "</td>"
            + "<td>" + resultado + "</td>"
            + "</tr>";
        document.getElementById("contenido").innerHTML += fila;
    }
}
/*DOCUMENT READY*/
$(document).ready(function () {
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
        url: "json/cupons.json",
    }).done(function (data) {
        mis_cupons = data;
        cargar_cupons();
    });
});
