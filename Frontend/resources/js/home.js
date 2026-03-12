$(function () {
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

    // Cargar noticias desde la API
    $.ajax({
        url: API_BASE_URL + "/noticias",
        method: "GET",
        data: { limit: 3 },
        success: function (noticias) {
            $("#listado-noticias").empty();
            $.each(noticias, function (i, noticia) {
                var card = '<div class="col-lg-4 col-md-6">' +
                    '<article class="card h-100">' +
                        '<div class="card-body">' +
                            '<h3 class="card-title">' + noticia.titulo + '</h3>' +
                            '<p class="card-text">' + noticia.resumen + '</p>' +
                            '<p class="texto-extra" style="display:none;">' + noticia.contenido + '</p>' +
                            '<button class="btn btn-primary btn-leer-mas">Leer más</button>' +
                        '</div>' +
                    '</article>' +
                '</div>';
                $("#listado-noticias").append(card);
            });

            // Evento "Leer más" para noticias cargadas dinámicamente
            $(".btn-leer-mas").click(function () {
                var textoExtra = $(this).siblings(".texto-extra");
                textoExtra.slideToggle();
                $(this).text(textoExtra.is(":visible") ? "Leer menos" : "Leer más");
            });
        },
        error: function () {
            $("#listado-noticias").html('<div class="col-12 text-center text-danger"><p>Error al cargar las noticias.</p></div>');
        }
    });

    // Cargar últimos cursos desde la API
    $.ajax({
        url: API_BASE_URL + "/cursos",
        method: "GET",
        data: { limit: 3 },
        success: function (cursos) {
            $("#listado-ultimos-cursos").empty();
            $.each(cursos, function (i, curso) {
                var card = '<div class="col-lg-4 col-md-6">' +
                    '<div class="card h-100">' +
                        // TODO: Problemas para gestionar imagenes de momento
                        (curso.imagen ? '<img src="' + curso.imagen + '" class="card-img-top" alt="Curso de ' + curso.titulo + '" onerror="this.style.display=\'none\'">' : '') +
                        (!curso.imagen ? '<div class="card-img-top bg-secondary text-white d-flex align-items-center justify-content-center" style="height:180px"><span>' + curso.titulo + '</span></div>' : '') +
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
                $("#listado-ultimos-cursos").append(card);
            });
        },
        error: function () {
            $("#listado-ultimos-cursos").html('<div class="col-12 text-center text-danger"><p>Error al cargar los cursos.</p></div>');
        }
    });
});
