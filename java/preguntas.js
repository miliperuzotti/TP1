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
const nombreJugadorEl = document.getElementById('nombre-jugador');
const btnGuardarPuntaje = document.getElementById('btn-guardar-puntaje');

// Event Listeners
btnIniciar.addEventListener('click', iniciarJuego);
btnSiguiente.addEventListener('click', siguientePregunta);
btnReiniciar.addEventListener('click', reiniciarJuego);
btnGuardarPuntaje.addEventListener('click', guardarPuntaje);

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
        // Accedemos al array de registros y decodificamos entidades HTML
        // (por ejemplo, &#8211; -> –) para que se muestren correctamente.
        registrosAPI = datos.records || datos;
        registrosAPI = registrosAPI.map(reg => {
            const registroDecodificado = {};
            Object.entries(reg).forEach(([clave, valor]) => {
                if (Array.isArray(valor)) {
                    registroDecodificado[clave] = valor.map(v =>
                        typeof v === 'string' ? decodificarHTML(v) : v
                    );
                } else if (typeof valor === 'string') {
                    registroDecodificado[clave] = decodificarHTML(valor);
                } else {
                    registroDecodificado[clave] = valor;
                }
            });
            return registroDecodificado;
        });
    } catch (error) {
        console.error('Error al cargar la API:', error);
        textoPreguntaEl.innerText = 'Ocurrió un error al cargar las preguntas. Intenta recargar la página.';
    }
}

/**
 * Convierte entidades HTML (&amp;, &#8211;, &quot;, etc.) a texto normal.
 */
function decodificarHTML(texto) {
    // La API devuelve algunas cadenas con entidades HTML, por ejemplo
    // "&#8211;" en lugar de "–". Las decodificamos explícitamente
    // para que se vean correctamente tanto en preguntas como en opciones.
    let resultado = String(texto);

    // Decodificar entidades numéricas decimales y hexadecimales.
    resultado = resultado.replace(/&#(\d+);/g, (_, codigo) => {
        const numero = Number(codigo);
        return Number.isFinite(numero) ? String.fromCodePoint(numero) : _;
    });
    resultado = resultado.replace(/&#x([0-9a-f]+);/gi, (_, codigo) => {
        const numero = parseInt(codigo, 16);
        return Number.isFinite(numero) ? String.fromCodePoint(numero) : _;
    });

    // Entidades HTML con nombre que pueden aparecer en la API.
    const entidades = {
        '&amp;': '&',
        '&quot;': '\"',
        '&#34;': '\"',
        '&apos;': "'",
        '&#39;': "'",
        '&lt;': '<',
        '&gt;': '>',
        '&nbsp;': ' ',
        '&ndash;': '–',
        '&mdash;': '—',
        '&rsquo;': '’',
        '&lsquo;': '‘',
        '&rdquo;': '”',
        '&ldquo;': '“',
    };

    resultado = resultado.replace(/&(?:amp|quot|apos|lt|gt|nbsp|ndash|mdash|rsquo|lsquo|rdquo|ldquo);|&#(?:34|39);/gi, entidad =>
        entidades[entidad.toLowerCase()] ?? entidad
    );

    return resultado;
}

/**
 * Prepara las 10 preguntas dinámicas a partir de los datos recibidos
 */
function generarPreguntas() {
    preguntasJuego = [];

    // Tipos de plantillas de preguntas
    const tiposPreguntas = [
        {
            categoria: '🗺️ Geografía Cultural',
            propiedad: 'provincias',
            obtenerPregunta: (reg) => `¿A qué provincia o territorio pertenece el registro cultural "${reg.post_title}"?`
        },
        {
            categoria: '🌿 Paisaje Sonoro',
            propiedad: 'entorno',
            obtenerPregunta: (reg) => `¿En qué tipo de entorno fue registrado el sonido de "${reg.post_title}"?`
        },
        {
            categoria: '🗣️ Lenguas de Argentina',
            propiedad: 'lenguas',
            obtenerPregunta: (reg) => `¿Con qué lengua o grupo lingüístico se vincula el registro "${reg.post_title}"?`
        }
    ];

    // Mezclar los registros de la API
    const registrosMezclados = [...registrosAPI].sort(() => 0.5 - Math.random());

    for (let reg of registrosMezclados) {
        if (preguntasJuego.length >= 10) break; // Ya tenemos las 10 preguntas

        if (!reg.post_title || String(reg.post_title).trim() === '') continue;

        // Mezclar las plantillas para intentar con cualquiera disponible
        const plantillasMezcladas = [...tiposPreguntas].sort(() => 0.5 - Math.random());

        for (let plantilla of plantillasMezcladas) {
            let datoOriginal = reg[plantilla.propiedad];

            // Validar que el valor exista
            if (datoOriginal === null || datoOriginal === undefined) continue;

            // Convertir arreglos o cualquier tipo a String seguro
            let textoRespuesta = Array.isArray(datoOriginal) 
                ? datoOriginal.join(', ') 
                : String(datoOriginal);

            textoRespuesta = textoRespuesta.trim();

            if (
                textoRespuesta === '' || 
                textoRespuesta.toLowerCase() === 'null' || 
                textoRespuesta.toLowerCase() === 'undefined'
            ) {
                continue;
            }

            // Obtener 3 opciones incorrectas distintas
            const opcionesIncorrectas = extraerOpcionesUnicas(plantilla.propiedad, textoRespuesta, 3);

            if (opcionesIncorrectas.length < 3) {
                continue; // Probar con otra plantilla si no hay suficientes opciones
            }

            // Armar las 4 opciones y mezclarlas
            const opcionesMezcladas = [textoRespuesta, ...opcionesIncorrectas].sort(() => 0.5 - Math.random());

            preguntasJuego.push({
                categoria: plantilla.categoria,
                pregunta: plantilla.obtenerPregunta(reg),
                opciones: opcionesMezcladas,
                respuestaCorrecta: textoRespuesta
            });

            break; // Pregunta añadida con éxito, pasar al siguiente registro
        }
    }
}

