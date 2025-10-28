// nombres de los alumnos del grupo que vamos a poner en todas las pantallas
const alumnos = [
    { nombre: "Federico", apellido: "Pali" },
    { nombre: "Francisco", apellido: "Razzitte" }
];

function imprimirDatosAlumnos(listaAlumnos) {
    const nav = document.getElementById("nav");

    // Usamos .map() para crear un array con los nombres completos
    // y .join() para unirlos en un solo string
    const nombresCompletos = listaAlumnos
        .map(alumno => `${alumno.nombre} ${alumno.apellido}`)
        .join(' y ');

    // Creamos el elemento <p> con los nombres unidos
    const pAlumnos = document.createElement('p');
    pAlumnos.textContent = nombresCompletos;

    if (nav) {
        // Insertamos el <p> al principio del nav
        nav.prepend(pAlumnos);
    }
}

// 3. Llamamos a la función al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    imprimirDatosAlumnos(alumnos);
});