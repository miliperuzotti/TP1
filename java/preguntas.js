// Variables globales de estado del juego
let registrosAPI = [];
let preguntasJuego = [];
let indicePreguntaActual = 0;
let puntaje = 0;
let temporizadorInterval;
let tiempoRestante = 30;

// Elementos del DOM
const pantallaInicio = document.getElementById('pantalla-inicio');
const pantallaJuego = document.getElementById('pantalla-juego');
const pantallaResultados = document.getElementById('pantalla-resultados');

const btnIniciar = document.getElementById('btn-iniciar');
const btnSiguiente = document.getElementById('btn-siguiente');
const btnReiniciar = document.getElementById('btn-reiniciar');

const numeroPreguntaEl = document.getElementById('numero-pregunta');
const categoriaPreguntaEl = document.getElementById('categoria-pregunta');
const tiempoRestanteEl = document.getElementById('tiempo-restante');
const textoPreguntaEl = document.getElementById('texto-pregunta');
const contenedorOpciones = document.getElementById('contenedor-opciones');
const mensajeFeedback = document.getElementById('mensaje-feedback');
const puntajeFinalEl = document.getElementById('puntaje-final');
const mensajeFinalEl = document.getElementById('mensaje-final');

// Event Listeners
btnIniciar.addEventListener('click', iniciarJuego);
btnSiguiente.addEventListener('click', siguientePregunta);
btnReiniciar.addEventListener('click', reiniciarJuego);

/**
 * Carga los datos del JSON local o repositorio usando Fetch y async/await
 */
async function cargarDatosAPI() {
    try {
        // Consultamos el JSON de la API
        const respuesta = await fetch('api/ministerioapi.json');
        if (!respuesta.ok) {
            throw new Error(`Error en la solicitud: ${respuesta.status}`);
        }
        const datos = await respuesta.json();
        // Accedemos al array de registros
        registrosAPI = datos.records || datos;
    } catch (error) {
        console.error('Error al cargar la API:', error);
        textoPreguntaEl.innerText = 'Ocurrió un error al cargar las preguntas. Intenta recargar la página.';
    }
}

/**
 * Prepara las 10 preguntas dinámicas a partir de los datos recibidos
 */
function generarPreguntas() {
    preguntasJuego = [];

    // Tipos de plantillas de preguntas basadas en las categorías y campos reales del JSON
    const tiposPreguntas = [
        // Categoría: Geografía Cultural (usa "provincias")
        {
            categoria: '🗺️ Geografía Cultural',
            propiedad: 'provincias',
            obtenerPregunta: (reg) => `¿A qué provincia o territorio pertenece el registro cultural "${reg.post_title}"?`
        },
        // Categoría: Paisaje Sonoro (usa "entorno")
        {
            categoria: '🌿 Paisaje Sonoro',
            propiedad: 'entorno',
            obtenerPregunta: (reg) => `¿En qué tipo de entorno fue registrado el sonido de "${reg.post_title}"?`
        },
        // Categoría: Lenguas de Argentina (usa "lenguas")
        {
            categoria: '🗣️ Lenguas de Argentina',
            propiedad: 'lenguas',
            obtenerPregunta: (reg) => `¿Con qué lengua o grupo lingüístico se vincula el registro "${reg.post_title}"?`
        }
    ];

    // Mezclar los registros completos de la API
    const registrosMezclados = [...registrosAPI].sort(() => 0.5 - Math.random());
    
    for (let reg of registrosMezclados) {
        if (preguntasJuego.length >= 10) break; // Ya armamos las 10 preguntas

        // Seleccionar una plantilla aleatoria
        const plantilla = tiposPreguntas[Math.floor(Math.random() * tiposPreguntas.length)];
        const respuestaCorrecta = reg[plantilla.propiedad];

        // Validar que el registro tenga título y que la respuesta correcta no esté vacía/indefinida
        if (!reg.post_title || !respuestaCorrecta || respuestaCorrecta.trim() === '') {
            continue; // Saltar este registro si no tiene el dato necesario
        }

        // Obtener 3 opciones incorrectas únicas que no sean iguales a la respuesta correcta
        const opcionesIncorrectas = extraerOpcionesUnicas(plantilla.propiedad, respuestaCorrecta, 3);

        // Si no hay suficientes distractoras en el JSON para este campo, saltamos al siguiente registro
        if (opcionesIncorrectas.length < 3) {
            continue;
        }

        // Unir la respuesta correcta con las 3 incorrectas y mezclar aleatoriamente
        const opcionesMezcladas = [respuestaCorrecta, ...opcionesIncorrectas].sort(() => 0.5 - Math.random());

        preguntasJuego.push({
            categoria: plantilla.categoria,
            pregunta: plantilla.obtenerPregunta(reg),
            opciones: opcionesMezcladas,
            respuestaCorrecta: respuestaCorrecta
        });
    }
}

/**
 * Extrae valores únicos válidos del dataset para usarlos como distractoras sin repetir
 */
function extraerOpcionesUnicas(propiedad, valorCorrecto, cantidadRequerida) {
    // Filtrar todos los valores de esa propiedad que existan y no sean vacíos ni iguales al correcto
    const todosLosValores = registrosAPI
        .map(r => r[propiedad])
        .filter(val => val && typeof val === 'string' && val.trim() !== '' && val.trim() !== valorCorrecto.trim());

    // Eliminar duplicados usando Set
    const valoresUnicos = [...new Set(todosLosValores)];

    // Mezclar y tomar exactamente la cantidad requerida
    return valoresUnicos.sort(() => 0.5 - Math.random()).slice(0, cantidadRequerida);
}

