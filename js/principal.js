const NOMBRES_ESTILO = {
    nomada: 'Nómada',
    urbana: 'Urbana',
    chill: 'Chill'
}

function leerLista(clave) {
    try {
        const texto = sessionStorage.getItem(clave)

        if (texto === null) {
            return []
        }
        return JSON.parse(texto)
    } catch (error) {
        return []
    }
}

function guardarLista(clave, lista) {
    sessionStorage.setItem(clave, JSON.stringify(lista))
}

function formatoPrecio(numero) {
    return '$' + numero.toLocaleString('es-CO')
}

function actualizarHeader() {
    const carrito = leerLista('thriftia_carrito')
    document.getElementById('contador-carrito').textContent = carrito.length

    const nombre = sessionStorage.getItem('thriftia_nombre')
    if (nombre !== null) {
        document.getElementById('enlace-sesion').textContent = 'Hola, ' + nombre
    }

    const estilo = sessionStorage.getItem('thriftia_estilo')
    if (estilo !== null) {
        const botonEstilo = document.getElementById('enlace-estilo')
        botonEstilo.textContent = 'Tu estilo: ' + NOMBRES_ESTILO[estilo]
        botonEstilo.href = 'catalogo.html?estilo=' + estilo
    }
}

function agregarAlCarrito(id, boton) {
    const carrito = leerLista('thriftia_carrito')

    carrito.push(id)
    guardarLista('thriftia_carrito', carrito)

    boton.textContent = 'En tu carrito ✓'

    boton.disabled = true

    actualizarHeader()
}

function crearTarjeta(id) {
    const producto = PRODUCTOS[id]
    const compradas = leerLista('thriftia_compradas')
    const carrito = leerLista('thriftia_carrito')

    const estaVendida = compradas.includes(id)
    const estaEnCarrito = carrito.includes(id)

    const tarjeta = document.createElement('article')
    tarjeta.classList.add('tarjeta', producto.estilo)

    const cajaFoto = document.createElement('div')
    cajaFoto.classList.add('foto-producto')

    const imagen = document.createElement('img')
    imagen.src = producto.imagen

    imagen.alt = producto.categoria + ', talla ' + producto.talla + ', estilo ' + NOMBRES_ESTILO[producto.estilo]
    cajaFoto.appendChild(imagen)

    if (estaVendida) {
        const letrero = document.createElement('p')
        letrero.classList.add('etiqueta-vendida')
        letrero.textContent = 'Vendida'
        cajaFoto.appendChild(letrero)
    }

    const info = document.createElement('p')
    info.classList.add('info-producto')
    info.textContent = producto.categoria + ' · Talla ' + producto.talla

    const precio = document.createElement('p')
    precio.classList.add('precio')
    precio.textContent = formatoPrecio(producto.precio)

    const boton = document.createElement('button')
    if (estaVendida) {
        boton.textContent = 'Vendida'
        boton.disabled = true
    } else if (estaEnCarrito) {
        boton.textContent = 'En tu carrito ✓'
        boton.disabled = true
    } else {
        boton.textContent = 'Agregar al carrito'
        boton.addEventListener('click', function () {
            agregarAlCarrito(id, boton)
        })
    }

    tarjeta.append(cajaFoto, info, precio, boton)

    return tarjeta
}

document.addEventListener('DOMContentLoaded', actualizarHeader)
