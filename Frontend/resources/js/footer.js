$(function () {
    function actualizarFechaHora() {
        var ahora = new Date();
        //Sacamos la fecha con el culture "es"
        var fecha = ahora.toLocaleDateString("es-ES", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        });

        var hora = ahora.toLocaleTimeString("es-ES");

        $("#fecha-actual").text(fecha);
        $("#hora-actual").text(hora);
    }

    actualizarFechaHora();
    setInterval(actualizarFechaHora, 1000);
});
