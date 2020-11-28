//* DEFINICIONES TYPESCRIPT *//
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
function load_parkings() {
    return __awaiter(this, void 0, void 0, function () {
        var verif;
        return __generator(this, function (_a) {
            verif = get_parkings();
            return [2 /*return*/];
        });
    });
}
;
function get_parkings() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (data) {
                    $.ajax({
                        url: "https://cors-anywhere.herokuapp.com/https://datos.madrid.es/egob/catalogo/202625-0-aparcamientos-publicos.json",
                    })
                        .done(datos);
                    {
                        return datos;
                    }
                    fail(error);
                    {
                        return error;
                    }
                })];
        });
    });
}
;
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
    var elements = document.getElementsByClassName("logged-in");
    for (var i = 0; i < elements.length; i++) {
        if (localStorage["is_logged_in"] === "true") {
            elements[i].classList.remove("d-none");
        }
        else {
            elements[i].classList.add("d-none");
        }
    }
    var elements = document.getElementsByClassName("logged-out");
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
function cookie() {
    document.cookie = "aa=kk; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";
    document.cookie = "bar=foo";
    document.cookie = "bar=foo";
    console.log("COOKIE:", document.cookie);
    var exdays = 1;
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
}
function local_storage() {
    var foo = "kk";
    localStorage.setItem("bar", foo);
    var foo2 = localStorage.getItem("bar");
    console.log("LOCAL STORAGE: ", foo2);
}
function session_storage() {
    var foo = "kk";
    sessionStorage.setItem("bar", foo);
    var foo2 = sessionStorage.getItem("bar");
    console.log("SESSION STORAGE: ", foo2);
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
    else {
        start_user();
    }
    if ($("#map").length > 0) {
        getLocation();
    }
    $.ajax({
        url: "json/cupons.json",
    }).done(function (data) {
        mis_cupons = data;
        cargar_cupons();
    });
});
