# TP INFORMÁTICA GENERAL | Cátedra Drelichman 2026
  Milagros Peruzotti - Teodoro Block 

## Descripción del proyecto

El proyecto consiste en el desarrollo de un sitio web interactivo basado en una temática argentina. El sitio reúne tres juegos desarrollados con HTML, CSS y JavaScript: un juego de cartas, un juego de dados y un juego de preguntas.

El objetivo del trabajo es integrar los contenidos trabajados durante la cursada en una experiencia interactiva que permita al usuario jugar, tomar decisiones, recibir respuestas del sistema y consultar sus resultados.

El sitio cuenta con seis páginas principales:

* `index.html` — Página principal.
* `cartas.html` — Juego de cartas: Memotest.
* `dados.html` — Juego de dados.
* `preguntas.html` — Juego de preguntas.
* `puntajes.html` — Registro y visualización de puntajes.
* `info.html` — Información sobre el proyecto y sus integrantes.

Todas las páginas cuentan con un menú de navegación que permite recorrer el sitio.

## Juegos

### Memotest

El primer juego es un Memotest basado en imágenes relacionadas con la cultura argentina.

El juego permite elegir entre:

* **Modo solo**
* **Modo multijugador**, para dos jugadores.

Luego de seleccionar el modo, se puede elegir una temática y un nivel de dificultad.

Las dificultades determinan la cantidad de parejas:

* **Fácil:** 10 parejas.
* **Medio:** 15 parejas.
* **Difícil:** 20 parejas.

Las cartas se mezclan aleatoriamente al comenzar cada partida. El jugador debe seleccionar dos cartas para intentar encontrar una pareja. Si las cartas coinciden, permanecen descubiertas; si no coinciden, vuelven a darse vuelta después de un breve intervalo.

En el modo multijugador, los jugadores se alternan los turnos. Se registran las parejas encontradas y los movimientos realizados por cada jugador.

Además, cada dificultad establece un máximo de movimientos por jugador:

* **Fácil:** 15 movimientos.
* **Medio:** 23 movimientos.
* **Difícil:** 30 movimientos.

Al finalizar la partida se muestra el resultado correspondiente. En caso de que ambos jugadores obtengan la misma cantidad de parejas, el resultado es un empate.

### Juego de dados

El objetivo de este juego es crear un jugador de fútbol personalizado utilizando las estadísticas de los jugadores de la Selección Argentina. El objetivo es conseguir las mejores características posibles de ataque, pase y defensa, sumando la mayor cantidad de puntos.

Cómo se juega


**Paso 1. Tirar los dados**

Para conseguir una característica, empezás tirando el primer dado. Podés tirar hasta 4 dados de seis caras, uno por uno y en orden. Cada dado que tirás se suma al resultado anterior.

**Paso 2. Descubrir al jugador**

La suma de los dados determina qué jugador de la Selección Argentina aparece. Por ejemplo, si obtenés un 10, aparece Lionel Messi, que tiene el dorsal 10.

**Paso 3. Elegir una característica**

El jugador tiene tres estadísticas: ataque, pase y defensa. Elegís una para tu jugador personalizado y conservás su valor. Una vez elegida, esa característica queda guardada y ya no se puede cambiar.

**Paso 4. Volver a tirar**

Para conseguir las características restantes, volvés a tirar los dados desde cero. Repetís el proceso hasta completar las tres estadísticas. En cada ronda solo podés elegir una característica que todavía no hayas conseguido.

**Paso 5. Crear y guardar tu jugador**

Cuando tengas ataque, pase y defensa, el juego calcula tu puntaje total. Después, escribís el nombre y el dorsal de tu jugador y guardás el resultado en la tabla de puntajes.

### Juego de preguntas

El tercer juego consiste en una trivia relacionada con Argentina y utiliza una API para obtener los datos necesarios para generar las preguntas.

La partida está compuesta por 10 preguntas de opción múltiple, con cuatro opciones de respuesta.

Cada pregunta cuenta con un tiempo límite de 30 segundos. El usuario debe seleccionar una respuesta antes de que finalice el tiempo. El sistema registra las respuestas y calcula el puntaje obtenido al finalizar la partida.

Los resultados obtenidos se almacenan para poder ser consultados posteriormente en la página de puntajes.

## Organización de archivos

El proyecto se organiza separando los archivos HTML, CSS, JavaScript, imágenes y datos utilizados por el sitio.

La estructura principal incluye:

* `index.html`
* `cartas.html`
* `dados.html`
* `preguntas.html`
* `puntajes.html`
* `info.html`
* carpeta `css/` para la hoja de estilos.
* carpeta `js/` para los archivos JavaScript de los juegos.
* carpeta `img/` para las imágenes utilizadas en el sitio.
* carpeta `api/` para los datos en formato JSON utilizados por el proyecto.

Cada juego cuenta con su propia lógica en JavaScript, mientras que la hoja de estilos CSS es compartida por las páginas del sitio.

## Tecnologías utilizadas

* **HTML5:** estructura y organización semántica de las páginas.
* **CSS3:** diseño visual, distribución de los elementos, estados de los componentes y adaptación de la interfaz.
* **JavaScript:** lógica de los juegos, interacción con el usuario y manipulación dinámica del contenido.
* **JSON:** almacenamiento y organización de datos utilizados por el proyecto.
* **LocalStorage:** almacenamiento de los puntajes y récords.
* **API:** obtención de datos utilizados en el juego de preguntas.
* **GitHub:** almacenamiento y desarrollo colaborativo del proyecto.

