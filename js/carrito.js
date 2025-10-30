let carrito = [];

function actualizarCarrito() {
    const productosCarrito = document.getElementById("productosCarrito");
    const numCarrito = document.getElementById('contadorCarrito');
    const contadorResumen = document.getElementById('contadorResumen');
    const total = document.getElementById("total");
    const btn_comprar = document.getElementById('btn-comprar');
    const btn_vaciar_carrito = document.getElementById('vaciar-carrito');
    productosCarrito.innerHTML = "";
    let precioTotal = 0;
    if (carrito.length >= 1) {
        const carritoCant = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
        numCarrito.textContent = "Carrito: " + carritoCant + " productos";
        contadorResumen.textContent = carritoCant;
        btn_comprar.classList.remove('disable');
        btn_vaciar_carrito.classList.remove('disable')
        carrito.forEach((p, i) => {
            precioTotal = p.precio + precioTotal;
            total.textContent = "$" + carrito.reduce((acumulador, producto) => acumulador + producto.precio * producto.cantidad, 0) + ".-";
            productosCarrito.innerHTML += `
            <li class="bloque-item">
                <div class="img-nombre">
                    <img src='${p.ruta_img}' height='72px' width='72px'>
                    <div>
                        <p>${p.nombre}</p>
                        <button onclick="eliminarProducto(${i}, true)" class="btn-outline red" style="margin: 10px 0 0 0;">Eliminar del carrito</button>
                    </div>
                </div>
                <div class="opcionesCarrito">
                    <button class="btn-outline eliminar" onclick="eliminarProducto(${i}, false)">-</button>
                    <p>${p.cantidad}</p>
                    <button class="btn-outline agregar" onclick="agregarCarrito(${p.id})">+</button>
                </div>
                <p style="font-size: 18px; min-width: 100px;">$${p.precio * p.cantidad}.-</p>
            </li>
            `;
        });    
    } else {
        productosCarrito.innerHTML = `
            <img src="https://cdn-icons-png.flaticon.com/512/2762/2762885.png" alt="" width="100px" height="100px" style="margin-top: 15px;">
            <p style="margin-bottom: 15px;">No hay productos en el carrito</p>
        `;
        numCarrito.textContent = "Carrito: 0 productos";
        total.textContent = "$0.-";
        contadorResumen.textContent = "0";
        btn_comprar.classList.add('disable');
        btn_vaciar_carrito.classList.add('disable');
    }   
}

function cargarCarrito() {
    let carritoGuardado = sessionStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarCarrito();
    }
}

function agregarCarrito(id) {
    let productoSeleccionado = frutasTienda.find(p => p.id == id);
    const productoEnCarrito = carrito.find(producto => producto.id == id);
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
    carrito = [];
    sessionStorage.removeItem("carrito");
    actualizarCarrito();
}

cargarCarrito();