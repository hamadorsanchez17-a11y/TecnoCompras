const pool = require("../config/database");

// Obtener todos los carritos
const getAllCarts = async () => {

    const [rows] = await pool.query(`
        SELECT
            c.id_carrito,
            u.id_usuario,
            u.nombre,
            ec.id_estado_carrito,
            ec.nombre AS estado,
            c.fecha
        FROM carrito c
        INNER JOIN usuario u
            ON c.id_usuario = u.id_usuario
        INNER JOIN estado_carrito ec
            ON c.id_estado_carrito = ec.id_estado_carrito
        ORDER BY c.id_carrito;
    `);

    return rows;
};

// Obtener carrito por ID
const getCartById = async (id) => {

    const [rows] = await pool.query(`
        SELECT
            c.id_carrito,
            u.id_usuario,
            u.nombre,
            ec.id_estado_carrito,
            ec.nombre AS estado,
            c.fecha
        FROM carrito c
        INNER JOIN usuario u
            ON c.id_usuario = u.id_usuario
        INNER JOIN estado_carrito ec
            ON c.id_estado_carrito = ec.id_estado_carrito
        WHERE c.id_carrito = ?;
    `, [id]);

    return rows[0];
};

// Crear carrito
const createCart = async (carrito) => {

    const {
        id_usuario,
        id_estado_carrito
    } = carrito;

    const [result] = await pool.query(`
        INSERT INTO carrito
        (
            id_usuario,
            id_estado_carrito
        )
        VALUES
        (?, ?)
    `, [
        id_usuario,
        id_estado_carrito
    ]);

    return result;
};

// Actualizar carrito
const updateCart = async (id, carrito) => {

    const {
        id_usuario,
        id_estado_carrito
    } = carrito;

    const [result] = await pool.query(`
        UPDATE carrito
        SET
            id_usuario = ?,
            id_estado_carrito = ?
        WHERE id_carrito = ?;
    `, [
        id_usuario,
        id_estado_carrito,
        id
    ]);

    return result;
};

// Eliminar carrito
const deleteCart = async (id) => {

    const [result] = await pool.query(`
        DELETE FROM carrito
        WHERE id_carrito = ?;
    `, [id]);

    return result;
};

module.exports = {
    getAllCarts,
    getCartById,
    createCart,
    updateCart,
    deleteCart
};