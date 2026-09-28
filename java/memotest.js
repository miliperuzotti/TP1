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

const textoMovimientos = document.querySelector("#movimientos");
const textoParejas = document.querySelector("#parejas");

const pantallaResultado = document.querySelector("#pantalla-resultado");
const mensajeResultado = document.querySelector("#mensaje-resultado");
const btnJugarNuevo = document.querySelector("#btn-jugar-nuevo");

// Variables que guardan las decisiones de la partida

let modoJuego = "";
let nombre1 = "";
let nombre2 = "";
let tematica = "";
let cantidadParejas = 0;
let cartas = [];
let primeraCarta = null;
let segundaCarta = null;
let bloqueado = false; //evita que se puedan seleccionar cartas mientras estamos comprobando las dos anteriores
let movimientos = 0;
let parejasEncontradas = 0;

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

//reiniciar juego
btnJugarNuevo.addEventListener("click", reiniciarJuego);


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
    
    movimientos = 0;
    parejasEncontradas = 0;

    textoMovimientos.textContent = 0;
    textoParejas.textContent = 0;

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
   carta.addEventListener("click", () => seleccionarCarta(carta));
}

//Se encarga de qué pasa cuando hacés clic en una carta
function seleccionarCarta(carta) {
    //condiciones por las que no se podria seleccionar una carta
    if (bloqueado || carta === primeraCarta || carta.classList.contains("girada")) {
        return;
    }

    carta.classList.add("girada");

    //guarda el num de la primer carta, si ya se guardo, guarda la segunda
    if (primeraCarta === null) {
        primeraCarta = carta;
    } else {
        segundaCarta = carta;
        movimientos++;
        textoMovimientos.textContent = movimientos;
        comprobarPareja();
    }
}

//Se encarga de ver si las dos cartas seleccionadas son iguales
function comprobarPareja() {
    bloqueado = true; //para que el usuario no pueda seguir seleccionando cartas

    if (primeraCarta.dataset.numero === segundaCarta.dataset.numero) {
        parejasEncontradas++;
        textoParejas.textContent = parejasEncontradas;
        primeraCarta = null;
        segundaCarta = null;
        bloqueado = false;

        if (parejasEncontradas === cantidadParejas) {
    finalizarJuego();
}

    } else {
        setTimeout(() => {
            primeraCarta.classList.remove("girada");
            segundaCarta.classList.remove("girada");

            primeraCarta = null;
            segundaCarta = null;
            bloqueado = false;
        }, 1000);
    }
}

function finalizarJuego() {
    mensajeResultado.textContent = "¡Ganaste!";

    cambiarPantalla(pantallaJuego, pantallaResultado);
}

function reiniciarJuego() {
    modoJuego = "";
    nombre1 = "";
    nombre2 = "";
    tematica = "";
    cantidadParejas = 0;
    cartas = [];
    primeraCarta = null;
    segundaCarta = null;
    bloqueado = false;
    movimientos = 0;
    parejasEncontradas = 0;
    cambiarPantalla(pantallaResultado, pantallaModo);
}
