const PREGUNTAS = [
    {
        pregunta: 'Tu sábado ideal es…',
        nomada: 'Salir de viaje o a caminar fuera de la ciudad',
        urbana: 'Recorrer la ciudad, un concierto o una feria',
        chill: 'Quedarte en casa o en un café, sin afán'
    },
    {
        pregunta: '¿Qué prenda no puede faltar en tu clóset?',
        nomada: 'Una chaqueta liviana con bolsillos',
        urbana: 'Unos tenis llamativos o una hoodie oversize',
        chill: 'Un pantalón ancho y suave'
    },
    {
        pregunta: '¿Qué colores usas más?',
        nomada: 'Tierra: café, verde oliva, beige',
        urbana: 'Negro, blanco y un color fuerte',
        chill: 'Pasteles y tonos claros'
    },
    {
        pregunta: 'Al vestirte, ¿qué te importa más?',
        nomada: 'Que sea práctico y aguante todo',
        urbana: 'Que se vea con actitud',
        chill: 'Sentirte a gusto'
    },
    {
        pregunta: '¿Qué accesorio te representa?',
        nomada: 'Una mochila',
        urbana: 'Una gorra o unas cadenas',
        chill: 'Unas medias divertidas'
    }
]

const DESCRIPCIONES = {
    nomada: 'Tu clóset está listo para salir: prendas prácticas, resistentes y en tonos tierra.',
    urbana: 'La ciudad es tu pasarela: tenis, oversize y actitud.',
    chill: 'Comodidad primero, sin perder el estilo: telas suaves y cortes amplios.'
}

let preguntaActual = 0
let puntos = { nomada: 0, urbana: 0, chill: 0 }
let ganador = 'nomada'
let respuestas = []

const pantallaInicio = document.getElementById('pantalla-inicio')
const pantallaPreguntas = document.getElementById('pantalla-preguntas')
const pantallaResultado = document.getElementById('pantalla-resultado')
const campoNombre = document.getElementById('campo-nombre')

const btnEmpezar = document.getElementById('btn-empezar')
const btnNomada = document.getElementById('btn-nomada')
const btnUrbana = document.getElementById('btn-urbana')
const btnChill = document.getElementById('btn-chill')
const btnReiniciar = document.getElementById('btn-reiniciar')
const btnRepetir = document.getElementById('btn-repetir')

function mostrarPantalla(pantalla) {
    pantallaInicio.classList.add('oculto')
    pantallaPreguntas.classList.add('oculto')
    pantallaResultado.classList.add('oculto')
    pantalla.classList.remove('oculto')
}

function reiniciar() {
    preguntaActual = 0
    puntos = { nomada: 0, urbana: 0, chill: 0 }
    ganador = 'nomada'
    respuestas = []
    document.getElementById('error-nombre').textContent = ''
    mostrarPantalla(pantallaInicio)
}

function empezar() {
    const nombre = campoNombre.value

    if (nombre === '') {
        document.getElementById('error-nombre').textContent = 'Escribe tu nombre para empezar'
        return
    }

    sessionStorage.setItem('thriftia_nombre', nombre)
    actualizarHeader()

    mostrarPantalla(pantallaPreguntas)
    mostrarPregunta()
}

function mostrarPregunta() {
    const actual = PREGUNTAS[preguntaActual]

    document.getElementById('texto-progreso').textContent =
        'Pregunta ' + (preguntaActual + 1) + ' de ' + PREGUNTAS.length
    document.getElementById('texto-pregunta').textContent = actual.pregunta

    btnNomada.textContent = actual.nomada
    btnUrbana.textContent = actual.urbana
    btnChill.textContent = actual.chill
}

function responder(estilo) {
    puntos[estilo] = puntos[estilo] + 1

    respuestas.push(PREGUNTAS[preguntaActual][estilo])

    if (puntos[estilo] >= puntos[ganador]) {
        ganador = estilo
    }

    preguntaActual = preguntaActual + 1

    if (preguntaActual === PREGUNTAS.length) {
        mostrarResultado()
    } else {
        mostrarPregunta()
    }
}

function mostrarResultado() {
    sessionStorage.setItem('thriftia_estilo', ganador)
    guardarLista('thriftia_respuestas', respuestas)
    actualizarHeader()

    const nombre = sessionStorage.getItem('thriftia_nombre')
    document.getElementById('texto-tu-estilo').textContent = nombre + ', tu estilo es'
    document.getElementById('nombre-resultado').textContent = NOMBRES_ESTILO[ganador]
    document.getElementById('descripcion-resultado').textContent = DESCRIPCIONES[ganador]

    document.getElementById('texto-puntos').textContent =
        'Nómada: ' + puntos.nomada + ' · Urbana: ' + puntos.urbana + ' · Chill: ' + puntos.chill

    const caja = document.getElementById('caja-resultado')
    caja.classList.remove('nomada', 'urbana', 'chill')
    caja.classList.add(ganador)

    document.getElementById('btn-resultado-mujer').href = 'catalogo.html?genero=mujer&estilo=' + ganador
    document.getElementById('btn-resultado-hombre').href = 'catalogo.html?genero=hombre&estilo=' + ganador

    mostrarPantalla(pantallaResultado)
}

btnEmpezar.addEventListener('click', empezar)
btnNomada.addEventListener('click', () => responder('nomada'))
btnUrbana.addEventListener('click', () => responder('urbana'))
btnChill.addEventListener('click', () => responder('chill'))
btnReiniciar.addEventListener('click', reiniciar)
btnRepetir.addEventListener('click', reiniciar)
