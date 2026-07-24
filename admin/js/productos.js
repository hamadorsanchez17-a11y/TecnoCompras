document.addEventListener("DOMContentLoaded", async () => {

    await cargarProductos();
    await cargarCategorias();
    await cargarMarcas();

});

const tablaProductos = document.querySelector("#tablaProductos tbody");

const modalTitulo = document.getElementById("modalProductoLabel");

const btnGuardar = document.getElementById("btnGuardarProducto");

const idProducto = document.getElementById("idProducto");

const sku = document.getElementById("skuProducto");

const nombre = document.getElementById("nombreProducto");

const descripcion = document.getElementById("descripcionProducto");

const categoria = document.getElementById("categoriaProducto");

const marca = document.getElementById("marcaProducto");

const precio = document.getElementById("precioProducto");

const peso = document.getElementById("pesoProducto");

const estado = document.getElementById("estadoProducto");

async function cargarProductos() {

    try {

        const productos = await obtenerProductos();

        tablaProductos.innerHTML = "";

        productos.forEach(producto => {

            tablaProductos.innerHTML += `
                <tr>

                    <td>${producto.id_producto}</td>

                    <td>${producto.sku}</td>

                    <td>${producto.nombre}</td>

                    <td>${producto.marca}</td>

                    <td>${producto.categoria}</td>

                    <td>L ${producto.precio}</td>

                    <td>${producto.peso}</td>

                    <td>

                        ${producto.activo
                            ? '<span class="badge badge-success">Activo</span>'
                            : '<span class="badge badge-danger">Inactivo</span>'}

                    </td>

                    <td>

                        <button
                            class="btn btn-warning btn-sm editar"
                            data-id="${producto.id_producto}">

                            Editar

                        </button>

                        <button
                            class="btn btn-danger btn-sm eliminar"
                            data-id="${producto.id_producto}">

                            Eliminar

                        </button>

                    </td>

                </tr>
            `;

        });

    } catch (error) {

        console.error(error);

    }

}

async function cargarCategorias() {

    try {

        const categorias = await obtenerCategorias();

        categoria.innerHTML = `
            <option value="">Seleccione una categoría</option>
        `;

        categorias.forEach(cat => {

            categoria.innerHTML += `
                <option value="${cat.id_categoria}">
                    ${cat.nombre}
                </option>
            `;

        });

    } catch (error) {

        console.error(error);

    }

}

async function cargarMarcas() {

    try {

        const marcas = await obtenerMarcas();

        marca.innerHTML = `
            <option value="">Seleccione una marca</option>
        `;

        marcas.forEach(m => {

            marca.innerHTML += `
                <option value="${m.id_marca}">
                    ${m.nombre}
                </option>
            `;

        });

    } catch (error) {

        console.error(error);

    }

}

btnGuardar.addEventListener("click", guardarProducto);

async function guardarProducto() {

    try {

        const producto = {

            id_categoria: categoria.value,

            id_marca: marca.value,

            sku: sku.value.trim(),

            nombre: nombre.value.trim(),

            descripcion: descripcion.value.trim(),

            precio: parseFloat(precio.value),

            peso: parseFloat(peso.value),

            activo: estado.checked ? 1 : 0

        };

        let respuesta;

            if (idProducto.value === "") {
            
                respuesta = await crearProducto(producto);
            
            } else {
            
                respuesta = await actualizarProducto(idProducto.value, producto);
            
            }

        alert(respuesta.mensaje);

        document.getElementById("formProducto").reset();

        $("#modalProducto").modal("hide");

        await cargarProductos();

    } catch (error) {

        console.error(error);

        alert("Error al registrar el producto.");

    }
}

tablaProductos.addEventListener("click", async (e) => {

    const botonEditar = e.target.closest(".editar");

    if (botonEditar) {

        await editarProducto(botonEditar.dataset.id);

    }

    const botonEliminar = e.target.closest(".eliminar");

    if (botonEliminar) {

        await eliminarProductoConfirmacion(botonEliminar.dataset.id);

    }

});

async function eliminarProductoConfirmacion(id) {

    const confirmar = confirm("¿Desea eliminar este producto?");

    if (!confirmar) return;

    try {

        const respuesta = await eliminarProducto(id);

        alert(respuesta.mensaje);

        await cargarProductos();

    } catch (error) {

        console.error(error);

        alert("No fue posible eliminar el producto.");

    }

}

async function editarProducto(id) {

    try {

        const producto = await obtenerProducto(id);

        idProducto.value = producto.id_producto;

        sku.value = producto.sku;

        nombre.value = producto.nombre;

        descripcion.value = producto.descripcion;

        categoria.value = producto.id_categoria;

        marca.value = producto.id_marca;

        precio.value = producto.precio;

        peso.value = producto.peso;

        estado.checked = producto.activo == 1;

        modalTitulo.textContent = "Editar Producto";

        $("#modalProducto").modal("show");

    } catch (error) {

        console.error(error);

    }

}

async function editarProducto(id) {

    try {

        const producto = await obtenerProducto(id);

        idProducto.value = producto.id_producto;

        sku.value = producto.sku;

        nombre.value = producto.nombre;

        descripcion.value = producto.descripcion;

        categoria.value = producto.id_categoria;

        marca.value = producto.id_marca;

        precio.value = producto.precio;

        peso.value = producto.peso;

        estado.checked = producto.activo == 1;

        modalTitulo.textContent = "Editar Producto";

        $("#modalProducto").modal("show");

    } catch (error) {

        console.error(error);

    }

}

document.querySelector('[data-target="#modalProducto"]').addEventListener("click", () => {

    document.getElementById("formProducto").reset();

    idProducto.value = "";

    modalTitulo.textContent = "Registrar Producto";

    estado.checked = true;

});