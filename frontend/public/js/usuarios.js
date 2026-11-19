import { API } from './confi.js';



$(document).ready(function () {
    console.log(API.Usuarios)
    consultarDatos();

    $("#formUsuarioCrear").submit(function (event) {
        event.preventDefault();
        crearUsuario();
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
                            <a name="" id="" class="btn btn-danger" href="#" role="button"
                            >Eliminar</a
                            >

                            <a
                                name=""
                                id=""
                                class="btn btn-success"
                                href="#"
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


