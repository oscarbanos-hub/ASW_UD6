$(function () {
    var profesores = [];

    // Genera las filas de la tabla a partir del array
    function renderTabla(lista) {
        $("#tabla-profesorado").empty();
        $.each(lista, function (i, prof) {
            var fila = '<tr>' +
                '<td>' + prof.nombre + '</td>' +
                '<td>' + prof.especialidad + '</td>' +
                '<td>' + prof.experiencia + ' años</td>' +
                '<td>' + prof.cursos + '</td>' +
                '<td>' + prof.requisitos + '</td>' +
            '</tr>';
            $("#tabla-profesorado").append(fila);
        });
    }

    // generamos evento de Click en la cabecera
    $("thead th[data-campo]").on("click", function () {
        var $th = $(this);
        var campo = $th.data("campo");
        var ordenActual = $th.data("orden");

        // Toggle: none -> asc, asc -> desc, desc -> asc
        var nuevaOrden = (ordenActual === "asc") ? "desc" : "asc";

        // quitamos la ordenación de toda la cabecera
        $("thead th[data-campo]").data("orden", "none");
        $th.data("orden", nuevaOrden);

        // Ordenamos el array
        profesores.sort(function (a, b) {
            var valA = a[campo];
            var valB = b[campo];

            // Tenemos que comparar números y textos por separado
            if (typeof valA === "number") {
                return nuevaOrden === "asc" ? valA - valB : valB - valA;
            } else {
                var comp = valA.localeCompare(valB, "es");
                return nuevaOrden === "asc" ? comp : -comp;
            }
        });
        //Cargamos la tabla con el array ordenado según la cabecera.
        renderTabla(profesores);
    });

    // Carga inicial desde la API
    $.ajax({
        url: API_BASE_URL + "/profesores",
        method: "GET",
        success: function (data) {
            profesores = data;
            renderTabla(profesores);
        },
        error: function () {
            $("#tabla-profesorado").html('<tr><td colspan="5" class="text-center text-danger">Error al cargar el profesorado.</td></tr>');
        }
    });
});
