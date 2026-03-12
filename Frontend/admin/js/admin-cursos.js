$(function () {
    comprobarSesion();

    var modal = null;
    // lazy init del modal porque si lo creamos antes de que cargue el DOM da problemas
    function getModal() {
        if (!modal) modal = new bootstrap.Modal(document.getElementById("modalCurso"));
        return modal;
    }

    // cargamos los profes para el desplegable del formulario
    function cargarProfesores(callback) {
        $.ajax({
            url: API_BASE_URL + "/profesores",
            method: "GET",
            success: function (profesores) {
                var select = $("#curso-profesorID");
                select.empty();
                $.each(profesores, function (i, prof) {
                    select.append('<option value="' + prof._id + '">' + prof.nombre + '</option>');
                });
                if (callback) callback();
            },
            error: function () { console.error("Error cargando profesores"); }
        });
    }

    function cargarCursos() {
        $.ajax({
            url: API_BASE_URL + "/cursos",
            method: "GET",
            success: function (cursos) {
                $("#tabla-cursos").empty();
                if (cursos.length === 0) {
                    $("#tabla-cursos").html('<tr><td colspan="5" class="text-center">No hay cursos</td></tr>');
                    return;
                }
                $.each(cursos, function (i, curso) {
                    var fila = '<tr>' +
                        '<td>' + curso.titulo + '</td>' +
                        '<td>' + curso.categoria + '</td>' +
                        '<td>' + curso.nivel + '</td>' +
                        '<td>' + curso.duracion + 'h</td>' +
                        '<td>' +
                            '<button class="btn btn-warning btn-accion btn-editar" data-id="' + curso._id + '">Editar</button> ' +
                            '<button class="btn btn-danger btn-accion btn-eliminar" data-id="' + curso._id + '">Eliminar</button>' +
                        '</td>' +
                    '</tr>';
                    $("#tabla-cursos").append(fila);
                });
            },
            error: function (xhr) {
                console.error("Error cargando cursos:", xhr.status, xhr.statusText);
                $("#tabla-cursos").html('<tr><td colspan="5" class="text-center text-danger">Error al cargar cursos</td></tr>');
            }
        });
    }

    // nuevo curso - limpiamos todo el formulario
    $("#btn-nuevo").on("click", function () {
        $("#modalCursoTitulo").text("Nuevo Curso");
        $("#curso-id").val("");
        $("#curso-titulo").val("");
        $("#curso-categoria").val("Develop");
        $("#curso-nivel").val("Inicial");
        $("#curso-duracion").val("");
        $("#curso-descripcion").val("");
        $("#curso-temario").val("");
        cargarProfesores(function () {
            getModal().show();
        });
    });

    // editar
    $(document).on("click", ".btn-editar", function () {
        var id = $(this).data("id");
        console.log("editando curso " + id);
        $.get(API_BASE_URL + "/cursos/" + id, function (curso) {
            $("#modalCursoTitulo").text("Editar Curso");
            $("#curso-id").val(curso._id);
            $("#curso-titulo").val(curso.titulo);
            $("#curso-categoria").val(curso.categoria);
            $("#curso-nivel").val(curso.nivel);
            $("#curso-duracion").val(curso.duracion);
            $("#curso-descripcion").val(curso.descripcion);
            $("#curso-temario").val(curso.temario);
            // cargamos profesores y despues seleccionamos el correcto
            cargarProfesores(function () {
                // el profesorID puede venir populado (objeto) o solo el id
                var profId = curso.profesorID ? (curso.profesorID._id || curso.profesorID) : "";
                $("#curso-profesorID").val(profId);
                getModal().show();
            });
        });
    });

    // guardar - si tiene id es update, si no es create
    $("#btn-guardar-curso").on("click", function () {
        var id = $("#curso-id").val();
        var datos = {
            titulo: $("#curso-titulo").val(),
            categoria: $("#curso-categoria").val(),
            nivel: $("#curso-nivel").val(),
            duracion: parseInt($("#curso-duracion").val()),
            descripcion: $("#curso-descripcion").val(),
            temario: $("#curso-temario").val(),
            profesorID: $("#curso-profesorID").val()
        };

        // TODO: validar que al menos el titulo no este vacio
        if (id) {
            $.ajax({
                url: API_BASE_URL + "/cursos/" + id,
                method: "PUT",
                contentType: "application/json",
                data: JSON.stringify(datos),
                success: function () {
                    getModal().hide();
                    cargarCursos();
                },
                error: function () { alert("Error al actualizar el curso"); }
            });
        } else {
            $.ajax({
                url: API_BASE_URL + "/cursos",
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(datos),
                success: function () {
                    getModal().hide();
                    cargarCursos();
                },
                error: function () { alert("Error al crear el curso"); }
            });
        }
    });

    $(document).on("click", ".btn-eliminar", function () {
        var id = $(this).data("id");
        if (!confirm("¿Seguro que quieres eliminar este curso?")) return;
        $.ajax({
            url: API_BASE_URL + "/cursos/" + id,
            method: "DELETE",
            success: function () { cargarCursos(); },
            error: function () { alert("Error al eliminar"); }
        });
    });

    cargarCursos();
});
