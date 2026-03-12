$(function () {
    // Variables de los badges de bootstrap que vimos en el listado
    var categoriaBadge = {
        "Develop": "bg-primary",
        "Programación": "bg-success",
        "Negocio": "bg-info",
        "Seguridad Informática": "bg-secondary"
    };

    var nivelBadge = {
        "Inicial": "bg-success",
        "Medio": "bg-warning text-dark",
        "avanzado": "bg-danger"
    };

    // Por QueryParams identificamos el curso
    var params = new URLSearchParams(window.location.search);
    var cursoId = params.get("id");

    if (!cursoId) {
        $("main").html('<div class="container my-4"><p>Puede volver al listado de cursos para acceder a uno.</p></div>');
        return;
    }

    // Cargar detalle del curso desde la API
    $.ajax({
        url: API_BASE_URL + "/cursos/" + cursoId,
        method: "GET",
        success: function (curso) {
            document.title = curso.titulo + " - Formación Global Online";

            // TODO: Problemas para gestionar imagenes de momento
            if (curso.imagen) {
                $("#curso-imagen").attr("src", "../" + curso.imagen).attr("alt", "Curso de " + curso.titulo);
                $("#curso-imagen").on("error", function () { $(this).hide(); });
            } else {
                $("#curso-imagen").hide();
            }
            $("#curso-titulo").text(curso.titulo);

            // Rellenamos la info
            $("#curso-categoria").text(curso.categoria).addClass(categoriaBadge[curso.categoria]);
            $("#curso-nivel").text(curso.nivel).addClass(nivelBadge[curso.nivel]);
            $("#curso-duracion").text(curso.duracion);
            // Si el profesor viene populado, mostramos su nombre; si no, el campo instructor
            var nombreProfesor = curso.profesor ? curso.profesor.nombre : curso.instructor;
            $("#curso-instructor").text(nombreProfesor);
            $("#curso-descripcion").text(curso.descripcion);
            $("#curso-requisitos").text(curso.requisitos);

            // Rellenamos las listas
            $.each(curso.contenido, function (i, item) {
                $("#curso-contenido").append('<li class="list-group-item">' + item + '</li>');
            });

            $.each(curso.objetivos, function (i, item) {
                $("#curso-objetivos").append('<li class="list-group-item">' + item + '</li>');
            });

            // Cargar comentarios
            cargarComentarios();
        },
        error: function () {
            $("main").html('<div class="container my-4"><p>El curso no se encuentra en el catálogo de formación.</p></div>');
        }
    });

    // Cargar comentarios del curso
    function cargarComentarios() {
        $.ajax({
            url: API_BASE_URL + "/cursos/" + cursoId + "/comentarios",
            method: "GET",
            success: function (comentarios) {
                $("#lista-comentarios").empty();
                if (comentarios.length === 0) {
                    $("#lista-comentarios").html('<p class="text-muted">No hay comentarios todavía.</p>');
                    return;
                }
                $.each(comentarios, function (i, com) {
                    var autor = com.usuario ? com.usuario.nombre : "Anónimo";
                    var fecha = new Date(com.fecha).toLocaleDateString("es-ES");
                    var comentarioHtml = '<div class="border-bottom pb-2 mb-2">' +
                        '<strong>' + autor + '</strong> <small class="text-muted">' + fecha + '</small>' +
                        '<p class="mb-0">' + com.texto + '</p>' +
                    '</div>';
                    $("#lista-comentarios").append(comentarioHtml);
                });
            },
            error: function () {
                $("#lista-comentarios").html('<p class="text-muted">No se pudieron cargar los comentarios.</p>');
            }
        });
    }
});
