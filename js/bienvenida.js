// Obtenemos los elementos DOM necesarios
const formBienvenida = document.getElementById("form-bienvenida");
const inputNombre = document.getElementById("nombreIngresado");

formBienvenida.addEventListener("submit", async (event) =>{
    // previene que la pagina se recargue
    event.preventDefault();

    let nombreUsuario = inputNombre.value.trim(); // el trim lo que hace es cortar los espacios en blanco que hayan en el inicio o el final

    let nombreValido = /^[a-zA-Z\s]+$/;

    if(nombreUsuario.length > 3 && nombreValido.test(nombreUsuario)){
        sessionStorage.setItem("nombreUsuario", nombreUsuario);

        window.location.href = "productos.html"; // redirige la ventana hacia el html de productos luego de submitear el nombre de usuario
    } else {
        mostrar_modal(type="alert", func=null, content="Ingresar un nombre valido para continuar");
    }
});