// ===============================
// JUGADORES
// ===============================

const jugadores = [

    {
        nombre: "Franco Armani",
        dorsal: 1,
        imagen: "01Armani.jpg",
        defensa: 82,
        pase: 25,
        ataque: 15
    },

    {
        nombre: "Juan Foyth",
        dorsal: 2,
        imagen: "02Foyth.jpg",
        defensa: 81,
        pase: 63,
        ataque: 42
    },

    {
        nombre: "Nicolás Tagliafico",
        dorsal: 3,
        imagen: "03Tagliafico.jpg",
        defensa: 84,
        pase: 64,
        ataque: 55
    },

    {
        nombre: "Gonzalo Montiel",
        dorsal: 4,
        imagen: "04Montiel.jpg",
        defensa: 81,
        pase: 78,
        ataque: 58
    },

    {
        nombre: "Leandro Paredes",
        dorsal: 5,
        imagen: "05Paredes.jpg",
        defensa: 62,
        pase: 89,
        ataque: 54
    },

    {
        nombre: "Germán Pezzella",
        dorsal: 6,
        imagen: "06Pezzella.jpg",
        defensa: 82,
        pase: 55,
        ataque: 38
    },

    {
        nombre: "Rodrigo De Paul",
        dorsal: 7,
        imagen: "07DePaul.jpg",
        defensa: 72,
        pase: 86,
        ataque: 67
    },

    {
        nombre: "Marcos Acuña",
        dorsal: 8,
        imagen: "08Acuna.jpg",
        defensa: 78,
        pase: 74,
        ataque: 62
    },

    {
        nombre: "Julián Álvarez",
        dorsal: 9,
        imagen: "09Alvarez.jpg",
        defensa: 45,
        pase: 72,
        ataque: 88
    },

    {
        nombre: "Lionel Messi",
        dorsal: 10,
        imagen: "10Messi.jpg",
        defensa: 42,
        pase: 89,
        ataque: 99
    },

    {
        nombre: "Ángel Di María",
        dorsal: 11,
        imagen: "11DiMaria.jpg",
        defensa: 43,
        pase: 86,
        ataque: 91
    },

    {
        nombre: "Lisandro Martínez",
        dorsal: 12,
        imagen: "12Licha.jpg",
        defensa: 86,
        pase: 67,
        ataque: 43
    },

    {
        nombre: "Cristian Romero",
        dorsal: 13,
        imagen: "13Romero.jpg",
        defensa: 88,
        pase: 63,
        ataque: 47
    },

    {
        nombre: "Exequiel Palacios",
        dorsal: 14,
        imagen: "14Palacios.jpg",
        defensa: 74,
        pase: 82,
        ataque: 58
    },

    {
        nombre: "Ángel Correa",
        dorsal: 15,
        imagen: "15Correa.jpg",
        defensa: 43,
        pase: 78,
        ataque: 80
    },

    {
        nombre: "Thiago Almada",
        dorsal: 16,
        imagen: "16Almada.jpg",
        defensa: 45,
        pase: 84,
        ataque: 78
    },

    {
        nombre: "Nahuel Molina",
        dorsal: 17,
        imagen: "17Molina.jpg",
        defensa: 78,
        pase: 68,
        ataque: 54
    },

    {
        nombre: "Guido Rodríguez",
        dorsal: 18,
        imagen: "18Rodriguez.jpg",
        defensa: 83,
        pase: 76,
        ataque: 42
    },

    {
        nombre: "Nicolás Otamendi",
        dorsal: 19,
        imagen: "19Otamendi.jpg",
        defensa: 86,
        pase: 55,
        ataque: 52
    },

    {
        nombre: "Alexis Mac Allister",
        dorsal: 20,
        imagen: "20MacAllister.jpg",
        defensa: 76,
        pase: 91,
        ataque: 69
    },

    {
        nombre: "Paulo Dybala",
        dorsal: 21,
        imagen: "21Dybala.jpg",
        defensa: 40,
        pase: 87,
        ataque: 86
    },

    {
        nombre: "Lautaro Martínez",
        dorsal: 22,
        imagen: "22Martinez.jpg",
        defensa: 54,
        pase: 68,
        ataque: 92
    },

    {
        nombre: "Emiliano Martínez",
        dorsal: 23,
        imagen: "23Dibu.jpg",
        defensa: 97,
        pase: 38,
        ataque: 12
    },

    {
        nombre: "Enzo Fernández",
        dorsal: 24,
        imagen: "24Fernandez.jpg",
        defensa: 76,
        pase: 94,
        ataque: 70
    }

];


