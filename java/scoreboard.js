const puntajes = JSON.parse(
    localStorage.getItem('puntajes') || '[]'
);

const lista = document.getElementById('lista-puntajes');

puntajes.forEach((jugador, indice) => {

    const fila = document.createElement('tr');

    fila.innerHTML = `
        <td>${indice + 1}</td>
        <td>${jugador.nombre}</td>
        <td>${jugador.puntaje} / 100</td>
    `;

    lista.appendChild(fila);
});