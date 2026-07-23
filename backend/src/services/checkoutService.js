const pool = require("../config/database");

const confirmPurchase = async (idUsuario, idDireccion) => {

    const connection = await pool.getConnection();

    try {

        await connection.beginTransaction();

        // Buscar carrito del usuario
        const [carritos] = await connection.query(
            `
            SELECT id_carrito
            FROM carrito
            WHERE id_usuario = ?
            LIMIT 1;
            `,
            [idUsuario]
        );

        if (carritos.length === 0) {
            throw new Error("El usuario no tiene un carrito.");
        }

        const idCarrito = carritos[0].id_carrito;

        // Obtener productos del carrito
        const [productos] = await connection.query(
            `
            SELECT
                cd.id_producto,
                p.nombre,
                cd.cantidad,
                cd.precio,
                i.stock_actual
            FROM carrito_detalle cd
            INNER JOIN producto p
                ON cd.id_producto = p.id_producto
            INNER JOIN inventario i
                ON p.id_producto = i.id_producto
            WHERE cd.id_carrito = ?;
            `,
            [idCarrito]
        );

        if (productos.length === 0) {
            throw new Error("El carrito está vacío.");
        }

        let subtotal = 0;

        // Validar inventario y calcular subtotal
        for (const producto of productos) {

            if (producto.stock_actual < producto.cantidad) {

                throw new Error(
                    `Stock insuficiente para ${producto.nombre}`
                );

            }

            subtotal += producto.precio * producto.cantidad;

        }

             const impuesto = Number((subtotal * 0.15).toFixed(2));
             const total = Number((subtotal + impuesto).toFixed(2));

        // Crear pedido
        const [pedido] = await connection.query(
            `
            INSERT INTO pedido
            (
                id_usuario,
                id_direccion,
                id_estado_pedido,
                subtotal,
                impuesto,
                total
            )
            VALUES
            (?, ?, ?, ?, ?, ?);
            `,
            [
                idUsuario,
                idDireccion,
                1,
                subtotal,
                impuesto,
                total
            ]
        );

        const idPedido = pedido.insertId;

                // Crear detalles del pedido y actualizar inventario
        for (const producto of productos) {

            // Insertar detalle
            await connection.query(
                `
                INSERT INTO pedido_detalle
                (
                    id_pedido,
                    id_producto,
                    cantidad,
                    precio
                )
                VALUES
                (?, ?, ?, ?);
                `,
                [
                    idPedido,
                    producto.id_producto,
                    producto.cantidad,
                    producto.precio
                ]
            );

            // Descontar inventario
            await connection.query(
                `
                UPDATE inventario
                SET stock_actual = stock_actual - ?
                WHERE id_producto = ?;
                `,
                [
                    producto.cantidad,
                    producto.id_producto
                ]
            );

        }

        // Vaciar carrito
        await connection.query(
            `
            DELETE FROM carrito_detalle
            WHERE id_carrito = ?;
            `,
            [idCarrito]
        );

        await connection.commit();

        return {
            mensaje: "Compra realizada correctamente.",
            id_pedido: idPedido,
            subtotal,
            impuesto,
            total
        };

    } catch (error) {

        await connection.rollback();

        throw error;

    } finally {

        connection.release();

    }

};

module.exports = {
    confirmPurchase
};