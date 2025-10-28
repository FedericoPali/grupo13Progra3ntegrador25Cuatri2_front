
// Ejercicio 1
/* creamos un array de 13 frutas con el siguiente formato
• id
• nombre
• precio
• ruta de la imagen (correspondiente a la carpeta img). */

let frutasTienda = [
    {id:1 , nombre: "anana", precio: 3000, ruta_img: "img/anana.jpg" },
    {id:2 , nombre: "arandano", precio: 5000, ruta_img: "img/arandano.jpg" },
    {id:3 , nombre: "banana", precio: 1000, ruta_img: "img/banana.jpg" },
    {id:4 , nombre: "frambuesa", precio: 4000, ruta_img: "img/frambuesa.png" },
    {id:5 , nombre: "frutilla", precio: 3000, ruta_img: "img/frutilla.jpg" },
    {id:6 , nombre: "kiwi", precio: 2000, ruta_img: "img/kiwi.jpg" },
    {id:7 , nombre: "mandarina", precio: 800, ruta_img: "img/mandarina.jpg" },
    {id:8 , nombre: "manzana", precio: 1500, ruta_img: "img/manzana.jpg" },
    {id:9 , nombre: "naranja", precio: 9000, ruta_img: "img/naranja.jpg" },
    {id:10 , nombre: "pera", precio: 2500, ruta_img: "img/pera.jpg" },
    {id:11 , nombre: "pomelo-amarillo", precio: 2000, ruta_img: "img/pomelo-amarillo.jpg" },
    {id:12 , nombre: "pomelo-rojo", precio: 2000, ruta_img: "img/pomelo-rojo.jpg" },
    {id:13 , nombre: "sandia", precio: 6500, ruta_img: "img/sandia.jpg" }
]

// Ejercicio 2

//creamos el objeto alumno
let alumno = {dni: 46623592, nombre: "Federico", apellido: "Pali"};

// obtenemos el nav para poder modificar su contenido luego
let nav = document.getElementById("nav");

// creamos la funcion imprimirDatosAlumno, cree la variable de nombreCompleto pq el enunciado pide repetirlo tanto en el consolelog como luego en el nav por ende decidi guardarlo para no llamar tantas veces a alumno.nombre o apellido.

function imprimirDatosAlumno(alumno){
    let nombreCompleto = `${alumno.nombre} ${alumno.apellido}`;

    console.log(`El alumno se llama ${nombreCompleto} y su DNI es ${alumno.dni}`);

    nav.insertAdjacentHTML("afterbegin", `<p>${nombreCompleto}</p>`);
};

// implementamos en la funcion init() la funcion creada
function init(){
    imprimirDatosAlumno(alumno);
    
}

// llamamos la funcion init()
init();

//Ejercicio 3

// obtenemos el section donde iran los productos para poder modificar su contenido luego
let listaProductos = document.getElementById("listaProductos");

// creamos la variable cartaProductos
let cartaProductos = "";


// creamos la funcion que recorre el array que le pasemos a traves de un foreach para agregar por cada producto su imagen, nombre, precio y un boton que agregue al mismo al carrito
function mostrarProductos(array){
    cartaProductos = "";
    array.forEach(producto => {
        cartaProductos += `
        <div class="card-producto">
            <img src="${producto.ruta_img}" alt="">
            <h3>${producto.nombre}</h3>
            <p>${producto.precio}</p>
            <button onclick="agregarACarrito(${producto.id})">Agregar al carrito</button>
        </div>
        `;
    });
    listaProductos.innerHTML = cartaProductos;
}

mostrarProductos(frutasTienda);

// Ejercicio 4

// obtenemos la barraBusqueda del HTML para luego redirigir la funcion
let barraBusqueda = document.getElementById("barraBusqueda");

// creamos un evento que cada vez que terminemos de pulsar una tecla se manda por console log la tecla/palabra que vamos formando y la filtra con el nombre de los productos para que solo aparezcan los que coincidan
barraBusqueda.addEventListener("keyup", function(){
    let valorBusqueda = barraBusqueda.value;
    console.log(valorBusqueda)

    let productosFiltrados = frutasTienda.filter(producto => producto.nombre.includes(valorBusqueda.toLowerCase()));
    console.table(productosFiltrados);
    mostrarProductos(productosFiltrados);
});

// Ejercicio 5

// creamos un array vacio que es el carrito al comenzar a querer agregar productos
let carrito = [];

// obtenemos el id del ul donde imprimiremos cada objeto de nuestro carrito

let objetosCarrito = document.getElementById("objetosCarrito");


// creamos la funcion agregarACarrito para poder meter objetos en el carrito

