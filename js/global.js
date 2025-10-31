// Array de productos (esto luego vendrá de un fetch a tu backend)
const frutasTienda = [
    {id:1 , nombre: "anana", precio: 3000, ruta_img: "assets/images/anana.jpg" },
    {id:2 , nombre: "arandano", precio: 5000, ruta_img: "assets/images/arandano.jpg" },
    {id:3 , nombre: "banana", precio: 1000, ruta_img: "assets/images/banana.jpg" },
    {id:4 , nombre: "frambuesa", precio: 4000, ruta_img: "assets/images/frambuesa.png" },
    {id:5 , nombre: "frutilla", precio: 3000, ruta_img: "assets/images/frutilla.jpg" },
    {id:6 , nombre: "kiwi", precio: 2000, ruta_img: "assets/images/kiwi.jpg" }
    // ... agrega más productos si quieres para probar
];

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
    const footer = document.getElementById("footer-main");

    if(!footer) return;

    footer.innerHTML += `<a href="login.html" class="admin-login-button">Panel de Administrador</a>`;
}
// 3. Llamamos a la función al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    imprimirDatosAlumnos(alumnos);
    agregarBotonAdmin();
});

