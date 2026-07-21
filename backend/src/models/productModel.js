const pool = require("../config/database");

const getAllProducts = async () => {

    const [rows] = await pool.query(`
        SELECT
            p.id_producto,
            p.sku,
            p.nombre,
            p.descripcion,
            p.precio,
            p.activo,
            p.peso,
            p.fecha_registro,
            c.nombre AS categoria,
            m.nombre AS marca
        FROM producto p
        INNER JOIN categoria c
            ON p.id_categoria = c.id_categoria
        INNER JOIN marca m
            ON p.id_marca = m.id_marca
        ORDER BY p.id_producto;
    `);

    return rows;
};

const getProductById = async (id) => {

    const [rows] = await pool.query(`
        SELECT
            p.id_producto,
            p.sku,
            p.nombre,
            p.descripcion,
            p.precio,
            p.activo,
            p.peso,
            p.fecha_registro,
            c.nombre AS categoria,
            m.nombre AS marca
        FROM producto p
        INNER JOIN categoria c
            ON p.id_categoria = c.id_categoria
        INNER JOIN marca m
            ON p.id_marca = m.id_marca
        WHERE p.id_producto = ?
    `, [id]);

    return rows[0];
};

const createProduct = async (producto) => {

    const {
        id_categoria,
        id_marca,
        sku,
        nombre,
        descripcion,
        precio,
        peso
    } = producto;

    const [result] = await pool.query(`
        INSERT INTO producto
        (
            id_categoria,
            id_marca,
            sku,
            nombre,
            descripcion,
            precio,
            peso
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [
        id_categoria,
        id_marca,
        sku,
        nombre,
        descripcion,
        precio,
        peso
    ]);

    return result;
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct
};
