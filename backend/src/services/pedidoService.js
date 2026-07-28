const PedidoModel = require("../models/pedidoModel");

class PedidoService {

    static async crearPedido(idUsuario, idDireccion, idMetodo) {

        const conexion = await PedidoModel.obtenerConexion();

        try {

            await conexion.beginTransaction();

            // Obtener carrito activo
            const carrito = await PedidoModel.obtenerCarritoActivo(
                conexion,
                idUsuario
            );

            if (carrito.length === 0) {
                throw new Error("El carrito está vacío.");
            }

            // Validar stock y calcular subtotal
            let subtotal = 0;

            for (const producto of carrito) {

                if (producto.cantidad > producto.stock_actual) {
                    throw new Error(
                        `Stock insuficiente para ${producto.nombre}`
                    );
                }

                subtotal += producto.cantidad * Number(producto.precio);

            }

            // Calcular totales
            const impuesto = subtotal * 0.15;
            const total = subtotal + impuesto;

            // Crear encabezado del pedido
            const idPedido = await PedidoModel.crearPedido(
                conexion,
                idUsuario,
                idDireccion,
                subtotal,
                impuesto,
                total
            );

            // Crear detalle del pedido
            await PedidoModel.crearDetallePedido(
                conexion,
                idPedido,
                carrito
            );

            // Actualizar inventario
            await PedidoModel.actualizarInventario(
                conexion,
                carrito
            );

            // Registrar pago
            await PedidoModel.crearPago(
                conexion,
                idPedido,
                idMetodo,
                total
            );

            // Generar factura
            await PedidoModel.crearFactura(
                conexion,
                idPedido
            );

            // Marcar el carrito como comprado
            await PedidoModel.cerrarCarrito(
                conexion,
                idUsuario
            );

            // Crear un nuevo carrito activo
            await PedidoModel.crearNuevoCarrito(
                conexion,
                idUsuario
            );

            // Confirmar toda la transacción
            await conexion.commit();

            conexion.release();

            return {
                ok: true,
                mensaje: "Pedido realizado correctamente.",
                idPedido,
                subtotal,
                impuesto,
                total
            };

        } catch (error) {

            await conexion.rollback();
            conexion.release();

            throw error;

        }


    }
    static async obtenerPedidos(idUsuario){

    const conexion = await PedidoModel.obtenerConexion();

    try{

        const pedidos =
            await PedidoModel.obtenerPedidosUsuario(
                conexion,
                idUsuario
            );

        conexion.release();

        return pedidos;

    }catch(error){

        conexion.release();
        throw error;

    }

    }

    static async obtenerDetallePedido(
    idPedido,
    idUsuario

)    {

    const conexion = await PedidoModel.obtenerConexion();

    try{

        const detalle =
            await PedidoModel.obtenerDetallePedido(
                conexion,
                idPedido,
                idUsuario
            );

        conexion.release();

        if(detalle.length===0){
            throw new Error("Pedido no encontrado.");
        }

        return detalle;

    }catch(error){

        conexion.release();
        throw error;

    }

}

static async obtenerTodosLosPedidos(){

    const conexion = await PedidoModel.obtenerConexion();

    try{

        const pedidos =
            await PedidoModel.obtenerTodosLosPedidos(
                conexion
            );

        conexion.release();

        return pedidos;

    }catch(error){

        conexion.release();
        throw error;

    }

}

static async actualizarEstadoPedido(
    idPedido,
    idEstado
){

    const conexion = await PedidoModel.obtenerConexion();

    try{

        await PedidoModel.actualizarEstadoPedido(
            conexion,
            idPedido,
            idEstado
        );

        conexion.release();

        return {
            mensaje:"Estado actualizado correctamente."
        };

    }catch(error){

        conexion.release();
        throw error;

    }

}
}


module.exports = PedidoService;