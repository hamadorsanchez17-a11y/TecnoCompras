const pool = require("../config/database");

// Obtener todos los detalles del carrito
const getAllCartDetails = async () => {

    const [rows] = await pool.query(`
        SELECT
            cd.id_detalle,
            cd.id_carrito,
            p.id_producto,
            p.nombre AS producto,
            cd.cantidad,
            cd.precio
        FROM carrito_detalle cd
        INNER JOIN producto p
            ON cd.id_producto = p.id_producto
        ORDER BY cd.id_detalle;
    `);

    return rows;
};

// Obtener detalle por ID
const getCartDetailById = async (id) => {

    const [rows] = await pool.query(`
        SELECT
            cd.id_detalle,
            cd.id_carrito,
            p.id_producto,
            p.nombre AS producto,
            cd.cantidad,
            cd.precio
        FROM carrito_detalle cd
        INNER JOIN producto p
            ON cd.id_producto = p.id_producto
        WHERE cd.id_detalle = ?;
    `, [id]);

    return rows[0];
};

// Crear detalle
const createCartDetail = async (detalle) => {

    const {
        id_carrito,
        id_producto,
        cantidad,
        precio
    } = detalle;

    const [result] = await pool.query(`
        INSERT INTO carrito_detalle
        (
            id_carrito,
            id_producto,
            cantidad,
            precio
        )
        VALUES
        (?, ?, ?, ?)
    `, [
        id_carrito,
        id_producto,
        cantidad,
        precio
    ]);

    return result;
};

// Actualizar detalle
const updateCartDetail = async (id, detalle) => {

    const {
        id_carrito,
        id_producto,
        cantidad,
        precio
    } = detalle;

    const [result] = await pool.query(`
        UPDATE carrito_detalle
        SET
            id_carrito = ?,
            id_producto = ?,
            cantidad = ?,
            precio = ?
        WHERE id_detalle = ?;
    `, [
        id_carrito,
        id_producto,
        cantidad,
        precio,
        id
    ]);

    return result;
};

// Eliminar detalle
const deleteCartDetail = async (id) => {

    const [result] = await pool.query(`
        DELETE FROM carrito_detalle
        WHERE id_detalle = ?;
    `, [id]);

    return result;
};

// Buscar un producto dentro del carrito
const findProductInCart = async (id_carrito, id_producto) => {

    const [rows] = await pool.query(`
        SELECT *
        FROM carrito_detalle
        WHERE id_carrito = ?
          AND id_producto = ?
        LIMIT 1;
    `, [id_carrito, id_producto]);

    return rows[0];
};

// Incrementar la cantidad del producto
const increaseQuantity = async (id_detalle, cantidad) => {

    const [result] = await pool.query(`
        UPDATE carrito_detalle
        SET cantidad = cantidad + ?
        WHERE id_detalle = ?;
    `, [cantidad, id_detalle]);

    return result;
};

module.exports = {
    getAllCartDetails,
    getCartDetailById,
    createCartDetail,
    updateCartDetail,
    deleteCartDetail,
    findProductInCart,
    increaseQuantity
};