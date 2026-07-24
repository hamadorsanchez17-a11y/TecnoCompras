const pool = require("../config/database");

const getAllOrderStatus = async () => {
    const [rows] = await pool.query(`
        SELECT
            id_estado_pedido,
            nombre
        FROM estado_pedido
        ORDER BY id_estado_pedido;
    `);

    return rows;
};

module.exports = {
    getAllOrderStatus
};