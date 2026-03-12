$(function () {
    //Estructura de colores (aunque tenemos nuestras variables declaradas, utilizamos las de bootstrap) para badges, las usamos para clasificar cada curso
    var categoriaBadge = {
        "Tecnología": "bg-primary",
        "Diseño": "bg-success",
        "Empresa": "bg-info",
        "Idiomas": "bg-secondary"
    };

    var nivelBadge = {
        "Básico": "bg-success",
        "Intermedio": "bg-warning text-dark",
        "Avanzado": "bg-danger"
    };

    // Por cada uno de los cursos creamos la estructura bootstrap de cada curso y luego la adjuntamos en el DOM
    function renderCursos(lista) {
        $("#listado-cursos").empty();
        if (lista.length === 0) {
            $("#listado-cursos").html('<div class="col-12 text-center"><p>No se encontraron cursos con los filtros seleccionados.</p></div>');
            return;
        }
        $.each(lista, function (i, curso) {
            var card = '<div class="col-lg-4 col-md-6">' +
                '<div class="card h-100">' +
                    '<img src="' + curso.imagen + '" class="card-img-top" alt="Curso de ' + curso.titulo + '">' +
                    '<div class="card-body">' +
                        '<h3 class="card-title">' + curso.titulo + '</h3>' +
                        '<p class="card-text">' +
                            '<span class="badge ' + categoriaBadge[curso.categoria] + '">' + curso.categoria + '</span> ' +
                            '<span class="badge ' + nivelBadge[curso.nivel] + '">' + curso.nivel + '</span>' +
                        '</p>' +
                        '<a href="cursos/detalle.html?id=' + curso._id + '" class="btn btn-primary">Ver detalles</a>' +
                    '</div>' +
                '</div>' +
            '</div>';
            $("#listado-cursos").append(card);
        });
    }

    // Filtro de cursos - ahora consulta al servidor con los parámetros
    function filtrarCursos() {
        var texto = $("#buscar-curso").val();
        var categoria = $("#filtro-categoria").val();
        var nivel = $("#filtro-nivel").val();

        $.ajax({
            url: API_BASE_URL + "/cursos",
            method: "GET",
            data: {
                busqueda: texto,
                categoria: categoria,
                nivel: nivel
            },
            success: function (cursos) {
                renderCursos(cursos);
            },
            error: function () {
                $("#listado-cursos").html('<div class="col-12 text-center text-danger"><p>Error al cargar los cursos.</p></div>');
            }
        });
    }

    // Creamos con JQuery eventos
    $("#buscar-curso").on("keyup", filtrarCursos);
    $("#filtro-categoria").on("change", filtrarCursos);
    $("#filtro-nivel").on("change", filtrarCursos);
    $("#limpiar-filtros").on("click", function () {
        $("#buscar-curso").val("");
        $("#filtro-categoria").val("");
        $("#filtro-nivel").val("");
        filtrarCursos();
    });

    // Carga inicial
    filtrarCursos();
});
