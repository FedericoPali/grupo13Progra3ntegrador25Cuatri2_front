// --- 1. OBTENEMOS ELEMENTOS DEL DOM ---
const listaProductos = document.getElementById("listaProductos");
const barraBusqueda = document.getElementById("barraBusqueda");
let url = "http://localhost:3000";

let todosLosProductos = [];

async function obtenerProductos() {
    try {
        let response = await fetch(`${url}/products`);

        console.log(`Solicitud fetch GET a ${url}/products`);

        let data = await response.json();

        console.log(data);
        todosLosProductos = data.payload;
        console.log(todosLosProductos);

        mostrarProductos(todosLosProductos);

    } catch (error) {
        console.error("Error obteniendo productos: ", error);
        listaProductos.innerHTML = "<p>No se pudieron cargar los productos.</p>"
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
    let cartaProductos = "";
    arrayDeProductos.forEach(producto => {
        if(producto.activo === 1){
            cartaProductos += `
            <div class="card-producto">
                <img src="${producto.ruta_img}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>$${producto.precio}</p>
                <button onclick="agregarACarrito(${producto.id})">Agregar al carrito</button>
            </div>
            `;
        }

    });
    listaProductos.innerHTML = cartaProductos;
}

/**
 * Agrega un producto al carrito en sessionStorage o incrementa su cantidad si ya existe.
 * @param {number} id - El ID del producto a agregar.
 */
function agregarACarrito(id) {
    // Obtenemos el carrito de sessionStorage o creamos un array vacío.
    let carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];
    
    // Buscamos el producto en nuestra lista de la tienda.
    const productoEscogido = todosLosProductos.find(producto => producto.id == id);
    
    // Verificamos si el producto ya está en el carrito.
    const productoEnCarrito = carrito.find(producto => producto.id == id);

    if (productoEnCarrito) {
        // Si ya está, solo aumentamos la cantidad.
        productoEnCarrito.cantidad++;
    } else {
        // Si no está, lo agregamos con cantidad 1.
        carrito.push({ ...productoEscogido, cantidad: 1 });
    }

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
    contadorCarrito.textContent = `Carrito: ${totalProductos} productos`;
}

// --- 4. EVENTOS (LISTENERS) ---
barraBusqueda.addEventListener("keyup", () => {
    const valorBusqueda = barraBusqueda.value.toLowerCase();
    const productosFiltrados = todosLosProductos.filter(producto => producto.nombre.toLowerCase().includes(valorBusqueda));
    mostrarProductos(productosFiltrados);
});


// --- 5. INICIALIZACIÓN ---
// Estas funciones se ejecutan apenas carga la página de productos.
actualizarContadorCarrito();