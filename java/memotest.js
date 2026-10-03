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
const movimientosGeneral = document.querySelector("#movimientos-general");
const parejasGeneral = document.querySelector("#parejas-general");
const textoTurno = document.querySelector("#turno");
const textoMovimientosJugador = document.querySelector("#movimientos-jugador");
const textoParejasJugador = document.querySelector("#parejas-jugador");

const pantallaResultado = document.querySelector("#pantalla-resultado");
const mensajeResultado = document.querySelector("#mensaje-resultado");
const parejasResultado = document.querySelector("#parejas-resultado");
const puntaje = document.querySelector("#puntaje");
const nombrePuntaje = document.querySelector("#nombre-puntaje");
const btnEnviarPuntaje = document.querySelector("#btn-enviar-puntaje");
const btnJugarNuevo = document.querySelector("#btn-jugar-nuevo");


// Variables que guardan las decisiones de la partida

let modoJuego = "";

let nombre1 = "";

let nombre2 = "";

let jugadorActual = 1;

let tematica = "";

let cantidadParejas = 0;

let cartas = [];

let primeraCarta = null;

let segundaCarta = null;

let bloqueado = false; // evita que se puedan seleccionar cartas mientras estamos comprobando las dos anteriores

let movimientos = 0;

let parejasEncontradas = 0;

let parejasJugador1 = 0;

let parejasJugador2 = 0;

let movimientosJugador1 = 0;

let movimientosJugador2 = 0;

let movimientosMaximos = 0;


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


// Elegir dificultad
btnFacil.addEventListener("click", () => iniciarJuego(10));
btnMedio.addEventListener("click", () => iniciarJuego(15));
btnDificil.addEventListener("click", () => iniciarJuego(20));

btnEnviarPuntaje.addEventListener("click", enviarPuntaje);

// Reiniciar juego
btnJugarNuevo.addEventListener("click", reiniciarJuego);


// FUNCIONES

function cambiarPantalla(actual, siguiente) {
    actual.style.display = "none";
    siguiente.style.display = "flex";
}


// Verificacion nombres
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

    // Definir el máximo de movimientos según la dificultad
    if (cantidadParejas === 10) {
        movimientosMaximos = 15;
    } else if (cantidadParejas === 15) {
        movimientosMaximos = 23;
    } else {
        movimientosMaximos = 30;
    }

    // Reiniciar los valores de la partida
    movimientos = 0;
    parejasEncontradas = 0;
    jugadorActual = 1;
    parejasJugador1 = 0;
    parejasJugador2 = 0;
    movimientosJugador1 = 0;
    movimientosJugador2 = 0;
    primeraCarta = null;
    segundaCarta = null;
    bloqueado = false;
    btnEnviarPuntaje.disabled = false;
    nombrePuntaje.value = "";

    textoMovimientos.textContent = 0;
    textoParejas.textContent = 0;

    if (modoJuego === "multijugador") {
        movimientosGeneral.style.display = "none";
        parejasGeneral.style.display = "none";
    } else {
        movimientosGeneral.style.display = "block";
        parejasGeneral.style.display = "block";
    }

    actualizarTurno();
    actualizarMovimientosJugador();
    actualizarParejasJugador();

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


// Se encarga de qué pasa cuando hacés clic en una carta
function seleccionarCarta(carta) {

    // Condiciones por las que no se puede seleccionar una carta
    if (bloqueado || carta === primeraCarta || carta.classList.contains("girada")) {
        return;
    }

    // Comprobar si se alcanzó el máximo de movimientos
    if (
        (modoJuego === "solo" && movimientos >= movimientosMaximos) ||
        (modoJuego === "multijugador" &&
        ((jugadorActual === 1 && movimientosJugador1 >= movimientosMaximos) ||
        (jugadorActual === 2 && movimientosJugador2 >= movimientosMaximos)))
    ) {
        return;
    }

    carta.classList.add("girada");

    if (primeraCarta === null) {
        primeraCarta = carta;
    } else {
        segundaCarta = carta;

        // Cada dos cartas seleccionadas cuenta como un movimiento
        movimientos++;

        if (modoJuego === "multijugador") {
            if (jugadorActual === 1) {
                movimientosJugador1++;
            } else {
                movimientosJugador2++;
            }

            actualizarMovimientosJugador();
        } else {
            textoMovimientos.textContent = `${movimientos}/${movimientosMaximos} movimientos`;
        }

        comprobarPareja();
    }
}


