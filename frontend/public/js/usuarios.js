import { API } from './confi.js';


///Cuando la pagina termina de cargar el html, ejecuta todas 
// estas funciones y agrega funciones adicionales
$(document).ready(function () {
    console.log(API.Usuarios)
    consultarDatos();

    $("#formUsuarioCrear").submit(function (event) {
        event.preventDefault();
        crearUsuario();
    });

    $("#formUsuarioEditar").submit(function (event) {
        event.preventDefault();
        editarUsuario();
    });

    $("#formUsuarioEliminar").submit(function (event) {
        event.preventDefault();
        eliminarUsuario();
    });

});


export async function consultarDatos() {


    $.ajax({
        type: "GET",
        url: API.Usuarios,

        dataType: "json",
        success: function (response) {
            muestreLosDatosEnTabla(response)
        },
        error: function (xhr, status, error) {
            let mensaje = xhr.status + ", " + xhr.responseJSON + " ," + xhr.statusText + " ," + xhr.responseText;
            console.log(mensaje);
        }
    });
}


function muestreLosDatosEnTabla(response) {

    console.log(response);

    let tabla = $("#nombreTabla");
    tabla.empty();


    response.forEach(elementIndividual => {
        let fila = `        
                    <tr class="">
                        <td scope="row">${elementIndividual._id}</td>
                        <td>${elementIndividual.nombre}</td>
                        <td>${elementIndividual.correo}</td>
                        <td>
                            <a name="" 
                                id="" 
                                class="btn btn-danger" 
                                onclick="cargarDatosUsuarioEiminar('${elementIndividual._id}')" 
                                role="button"
                            >Eliminar</a
                            >

                            <a
                                name=""
                                id=""
                                class="btn btn-success"
                                onclick="cargarDatosUsuario('${elementIndividual._id}')"
                                role="button"
                            >Modificar</a
                            >
                        </td>
                    </tr>
        `;

        tabla.append(fila);

    });

}



function crearUsuario() {
    const nombre = $("#nombre").val();
    const correo = $("#correo").val();

    const objetoUsuario = {
        nombre,
        correo
    };

    console.log(objetoUsuario);


    $.ajax({
        type: "POST",
        url: API.Usuarios,
        data: JSON.stringify(objetoUsuario),
        dataType: "json",
        contentType: "application/json",
        success: function (response) {
            alert("Usuario creado");
            consultarDatos();
            $("#formUsuarioCrear")[0].reset();
        },
        error: function (xhr, status, error) {
            let mensaje = xhr.status + ", " + xhr.responseJSON + " ," + xhr.statusText + " ," + xhr.responseText;
            console.log(mensaje);
        }
    });

}


window.cargarDatosUsuario = function (id) {
    const url = `${API.Usuarios}/${id}`;
    $.ajax({
        type: "GET",
        url: url,

        dataType: "json",
        success: function (response) {
            cargarDatosInputFormularioEditar(response)
        },
        error: function (xhr, status, error) {
            let mensaje = xhr.status + ", " + xhr.responseJSON + " ," + xhr.statusText + " ," + xhr.responseText;
            console.log(mensaje);
        }
    });
}


window.cargarDatosUsuarioEiminar = function (id) {
    const url = `${API.Usuarios}/${id}`;
    $.ajax({
        type: "GET",
        url: url,

        dataType: "json",
        success: function (response) {
            cargarDatosInputFormularioEliminar(response)
        },
        error: function (xhr, status, error) {
            let mensaje = xhr.status + ", " + xhr.responseJSON + " ," + xhr.statusText + " ," + xhr.responseText;
            console.log(mensaje);
        }
    });
}



function cargarDatosInputFormularioEditar(response) {
    $("#ideditar").val(response._id);
    $("#nombreeditar").val(response.nombre);
    $("#correoeditar").val(response.correo);


    const modalEditar = new bootstrap.Modal($("#modalEditar")[0]);
    modalEditar.show();
}




function cargarDatosInputFormularioEliminar(response) {
    $("#ideliminar").val(response._id);
    $("#nombreeliminar").val(response.nombre);
    $("#correoeliminar").val(response.correo);


    const modalEliminar = new bootstrap.Modal($("#modalEliminar")[0]);
    modalEliminar.show();
}



function editarUsuario() {
    const id = $("#ideditar").val();
    const nombre = $("#nombreeditar").val();
    const correo = $("#correoeditar").val();

    const url = `${API.Usuarios}/${id}`;

    const objetoUsuario = {
        nombre,
        correo
    };

    console.log(objetoUsuario);


    $.ajax({
        type: "PUT",
        url: url,
        data: JSON.stringify(objetoUsuario),
        dataType: "json",
        contentType: "application/json",
        success: function (response) {
            alert("Usuario editado");
            consultarDatos();
            $("#formUsuarioEditar")[0].reset();
            bootstrap.Modal.getInstance($("#modalEditar")[0]).hide();
        },
        error: function (xhr, status, error) {
            let mensaje = xhr.status + ", " + xhr.responseJSON + " ," + xhr.statusText + " ," + xhr.responseText;
            console.log(mensaje);
        }
    });

}




function eliminarUsuario() {
    const id = $("#ideliminar").val();
    const url = `${API.Usuarios}/${id}`;

    $.ajax({
        type: "DELETE",
        url: url,
        dataType: "json",
        contentType: "application/json",
        success: function (response) {
            alert("Usuario eliminado");
            consultarDatos();
            $("#formUsuarioEliminar")[0].reset();
            bootstrap.Modal.getInstance($("#modalEliminar")[0]).hide();
        },
        error: function (xhr, status, error) {
            let mensaje = xhr.status + ", " + xhr.responseJSON + " ," + xhr.statusText + " ," + xhr.responseText;
            console.log(mensaje);
        }
    });

}