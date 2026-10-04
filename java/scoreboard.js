// TABLA MEMOTEST
const puntajesMemotest = JSON.parse(
    localStorage.getItem("puntajesMemotest") || "[]"
);

const listaMemotest = document.querySelector("#lista-puntajes-memotest");

puntajesMemotest.forEach((jugador, indice) => {
    const fila = document.createElement("tr");

    fila.innerHTML = `
        <td>${indice + 1}</td>
        <td>${jugador.nombre}</td>
        <td>${jugador.parejas}</td>
    `;

    listaMemotest.appendChild(fila);
});


const btnBorrarPuntajesMemotest =
    document.querySelector("#btn-borrar-puntajes-memotest");

btnBorrarPuntajesMemotest.addEventListener("click", () => {

    const confirmar = confirm(
        "¿Seguro que querés borrar todos los puntajes del Memotest?"
    );

    if (confirmar) {
        localStorage.removeItem("puntajesMemotest");
        location.reload();
    }
});