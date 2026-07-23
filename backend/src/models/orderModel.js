const pool = require("../config/database");

// Obtener todos los pedidos
const getAllOrders = async () => {

    const [rows] = await pool.query(`
        SELECT
            p.id_pedido,
            u.id_usuario,
            u.nombre,
            ep.nombre AS estado,
            p.fecha,
            p.subtotal,
            p.impuesto,
            p.total
        FROM pedido p
        INNER JOIN usuario u
            ON p.id_usuario = u.id_usuario
        INNER JOIN estado_pedido ep
            ON p.id_estado_pedido = ep.id_estado_pedido
        ORDER BY p.id_pedido;
    `);

    return rows;
};

// Obtener pedido por ID
const getOrderById = async (id) => {

    const [rows] = await pool.query(`
        SELECT
            p.id_pedido,
            u.id_usuario,
            u.nombre,
            ep.nombre AS estado,
            p.fecha,
            p.subtotal,
            p.impuesto,
            p.total
        FROM pedido p
        INNER JOIN usuario u
            ON p.id_usuario = u.id_usuario
        INNER JOIN estado_pedido ep
            ON p.id_estado_pedido = ep.id_estado_pedido
        WHERE p.id_pedido = ?;
    `,[id]);

    return rows[0];
};

// Crear pedido
const createOrder = async (pedido) => {

    const {
        id_usuario,
        id_direccion,
        id_estado_pedido,
        subtotal,
        impuesto,
        total
    } = pedido;

    const [result] = await pool.query(`
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
        (?, ?, ?, ?, ?, ?)
    `,[
        id_usuario,
        id_direccion,
        id_estado_pedido,
        subtotal,
        impuesto,
        total
    ]);

    return result;
};

// Actualizar pedido
const updateOrder = async(id,pedido)=>{

    const{
        id_usuario,
        id_direccion,
        id_estado_pedido,
        subtotal,
        impuesto,
        total
    }=pedido;

    const[result]=await pool.query(`
        UPDATE pedido
        SET
            id_usuario=?,
            id_direccion=?,
            id_estado_pedido=?,
            subtotal=?,
            impuesto=?,
            total=?
        WHERE id_pedido=?;
    `,[
        id_usuario,
        id_direccion,
        id_estado_pedido,
        subtotal,
        impuesto,
        total,
        id
    ]);

    return result;

};

// Eliminar pedido
const deleteOrder=async(id)=>{

    const[result]=await pool.query(`
        DELETE FROM pedido
        WHERE id_pedido=?;
    `,[id]);

    return result;

};

module.exports={
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
};