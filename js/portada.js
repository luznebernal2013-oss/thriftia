const DESTACADAS = ['P10', 'P11', 'P15', 'P04', 'P18']

function mostrarSaludo() {
    const nombre = sessionStorage.getItem('thriftia_nombre')

    if (nombre !== null) {
        document.getElementById('tituloSaludo').textContent = '¡Te damos la bienvenida, ' + nombre + '!'
    }
}

function cambiarBanner() {
    const estilo = sessionStorage.getItem('thriftia_estilo')

    if (estilo !== null) {
        document.getElementById('banner-nuevo').classList.add('oculto')
        document.getElementById('banner-estilo').classList.remove('oculto')

        document.getElementById('nombre-estilo-banner').textContent = NOMBRES_ESTILO[estilo]

        document.getElementById('boton-mi-estilo').href = 'catalogo.html?estilo=' + estilo
    }
}

function mostrarDestacadas() {
    const area = document.getElementById('area-destacadas')

    for (const posicion in DESTACADAS) {
        const id = DESTACADAS[posicion]
        const tarjeta = crearTarjeta(id)
        area.appendChild(tarjeta)
    }
}

document.addEventListener('DOMContentLoaded', mostrarSaludo)
document.addEventListener('DOMContentLoaded', cambiarBanner)
document.addEventListener('DOMContentLoaded', mostrarDestacadas)
