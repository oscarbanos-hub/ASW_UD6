// Guardamos la sesión en el localStorgae del navegador

function comprobarSesion() {
    var usuario = localStorage.getItem("admin_usuario");
    if (!usuario) {
        window.location.href = "login.html";
        return null;
    }
    return JSON.parse(usuario);
}

function cerrarSesion() {
    localStorage.removeItem("admin_usuario");
    window.location.href = "login.html";
}

// pone el nombre del usuario en el navbar si existe el elemento
$(function () {
    var usuario = localStorage.getItem("admin_usuario");
    if (usuario) {
        var datos = JSON.parse(usuario);
        $("#admin-nombre").text(datos.nombre);
    }
});
