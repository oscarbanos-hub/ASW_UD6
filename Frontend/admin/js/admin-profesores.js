$(function () {
    comprobarSesion();
    var modal = null;

    function getModal() {
        if (!modal) modal = new bootstrap.Modal(document.getElementById("modalProfesor"));
        return modal;
    }

    function cargarProfesores() {
        $.ajax({
            url: API_BASE_URL + "/profesores",
            method: "GET",
            success: function (profesores) {
                $("#tabla-profesores").empty();
                if (profesores.length === 0) {
                    $("#tabla-profesores").html('<tr><td colspan="5" class="text-center">No hay profesores</td></tr>');
                    return;
                }
                $.each(profesores, function (i, prof) {
                    var fila = '<tr>' +
                        '<td>' + prof.nombre + '</td>' +
                        '<td>' + prof.email + '</td>' +
                        '<td>' + prof.especialidad + '</td>' +
                        '<td>' + (prof.experiencia || 0) + ' años</td>' +
                        '<td>' +
                            '<button class="btn btn-warning btn-accion btn-editar" data-id="' + prof._id + '">Editar</button> ' +
                            '<button class="btn btn-danger btn-accion btn-eliminar" data-id="' + prof._id + '">Eliminar</button>' +
                        '</td>' +
                    '</tr>';
                    $("#tabla-profesores").append(fila);
                });
            },
            error: function () {
                console.log("error cargando profesores");
                $("#tabla-profesores").html('<tr><td colspan="5" class="text-center text-danger">Error al cargar</td></tr>');
            }
        });
    }

    $("#btn-nuevo").click(function () {
        $("#modalProfesorTitulo").text("Nuevo Profesor");
        $("#profesor-id").val("");
        $("#profesor-nombre").val("");
        $("#profesor-email").val("");
        $("#profesor-especialidad").val("");
        $("#profesor-experiencia").val("");
        $("#profesor-cursos").val("");
        getModal().show();
    });

    $(document).on("click", ".btn-editar", function() {
        var id = $(this).data("id");
        $.ajax({
            url: API_BASE_URL + "/profesores/" + id,
            method: "GET",
            success: function (prof) {
                $("#modalProfesorTitulo").text("Editar Profesor");
                $("#profesor-id").val(prof._id);
                $("#profesor-nombre").val(prof.nombre);
                $("#profesor-email").val(prof.email);
                $("#profesor-especialidad").val(prof.especialidad);
                $("#profesor-experiencia").val(prof.experiencia);
                $("#profesor-cursos").val(prof.cursos);
                getModal().show();
            },
            error: function () { alert("Error al cargar profesor"); }
        });
    });

    // guardar profe
    $("#btn-guardar-profesor").on("click", function () {
        var id = $("#profesor-id").val();
        var datos = {
            nombre: $("#profesor-nombre").val(),
            email: $("#profesor-email").val(),
            especialidad: $("#profesor-especialidad").val(),
            experiencia: parseInt($("#profesor-experiencia").val()) || 0,
            cursos: parseInt($("#profesor-cursos").val()) || 0
        };

        if (id) {
            $.ajax({
                url: API_BASE_URL + "/profesores/" + id,
                method: "PUT",
                contentType: "application/json",
                data: JSON.stringify(datos),
                success: function () { getModal().hide(); cargarProfesores(); },
                error: function () { alert("Error al actualizar"); }
            });
        } else {
            $.ajax({
                url: API_BASE_URL + "/profesores",
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(datos),
                success: function () { getModal().hide(); cargarProfesores(); },
                error: function () { alert("Error al crear"); }
            });
        }
    });

    $(document).on("click", ".btn-eliminar", function () {
        if (!confirm("¿Eliminar este profesor?")) return;
        var id = $(this).data("id");
        $.ajax({
            url: API_BASE_URL + "/profesores/" + id,
            method: "DELETE",
            success: function () { cargarProfesores(); },
            error: function () { alert("No se pudo eliminar"); }
        });
    });

    cargarProfesores();
});
