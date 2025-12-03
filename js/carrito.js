let carrito = [];
let url = "http://localhost:3000";

function actualizarCarrito() {
    const productosCarrito = document.getElementById("productosCarrito");
    const numCarrito = document.getElementById('contadorCarrito');
    const contadorResumen = document.getElementById('contadorResumen');
    const total = document.getElementById("total");
    const btn_comprar = document.getElementById('btn-comprar');
    const btn_vaciar_carrito = document.getElementById('vaciar-carrito');
    productosCarrito.innerHTML = "";
    if (carrito.length >= 1) {
        const carritoCant = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
        numCarrito.textContent = carritoCant;
        contadorResumen.textContent = carritoCant;
        btn_comprar.classList.remove('disable');
        btn_vaciar_carrito.classList.remove('disable')
        carrito.forEach((p, i) => {
            total.textContent = "$" + calcularTotalCarrito() + ".-";
            productosCarrito.innerHTML += `
            <li class="bloque-item">
                <div class="img-nombre">
                    <img src='${p.ruta_img}' height='72px' width='72px'>
                    <div>
                        <p>${p.nombre}</p>
                        <button onclick="eliminarProducto(${i}, true)" class="btn-outline red" style="margin: 10px 0 0 0;">Eliminar del carrito</button>
                    </div>
                </div>
                <div class="carritoResponsive">
                    <div class="opcionesCarrito">
                        <button class="btn-outline" onclick="eliminarProducto(${i}, false)"><span class="material-symbols-outlined">remove</span></button>
                        <p>${p.cantidad}</p>
                        <button class="btn-outline" onclick="sumarStockCarrito(${p.id_producto})"><span class="material-symbols-outlined">add</span></button>
                    </div>
                    <p class="subtotal movil">$${p.precio * p.cantidad}.-</p>
                </div>
                <p class="subtotal pc">$${p.precio * p.cantidad}.-</p>
            </li>
            `;
        });    
    } else {
        productosCarrito.innerHTML = `
            <img src="https://cdn-icons-png.flaticon.com/512/2762/2762885.png" alt="" width="100px" height="100px" style="margin-top: 15px;">
            <p style="margin-bottom: 15px;">No hay productos en el carrito</p>
        `;
        numCarrito.textContent = "0";
        total.textContent = "$0.-";
        contadorResumen.textContent = "0";
        btn_comprar.classList.add('disable');
        btn_vaciar_carrito.classList.add('disable');
    }   
}

function calcularTotalCarrito() {
    return carrito.reduce((acumulador, producto) => {
        return acumulador + (producto.precio * producto.cantidad);
    }, 0);
}

function cargarCarrito() {
    let carritoGuardado = sessionStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarCarrito();
    }
}

function sumarStockCarrito(id) {
    let productoSeleccionado = carrito.find(p => p.id_producto == id);
    const productoEnCarrito = carrito.find(producto => producto.id_producto == id);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({ ...productoSeleccionado, cantidad: 1 });
    }
    sessionStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}

function eliminarProducto(i, b) {
    if (b) {
        carrito.splice(i,1);
    } else {
        if (carrito[i].cantidad > 1){
            carrito[i].cantidad--; 
        } else{
            carrito.splice(i,1);
        }    
    }
    actualizarCarrito();
    sessionStorage.setItem("carrito", JSON.stringify(carrito));
}

function vaciarCarrito() {
    const activo = document.getElementById('vaciar-carrito').classList;
    if (!activo.contains('disable')) {
        carrito = [];
        sessionStorage.removeItem("carrito");
        actualizarCarrito();
        console.log('actualizado');
    } else {
        console.log('no hay nada para actualizar');
    }
}

const botonCompra = document.getElementById("btn-comprar");

botonCompra.addEventListener("click", async () => {
    const activo = botonCompra.classList;
    if (!activo.contains('disable')) {   
        mostrar_modal(type="confirm", func="abrirCarrito", message='¿Desea finalizar la compra?');
    } else {
        console.log('El carrito esta vacio, no puede avanzar');
    } 
});

async function abrirCarrito(respuesta) {
    if (respuesta) {
        const nombreUsuario = sessionStorage.getItem("nombreUsuario");
        const totalCalculado = calcularTotalCarrito();
        const detallesVenta = {
            nombre_usuario: nombreUsuario,
            precio_total: totalCalculado,
            productos: carrito
        }

        try{
            // deshabilitamos el boton para evitar doble clics
            botonCompra.textContent = "Procesando...";
            botonCompra.classList.add('disable');
            const response = await fetch(`${url}/api/sales`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(detallesVenta)
            });
            const data = await response.json() // lee la respuesta del servidor
            if(response.ok) {
                console.log("Venta registrada: ", data);
                botonCompra.textContent = "Comprar";
                botonCompra.classList.remove('disable');
                window.location.href = "ticket.html";
            } else {
                console.error("Error del servidor: ", data); // muestra el mensaje de error que enviamos desde el backend
                mostrar_modal(type="alert", func=null, message=`Hubo un problema: ${data.message}.`); // alerta para el usuario
                botonCompra.textContent= "Comprar";
                botonCompra.classList.remove('disable');
            }
        } catch (error) {
            console.error("Error de red: ", error); // en caso de que no este el servidor levantado
            mostrar_modal(type="alert", func=null, message="No se logró establecer conexión con el servidor.");
            botonCompra.textContent = "Comprar";
            botonCompra.classList.remove('disable');
        }
    } else {
        console.log("Se canceló la compra.")
    }
}

document.addEventListener('DOMContentLoaded', () => {
    cargarCarrito();
})