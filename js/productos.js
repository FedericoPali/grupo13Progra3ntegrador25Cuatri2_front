// --- 1. OBTENER ELEMENTOS DEL DOM ---
const listaProductos = document.getElementById("listaProductos");
const barraBusqueda = document.getElementById("barraBusqueda");
let url = "http://localhost:3000";

let todosLosProductos = [];

async function obtenerProductos() {
    try {
        let response = await fetch(`${url}/api/products`);
        console.log(`Solicitud fetch GET a ${url}/api/products`);
        let data = await response.json();
        console.log(data);
        todosLosProductos = data.payload;
        console.log(todosLosProductos);
        mostrarProductos(todosLosProductos);
    } catch (error) {
        console.error("Error obteniendo productos: ", error);
        listaProductos.innerHTML = "<p>No se pudieron cargar los productos.</p>";
        mostrar_modal(type="alert", func=null, content="Ocurrió un error al intentar obtener los productos.");
    }
}

function init(){
    obtenerProductos()
};

init();


// --- 2. FUNCIONES PRINCIPALES ---

/**
 * Muestra los productos en la pantalla creando las tarjetas HTML.
 * @param {Array} arrayDeProductos - El array de productos a mostrar.
 */
function mostrarProductos(arrayDeProductos) {
    // --- llamamos e importamos los contenedores ---
    const containerProcesadores = document.getElementById("procesadores-cards");
    const containerGraficas = document.getElementById("graficas-cards");

    let arrayGraficas = [];
    let arrayProcesadores = [];
    
    // --- 2. Clasificamos ---
    arrayDeProductos.forEach(producto => {
        if (producto.tipo === "procesador") {
            arrayProcesadores.push(producto);
        } else {
            arrayGraficas.push(producto);
        }
    });

    // --- 3. Renderizamos procesadores ---
    let cartaProcesadores = ""; // String solo para procesadores
    arrayProcesadores.forEach(producto => {
        if (producto.activo === 1) {
            cartaProcesadores += `
            <div class="card-producto card-producto-procesadores">
                <div class="card-producto-content">
                    <img src="${producto.ruta_img}" alt="${producto.nombre}">
                    <div style="width: 100%">
                        <h3>${producto.nombre}</h3>
                        <p>$${producto.precio}</p>
                        <button onclick="agregarACarrito(${producto.id_producto})">Agregar al carrito</button>
                    </div>
                </div>
            </div>
            `;
        }
    });
    // Inyectamos el string en el contenedor de procesadores
    containerProcesadores.innerHTML = cartaProcesadores;

    // --- 4. Renderizamos gráficas ---
    let cartaGraficas = ""; // String solo para gráficas
    arrayGraficas.forEach(producto => {
        if (producto.activo === 1) {
            cartaGraficas += `
            <div class="card-producto card-producto-graficas">
                <div class="card-producto-content">
                    <img src="${producto.ruta_img}" alt="${producto.nombre}">
                    <div style="width: 100%">
                        <h3>${producto.nombre}</h3>
                        <p>$${producto.precio}</p>
                        <button onclick="agregarACarrito(${producto.id_producto})">Agregar al carrito</button>
                    </div>
                </div>
            </div>
            `;
        }
    });
    // Inyectamos el string en el contenedor de gráficas
    containerGraficas.innerHTML = cartaGraficas;
}

/**
 * Agrega un producto al carrito en sessionStorage o incrementa su cantidad si ya existe.
 * @param {number} id - El ID del producto a agregar.
 */

function agregarACarrito(id) {
    // Obtenemos el carrito de sessionStorage o creamos un array vacío.
    let carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];
    
    // Buscamos el producto en nuestra lista de la tienda.
    const productoEscogido = todosLosProductos.find(producto => producto.id_producto == id);
    
    // Verificamos si el producto ya está en el carrito.
    const productoEnCarrito = carrito.find(producto => producto.id_producto == id);

    console.log(productoEscogido);

    if (productoEnCarrito) {
        // Si ya está, solo aumentamos la cantidad.
        productoEnCarrito.cantidad++;
    } else {
        // Si no está, lo agregamos con cantidad 1.
        carrito.push({ ...productoEscogido, cantidad: 1 });
    }

    mostrar_modal(type="options", func="agregarCarrito", content={message:`Agregaste a tu carrito "${productoEscogido.nombre}".`, btnSecundarioText: "Ver carrito", btnAceptarVisible: true, btnCancelarVisible: false})

    // Guardamos el carrito actualizado en sessionStorage.
    sessionStorage.setItem("carrito", JSON.stringify(carrito));
    
    // Actualizamos el contador del header para que el usuario vea el cambio.
    actualizarContadorCarrito();
}

/**
 * Lee el carrito de sessionStorage y actualiza el número de productos en el header.
 */
function actualizarContadorCarrito() {
    const carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];
    const totalProductos = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    const contadorCarrito = document.getElementById("contadorCarrito");
    contadorCarrito.textContent = totalProductos;
}

// --- 4. EVENTOS (LISTENERS) ---
barraBusqueda.addEventListener("keyup", () => {
    const valorBusqueda = barraBusqueda.value.toLowerCase();
    const productosFiltrados = todosLosProductos.filter(producto => producto.nombre.toLowerCase().includes(valorBusqueda));
    mostrarProductos(productosFiltrados);
});


// --- 5. INICIALIZACIÓN ---
// Estas funciones se ejecutan apenas carga la página de productos.
document.addEventListener('DOMContentLoaded', () => {
    actualizarContadorCarrito();
})