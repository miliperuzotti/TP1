// ==========================================
// TABLA DE PUNTAJES - JUEGO DE DADOS
// ==========================================

// Leemos los resultados guardados por dados.js.
const puntajesDados = JSON.parse(
    localStorage.getItem("puntajesDados") || "[]"
);

// Buscamos el cuerpo de la tabla de Dados.
const listaDados = document.getElementById("lista-puntajes-dados");

if (listaDados) {

    // Ordenamos los resultados de mayor a menor puntaje.
    const dadosOrdenados = [...puntajesDados].sort(
        (a, b) => b.puntaje - a.puntaje
    );

    // Creamos una fila por cada jugador.
    dadosOrdenados.forEach((jugador, indice) => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${indice + 1}</td>
            <td>${jugador.nombre}</td>
            <td>${jugador.puntaje} / 297</td>
        `;

        listaDados.appendChild(fila);
    });
}

// Botón para borrar solamente los resultados de Dados.
const btnBorrarDados = document.getElementById(
    "btn-borrar-puntajes-dados"
);

if (btnBorrarDados) {
    btnBorrarDados.addEventListener("click", () => {

        if (confirm("¿Querés borrar todos los puntajes de Dados?")) {
            localStorage.removeItem("puntajesDados");
            location.reload();
        }
    });
}


// ==========================================
// TABLA DE PUNTAJES - JUEGO DE PREGUNTAS
// ==========================================

// Leemos los resultados guardados por preguntas.js.
const puntajesPreguntas = JSON.parse(
    localStorage.getItem("puntajesPreguntas") || "[]"
);

// Buscamos el cuerpo de la tabla de Preguntas.
// Conservamos el identificador que ya tenía tu HTML.
const listaPreguntas = document.getElementById("lista-puntajes");

if (listaPreguntas) {

    // Ordenamos de mayor a menor puntaje.
    const preguntasOrdenadas = [...puntajesPreguntas].sort(
        (a, b) => b.puntaje - a.puntaje
    );

    preguntasOrdenadas.forEach((jugador, indice) => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${indice + 1}</td>
            <td>${jugador.nombre}</td>
            <td>${jugador.puntaje} pts</td>
        `;

        listaPreguntas.appendChild(fila);
    });
}

// Botón para borrar solamente los resultados de Preguntas.
const btnBorrarPreguntas = document.getElementById(
    "btn-borrar-puntajes"
);

if (btnBorrarPreguntas) {
    btnBorrarPreguntas.addEventListener("click", () => {

        if (confirm("¿Querés borrar todos los puntajes de Preguntas?")) {
            localStorage.removeItem("puntajesPreguntas");
            location.reload();
        }
    });
}


// ==========================================
// TABLA DE PUNTAJES - MEMOTEST
// ==========================================

// Leemos los resultados guardados por memotest.js.
const puntajesMemotest = JSON.parse(
    localStorage.getItem("puntajesMemotest") || "[]"
);

// Buscamos el cuerpo de la tabla de Memotest.
const listaMemotest = document.getElementById(
    "lista-puntajes-memotest"
);

if (listaMemotest) {

    puntajesMemotest.forEach((jugador, indice) => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${indice + 1}</td>
            <td>${jugador.nombre}</td>
            <td>${jugador.parejas}</td>
        `;

        listaMemotest.appendChild(fila);
    });
}

// Botón para borrar solamente los resultados de Memotest.
const btnBorrarMemotest = document.getElementById(
    "btn-borrar-puntajes-memotest"
);

if (btnBorrarMemotest) {
    btnBorrarMemotest.addEventListener("click", () => {

        if (confirm("¿Querés borrar todos los puntajes de Memotest?")) {
            localStorage.removeItem("puntajesMemotest");
            location.reload();
        }
    });
}