/**
 * Extrae valores únicos válidos del dataset para usarlos como distractoras sin repetir
 */
function extraerOpcionesUnicas(propiedad, valorCorrecto, cantidadRequerida) {
    const todosLosValores = [];

    registrosAPI.forEach(r => {
        const val = r[propiedad];
        if (val !== null && val !== undefined) {
            if (Array.isArray(val)) {
                val.forEach(v => todosLosValores.push(String(v).trim()));
            } else {
                todosLosValores.push(String(val).trim());
            }
        }
    });

    // Filtrar vacíos, nulos y la respuesta correcta
    const valoresFiltrados = todosLosValores.filter(v => 
        v !== '' && 
        v.toLowerCase() !== 'null' && 
        v.toLowerCase() !== 'undefined' && 
        v.toLowerCase() !== valorCorrecto.toLowerCase()
    );

    // Eliminar duplicados usando Set
    const valoresUnicos = [...new Set(valoresFiltrados)];

    // Retornar la cantidad solicitada mezclada
    return valoresUnicos.sort(() => 0.5 - Math.random()).slice(0, cantidadRequerida);
}

/**
 * Inicia la partida
 */
// Iniciar el juego
async function iniciarJuego() {
    // Carga los datos si aún no están en memoria
    if (datosGlobalesAPI.length === 0) {
        await cargarDatosAPI();
    }

    // Genera la lista de 10 preguntas
    preguntasJuego = generarPreguntas(datosGlobalesAPI);
    
    // Reinicia contadores
    indicePreguntaActual = 0;
    puntaje = 0;

    // Cambia de pantalla: oculta inicio, muestra juego
    document.getElementById('pantalla-inicio').classList.add('oculto');
    document.getElementById('pantalla-juego').classList.remove('oculto');

    // Muestra la primera pregunta
    mostrarPregunta();
}

// Mostrar la pregunta actual en la interfaz
function mostrarPregunta() {
    resetearEstadoPregunta();

    const pregunta = preguntasJuego[indicePreguntaActual];

    // Actualiza textos de la interfaz
    document.getElementById('numero-pregunta').textContent = `Pregunta ${indicePreguntaActual + 1}/10`;
    document.getElementById('categoria-pregunta').textContent = pregunta.categoria;
    document.getElementById('texto-pregunta').textContent = pregunta.enunciado;

    // Renderiza las 4 opciones como botones
    const contenedorOpciones = document.getElementById('contenedor-opciones');
    contenedorOpciones.innerHTML = ''; // Limpia botones anteriores

    pregunta.opciones.forEach(opcion => {
        const boton = document.createElement('button');
        boton.classList.add('btn-opcion');
        boton.textContent = opcion;
        
        // Evento al hacer clic en una opción
        boton.addEventListener('click', () => seleccionarRespuesta(opcion, pregunta.respuestaCorrecta));
        contenedorOpciones.appendChild(boton);
    });

    // Inicia el contador de 30 segundos
    iniciarTemporizador();
}

// Control del tiempo (Cuenta regresiva)
function iniciarTemporizador() {
    tiempoRestante = 30;
    document.getElementById('tiempo-restante').textContent = tiempoRestante;

    intervaloTiempo = setInterval(() => {
        tiempoRestante--;
        document.getElementById('tiempo-restante').textContent = tiempoRestante;

        if (tiempoRestante === 0) {
            clearInterval(intervaloTiempo);
            manejarTiempoAgotado();
        }
    }, 1000);
}

