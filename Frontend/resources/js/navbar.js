$(function () {
    // Tamaño de texto por defecto del main en pixeles.
    var tamano = 16;
    var MIN = 12;
    var MAX = 24;

    $("#btn-aumentar").on("click", function () {
        if (tamano < MAX) {
            tamano += 2;
            $("main").css("font-size", tamano + "px");
        }
    });

    $("#btn-disminuir").on("click", function () {
        if (tamano > MIN) {
            tamano -= 2;
            $("main").css("font-size", tamano + "px");
        }
    });
});
