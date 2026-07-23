const pool = require("../config/database");

// Obtener todos los detalles del pedido
const getAllOrderDetails = async () => {

    const [rows] = await pool.query(`
        SELECT
            pd.id_detalle,
            pd.id_pedido,
            p.id_producto,
            p.nombre AS producto,
            pd.cantidad,
            pd.precio
        FROM pedido_detalle pd
        INNER JOIN producto p
            ON pd.id_producto = p.id_producto
        ORDER BY pd.id_detalle;
    `);

    return rows;
};

// Obtener detalle por ID
const getOrderDetailById = async (id) => {

    const [rows] = await pool.query(`
        SELECT
            pd.id_detalle,
            pd.id_pedido,
            p.id_producto,
            p.nombre AS producto,
            pd.cantidad,
            pd.precio
        FROM pedido_detalle pd
        INNER JOIN producto p
            ON pd.id_producto = p.id_producto
        WHERE pd.id_detalle = ?;
    `,[id]);

    return rows[0];
};

// Crear detalle
const createOrderDetail = async (detalle) => {

    const{
        id_pedido,
        id_producto,
        cantidad,
        precio
    }=detalle;

    const[result]=await pool.query(`
        INSERT INTO pedido_detalle
        (
            id_pedido,
            id_producto,
            cantidad,
            precio
        )
        VALUES
        (?, ?, ?, ?)
    `,[
        id_pedido,
        id_producto,
        cantidad,
        precio
    ]);

    return result;

};

// Actualizar detalle
const updateOrderDetail=async(id,detalle)=>{

    const{
        id_pedido,
        id_producto,
        cantidad,
        precio
    }=detalle;

    const[result]=await pool.query(`
        UPDATE pedido_detalle
        SET
            id_pedido=?,
            id_producto=?,
            cantidad=?,
            precio=?
        WHERE id_detalle=?;
    `,[
        id_pedido,
        id_producto,
        cantidad,
        precio,
        id
    ]);

    return result;

};

// Eliminar detalle
const deleteOrderDetail=async(id)=>{

    const[result]=await pool.query(`
        DELETE FROM pedido_detalle
        WHERE id_detalle=?;
    `,[id]);

    return result;

};

module.exports={
    getAllOrderDetails,
    getOrderDetailById,
    createOrderDetail,
    updateOrderDetail,
    deleteOrderDetail
};