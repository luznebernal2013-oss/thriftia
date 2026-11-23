const ENVIO = 5000

const carritoLleno = document.getElementById('carrito-lleno')
const carritoVacio = document.getElementById('carrito-vacio')
const confirmacion = document.getElementById('confirmacion')
const listaCarrito = document.getElementById('lista-carrito')
const cajaNombre = document.getElementById('caja-nombre-pago')

function crearFila(id) {
    const producto = PRODUCTOS[id]

    const fila = document.createElement('li')
    fila.classList.add('fila-carrito')

    const imagen = document.createElement('img')
    imagen.classList.add('miniatura')
    imagen.src = producto.imagen
    imagen.alt = producto.categoria + ', talla ' + producto.talla

    const info = document.createElement('div')
    info.classList.add('info-fila')

    const categoria = document.createElement('p')
    categoria.textContent = producto.categoria

    const talla = document.createElement('p')
    talla.classList.add('talla')
    talla.textContent = 'Talla ' + producto.talla

    info.append(categoria, talla)

    const precio = document.createElement('p')
    precio.classList.add('precio')
    precio.textContent = formatoPrecio(producto.precio)

    const boton = document.createElement('button')
    boton.classList.add('btn-secundario', 'btn-pequeno')
    boton.textContent = 'Quitar'
    boton.addEventListener('click', function () {
        quitarDelCarrito(id)
    })

    fila.append(imagen, info, precio, boton)
    return fila
}

function calcularSubtotal(carrito) {
    let subtotal = 0
    for (const posicion in carrito) {
        const id = carrito[posicion]
        subtotal = subtotal + PRODUCTOS[id].precio
    }
    return subtotal
}

function mostrarCarrito() {
    const carrito = leerLista('thriftia_carrito')

    if (carrito.length === 0) {
        carritoLleno.classList.add('oculto')
        carritoVacio.classList.remove('oculto')
        return
    }

    carritoVacio.classList.add('oculto')
    carritoLleno.classList.remove('oculto')

    listaCarrito.textContent = ''
    for (const posicion in carrito) {
        listaCarrito.appendChild(crearFila(carrito[posicion]))
    }

    const subtotal = calcularSubtotal(carrito)

    let textoCantidad = carrito.length + ' prendas'
    if (carrito.length === 1) {
        textoCantidad = '1 prenda'
    }

    document.getElementById('resumen-cantidad').textContent = textoCantidad
    document.getElementById('resumen-subtotal').textContent = formatoPrecio(subtotal)
    document.getElementById('resumen-envio').textContent = formatoPrecio(ENVIO)
    document.getElementById('resumen-total').textContent = formatoPrecio(subtotal + ENVIO)
}

function quitarDelCarrito(id) {
    const carrito = leerLista('thriftia_carrito')
    const nuevoCarrito = []

    for (const posicion in carrito) {
        if (carrito[posicion] !== id) {
            nuevoCarrito.push(carrito[posicion])
        }
    }

    guardarLista('thriftia_carrito', nuevoCarrito)
    mostrarCarrito()
    actualizarHeader()
}

function clicEnPagar() {
    const nombre = sessionStorage.getItem('thriftia_nombre')

    if (nombre === null) {
        cajaNombre.classList.remove('oculto')
        document.getElementById('btn-pagar').classList.add('oculto')
    } else {
        pagar()
    }
}

function confirmarNombre() {
    const nombre = document.getElementById('campo-nombre-pago').value

    if (nombre === '') {
        document.getElementById('error-nombre-pago').textContent = 'Escribe tu nombre para poder pagar'
        return
    }

    sessionStorage.setItem('thriftia_nombre', nombre)
    pagar()
}

function pagar() {
    const carrito = leerLista('thriftia_carrito')
    const compradas = leerLista('thriftia_compradas')
    const nombre = sessionStorage.getItem('thriftia_nombre')
    const total = calcularSubtotal(carrito) + ENVIO

    let textoPrendas = carrito.length + ' prendas'
    if (carrito.length === 1) {
        textoPrendas = '1 prenda'
    }
    document.getElementById('texto-gracias').textContent =
        '¡Gracias, ' + nombre + '! Pagaste ' + formatoPrecio(total) + ' por ' + textoPrendas + '.'

    const listaComprada = document.getElementById('lista-comprada')
    listaComprada.textContent = ''

    for (const posicion in carrito) {
        const id = carrito[posicion]
        const producto = PRODUCTOS[id]

        const item = document.createElement('li')
        item.textContent = producto.categoria + ' (talla ' + producto.talla + ') - ' + formatoPrecio(producto.precio)
        listaComprada.appendChild(item)

        compradas.push(id)
    }

    document.getElementById('confirmacion-envio').textContent = formatoPrecio(ENVIO)
    document.getElementById('confirmacion-total').textContent = formatoPrecio(total)

    guardarLista('thriftia_compradas', compradas)

    guardarLista('thriftia_carrito', [])
    actualizarHeader()

    carritoLleno.classList.add('oculto')
    carritoVacio.classList.add('oculto')
    confirmacion.classList.remove('oculto')
}

document.getElementById('btn-pagar').addEventListener('click', clicEnPagar)
document.getElementById('btn-confirmar-pago').addEventListener('click', confirmarNombre)

document.addEventListener('DOMContentLoaded', mostrarCarrito)
