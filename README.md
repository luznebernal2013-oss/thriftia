# Thriftia

> Tu prenda, tu historia y la que heredas; encuentra lo diferente, viste a tu manera, gasta menos.

Thriftia es una tienda web de ropa de segunda mano para jóvenes de 18 a 33 años con estilo urbano y relajado. Es un proyecto de clase: un sitio **estático** hecho solo con HTML, CSS y JavaScript, sin bases de datos ni pagos reales.

**Ver el sitio publicado:** https://luznebernal2013-oss.github.io/thriftia/

## Páginas

| Archivo | Qué es |
| --- | --- |
| `index.html` | Portada: banner con el slogan, los 3 estilos, cómo funciona y prendas recién llegadas |
| `catalogo.html?genero=mujer` / `?genero=hombre` | Catálogo con filtros de estilo (Todos, Nómada, Urbana, Chill) |
| `tu-estilo.html` | Juego "Match mi estilo": pide el nombre y hace 5 preguntas |
| `carrito.html` | Carrito de compras con envío de $5.000, pago y prendas vendidas |
| `quienes-somos.html` | Misión, visión y valores |

Todas las páginas tienen el mismo header (menú) y footer, y un botón para volver a la portada.

## Cómo se usa

1. Abrir `index.html` en el navegador (no necesita servidor).
2. Hacer el juego **Match mi estilo**: se guarda el nombre y el estilo (Nómada, Urbana o Chill).
3. El catálogo se abre filtrado con ese estilo. Agregar prendas al carrito.
4. En el carrito, presionar **Pagar**: las prendas quedan marcadas como **Vendida**.

Los datos se guardan en `sessionStorage`, así que duran mientras la pestaña esté abierta.

## Requisitos del proyecto y dónde se cumplen

| Requisito | Dónde |
| --- | --- |
| Varias páginas HTML enlazadas | 5 páginas conectadas con `<a href>` |
| Menú y footer en todas las páginas | Header y footer iguales en cada HTML |
| Diseño estándar | Una sola hoja `css/estilos.css` con variables de color en `:root` |
| Diseño responsivo | Mobile first con `@media` para tablet (768px) y computador (1024px) |
| Contenido generado con JavaScript | Tarjetas de productos (`PRODUCTOS`), filas del carrito y preguntas del juego (`PREGUNTAS`) |
| Uso de sessionStorage | Nombre, estilo, respuestas, carrito y prendas compradas |
| Formulario | Nombre en el juego y en el carrito antes de pagar |

## Estructura

```
thriftia/
├── index.html
├── catalogo.html
├── tu-estilo.html
├── carrito.html
├── quienes-somos.html
├── css/
│   └── estilos.css      ← colores, header, botones, tarjetas, responsive
├── js/
│   ├── productos.js     ← objeto PRODUCTOS con las 19 prendas
│   ├── principal.js     ← funciones comunes: header, crearTarjeta, sessionStorage
│   ├── portada.js       ← saludo, banner y recién llegadas
│   ├── catalogo.js      ← filtros y tarjetas del catálogo
│   ├── quiz.js          ← juego Match mi estilo
│   └── carrito.js       ← lista, total, envío y pago
└── img/
    ├── logo.png
    ├── favicon.png
    └── productos/       ← fotos de las prendas
```

## Claves de sessionStorage

| Clave | Qué guarda |
| --- | --- |
| `thriftia_nombre` | Nombre escrito en el juego o en el carrito |
| `thriftia_estilo` | `nomada`, `urbana` o `chill` |
| `thriftia_respuestas` | Lista con las 5 respuestas del juego |
| `thriftia_carrito` | Lista de ids de las prendas en el carrito |
| `thriftia_compradas` | Lista de ids de las prendas ya vendidas |

## Tecnologías

HTML, CSS y JavaScript puro, sin frameworks ni librerías. Todo el código está comentado en español.

© 2026 Thriftia · Proyecto de clase
