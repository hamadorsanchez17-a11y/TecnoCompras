const pool = require("../config/database");

class PedidoModel {

    static async obtenerConexion() {
        return await pool.getConnection();
    }

    static async obtenerCarritoActivo(conexion, idUsuario) {

        const [rows] = await conexion.query(`
            SELECT
                c.id_carrito,
                cd.id_producto,
                p.nombre,
                cd.cantidad,
                p.precio,
                i.stock_actual
            FROM carrito c
            INNER JOIN carrito_detalle cd
                ON c.id_carrito = cd.id_carrito
            INNER JOIN producto p
                ON cd.id_producto = p.id_producto
            INNER JOIN inventario i
                ON p.id_producto = i.id_producto
            WHERE c.id_usuario = ?
              AND c.id_estado_carrito = 1
        `, [idUsuario]);

        return rows;
    }

    static async crearPedido(
    conexion,
    idUsuario,
    idDireccion,
    subtotal,
    impuesto,
    total
) { 
    const [resultado] = await conexion.query(`
        INSERT INTO pedido (
            id_usuario,
            id_direccion,
            id_estado_pedido,
            fecha,
            subtotal,
            impuesto,
            total
        )
        VALUES (?, ?, ?, NOW(), ?, ?, ?)
    `, [
        idUsuario,
        idDireccion,
        1, // Pendiente
        subtotal,
        impuesto,
        total
    ]);

    return resultado.insertId;
}

static async crearDetallePedido(
    conexion,
    idPedido,
    carrito
) {

    for (const producto of carrito) {

        await conexion.query(`
            INSERT INTO pedido_detalle (
                id_pedido,
                id_producto,
                cantidad,
                precio
            )
            VALUES (?, ?, ?, ?)
        `, [
            idPedido,
            producto.id_producto,
            producto.cantidad,
            producto.precio
        ]);

    }

}
static async actualizarInventario(conexion, carrito) {

    for (const producto of carrito) {

        await conexion.query(`
            UPDATE inventario
            SET stock_actual = stock_actual - ?
            WHERE id_producto = ?
        `, [
            producto.cantidad,
            producto.id_producto
        ]);

    }

}

static async crearPago(
    conexion,
    idPedido,
    idMetodo,
    total
) {

    await conexion.query(`
        INSERT INTO pago (
            id_pedido,
            id_metodo,
            monto,
            fecha,
            id_estado_pago
        )
        VALUES (?, ?, ?, NOW(), ?)
    `, [
        idPedido,
        idMetodo,
        total,
        1
    ]);

}

static async crearFactura(
    conexion,
    idPedido
) {

    const numeroFactura = `FAC-${Date.now()}`;

    await conexion.query(`
        INSERT INTO factura (
            id_pedido,
            numero,
            fecha
        )
        VALUES (?, ?, NOW())
    `, [
        idPedido,
        numeroFactura
    ]);

}

static async cerrarCarrito(
    conexion,
    idUsuario
) {

    await conexion.query(`
        UPDATE carrito
        SET id_estado_carrito = 3
        WHERE id_usuario = ?
          AND id_estado_carrito = 1
    `, [idUsuario]);

}

static async crearNuevoCarrito(
    conexion,
    idUsuario
) {

    await conexion.query(`
        INSERT INTO carrito (
            id_usuario,
            id_estado_carrito,
            fecha
        )
        VALUES (?, ?, NOW())
    `, [
        idUsuario,
        1
    ]);

}
static async obtenerPedidosUsuario(
    conexion,
    idUsuario
) {

    const [rows] = await conexion.query(`
        SELECT
            p.id_pedido,
            p.fecha,
            p.subtotal,
            p.impuesto,
            p.total,
            ep.nombre AS estado
        FROM pedido p
        INNER JOIN estado_pedido ep
            ON p.id_estado_pedido = ep.id_estado_pedido
        WHERE p.id_usuario = ?
        ORDER BY p.fecha DESC
    `, [idUsuario]);

    return rows;

}
static async obtenerDetallePedido(
    conexion,
    idPedido,
    idUsuario
) {

    const [rows] = await conexion.query(`
        SELECT
            p.id_pedido,
            p.id_usuario,
            p.id_direccion,
            p.id_estado_pedido,
            CONCAT(u.nombre, ' ', u.apellido) AS nombre,
            u.correo,
            p.fecha,
            p.subtotal,
            p.impuesto,
            p.total,
            ep.nombre AS estado,
            mp.nombre AS metodo_pago,
            CONCAT(
                d.calle,
                ', ',
                d.ciudad,
                ', ',
                d.departamento
            ) AS direccion,
            pr.nombre as producto,
            pd.cantidad,
            pd.precio
        FROM pedido p

        INNER JOIN usuario u
            ON p.id_usuario = u.id_usuario

        INNER JOIN estado_pedido ep
            ON p.id_estado_pedido = ep.id_estado_pedido

        INNER JOIN pago pa
            ON p.id_pedido = pa.id_pedido

        INNER JOIN metodo_pago mp
            ON pa.id_metodo = mp.id_metodo

        INNER JOIN direccion d
            ON p.id_direccion = d.id_direccion

        INNER JOIN pedido_detalle pd
            ON p.id_pedido = pd.id_pedido

        INNER JOIN producto pr
            ON pd.id_producto = pr.id_producto

        WHERE p.id_pedido = ?
          AND p.id_usuario = ?;
    `, [
        idPedido,
        idUsuario
    ]);

    return rows;

}

static async obtenerPedidoPorId(
    conexion,
    idPedido,
    idUsuario
) {

    const [rows] = await conexion.query(`
            SELECT
                p.id_pedido,
                p.id_usuario,
                p.id_direccion,
                p.id_estado_pedido,
                CONCAT(u.nombre, ' ', u.apellido) AS nombre,
                u.correo,
                p.fecha,
                p.subtotal,
                p.impuesto,
                p.total,
                ep.nombre AS estado,
                mp.nombre AS metodo_pago,
                CONCAT(
                    d.calle,
                    ', ',
                    d.ciudad,
                    ', ',
                    d.departamento
                ) AS direccion
            FROM pedido p
                
            INNER JOIN usuario u
                ON p.id_usuario = u.id_usuario
                
            INNER JOIN estado_pedido ep
                ON p.id_estado_pedido = ep.id_estado_pedido
                
            INNER JOIN pago pa
                ON p.id_pedido = pa.id_pedido
                
            INNER JOIN metodo_pago mp
                ON pa.id_metodo = mp.id_metodo
                
            INNER JOIN direccion d
                ON p.id_direccion = d.id_direccion
                
            WHERE p.id_pedido = ?
              AND p.id_usuario = ?;
     
    `,[idPedido,idUsuario]);

    return rows[0];

}

static async obtenerProductosPedido(
    conexion,
    idPedido
){

    const [rows] = await conexion.query(`
        SELECT
            pr.id_producto,
            pr.nombre,
            pd.cantidad,
            pd.precio
        FROM pedido_detalle pd

        INNER JOIN producto pr
            ON pd.id_producto = pr.id_producto

        WHERE pd.id_pedido = ?;
    `,[idPedido]);

    return rows;

}
static async obtenerTodosLosPedidos(conexion){

    const [rows] = await conexion.query(`
        SELECT
            p.id_pedido,
            CONCAT(u.nombre,' ',u.apellido) AS cliente,
            p.fecha,
            p.subtotal,
            p.impuesto,
            p.total,
            ep.nombre AS estado
        FROM pedido p

        INNER JOIN usuario u
            ON p.id_usuario = u.id_usuario

        INNER JOIN estado_pedido ep
            ON p.id_estado_pedido = ep.id_estado_pedido

        ORDER BY p.fecha DESC;
    `);

    return rows;

}

static async actualizarEstadoPedido(
    conexion,
    idPedido,
    idEstado
){

    const [resultado] = await conexion.query(`
        UPDATE pedido
        SET id_estado_pedido = ?
        WHERE id_pedido = ?;
    `,[idEstado,idPedido]);

    return resultado;

}

}

module.exports = PedidoModel;