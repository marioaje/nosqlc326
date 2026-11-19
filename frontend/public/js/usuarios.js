import { API } from './confi.js';



$(document).ready(function () {
    console.log(API.Usuarios)
    consultarDatos();
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


