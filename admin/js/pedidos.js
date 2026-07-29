const tablaPedidos = document.querySelector("#tablaPedidos tbody");

const modalPedido = $("#modalPedido");

const clienteNombrePedido = document.getElementById("clienteNombrePedido");
const clienteCorreoPedido = document.getElementById("clienteCorreoPedido");

const fechaPedido = document.getElementById("fechaPedido");
const estadoPedido = document.getElementById("estadoPedido");

const subtotalPedido = document.getElementById("subtotalPedido");
const impuestoPedido = document.getElementById("impuestoPedido");
const totalPedido = document.getElementById("totalPedido");

const tablaProductosPedido = document.querySelector("#tablaProductosPedido tbody");

const btnGuardarCambiosPedido = document.getElementById("btnGuardarCambiosPedido");

let pedidoActual = null;

document.addEventListener("DOMContentLoaded", async () => {

    await cargarPedidos();
    await cargarEstadosPedido();

});

async function cargarPedidos() {

    try {

        const pedidos = await obtenerPedidos();

        tablaPedidos.innerHTML = "";

        pedidos.forEach(pedido => {

            tablaPedidos.innerHTML += `
                <tr>

                    <td>${pedido.id_pedido}</td>
                    <td>${pedido.cliente}</td>
                    <td>${pedido.fecha}</td>
                    <td>L. ${Number(pedido.total).toFixed(2)}</td>
                    <td>${pedido.estado}</td>

                    <td>

                        <button
                            class="btn btn-info btn-sm verDetalle"
                            data-id="${pedido.id_pedido}">
                            <i class="fas fa-eye"></i>
                            Ver Detalle
                        </button>

                    </td>

                </tr>
            `;

        });

    } catch (error) {

        console.error(error);
        alert("Error al cargar los pedidos.");

    }

}

async function cargarEstadosPedido() {

    try {

        const estados = await obtenerEstadosPedido();

        estadoPedido.innerHTML = "";

        estados.forEach(estado => {

            estadoPedido.innerHTML += `
                <option value="${estado.id_estado_pedido}">
                    ${estado.nombre}
                </option>
            `;

        });

    } catch (error) {

        console.error(error);

        alert("Error al cargar los estados del pedido.");

    }

}

async function verDetallePedido(id) {

    try {

        const respuesta = await obtenerPedidoPorId(id);

        console.log("Respuesta API:", respuesta);

        const pedido = respuesta.pedido;

        pedidoActual = pedido.id_pedido;

        clienteNombrePedido.value = pedido.nombre;
        clienteCorreoPedido.value = pedido.correo || "";

        fechaPedido.value = pedido.fecha;

        estadoPedido.value = pedido.id_estado_pedido;

        subtotalPedido.value = pedido.subtotal;

        impuestoPedido.value = pedido.impuesto;

        totalPedido.value = pedido.total;

        tablaProductosPedido.innerHTML = "";

        if (respuesta.productos && respuesta.productos.length > 0) {

            respuesta.productos.forEach(producto => {

                tablaProductosPedido.innerHTML += `
                    <tr>
                        <td>${producto.nombre}</td>
                        <td>${producto.cantidad}</td>
                        <td>${producto.precio}</td>
                        <td>${(producto.cantidad * producto.precio).toFixed(2)}</td>
                    </tr>
                `;

            });

        }

        modalPedido.modal("show");

        } catch (error) {

            console.error(error);

            alert("Error al obtener el detalle del pedido.");

        }

            }

    async function guardarCambiosPedido() {
            
                try {
                
                    if (!pedidoActual) return;

             const detalle = await obtenerPedidoPorId(pedidoActual);
            const pedido = detalle.pedido;
                
            const datosActualizados = {
                id_usuario: pedido.id_usuario,
                id_direccion: pedido.id_direccion || 1,
                id_estado_pedido: estadoPedido.value,
                subtotal: pedido.subtotal,
                impuesto: pedido.impuesto,
                total: pedido.total
            };

            const respuesta = await actualizarPedido(
                pedidoActual,
                datosActualizados
            );

            alert(respuesta.mensaje);

        modalPedido.modal("hide");

        await cargarPedidos();

    } catch (error) {

        console.error(error);

        alert("Error al actualizar el pedido.");

    }

}

tablaPedidos.addEventListener("click", (e) => {

    const boton = e.target.closest(".verDetalle");

    if (!boton) return;

    verDetallePedido(boton.dataset.id);

});

btnGuardarCambiosPedido.addEventListener(
    "click",
    guardarCambiosPedido
);

modalPedido.on("hidden.bs.modal", () => {

    pedidoActual = null;

    clienteNombrePedido.value = "";
    clienteCorreoPedido.value = "";

    fechaPedido.value = "";

    estadoPedido.selectedIndex = 0;

    subtotalPedido.value = "";
    impuestoPedido.value = "";
    totalPedido.value = "";

    tablaProductosPedido.innerHTML = "";

});