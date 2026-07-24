const tablaMarcas = document.querySelector("#tablaMarcas tbody");

const modalTitulo = document.getElementById("modalMarcaLabel");
const btnGuardar = document.getElementById("btnGuardarMarca");

const idMarca = document.getElementById("idMarca");
const nombreMarca = document.getElementById("nombreMarca");
const paisOrigenMarca = document.getElementById("paisOrigenMarca");

document.addEventListener("DOMContentLoaded", async () => {

    await cargarMarcas();

});

async function cargarMarcas() {

    try {

        const marcas = await obtenerMarcas();

        tablaMarcas.innerHTML = "";

        marcas.forEach(marca => {

            tablaMarcas.innerHTML += `
                <tr>
                    <td>${marca.id_marca}</td>
                    <td>${marca.nombre}</td>
                    <td>${marca.pais_origen}</td>
                    <td>
                        <button class="btn btn-warning btn-sm editar" data-id="${marca.id_marca}">
                            <i class="fas fa-edit"></i> Editar
                        </button>

                        <button class="btn btn-danger btn-sm eliminar" data-id="${marca.id_marca}">
                            <i class="fas fa-trash"></i> Eliminar
                        </button>
                    </td>
                </tr>
            `;

        });

    } catch (error) {

        console.error(error);
        alert("Error al cargar las marcas.");

    }

}

async function guardarMarca() {

    try {

        const marca = {

            nombre: nombreMarca.value.trim(),
            pais_origen: paisOrigenMarca.value.trim()

        };

        if (!marca.nombre || !marca.pais_origen) {

            alert("Todos los campos son obligatorios.");
            return;

        }

        let respuesta;

        if (idMarca.value === "") {

            respuesta = await crearMarca(marca);

        } else {

            respuesta = await actualizarMarca(idMarca.value, marca);

        }

        alert(respuesta.mensaje);

        $("#modalMarca").modal("hide");

        document.getElementById("formMarca").reset();

        idMarca.value = "";

        await cargarMarcas();

    } catch (error) {

        console.error(error);
        alert("Error al guardar la marca.");

    }

}

async function editarMarca(id) {

    try {

        const marca = await obtenerMarca(id);

        idMarca.value = marca.id_marca;
        nombreMarca.value = marca.nombre;
        paisOrigenMarca.value = marca.pais_origen;

        modalTitulo.textContent = "Editar Marca";
        btnGuardar.textContent = "Actualizar";

        $("#modalMarca").modal("show");

    } catch (error) {

        console.error(error);
        alert("Error al cargar la marca.");

    }

}

async function eliminarMarcaConfirmacion(id) {

    const confirmar = confirm("¿Desea eliminar esta marca?");

    if (!confirmar) return;

    try {

        const respuesta = await eliminarMarca(id);

        alert(respuesta.mensaje);

        await cargarMarcas();

    } catch (error) {

        console.error(error);
        alert("Error al eliminar la marca.");

    }

}

btnGuardar.addEventListener("click", guardarMarca);

tablaMarcas.addEventListener("click", (e) => {

    const botonEditar = e.target.closest(".editar");
    const botonEliminar = e.target.closest(".eliminar");

    if (botonEditar) {

        editarMarca(botonEditar.dataset.id);

    }

    if (botonEliminar) {

        eliminarMarcaConfirmacion(botonEliminar.dataset.id);

    }

});

document
    .querySelector('[data-target="#modalMarca"]')
    .addEventListener("click", () => {

        document.getElementById("formMarca").reset();

        idMarca.value = "";

        modalTitulo.textContent = "Registrar Marca";
        btnGuardar.textContent = "Guardar";

    });

$("#modalMarca").on("hidden.bs.modal", function () {

    document.getElementById("formMarca").reset();

    idMarca.value = "";

    modalTitulo.textContent = "Registrar Marca";
    btnGuardar.textContent = "Guardar";

});
