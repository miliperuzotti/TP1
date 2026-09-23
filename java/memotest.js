// Busco los elementos que necesito del HTML

const btnSolo = document.querySelector("#btn-solo");
const btnMultijugador = document.querySelector("#btn-multijugador");

const pantallaModo = document.querySelector("#pantalla-modo");
const pantallaJugadores = document.querySelector("#pantalla-jugadores");
const pantallaTematica = document.querySelector("#pantalla-tematica");
const pantallaDificultad = document.querySelector("#pantalla-dificultad");

const nombreJugador1 = document.querySelector("#nombre-jugador1");
const nombreJugador2 = document.querySelector("#nombre-jugador2");

const btnNombres = document.querySelector("#btn-nombres");

const btnCultura = document.querySelector("#btn-cultura");
const btnAlbumes = document.querySelector("#btn-albumes");


// Variables que guardan las decisiones de la partida

let modoJuego = "";

let nombre1 = "";
let nombre2 = "";

let tematica = "";


// Cuando se hace click en "Solo"

btnSolo.addEventListener("click", function() {

    modoJuego = "solo";

    pantallaModo.style.display = "none";
    pantallaTematica.style.display = "flex";

});


// Cuando se hace click en "2 jugadores"

btnMultijugador.addEventListener("click", function() {

    modoJuego = "multijugador";

    pantallaModo.style.display = "none";
    pantallaJugadores.style.display = "flex";

});


// Cuando se hace click en "Continuar"

btnNombres.addEventListener("click", function() {

    if (nombreJugador1.value != "" && nombreJugador2.value != "") {

        nombre1 = nombreJugador1.value;
        nombre2 = nombreJugador2.value;

        pantallaJugadores.style.display = "none";
        pantallaTematica.style.display = "flex";

    } else {

        alert("Ingresen los nombres de los dos jugadores.");

    }

});


// Cuando se hace click en "Cultura general"

btnCultura.addEventListener("click", function() {

    tematica = "culturageneral";

    pantallaTematica.style.display = "none";
    pantallaDificultad.style.display = "flex";

});


// Cuando se hace click en "Álbumes"

btnAlbumes.addEventListener("click", function() {

    tematica = "albumes";

    pantallaTematica.style.display = "none";
    pantallaDificultad.style.display = "flex";

});