// Limpiar el estado visual anterior
function resetearEstadoPregunta() {
    clearInterval(intervaloTiempo);
    document.getElementById('mensaje-retroalimentacion').textContent = '';
    document.getElementById('btn-siguiente').classList.add('oculto');
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
// Procesar la opción elegida por el usuario
function seleccionarRespuesta(opcionSeleccionada, respuestaCorrecta) {
    // Detiene el reloj
    clearInterval(intervaloTiempo);

    const botones = document.querySelectorAll('.btn-opcion');
    
    // Deshabilita todos los botones para que no pueda volver a hacer clic
    botones.forEach(boton => {
        boton.disabled = true;
        
        // Colorea las respuestas
        if (boton.textContent === respuestaCorrecta) {
            boton.classList.add('correcta'); // Verde
        } else if (boton.textContent === opcionSeleccionada) {
            boton.classList.add('incorrecta'); // Rojo
        }
    });

    const mensajeFeedback = document.getElementById('mensaje-retroalimentacion');

    // Evalúa si acertó
    if (opcionSeleccionada === respuestaCorrecta) {
        puntaje += 10; // Suma 10 puntos por acierto
        mensajeFeedback.textContent = "¡Correcto! +10 puntos";
        mensajeFeedback.className = "feedback-correcto";
    } else {
        mensajeFeedback.textContent = `Incorrecto. La respuesta era: ${respuestaCorrecta}`;
        mensajeFeedback.className = "feedback-incorrecto";
    }

    // Muestra el botón para pasar a la siguiente pregunta
    document.getElementById('btn-siguiente').classList.remove('oculto');
}

// Procesar cuando se agotan los 30 segundos
function manejarTiempoAgotado() {
    const preguntaActual = preguntasJuego[indicePreguntaActual];
    const botones = document.querySelectorAll('.btn-opcion');

    botones.forEach(boton => {
        boton.disabled = true;
        if (boton.textContent === preguntaActual.respuestaCorrecta) {
            boton.classList.add('correcta');
        }
    });

    document.getElementById('mensaje-retroalimentacion').textContent = "¡Tiempo agotado!";
    document.getElementById('btn-siguiente').classList.remove('oculto');
}

// C. Avanzar a la siguiente pregunta o terminar el juego
function siguientePregunta() {
    indicePreguntaActual++;

    if (indicePreguntaActual < 10) {
        mostrarPregunta();
    } else {
        mostrarResultados();
    }
}

//Mostrar pantalla de resultados
function mostrarResultados() {
    // Oculta pantalla de juego y muestra la de resultados
    document.getElementById('pantalla-juego').classList.add('oculto');
    document.getElementById('pantalla-resultados').classList.remove('oculto');

    // Despliega el puntaje final
    document.getElementById('puntaje-final').textContent = `${puntaje} / 100 puntos`;

    // Asigna un mensaje personalizado según el rendimiento
    const mensajeFinal = document.getElementById('mensaje-evaluacion');
    if (puntaje >= 80) {
        mensajeFinal.textContent = "¡Excelente conocimiento sobre la cultura argentina!";
    } else if (puntaje >= 50) {
        mensajeFinal.textContent = "¡Buen trabajo! Conoces bastante sobre nuestro patrimonio.";
    } else {
        mensajeFinal.textContent = "Sigue explorando y aprendiendo sobre nuestra cultura.";
    }

    // Renderiza la tabla de los mejores puntajes guardados
    actualizarTablaRanking();
}

// Guardar el puntaje en el almacenamiento local del navegador (localStorage)
function guardarPuntaje() {
    const inputNombre = document.getElementById('nombre-jugador');
    const nombre = inputNombre.value.trim();

    if (nombre === "") {
        alert("Por favor, ingresa tu nombre.");
        return;
    }

    // Obtiene el ranking previo de localStorage o crea un arreglo vacío si no existe
    const rankingGuardado = JSON.parse(localStorage.getItem('rankingTrivia')) || [];

    // Agrega el nuevo registro
    rankingGuardado.push({ nombre: nombre, puntaje: puntaje });

    // Ordena de mayor a menor puntaje
    rankingGuardado.sort((a, b) => b.puntaje - a.puntaje);

    // Mantiene solo el Top 10
    const top10 = rankingGuardado.slice(0, 10);

    // Guarda de nuevo en localStorage convertido a texto JSON
    localStorage.setItem('rankingTrivia', JSON.stringify(top10));

    inputNombre.value = ''; // Limpia el input
    actualizarTablaRanking(); // Recarga la tabla en pantalla
}

// Función auxiliar para pintar el ranking en el DOM
function actualizarTablaRanking() {
    const tabla = document.getElementById('lista-ranking');
    tabla.innerHTML = '';

    const ranking = JSON.parse(localStorage.getItem('rankingTrivia')) || [];

    ranking.forEach((posicion, index) => {
        const fila = document.createElement('li');
        fila.textContent = `${index + 1}. ${posicion.nombre} - ${posicion.puntaje} pts`;
        tabla.appendChild(fila);
    });
}

// Reiniciar para volver a jugar
function reiniciarJuego() {
    document.getElementById('pantalla-resultados').classList.add('oculto');
    iniciarJuego();
}