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
        <a href="login.html" id="nav_login"><span class="material-symbols-outlined">admin_panel_settings</span></a>
        <button id="nav_tema" onclick="cambiarTema()"><span class="material-symbols-outlined" id="icon_light">light_mode</span><span class="material-symbols-outlined" id="icon_dark">dark_mode</span></button>
    `;
}

function volverIndex() {
    if (confirm('¿Seguro que quieres regresar a la página principal?\nTu carrito se borrará y la sesión actual se cerrará.')) {
        window.location.href = "index.html";
        sessionStorage.removeItem("carrito");
        sessionStorage.removeItem("nombreUsuario");
    }
}

// 3. Llamamos a la función al cargar la página
document.addEventListener('DOMContentLoaded', () => {

    const temaGuardado = localStorage.getItem('tema');

    if(temaGuardado === 'oscuro') {
        document.body.classList.add('disable');
    }

    imprimirDatosAlumnos(alumnos);
    agregarBotonAdmin();
});


function cambiarTema(){
    const body = document.body
    const claseBody = body.classList;
    
    if(confirm("Quiere cambiar el tema?")){
        console.log(claseBody);
        
        if(claseBody.contains('disable')){
            body.classList.remove("disable");
            console.log(claseBody);

            localStorage.setItem('tema', 'claro')
        
        } else {
            body.classList.add('disable');
            console.log(claseBody);

            localStorage.setItem('tema', 'oscuro')
            
        }
    }
}