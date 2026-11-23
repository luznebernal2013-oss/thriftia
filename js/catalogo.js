const parametros = new URLSearchParams(window.location.search)
const genero = parametros.get('genero')
const estiloURL = parametros.get('estilo')

const FILTROS = ['todos', 'nomada', 'urbana', 'chill']

const area = document.getElementById('area-productos')
const sinResultados = document.getElementById('sin-resultados')
const aviso = document.getElementById('aviso-estilo')
const invitacion = document.getElementById('invitacion')

function prepararTitulo() {
    const titulo = document.getElementById('titulo-catalogo')

    if (genero === 'mujer') {
        titulo.textContent = 'Mujer'
        document.getElementById('enlace-mujer').classList.add('activo')
    } else if (genero === 'hombre') {
        titulo.textContent = 'Hombre'
        document.getElementById('enlace-hombre').classList.add('activo')
    } else {
        titulo.textContent = 'Todas las prendas'
    }
}

function esDelGenero(producto) {
    if (genero === null) {
        return true
    }
    return producto.genero === genero || producto.genero === 'unisex'
}

function marcarChip(filtro) {
    for (const posicion in FILTROS) {
        const nombre = FILTROS[posicion]
        document.getElementById('chip-' + nombre).classList.remove('activo')
    }
    document.getElementById('chip-' + filtro).classList.add('activo')
}

function mostrarProductos(filtro) {
    marcarChip(filtro)

    area.textContent = ''

    let cantidad = 0

    for (const id in PRODUCTOS) {
        const producto = PRODUCTOS[id]

        const cumpleEstilo = filtro === 'todos' || producto.estilo === filtro

        if (esDelGenero(producto) && cumpleEstilo) {
            area.appendChild(crearTarjeta(id))
            cantidad = cantidad + 1
        }
    }

    if (cantidad === 0) {
        sinResultados.classList.remove('oculto')
    } else {
        sinResultados.classList.add('oculto')
    }
}

function elegirFiltro(filtro) {
    aviso.classList.add('oculto')
    mostrarProductos(filtro)
}

function iniciarCatalogo() {
    prepararTitulo()

    const estiloGuardado = sessionStorage.getItem('thriftia_estilo')

    if (estiloURL !== null) {
        mostrarProductos(estiloURL)

    } else if (estiloGuardado !== null) {
        document.getElementById('aviso-nombre-estilo').textContent = NOMBRES_ESTILO[estiloGuardado]
        aviso.classList.remove('oculto')
        mostrarProductos(estiloGuardado)

    } else {
        invitacion.classList.remove('oculto')
        mostrarProductos('todos')
    }
}

document.getElementById('chip-todos').addEventListener('click', function () {
    elegirFiltro('todos')
})
document.getElementById('chip-nomada').addEventListener('click', function () {
    elegirFiltro('nomada')
})
document.getElementById('chip-urbana').addEventListener('click', function () {
    elegirFiltro('urbana')
})
document.getElementById('chip-chill').addEventListener('click', function () {
    elegirFiltro('chill')
})

document.getElementById('aviso-ver-todo').addEventListener('click', function () {
    elegirFiltro('todos')
})
document.getElementById('sin-resultados-ver-todo').addEventListener('click', function () {
    elegirFiltro('todos')
})

document.addEventListener('DOMContentLoaded', iniciarCatalogo)
