let productosCompra = JSON.parse(sessionStorage.getItem("carrito")) || []; // lo que va dsp de || es un default en caso de que carrito no traiga nada
let nombreComprador = sessionStorage.getItem("nombreUsuario") || "Cliente"; // lo que va dsp de || es un default en caso de que nombreUsuario no traiga nada
console.log(nombreComprador);

console.log(productosCompra);


function mostrarTicket(){
    const ticketImpreso = document.getElementById("productos-ticket");
    const totalTicket = document.getElementById("total-ticket");
    const usuario = document.getElementById("usuario");
    const fecha = document.getElementById("fecha");

    fecha.textContent = new Date().toLocaleDateString();
    usuario.textContent = `Cliente: ${nombreComprador}`;
    productosCompra.forEach(producto => {
        totalTicket.textContent = "$" + productosCompra.reduce((acumulador, producto) => acumulador + producto.precio * producto.cantidad, 0) + ".-";
        ticketImpreso.innerHTML += `
            <li class="ticket-format">
                <p>${producto.nombre}</p>
                <p>x${producto.cantidad}</p>
                <p>${producto.precio * producto.cantidad}</p>
            </li>
        `
    } )
};

mostrarTicket();

// llamamos a los botones para agregarles sus eventos

const botonSalir = document.getElementById("ticket-salir");
const botonDescargar = document.getElementById("ticket-descargar");

botonSalir.addEventListener("click", () => {
    window.location.href = "index.html";
    sessionStorage.removeItem("carrito");
    sessionStorage.removeItem("nombreUsuario");
    console.log("saliendo...");
});

// TO DO: agregar funcionalidad para descargar el ticket en formato PDF.
botonDescargar.addEventListener("click", () => {
    const elementoParaImprimir = document.querySelector(".ticket");

    const opciones = {
        margin: 15,
        filename: 'ticket_neocompute.pdf',
        image: {type: 'jpeg', quality: 0.98},
        html2canvas: {scale: 2},
        jsPDF: {unit: 'mm', format: 'a4', orientation: 'portrait'}
    };

    html2pdf().set(opciones).from(elementoParaImprimir).save();
});