// ===============================
// VARIABLES DEL JUEGO
// ===============================

let sumaDados = 0;
let dadosTirados = 0;

const MAX_DADOS = 4;

let jugadorCreado = {
    ataque: null,
    pase: null,
    defensa: null
};

let scoreboard = [];


// ===============================
// ELEMENTOS DEL HTML
// ===============================

const dado1 = document.getElementById("dado1");
const dado2 = document.getElementById("dado2");
const dado3 = document.getElementById("dado3");
const dado4 = document.getElementById("dado4");

const suma = document.getElementById("suma");

const botonTirar = document.getElementById("tirar");

const mensaje = document.getElementById("mensaje");

const jugadorActual = document.getElementById("jugador-actual");
const jugadorCreadoHTML = document.getElementById("jugador-creado");
const zonaFormulario = document.getElementById("zona-formulario");
const scoreboardHTML = document.getElementById("scoreboard");


// ===============================
// TIRAR UN DADO
// ===============================

function tirarDado() {

    // No permitir más de 4 dados
    if (dadosTirados >= MAX_DADOS) {
        mensaje.textContent = "Ya tiraste los 4 dados. Elegí una característica.";
        return;
    }

    // Número aleatorio entre 1 y 6
    const resultado = Math.floor(Math.random() * 6) + 1;

    // Acumular resultado
    sumaDados += resultado;

    dadosTirados++;

    // Mostrar resultado en el dado correspondiente
    if (dadosTirados === 1) {
        dado1.textContent = resultado;
    }

    if (dadosTirados === 2) {
        dado2.textContent = resultado;
    }

    if (dadosTirados === 3) {
        dado3.textContent = resultado;
    }

    if (dadosTirados === 4) {
        dado4.textContent = resultado;
    }

    // Mostrar suma
    suma.textContent = sumaDados;

    // Mostrar jugador correspondiente
    mostrarJugador();

    // Si ya tiró los 4, no puede seguir tirando
    if (dadosTirados === MAX_DADOS) {
        botonTirar.disabled = true;
        mensaje.textContent = "Llegaste al máximo de 4 dados. Elegí una característica.";
    }
}


// ===============================
// MOSTRAR JUGADOR
// ===============================

function mostrarJugador() {

    const jugador = jugadores.find(jugador => jugador.dorsal === sumaDados);

    if (!jugador) {
        jugadorActual.innerHTML = "";
        return;
    }

    jugadorActual.innerHTML = `
        <div class="carta-jugador">

            <img 
                src="img/juegoDados/jugadores/${jugador.imagen}" 
                alt="${jugador.nombre}"
            >

            <h2>${jugador.nombre}</h2>

            <p>Dorsal: ${jugador.dorsal}</p>

            <div class="caracteristicas">

                <button 
                    onclick="guardarCaracteristica('ataque', ${jugador.ataque})"
                    ${jugadorCreado.ataque !== null ? "disabled" : ""}
                >
                    Ataque: ${jugador.ataque}
                </button>

                <button 
                    onclick="guardarCaracteristica('pase', ${jugador.pase})"
                    ${jugadorCreado.pase !== null ? "disabled" : ""}
                >
                    Pase: ${jugador.pase}
                </button>

                <button 
                    onclick="guardarCaracteristica('defensa', ${jugador.defensa})"
                    ${jugadorCreado.defensa !== null ? "disabled" : ""}
                >
                    Defensa: ${jugador.defensa}
                </button>

            </div>

        </div>
    `;
}


// ===============================
// GUARDAR CARACTERÍSTICA
// ===============================

function guardarCaracteristica(estadistica, valor) {

    // Guardar la característica elegida
    jugadorCreado[estadistica] = valor;

    mensaje.textContent = `Elegiste ${estadistica}: ${valor}`;

    // Mostrar cómo va quedando el jugador
    actualizarJugadorCreado();

    // Comprobar si ya eligió las 3
    if (jugadorCompleto()) {
        finalizarJuego();
        return;
    }

    // Si todavía faltan características,
    // reiniciar los dados
    reiniciarDados();
}


// ===============================
// MOSTRAR JUGADOR CREADO
// ===============================

