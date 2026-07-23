const pool = require("../config/database");

// Obtener todo el inventario
const getAllInventory = async () => {

    const [rows] = await pool.query(
        `
        SELECT
            i.id_inventario,
            p.id_producto,
            p.nombre AS producto,
            i.stock_actual,
            i.stock_minimo
        FROM inventario i
        INNER JOIN producto p
            ON i.id_producto = p.id_producto
        ORDER BY i.id_inventario;
        `
    );

    return rows;

};

// Obtener inventario por ID
const getInventoryById = async (id) => {

    const [rows] = await pool.query(
        `
        SELECT
            i.id_inventario,
            p.id_producto,
            p.nombre AS producto,
            i.stock_actual,
            i.stock_minimo
        FROM inventario i
        INNER JOIN producto p
            ON i.id_producto = p.id_producto
        WHERE i.id_inventario = ?;
        `,
        [id]
    );

    return rows[0];

};

// Crear inventario
const createInventory = async (inventario) => {

    const {
        id_producto,
        stock_actual,
        stock_minimo
    } = inventario;

    const [result] = await pool.query(
        `
        INSERT INTO inventario
        (
            id_producto,
            stock_actual,
            stock_minimo
        )
        VALUES
        (
            ?,
            ?,
            ?
        );
        `,
        [
            id_producto,
            stock_actual,
            stock_minimo
        ]
    );

    return result;

};

// Actualizar inventario
const updateInventory = async (id, inventario) => {

    const {
        id_producto,
        stock_actual,
        stock_minimo
    } = inventario;

    const [result] = await pool.query(
        `
        UPDATE inventario
        SET
            id_producto = ?,
            stock_actual = ?,
            stock_minimo = ?
        WHERE id_inventario = ?;
        `,
        [
            id_producto,
            stock_actual,
            stock_minimo,
            id
        ]
    );

    return result;

};

// Eliminar inventario
const deleteInventory = async (id) => {

    const [result] = await pool.query(
        `
        DELETE FROM inventario
        WHERE id_inventario = ?;
        `,
        [id]
    );

    return result;

};

module.exports = {
    getAllInventory,
    getInventoryById,
    createInventory,
    updateInventory,
    deleteInventory
};