function agregarACarrito(id){
    let productoEscogido = frutasTienda.find(producto => producto.id == id);

    let productoEnCarrito = carrito.find(producto => producto.id == id);

    if (productoEnCarrito){
        productoEnCarrito.cantidad++; 
    } else {
        carrito.push({...productoEscogido, cantidad: 1});
    }

    console.log(carrito);
    guardarCarrito(); // funcion para LocalStorage
    mostrarCarrito();
    contadorProductosCarrito();
    actualizarPrecioTotal();
}

// creamos la funcion para que se muestre el carrito con sus compras con referencias al nombre, precio e id. Tambien le agregue una funcion por cantidad asi no aparece en el mismo carrito tantas veces por ejemplo el producto banana, de esta forma si hay mas de 1 solamente actualiza y ponene banana - 1000 x2

function mostrarCarrito(){
    cartaCarrito = "";
    carrito.forEach((producto, i) =>{
        cartaCarrito +=`
        <li class="bloque-item">
            <p class="nombre-item">${producto.nombre} - ${producto.precio} x${producto.cantidad}</p>
            <button class="boton-eliminar" onclick="eliminarProducto(${i})">Eliminar</button>
        </li>
        `;
    });
    objetosCarrito.innerHTML = cartaCarrito;
}

// creamos la funcion para eliminar el producto, le agregue un if para que si producto esta mas de 1 vez en el carrito borre solo 1 y si solo queda 1 lo elimina del carrito

function eliminarProducto(index){
    if (carrito[index].cantidad > 1){
        carrito[index].cantidad--; 
    } else{
        carrito.splice(index,1);
    }
    guardarCarrito(); // referencia al LocalStorage
    mostrarCarrito();
    contadorProductosCarrito();
    actualizarPrecioTotal();
}

// Ejercicio 6

// creamos la funcion guardarCarrito para que aunque cerremos la pestaña se nos guarde los cambios realizados en el carrito
function guardarCarrito(){
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// recuperamos el carrito previamente guardado del localStorage
let carritoGuardado = localStorage.getItem("carrito");

// si existe un carrito guardado, lo carga y actualiza la vista
if(carritoGuardado){
    carrito = JSON.parse(carritoGuardado);
    mostrarCarrito();
    contadorProductosCarrito(); // llamamos a la funcion contador para que siempre aparezca actualizado al reinciar la pagina o cerrar la pestaña
    actualizarPrecioTotal();
} else {
    contadorProductosCarrito(); // utilizamos el else para que se ponga igual aun si no hay un carrito guardado
    actualizarPrecioTotal();
}

// Ejercicio 7

// creamos una funcion que calcule cuantos productos hay en el carrito

function contadorProductosCarrito(){
    let totalProductos = carrito.reduce((acumulador, producto) => acumulador + producto.cantidad, 0); // recorremos el array para contar cuantos productos hay en el carrito

    let contadorCarrito = document.getElementById("contadorCarrito");
    contadorCarrito.textContent = `Carrito: ${totalProductos} productos`;
}

// llamamos a la funcion dentro de agregarACarrito y eliminarProducto para que se actualice el contador


// creamos la funcion que actualice el precio total del carrito al agregar o eliminar productos
function actualizarPrecioTotal(){
    let total = carrito.reduce((acumulador, producto) => acumulador + producto.precio * producto.cantidad, 0);

    let totalCarrito = document.getElementById("totalPrecioCarrito");
    totalCarrito.textContent = `Total: $${total}`;
}

// Ejercicio 8

// creamos dos funciones que agrega 2 botones para ordenar el array de productos por nombre y por precio de menor a mayor

function ordenarPorNombre(array) {
    array.sort((a, b) => a.nombre.localeCompare(b.nombre));
    mostrarProductos(array); // actualiza la vista de los productos
}

function ordenarPorPrecio(array) {
    array.sort((a, b) => a.precio - b.precio);
    mostrarProductos(array); // actualiza la vista de los productos
}

// obtenemos los botones para ordenar
let botonNombre = document.getElementById("ordenarPorNombre");
let botonPrecio = document.getElementById("ordenarPorPrecio");

// creamos eventos que se activen a traves de un click para llamar a la funcion de ordenar respectiva a cada boton
botonNombre.addEventListener("click", function(){
    ordenarPorNombre(frutasTienda);
})

botonPrecio.addEventListener("click", function(){
    ordenarPorPrecio(frutasTienda);
})

// Ejercicio 9

function vaciarCarrito(){
    carrito = [];
    guardarCarrito();
    mostrarCarrito();
    contadorProductosCarrito();
    actualizarPrecioTotal();
}

let botonVaciarCarrito = document.getElementById("vaciarCarrito");

botonVaciarCarrito.addEventListener("click", function(){
    vaciarCarrito();
})





