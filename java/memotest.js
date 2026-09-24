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

const btnFacil = document.querySelector("#btn-facil");
const btnMedio = document.querySelector("#btn-medio");
const btnDificil = document.querySelector("#btn-dificil");

const pantallaJuego = document.querySelector("#pantalla-juego");
const tablero = document.querySelector("#tablero");


// Variables que guardan las decisiones de la partida

let modoJuego = "";

let nombre1 = "";
let nombre2 = "";

let tematica = "";

let cantidadParejas = 0;

let cartas = [];

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

// Cuando se hace click en "Fácil"

btnFacil.addEventListener("click", function() {

    cantidadParejas = 10;

    generarCartas();
    mezclarCartas();
    mostrarCartas();

    pantallaDificultad.style.display = "none";
    pantallaJuego.style.display = "flex";
});


// Cuando se hace click en "Medio"

btnMedio.addEventListener("click", function() {

    cantidadParejas = 15;
    
    generarCartas();
    mezclarCartas();
    mostrarCartas();

    pantallaDificultad.style.display = "none";
    pantallaJuego.style.display = "flex";
});


// Cuando se hace click en "Difícil"

btnDificil.addEventListener("click", function() {

    cantidadParejas = 20;
   
    generarCartas();
    mezclarCartas();
    mostrarCartas();

    pantallaDificultad.style.display = "none";
    pantallaJuego.style.display = "flex";
});

// Generar las parejas (se guardan pares pero en orden)
function generarCartas() {

    cartas = [];

    for (let i = 1; i <= cantidadParejas; i++) {

        cartas.push(i);
        cartas.push(i);

    }

    console.log(cartas);
}

function mezclarCartas() {

    cartas.sort(function() {

        return Math.random() - 0.5;
    });

    console.log(cartas);
}

function mostrarCartas() {

    tablero.innerHTML = ""; //limpia el tablero
    for (let i = 0; i < cartas.length; i++) {

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
        carta.dataset.numero = cartas[i]; //dataset guarda datos dentro de un elemento html

        // Indico qué imagen tiene la carta
        imagen.src = "img/memotest/" + tematica + "/" + cartas[i] + ".jpg"; /*crea la ruta que tiene que elegir la imagen 
        segun la eleccion del usuario*/
        
        // Agrego la imagen al frente
        frente.append(imagen);

        // Agrego las dos caras a la carta
        carta.append(frente); 
        carta.append(reverso);

        // Agrego la carta al tablero
        tablero.append(carta); 

        // Giro la carta al hacer click
        carta.addEventListener("click", function() {
             carta.classList.add("girada");
            });
    } 
}
