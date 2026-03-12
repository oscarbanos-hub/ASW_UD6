$(function () {
    comprobarSesion();

    var modal = null;
    function getModal() {
        if (!modal) modal = new bootstrap.Modal(document.getElementById("modalNoticia"));
        return modal;
    }

    function cargarNoticias() {
        $.ajax({
            url: API_BASE_URL + "/noticias",
            method: "GET",
            success: function (noticias) {
                $("#tabla-noticias").empty();
                if (noticias.length === 0) {
                    $("#tabla-noticias").html('<tr><td colspan="4" class="text-center">No hay noticias</td></tr>');
                    return;
                }
                $.each(noticias, function (i, noticia) {
                    var fecha = new Date(noticia.fecha).toLocaleDateString("es-ES");
                    var resumenCorto = noticia.resumen.length > 60 ? noticia.resumen.substring(0, 60) + '...' : noticia.resumen;
                    var fila = '<tr>' +
                        '<td>' + noticia.titulo + '</td>' +
                        '<td>' + resumenCorto + '</td>' +
                        '<td>' + fecha + '</td>' +
                        '<td>' +
                            '<button class="btn btn-warning btn-accion btn-editar" data-id="' + noticia._id + '">Editar</button> ' +
                            '<button class="btn btn-danger btn-accion btn-eliminar" data-id="' + noticia._id + '">Eliminar</button>' +
                        '</td>' +
                    '</tr>';
                    $("#tabla-noticias").append(fila);
                });
            },
            error: function () {
                console.log("fallo al cargar noticias");
                $("#tabla-noticias").html('<tr><td colspan="4" class="text-center text-danger">Error al cargar noticias</td></tr>');
            }
        });
    }

    $("#btn-nuevo").on("click", function () {
        $("#modalNoticiaTitulo").text("Nueva Noticia");
        $("#noticia-id").val("");
        $("#noticia-titulo").val("");
        $("#noticia-resumen").val("");
        $("#noticia-contenido").val("");
        getModal().show();
    });

    // no tenemos endpoint GET /noticias/:id asi que tiramos del listado y filtramos aqui
    $(document).on("click", ".btn-editar", function () {
        var id = $(this).data("id");
        $.ajax({
            url: API_BASE_URL + "/noticias",
            method: "GET",
            success: function (noticias) {
                var noticia = noticias.find(function (n) { return n._id === id; });
                if (!noticia) { alert("No se encontro la noticia"); return; }
                $("#modalNoticiaTitulo").text("Editar Noticia");
                $("#noticia-id").val(noticia._id);
                $("#noticia-titulo").val(noticia.titulo);
                $("#noticia-resumen").val(noticia.resumen);
                $("#noticia-contenido").val(noticia.contenido);
                getModal().show();
            },
            error: function () { alert("Error al cargar noticias"); }
        });
    });

    $("#btn-guardar-noticia").on("click", function () {
        var id = $("#noticia-id").val();
        var datos = {
            titulo: $("#noticia-titulo").val(),
            resumen: $("#noticia-resumen").val(),
            contenido: $("#noticia-contenido").val()
        };

        if (id) {
            $.ajax({
                url: API_BASE_URL + "/noticias/" + id,
                method: "PUT",
                contentType: "application/json",
                data: JSON.stringify(datos),
                success: function () { getModal().hide(); cargarNoticias(); },
                error: function () { alert("Error al actualizar"); }
            });
        } else {
            $.ajax({
                url: API_BASE_URL + "/noticias",
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(datos),
                success: function () { getModal().hide(); cargarNoticias(); },
                error: function () { alert("Error al crear"); }
            });
        }
    });

    $(document).on("click", ".btn-eliminar", function () {
        var id = $(this).data("id");
        if (confirm("¿Eliminar esta noticia?")) {
            $.ajax({
                url: API_BASE_URL + "/noticias/" + id,
                method: "DELETE",
                success: function () { cargarNoticias(); },
                error: function () { alert("Error al eliminar"); }
            });
        }
    });

    cargarNoticias();
});