## Principales funcionalidades

Entre las principales funcionalidades implementadas se encuentran:

* navegación entre las diferentes páginas del sitio;
* selección de modos de juego;
* selección de dificultades y temáticas;
* generación y mezcla aleatoria de cartas;
* interacción con las cartas mediante eventos;
* control de turnos en el modo multijugador;
* cálculo de movimientos, parejas y puntajes;
* lanzamiento y procesamiento de dados;
* generación de preguntas y respuestas;
* temporizador para el juego de preguntas;
* consulta y procesamiento de datos obtenidos mediante una API;
* utilización de datos en formato JSON;
* almacenamiento de récords mediante `localStorage`;
* visualización de resultados y puntajes;
* posibilidad de iniciar nuevas partidas.

## API utilizada

Para el juego de preguntas se utiliza un archivo descargado de una API del Ministerio de Cultura de Argentina (https://cultura.argentina.apidocs.ar/) relacionada con **Sonidos y Lenguas**.

La API permite obtener datos que luego son procesados por JavaScript para incorporarlos al funcionamiento del juego. No pudimos conseguir la URL pero si pudimos descargar la API y utilizarla de manera local.

## Decisiones técnicas

Las decisiones técnicas fueron tomadas buscando mantener una estructura clara y coherente entre las diferentes páginas del sitio.

Se utilizó una única hoja de estilos CSS externa para mantener una identidad visual común. La lógica de cada juego se desarrolló mediante JavaScript, utilizando eventos, condicionales, ciclos, funciones, arrays, objetos, manipulación del DOM y generación dinámica de contenido.

Para conservar los resultados entre diferentes partidas se utilizó `localStorage`, mientras que los datos estructurados utilizados por el proyecto se organizaron mediante archivos JSON.

En el Memotest se decidió separar el funcionamiento de los modos individual y multijugador, manteniendo información independiente para cada jugador. También se incorporaron diferentes dificultades para aumentar progresivamente la cantidad de cartas y establecer distintos límites de movimientos.


## REGISTRO
--- 14 Septiembre:
  El grupo se juntó y se discutió acerca de los posibles juegos y temática del sitio web. Se decidió por el Memotest y el juego de la Selección.

--- 21 Septiembre:
  Se planteó la lógica de los juegos, con sus posibles resoluciones en Javascript y se discutieron cuestiones de estructura general de la página. Se empezó con la codificación de nuestras ideas. Se empezó a buscar una API para la resolución de el juego de preguntas. Se diseñaron las imagenes para el juego de dados y se eligieron los elementos para utilizar en el Memotest.

--- 28 Septiembre:
  Luego de intensa búsqueda, se encontró la API más adecuada para la temática de la página. Se siguió desarrollando los juegos, probando, jugando, corrigiendo y reacomodando.

--- 30 Septiembre:
  Se logró finalizar los tres juegos.

--- 4 Octubre:
  Checkeo del funcionamiento de los juegos por otros usuarios. Resolución del diseño general del sitio web.

## Uso de Inteligencia Artificial
## Declaración de uso de Inteligencia Artificial

Durante el desarrollo del proyecto utilizamos herramientas de Inteligencia Artificial como apoyo en distintas etapas del trabajo. La IA fue utilizada como una herramienta de consulta, exploración, programación y revisión, pero las decisiones finales sobre el funcionamiento, diseño y código fueron tomadas por los integrantes del grupo.

Principalmente, utilizamos IA para:

* Explorar y definir alternativas para la lógica y el funcionamiento de los tres juegos.
* Consultar conceptos de HTML, CSS y JavaScript trabajados durante la cursada.
* Proponer, revisar y modificar fragmentos de código JavaScript.
* Detectar y solucionar errores que aparecieron durante las pruebas del sitio.
* Analizar el funcionamiento del juego de cartas, especialmente la lógica de turnos, movimientos, parejas, dificultades, límites de movimientos y condiciones de finalización.
* Revisar la implementación del modo multijugador del Memotest y realizar ajustes sobre la visualización de los datos de cada jugador.
* Trabajar sobre la integración y el procesamiento de la API utilizada en el juego de preguntas, incluyendo la interpretación de los datos recibidos en formato JSON.
* Revisar aspectos de HTML y CSS relacionados con la estructura, navegación y presentación visual del sitio.
* Organizar y revisar la documentación del proyecto y contrastar el desarrollo con los requisitos de la consigna.

Las propuestas generadas por IA fueron probadas y evaluadas por el grupo. Cuando una solución no funcionaba como esperábamos o no se ajustaba a las decisiones del proyecto, fue modificada, descartada o reemplazada. Por ejemplo, durante el desarrollo del Memotest se realizaron diferentes ajustes a la lógica de turnos y finalización hasta decidir que, en caso de igualdad de parejas, el resultado fuera un empate y no se utilizara un sistema de desempate.

También se utilizó IA para comprender código ya desarrollado y poder explicar su funcionamiento, especialmente durante las etapas de depuración y preparación para la defensa. De esta manera, la herramienta no se utilizó únicamente para generar código, sino también como apoyo para aprender, verificar, corregir y tomar decisiones sobre las soluciones implementadas.