/**
 * Inicia la partida
 */
async function iniciarJuego() {
    if (registrosAPI.length === 0) {
        await cargarDatosAPI();
    }
    
    if (registrosAPI.length === 0) {
        alert('No se pudieron cargar los datos de la API.');
        return;
    }

    generarPreguntas();
    indicePreguntaActual = 0;
    puntaje = 0;

    pantallaInicio.style.display = 'none';
    pantallaResultados.style.display = 'none';
    pantallaJuego.style.display = 'block';

    mostrarPregunta();
}

/**
 * Muestra la pregunta actual e inicia el temporizador
 */
function mostrarPregunta() {
    resetearEstadoPregunta();
    
    const preguntaObj = preguntasJuego[indicePreguntaActual];

    numeroPreguntaEl.innerText = `Pregunta ${indicePreguntaActual + 1}/10`;
    categoriaPreguntaEl.innerText = preguntaObj.categoria;
    textoPreguntaEl.innerText = preguntaObj.pregunta;

    preguntaObj.opciones.forEach(opcion => {
        const boton = document.createElement('button');
        boton.innerText = opcion;
        boton.classList.add('btn-opcion');
        boton.addEventListener('click', () => seleccionarRespuesta(opcion, preguntaObj.respuestaCorrecta));
        contenedorOpciones.appendChild(boton);
    });

    iniciarTemporizador();
}

/**
 * Reinicia elementos entre preguntas
 */
function resetearEstadoPregunta() {
    clearInterval(temporizadorInterval);
    tiempoRestante = 30;
    tiempoRestanteEl.innerText = tiempoRestante;
    mensajeFeedback.innerText = '';
    btnSiguiente.style.display = 'none';
    contenedorOpciones.innerHTML = '';
}

/**
 * Controla la cuenta regresiva de 30 segundos
 */
function iniciarTemporizador() {
    temporizadorInterval = setInterval(() => {
        tiempoRestante--;
        tiempoRestanteEl.innerText = tiempoRestante;

        if (tiempoRestante <= 0) {
            clearInterval(temporizadorInterval);
            manejarTiempoAgotado();
        }
    }, 1000);
}

/**
 * Evalúa la opción seleccionada por el usuario
 */
function seleccionarRespuesta(opcionSeleccionada, respuestaCorrecta) {
    clearInterval(temporizadorInterval);

    const botones = contenedorOpciones.querySelectorAll('.btn-opcion');
    botones.forEach(btn => {
        btn.disabled = true;
        if (btn.innerText === respuestaCorrecta) {
            btn.classList.add('correcta');
        }
        if (btn.innerText === opcionSeleccionada && opcionSeleccionada !== respuestaCorrecta) {
            btn.classList.add('incorrecta');
        }
    });

    if (opcionSeleccionada === respuestaCorrecta) {
        puntaje += 10;
        mensajeFeedback.innerText = '¡Correcto! (+10 pts)';
        mensajeFeedback.style.color = '#5cb85c';
    } else {
        mensajeFeedback.innerText = `Incorrecto. La respuesta era: ${respuestaCorrecta}`;
        mensajeFeedback.style.color = '#d9534f';
    }

    mostrarBotonSiguiente();
}

/**
 * Maneja el caso en que se agoten los 30 segundos
 */
function manejarTiempoAgotado() {
    const preguntaObj = preguntasJuego[indicePreguntaActual];
    const botones = contenedorOpciones.querySelectorAll('.btn-opcion');

    botones.forEach(btn => {
        btn.disabled = true;
        if (btn.innerText === preguntaObj.respuestaCorrecta) {
            btn.classList.add('correcta');
        }
    });

    mensajeFeedback.innerText = `¡Tiempo agotado! La respuesta correcta era: ${preguntaObj.respuestaCorrecta}`;
    mensajeFeedback.style.color = '#d9534f';

    mostrarBotonSiguiente();
}

function mostrarBotonSiguiente() {
    if (indicePreguntaActual < preguntasJuego.length - 1) {
        btnSiguiente.innerText = 'Siguiente Pregunta';
    } else {
        btnSiguiente.innerText = 'Ver Resultados';
    }
    btnSiguiente.style.display = 'inline-block';
}

function siguientePregunta() {
    indicePreguntaActual++;
    if (indicePreguntaActual < preguntasJuego.length) {
        mostrarPregunta();
    } else {
        mostrarResultados();
    }
}

function mostrarResultados() {
    pantallaJuego.style.display = 'none';
    pantallaResultados.style.display = 'block';

    puntajeFinalEl.innerText = puntaje;

    if (puntaje >= 80) {
        mensajeFinalEl.innerText = '¡Excelente conocimiento de la cultura e identidad argentina!';
    } else if (puntaje >= 50) {
        mensajeFinalEl.innerText = '¡Buen trabajo! Conoces bastante sobre los sonidos y lenguas del país.';
    } else {
        mensajeFinalEl.innerText = 'Sigue explorando y aprendiendo más sobre nuestro patrimonio cultural.';
    }
}

function reiniciarJuego() {
    iniciarJuego();
}