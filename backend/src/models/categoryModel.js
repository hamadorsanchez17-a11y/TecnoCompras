const pool = require("../config/database");

const getAllCategories = async () => {

    const [rows] = await pool.query(
        `
        SELECT
            id_categoria,
            nombre,
            descripcion
        FROM categoria
        ORDER BY id_categoria;
        `
    );

    return rows;

};      

const getCategoryById = async (id) => {

    const [rows] = await pool.query(
        `
        SELECT
            id_categoria,
            nombre,
            descripcion
        FROM categoria
        WHERE id_categoria = ?;
        `,
        [id]
    );

    return rows[0];

};

const createCategory = async (categoria) => {

    const {
        nombre,
        descripcion
    } = categoria;

    const [result] = await pool.query(
        `
        INSERT INTO categoria
        (
            nombre,
            descripcion
        )
        VALUES
        (
            ?,
            ?
        );
        `,
        [
            nombre,
            descripcion
        ]
    );

    return result;

};

const updateCategory = async (id, categoria) => {

    const {
        nombre,
        descripcion
    } = categoria;

    const [result] = await pool.query(
        `
        UPDATE categoria
        SET
            nombre = ?,
            descripcion = ?
        WHERE id_categoria = ?;
        `,
        [
            nombre,
            descripcion,
            id
        ]
    );

    return result;

};

const deleteCategory = async (id) => {

    const [result] = await pool.query(
        `
        DELETE FROM categoria
        WHERE id_categoria = ?;
        `,
        [id]
    );

    return result;

};

module.exports = {
    getAllCategories,
    getCategoryById, 
    createCategory,
    updateCategory,
    deleteCategory
};
