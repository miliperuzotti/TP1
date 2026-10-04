// ==========================================
// TABLA TRIVIA DE CULTURA ARGENTINA
// ==========================================
const puntajesTrivia = JSON.parse(
    localStorage.getItem("rankingTrivia") || "[]"
);

const listaTrivia = document.querySelector("#lista-puntajes");

if (listaTrivia) {
    puntajesTrivia.forEach((jugador, indice) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${indice + 1}</td>
            <td>${jugador.nombre}</td>
            <td>${jugador.puntaje} pts</td>
        `;
        listaTrivia.appendChild(fila);
    });
}

const btnBorrarPuntajesTrivia = document.querySelector("#btn-borrar-puntajes");

if (btnBorrarPuntajesTrivia) {
    btnBorrarPuntajesTrivia.addEventListener("click", () => {
        const confirmar = confirm(
            "¿Seguro que querés borrar todos los puntajes de la Trivia?"
        );

        if (confirmar) {
            localStorage.removeItem("rankingTrivia");
            location.reload();
        }
    });
}

// ==========================================
// TABLA MEMOTEST
// ==========================================
const puntajesMemotest = JSON.parse(
    localStorage.getItem("puntajesMemotest") || "[]"
);

const listaMemotest = document.querySelector("#lista-puntajes-memotest");

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

const btnBorrarPuntajesMemotest = document.querySelector("#btn-borrar-puntajes-memotest");

if (btnBorrarPuntajesMemotest) {
    btnBorrarPuntajesMemotest.addEventListener("click", () => {
        const confirmar = confirm(
            "¿Seguro que querés borrar todos los puntajes del Memotest?"
        );

        if (confirmar) {
            localStorage.removeItem("puntajesMemotest");
            location.reload();
        }
    });
}