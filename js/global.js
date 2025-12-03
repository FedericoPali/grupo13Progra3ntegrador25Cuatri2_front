// Modal
function mostrar_modal(type, func, content) {
    const modal = document.getElementById("modal");
    if (modal.classList.toString() !== "modal") {
        console.error(`El modal de tipo "${type}" no se pudo mostrar.`)
        return;
    } 
    modal.classList.add(func);
    modal.innerHTML = "";
    if (type === "alert") {
        modal.innerHTML = `
            <div class="modal-card">
                <p>${content}</p>
                <div class="modal-actions">
                    <button class="btn-accept" id="aceptar-modal" onclick="btnAceptarModal()">Aceptar</button>
                </div>
            </div>
        `
        modal.style.display = "flex";
    } else if (type === "confirm") {
        modal.innerHTML = `
            <div class="modal-card">
                <p>${content}</p>
                <div class="modal-actions">
                    <button class="btn-cancel" id="cancelar-modal" onclick="btnCancelarModal()">Cancelar</button>
                    <button class="btn-accept" id="aceptar-modal" onclick="btnAceptarModal()">Aceptar</button>
                </div>
            </div>
        `
        modal.style.display = "flex";
    } else if (type === "options") {
        modal.innerHTML = `
            <div class="modal-card">
                <p>${content["message"]}</p>
                <div class="modal-actions">
                    <button class="btn-cancel" id="cancelar-modal" onclick="btnCancelarModal()">Cancelar</button>
                    <button class="btn-secundary" id="secundario-modal" onclick="btnSecundarioModal()">${content["btnSecundarioText"]}</button>
                    <button class="btn-accept" id="aceptar-modal" onclick="btnAceptarModal()">Aceptar</button>
                </div>
            </div>
        `
        modal.style.display = "flex";
        if (!content["btnCancelarVisible"]) document.getElementById('cancelar-modal').remove();
        if (!content["btnAceptarVisible"]) document.getElementById('aceptar-modal').remove();
    } else {
        console.error(`No se reconoce a "${type}" como un tipo de modal valido.`);
    }
}

function btnCancelarModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
    if (modal.classList.contains('abrirCarrito')) {
        abrirCarrito(false);
        modal.classList = "modal";
    } else {
        modal.classList = "modal";
    }
};
function btnSecundarioModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
    if (modal.classList.contains('agregarCarrito')) {
        window.location.href = "carrito.html";
        modal.classList = "modal";
    } else if (modal.classList.contains('abrirCarrito')) {
        window.location.href = "productos.html";
        modal.classList = "modal";
    } else {
        modal.classList = "modal";
    }
}
function btnAceptarModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
    if (modal.classList.contains('abrirCarrito')) {
        abrirCarrito(true);
        modal.classList = "modal";
    } else if (modal.classList.contains('nombreUsuario')) {
        window.location.href = "index.html";
        modal.classList = "modal";
    } else if (modal.classList.contains('regresarIndex')) {
        window.location.href = "index.html";
        sessionStorage.removeItem("carrito");
        sessionStorage.removeItem("nombreUsuario");
        modal.classList = "modal";
    } else if (modal.classList.contains('vaciarCarrito')) {
        carrito = [];
        sessionStorage.removeItem("carrito");
        actualizarCarrito();
        console.log('actualizado');
        modal.classList = "modal";
        mostrar_modal(type="alert", func=null, content="Se eliminó el contenido de su carrito.");
    } else {
        modal.classList = "modal";
    }
};

// nombres de los alumnos del grupo que vamos a poner en todas las pantallas
const alumnos = [
    { nombre: "Federico", apellido: "Pali" },
    { nombre: "Francisco", apellido: "Razzitte" }
];

function imprimirDatosAlumnos(listaAlumnos) {
    const footer = document.getElementById("footer-main");

    // Usamos .map() para crear un array con los nombres completos
    // y .join() para unirlos en un solo string
    const nombresCompletos = listaAlumnos
        .map(alumno => `${alumno.nombre} ${alumno.apellido}`)
        .join(' y ');

    // Creamos el elemento <p> con los nombres unidos
    const pAlumnos = document.createElement('p');
    pAlumnos.textContent = nombresCompletos;

    if (footer) {
        // Insertamos el <p> al principio del nav
        footer.prepend(pAlumnos);
    }
}

function agregarBotonAdmin(){
    const nav = document.getElementById("nav");

    if(!nav) return;

    nav.innerHTML += `
        <button href="index.html" id="nav_home" onclick="volverIndex()"><span class="material-symbols-outlined">home</span></button>
        <a href="productos.html" id="nav_productos"><span class="material-symbols-outlined">local_mall</span></a>
        <a href="carrito.html" id="nav_carrito"><span class="material-symbols-outlined">shopping_cart</span><span class="badge" id="contadorCarrito">0</span></a>
        <button id="nav_tema" onclick="cambiarTema()"><span class="material-symbols-outlined" id="icon_light">light_mode</span><span class="material-symbols-outlined" id="icon_dark">dark_mode</span></button>
    `;
}

function volverIndex() {
    mostrar_modal(type="confirm", func="regresarIndex", content='¿Seguro que quieres regresar a la página principal?<br>Tu carrito se borrará y la sesión actual se cerrará.');
}

// 3. Llamamos a la función al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    if (!(document.title === "Bienvenida - Neo Compute")) {
        if (!sessionStorage.getItem("nombreUsuario")) {
            mostrar_modal(type="alert", func="nombreUsuario", content='Necesitas tener un nombre de usuario para acceder a esta página.');
        }
    }

    const temaGuardado = localStorage.getItem('tema');

    if(temaGuardado === 'oscuro') {
        document.body.classList.add('dark_theme');
    }

    imprimirDatosAlumnos(alumnos);
    agregarBotonAdmin();
});


function cambiarTema(){
    const body = document.body
    const claseBody = body.classList;
    if(claseBody.contains('dark_theme')){
        body.classList.remove("dark_theme");
        localStorage.setItem('tema', 'claro')
    
    } else {
        body.classList.add('dark_theme');
        localStorage.setItem('tema', 'oscuro')
    }
}