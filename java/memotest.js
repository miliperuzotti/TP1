// Busco los elementos que necesito del HTML

const btnSolo = document.querySelector("#btn-solo");
const btnMultijugador = document.querySelector("#btn-multijugador");

const pantallaModo = document.querySelector("#pantalla-modo");
const pantallaJugadores = document.querySelector("#pantalla-jugadores");
const pantallaTematica = document.querySelector("#pantalla-tematica");
const pantallaDificultad = document.querySelector("#pantalla-dificultad");
const pantallaJuego = document.querySelector("#pantalla-juego");

const nombreJugador1 = document.querySelector("#nombre-jugador1");
const nombreJugador2 = document.querySelector("#nombre-jugador2");
const btnNombres = document.querySelector("#btn-nombres");

const btnCultura = document.querySelector("#btn-cultura");
const btnAlbumes = document.querySelector("#btn-albumes");

const btnFacil = document.querySelector("#btn-facil");
const btnMedio = document.querySelector("#btn-medio");
const btnDificil = document.querySelector("#btn-dificil");

const tablero = document.querySelector("#tablero");

// Variables que guardan las decisiones de la partida

let modoJuego = "";
let nombre1 = "";
let nombre2 = "";
let tematica = "";
let cantidadParejas = 0;
let cartas = [];


// EVENTOS

// Cuando se hace click en "Solo"
btnSolo.addEventListener("click", () => {
    modoJuego = "solo";
    cambiarPantalla(pantallaModo, pantallaTematica);
});

// Cuando se hace click en "2 jugadores"
btnMultijugador.addEventListener("click", () => {
    modoJuego = "multijugador";
    cambiarPantalla(pantallaModo, pantallaJugadores);
});

// Cuando se hace click en "Continuar"
btnNombres.addEventListener("click", guardarNombres);

// Cuando se hace click en "Cultura general"
btnCultura.addEventListener("click", () => {
    tematica = "culturageneral";
    cambiarPantalla(pantallaTematica, pantallaDificultad);
});

// Cuando se hace click en "Álbumes"
btnAlbumes.addEventListener("click", () => {
    tematica = "albumes";
    cambiarPantalla(pantallaTematica, pantallaDificultad);
});

//Elegir dificultad
btnFacil.addEventListener("click", () => iniciarJuego(10));
btnMedio.addEventListener("click", () => iniciarJuego(15));
btnDificil.addEventListener("click", () => iniciarJuego(20));


// FUNCIONES

function cambiarPantalla(actual, siguiente) {
    actual.style.display = "none";
    siguiente.style.display = "flex";
}

//verificacion nombres
function guardarNombres() {
    if (nombreJugador1.value != "" && nombreJugador2.value != "") {
        nombre1 = nombreJugador1.value;
        nombre2 = nombreJugador2.value;

        cambiarPantalla(pantallaJugadores, pantallaTematica);
    } else {
        alert("Ingresen los nombres de los dos jugadores.");
    }
}


function iniciarJuego(parejas) {
    cantidadParejas = parejas;

    generarCartas();
    mezclarCartas();
    mostrarCartas();

    cambiarPantalla(pantallaDificultad, pantallaJuego);
}

// Generar las parejas (se guardan pares pero en orden)
function generarCartas() {
    cartas = [];

    for (let i = 1; i <= cantidadParejas; i++) {
        cartas.push(i, i);
    }
}


function mezclarCartas() {
    cartas.sort(() => Math.random() - 0.5);
}


function mostrarCartas() {
    tablero.innerHTML = "";

    for (let i = 0; i < cartas.length; i++) {
        crearCarta(cartas[i]);
    }
}


function crearCarta(numero) {
    // Creo la carta 
    const carta = document.createElement("div");
    // Creo las dos caras 
    const frente = document.createElement("div");
    const reverso = document.createElement("div");
    // Creo la imagen del frente
    const imagen = document.createElement("img");
    
    // Agrego las clases
    carta.classList.add("carta");
    frente.classList.add("frente");
    reverso.classList.add("reverso");

    // Guardo el número de la pareja
    carta.dataset.numero = numero;
    // Indico qué imagen tiene la carta
    imagen.src = "img/memotest/" + tematica + "/" + numero + ".jpg";

    // Agrego la imagen al frente
    frente.append(imagen);
    // Agrego las dos caras a la carta
    carta.append(frente, reverso);
    tablero.append(carta);

    // Giro la carta al hacer click
    carta.addEventListener("click", () => {
        carta.classList.add("girada");
    });
}