function actualizarJugadorCreado() {

    jugadorCreadoHTML.innerHTML = `
        <h2>Tu jugador</h2>

        <p>Ataque: ${
            jugadorCreado.ataque !== null
            ? jugadorCreado.ataque
            : "-"
        }</p>

        <p>Pase: ${
            jugadorCreado.pase !== null
            ? jugadorCreado.pase
            : "-"
        }</p>

        <p>Defensa: ${
            jugadorCreado.defensa !== null
            ? jugadorCreado.defensa
            : "-"
        }</p>
    `;
}


// ===============================
// COMPROBAR SI ESTÁ COMPLETO
// ===============================

function jugadorCompleto() {

    return (
        jugadorCreado.ataque !== null &&
        jugadorCreado.pase !== null &&
        jugadorCreado.defensa !== null
    );
}


// ===============================
// REINICIAR DADOS
// ===============================

function reiniciarDados() {

    sumaDados = 0;
    dadosTirados = 0;

    dado1.textContent = "?";
    dado2.textContent = "?";
    dado3.textContent = "?";
    dado4.textContent = "?";

    suma.textContent = "0";

    botonTirar.disabled = false;

    jugadorActual.innerHTML = "";

    mensaje.textContent = "Tirá un dado para buscar otra característica.";
}


// ===============================
// FINALIZAR CREACIÓN
// ===============================

function finalizarJuego() {

    botonTirar.disabled = true;

    jugadorActual.innerHTML = "";

    const puntaje =
        jugadorCreado.ataque +
        jugadorCreado.pase +
        jugadorCreado.defensa;

    mostrarFormulario(puntaje);
}


// ===============================
// MOSTRAR FORMULARIO
// ===============================

function mostrarFormulario(puntaje) {

    zonaFormulario.innerHTML = `
        <h2>¡Creaste tu jugador!</h2>

        <p>Puntaje total: <strong>${puntaje}</strong></p>

        <form id="form-jugador">

            <label for="nombre-jugador">
                Nombre:
            </label>

            <input 
                type="text" 
                id="nombre-jugador" 
                required
            >

            <label for="dorsal-jugador">
                Dorsal:
            </label>

            <input 
                type="number" 
                id="dorsal-jugador" 
                min="1" 
                max="99" 
                required
            >

            <button type="submit">
                Guardar jugador
            </button>

        </form>
    `;

    const formulario = document.getElementById("form-jugador");

    formulario.addEventListener("submit", function(evento) {

        evento.preventDefault();

        const nombre = document.getElementById("nombre-jugador").value;
        const dorsal = document.getElementById("dorsal-jugador").value;

        const nuevoJugador = {
            nombre: nombre,
            dorsal: dorsal,
            ataque: jugadorCreado.ataque,
            pase: jugadorCreado.pase,
            defensa: jugadorCreado.defensa,
            puntaje: puntaje
        };

        scoreboard.push(nuevoJugador);

        mostrarScoreboard();

        formulario.remove();

        mostrarBotonNuevaPartida();
    });
}


// ===============================
// SCOREBOARD
// ===============================

function mostrarScoreboard() {

    const jugadoresOrdenados = [...scoreboard].sort(
        (a, b) => b.puntaje - a.puntaje
    );

    scoreboardHTML.innerHTML = `
        <h2>Tabla de puntajes</h2>

        <ol>
            ${jugadoresOrdenados.map(jugador => `
                <li>
                    <strong>${jugador.nombre}</strong>
                    — Dorsal ${jugador.dorsal}
                    — Ataque: ${jugador.ataque}
                    — Pase: ${jugador.pase}
                    — Defensa: ${jugador.defensa}
                    — <strong>${jugador.puntaje} puntos</strong>
                </li>
            `).join("")}
        </ol>
    `;
}


// ===============================
// JUGAR DE NUEVO
// ===============================

function mostrarBotonNuevaPartida() {

    zonaFormulario.innerHTML += `
        <button id="nueva-partida">
            Jugar de nuevo
        </button>
    `;

    document
        .getElementById("nueva-partida")
        .addEventListener("click", nuevaPartida);
}


// ===============================
// NUEVA PARTIDA
// ===============================

function nuevaPartida() {

    jugadorCreado = {
        ataque: null,
        pase: null,
        defensa: null
    };

    zonaFormulario.innerHTML = "";

    jugadorCreadoHTML.innerHTML = "";

    mensaje.textContent = "";

    reiniciarDados();
}


// ===============================
// EVENTO DEL BOTÓN
// ===============================

botonTirar.addEventListener("click", tirarDado);