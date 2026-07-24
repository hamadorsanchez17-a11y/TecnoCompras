document.addEventListener("DOMContentLoaded", async () => {

    await cargarCategorias();

});

const tablaCategorias = document.querySelector("#tablaCategorias tbody");

const modalTitulo = document.getElementById("modalCategoriaLabel");

const btnGuardar = document.getElementById("btnGuardarCategoria");

const idCategoria = document.getElementById("idCategoria");

const nombre = document.getElementById("nombreCategoria");

const descripcion = document.getElementById("descripcionCategoria");

btnGuardar.addEventListener("click", guardarCategoria);

document.querySelector('[data-target="#modalCategoria"]').addEventListener("click", () => {

    document.getElementById("formCategoria").reset();

    idCategoria.value = "";

    modalTitulo.textContent = "Registrar Categoría";

});

tablaCategorias.addEventListener("click", async (e) => {

    const botonEditar = e.target.closest(".editar");

    if (botonEditar) {

        await editarCategoria(botonEditar.dataset.id);

    }

    const botonEliminar = e.target.closest(".eliminar");

    if (botonEliminar) {

        await eliminarCategoriaConfirmacion(botonEliminar.dataset.id);

    }

});

async function cargarCategorias() {

    try {

        const categorias = await obtenerCategorias();

        tablaCategorias.innerHTML = "";

        categorias.forEach(categoria => {

            tablaCategorias.innerHTML += `
                <tr>

                    <td>${categoria.id_categoria}</td>

                    <td>${categoria.nombre}</td>

                    <td>${categoria.descripcion}</td>

                    <td>

                        <button
                            class="btn btn-warning btn-sm editar"
                            data-id="${categoria.id_categoria}">

                            <i class="fas fa-edit"></i>

                        </button>

                        <button
                            class="btn btn-danger btn-sm eliminar"
                            data-id="${categoria.id_categoria}">

                            <i class="fas fa-trash"></i>

                        </button>

                    </td>

                </tr>
            `;

        });

    } catch (error) {

        console.error(error);

    }

}

async function guardarCategoria() {

    try {

        const categoria = {

            nombre: nombre.value.trim(),

            descripcion: descripcion.value.trim()

        };

        let respuesta;

        if (idCategoria.value === "") {

            respuesta = await crearCategoria(categoria);

        } else {

            respuesta = await actualizarCategoria(idCategoria.value, categoria);

        }

        alert(respuesta.mensaje);

        document.getElementById("formCategoria").reset();

        idCategoria.value = "";

        modalTitulo.textContent = "Registrar Categoría";

        $("#modalCategoria").modal("hide");

        await cargarCategorias();

    } catch (error) {

        console.error(error);

        alert("Ocurrió un error.");

    }

}

async function editarCategoria(id) {

    try {

        const categoria = await obtenerCategoria(id);

        idCategoria.value = categoria.id_categoria;

        nombre.value = categoria.nombre;

        descripcion.value = categoria.descripcion;

        modalTitulo.textContent = "Editar Categoría";

        $("#modalCategoria").modal("show");

    } catch (error) {

        console.error(error);

    }

}

async function eliminarCategoriaConfirmacion(id) {

    const confirmar = confirm("¿Desea eliminar esta categoría?");

    if (!confirmar) return;

    try {

        const respuesta = await eliminarCategoria(id);

        alert(respuesta.mensaje);

        await cargarCategorias();

    } catch (error) {

        console.error(error);

        alert("No fue posible eliminar la categoría.");

    }

}