const tablaInventario = document.querySelector("#tablaInventario tbody");

const modalTitulo = document.getElementById("modalInventarioLabel");
const btnGuardar = document.getElementById("btnGuardarInventario");

const idInventario = document.getElementById("idInventario");
const productoInventario = document.getElementById("productoInventario");
const stockActualInventario = document.getElementById("stockActualInventario");
const stockMinimoInventario = document.getElementById("stockMinimoInventario");

document.addEventListener("DOMContentLoaded", async () => {

    await cargarProductos();
    await cargarInventario();

});

async function cargarProductos() {

    try {

        const productos = await obtenerProductos();

        productoInventario.innerHTML = `
            <option value="">Seleccione un producto</option>
        `;

        productos.forEach(producto => {

            productoInventario.innerHTML += `
                <option value="${producto.id_producto}">
                    ${producto.nombre}
                </option>
            `;

        });

    } catch (error) {

        console.error(error);
        alert("Error al cargar los productos.");

    }

}

async function cargarInventario() {

    try {

        const inventario = await obtenerInventario();

        tablaInventario.innerHTML = "";

        inventario.forEach(item => {

            tablaInventario.innerHTML += `
                <tr>
                    <td>${item.id_inventario}</td>
                    <td>${item.producto}</td>
                    <td>${item.stock_actual}</td>
                    <td>${item.stock_minimo}</td>
                    <td>

                        <button
                            class="btn btn-warning btn-sm editar"
                            data-id="${item.id_inventario}">
                            <i class="fas fa-edit"></i> Editar
                        </button>

                        <button
                            class="btn btn-danger btn-sm eliminar"
                            data-id="${item.id_inventario}">
                            <i class="fas fa-trash"></i> Eliminar
                        </button>

                    </td>
                </tr>
            `;

        });

    } catch (error) {

        console.error(error);
        alert("Error al cargar el inventario.");

    }

}

async function guardarInventario() {

    try {

        const inventario = {

            id_producto: productoInventario.value,
            stock_actual: stockActualInventario.value,
            stock_minimo: stockMinimoInventario.value

        };

        if (
            !inventario.id_producto ||
            inventario.stock_actual === "" ||
            inventario.stock_minimo === ""
        ) {

            alert("Todos los campos son obligatorios.");
            return;

        }

        let respuesta;

        if (idInventario.value === "") {

            respuesta = await crearInventario(inventario);

        } else {

            respuesta = await actualizarInventario(
                idInventario.value,
                inventario
            );

        }

        alert(respuesta.mensaje);

        $("#modalInventario").modal("hide");

        document.getElementById("formInventario").reset();

        idInventario.value = "";

        await cargarInventario();

    } catch (error) {

        console.error(error);
        alert("Error al guardar el inventario.");

    }
}

async function editarInventario(id) {

    try {

        const inventario = await obtenerInventarioPorId(id);

        idInventario.value = inventario.id_inventario;
        productoInventario.value = inventario.id_producto;
        stockActualInventario.value = inventario.stock_actual;
        stockMinimoInventario.value = inventario.stock_minimo;

        modalTitulo.textContent = "Editar Inventario";
        btnGuardar.textContent = "Actualizar";

        $("#modalInventario").modal("show");

    } catch (error) {

        console.error(error);
        alert("Error al cargar el registro de inventario.");

    }

}

async function eliminarInventarioConfirmacion(id) {

    const confirmar = confirm("¿Desea eliminar este registro de inventario?");

    if (!confirmar) return;

    try {

        const respuesta = await eliminarInventario(id);

        alert(respuesta.mensaje);

        await cargarInventario();

    } catch (error) {

        console.error(error);
        alert("Error al eliminar el inventario.");

    }

}

btnGuardar.addEventListener("click", guardarInventario);

tablaInventario.addEventListener("click", (e) => {

    const botonEditar = e.target.closest(".editar");
    const botonEliminar = e.target.closest(".eliminar");

    if (botonEditar) {

        editarInventario(botonEditar.dataset.id);

    }

    if (botonEliminar) {

        eliminarInventarioConfirmacion(botonEliminar.dataset.id);

    }

});

document
    .querySelector('[data-target="#modalInventario"]')
    .addEventListener("click", () => {

        document.getElementById("formInventario").reset();

        idInventario.value = "";

        modalTitulo.textContent = "Registrar Inventario";
        btnGuardar.textContent = "Guardar";

    });

$("#modalInventario").on("hidden.bs.modal", function () {

    document.getElementById("formInventario").reset();

    idInventario.value = "";

    modalTitulo.textContent = "Registrar Inventario";
    btnGuardar.textContent = "Guardar";

});