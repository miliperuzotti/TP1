// Busco los elementos que necesito del HTML

const btnSolo = document.querySelector("#btn-solo");
const btnMultijugador = document.querySelector("#btn-multijugador");

const pantallaModo = document.querySelector("#pantalla-modo");
const pantallaJugadores = document.querySelector("#pantalla-jugadores");
const pantallaTematica = document.querySelector("#pantalla-tematica");

const nombreJugador1 = document.querySelector("#nombre-jugador1");
const nombreJugador2 = document.querySelector("#nombre-jugador2");

const btnNombres = document.querySelector("#btn-nombres");

// Guardo el modo de juego
let modoJuego = "";

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

    pantallaJugadores.style.display = "none";
    pantallaTematica.style.display = "flex";

});