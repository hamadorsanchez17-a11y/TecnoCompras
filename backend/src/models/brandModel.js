const pool = require("../config/database");

const getAllBrands = async () => {

    const [rows] = await pool.query(
        `
        SELECT
            id_marca,
            nombre,
            pais_origen
        FROM marca
        ORDER BY id_marca;
        `
    );

    return rows;

};

const getBrandById = async (id) => {

    const [rows] = await pool.query(
        `
        SELECT
            id_marca,
            nombre,
            pais_origen
        FROM marca
        WHERE id_marca = ?;
        `,
        [id]
    );

    return rows[0];

};

const createBrand = async (marca) => {

    const {
        nombre,
        pais_origen
    } = marca;

    const [result] = await pool.query(
        `
        INSERT INTO marca
        (
            nombre,
            pais_origen
        )
        VALUES
        (
            ?,
            ?
        );
        `,
        [
            nombre,
            pais_origen
        ]
    );

    return result;

};

const updateBrand = async (id, marca) => {

    const {
        nombre,
        pais_origen
    } = marca;

    const [result] = await pool.query(
        `
        UPDATE marca
        SET
            nombre = ?,
            pais_origen = ?
        WHERE id_marca = ?;
        `,
        [
            nombre,
            pais_origen,
            id
        ]
    );

    return result;

};

const deleteBrand = async (id) => {

    const [result] = await pool.query(
        `
        DELETE FROM marca
        WHERE id_marca = ?;
        `,
        [id]
    );

    return result;

};

module.exports = {
    getAllBrands,
    getBrandById,
    createBrand,
    updateBrand,
    deleteBrand
};