// Se encarga de ver si las dos cartas seleccionadas son iguales
function comprobarPareja() {
    bloqueado = true; // evita que se puedan seleccionar cartas

    if (primeraCarta.dataset.numero === segundaCarta.dataset.numero) {

        parejasEncontradas++;
        textoParejas.textContent = parejasEncontradas;

        if (modoJuego === "multijugador") {
            if (jugadorActual === 1) {
                parejasJugador1++;
            } else {
                parejasJugador2++;
            }

            actualizarParejasJugador();
        }

        primeraCarta = null;
        segundaCarta = null;
        bloqueado = false;

        // Si se encontraron todas las parejas, termina el juego
        if (parejasEncontradas === cantidadParejas) {
            finalizarJuego();
            return;
        }

        // En modo solo, si llegó al máximo, termina el juego
        if (modoJuego === "solo") {
            if (movimientos >= movimientosMaximos) {
                finalizarJuego();
            }

            return;
        }

        // En multijugador, si el jugador llegó al máximo,
        // pasa el turno al otro jugador
        if (
            (jugadorActual === 1 && movimientosJugador1 >= movimientosMaximos) ||
            (jugadorActual === 2 && movimientosJugador2 >= movimientosMaximos)
        ) {
            jugadorActual = jugadorActual === 1 ? 2 : 1;
            actualizarTurno();
        }

        // Si ambos jugadores llegaron al máximo, termina el juego
        if (
            movimientosJugador1 >= movimientosMaximos &&
            movimientosJugador2 >= movimientosMaximos
        ) {
            finalizarJuego();
        }

    } else {
        setTimeout(() => {

            primeraCarta.classList.remove("girada");
            segundaCarta.classList.remove("girada");

            primeraCarta = null;
            segundaCarta = null;

            bloqueado = false;

            // En modo solo, si llegó al máximo, termina el juego
            if (modoJuego === "solo") {
                if (movimientos >= movimientosMaximos) {
                    finalizarJuego();
                }

                return;
            }

            // En multijugador, cambia el turno cuando no hay pareja
            jugadorActual = jugadorActual === 1 ? 2 : 1;
            actualizarTurno();

            // Si ambos jugadores llegaron al máximo, termina el juego
            if (
                movimientosJugador1 >= movimientosMaximos &&
                movimientosJugador2 >= movimientosMaximos
            ) {
                finalizarJuego();
            }

        }, 1000);
    }
}


// Turnos multijugador
const actualizarTurno = () => {
    if (modoJuego === "multijugador") {
        textoTurno.textContent = `Turno de ${jugadorActual === 1 ? nombre1 : nombre2}`;
    } else {
        textoTurno.textContent = "";
    }
};


const actualizarMovimientosJugador = () => {
    if (modoJuego === "multijugador") {
        textoMovimientosJugador.textContent =
            `${nombre1}: ${movimientosJugador1}/${movimientosMaximos} movimientos | ${nombre2}: ${movimientosJugador2}/${movimientosMaximos} movimientos`;
    } else {
        textoMovimientosJugador.textContent = "";
        textoMovimientos.textContent = `${movimientos}/${movimientosMaximos} movimientos`;
    }
};


const actualizarParejasJugador = () => {
    if (modoJuego === "multijugador") {
        textoParejasJugador.textContent =
            `${nombre1}: ${parejasJugador1} parejas | ${nombre2}: ${parejasJugador2} parejas`;
    } else {
        textoParejasJugador.textContent = "";
    }
};


function finalizarJuego() {

    if (modoJuego === "solo") {

        if (parejasEncontradas === cantidadParejas) {
            mensajeResultado.textContent = "¡Ganaste!";
        } else {
            mensajeResultado.textContent = "¡Se terminaron los movimientos!";
        }

        parejasResultado.textContent =
            `Parejas encontradas: ${parejasEncontradas}`;

        nombrePuntaje.style.display = "block";
        btnEnviarPuntaje.textContent = "Enviar puntaje";

    } else {

        if (parejasJugador1 > parejasJugador2) {
            mensajeResultado.textContent = `¡Ganó ${nombre1}!`;
        } else if (parejasJugador2 > parejasJugador1) {
            mensajeResultado.textContent = `¡Ganó ${nombre2}!`;
        } else {
            mensajeResultado.textContent = "¡EMPATE!";
        }

        parejasResultado.textContent =
            `${nombre1}: ${parejasJugador1} parejas | ${nombre2}: ${parejasJugador2} parejas`;

        nombrePuntaje.style.display = "none";
        btnEnviarPuntaje.textContent = "Enviar puntajes";
    }

    cambiarPantalla(pantallaJuego, pantallaResultado);
}

function enviarPuntaje() {

    let puntajesMemotest = JSON.parse(
        localStorage.getItem("puntajesMemotest") || "[]"
    );

    if (modoJuego === "solo") {

        if (nombrePuntaje.value === "") {
            alert("Ingresá tu nombre.");
            return;
        }

        puntajesMemotest.push({
            nombre: nombrePuntaje.value,
            parejas: parejasEncontradas
        });

    } else {

        puntajesMemotest.push({
            nombre: nombre1,
            parejas: parejasJugador1
        });

        puntajesMemotest.push({
            nombre: nombre2,
            parejas: parejasJugador2
        });
    }

    localStorage.setItem(
        "puntajesMemotest",
        JSON.stringify(puntajesMemotest)
    );

    alert("¡Puntaje enviado!");

    btnEnviarPuntaje.disabled = true;
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
    parejasJugador1 = 0;
    parejasJugador2 = 0;
    movimientosJugador1 = 0;
    movimientosJugador2 = 0;
    movimientosMaximos = 0;
    jugadorActual = 1;

    cambiarPantalla(pantallaResultado, pantallaModo);
}