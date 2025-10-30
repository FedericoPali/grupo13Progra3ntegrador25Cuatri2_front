// --- 1. OBTENER ELEMENTOS DEL DOM ---
const listaProductos = document.getElementById("listaProductos");
const barraBusqueda = document.getElementById("barraBusqueda");
const botonNombre = document.getElementById("ordenarPorNombre");
const botonPrecio = document.getElementById("ordenarPorPrecio");

// --- 2. FUNCIONES PRINCIPALES ---

/**
 * Muestra los productos en la pantalla creando las tarjetas HTML.
 * @param {Array} arrayDeProductos - El array de productos a mostrar.
 */
function mostrarProductos(arrayDeProductos) {
    let cartaProductos = "";
    arrayDeProductos.forEach(producto => {
        cartaProductos += `
        <div class="card-producto">
            <img src="${producto.ruta_img}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio}</p>
            <button onclick="agregarACarrito(${producto.id})">Agregar al carrito</button>
        </div>
        `;
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
    const productoEscogido = frutasTienda.find(producto => producto.id == id);
    
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

// --- 3. FUNCIONES DE ORDENAR Y FILTRAR ---
function ordenarPorNombre() {
    // Usamos [...frutasTienda] para que se cree una copia y no modificar el array original.
    const arrayOrdenado = [...frutasTienda].sort((a, b) => a.nombre.localeCompare(b.nombre));
    mostrarProductos(arrayOrdenado);
}

function ordenarPorPrecio() {
    const arrayOrdenado = [...frutasTienda].sort((a, b) => a.precio - b.precio);
    mostrarProductos(arrayOrdenado);
}

// --- 4. EVENTOS (LISTENERS) ---
barraBusqueda.addEventListener("keyup", () => {
    const valorBusqueda = barraBusqueda.value.toLowerCase();
    const productosFiltrados = frutasTienda.filter(producto => producto.nombre.includes(valorBusqueda));
    mostrarProductos(productosFiltrados);
});

botonNombre.addEventListener("click", ordenarPorNombre);
botonPrecio.addEventListener("click", ordenarPorPrecio);

// --- 5. INICIALIZACIÓN ---
// Estas funciones se ejecutan apenas carga la página de productos.
mostrarProductos(frutasTienda);
actualizarContadorCarrito();