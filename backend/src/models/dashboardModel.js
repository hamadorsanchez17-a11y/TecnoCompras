const pool = require("../config/database");

const getDashboard = async () => {

    const [[clientes]] = await pool.query(`
        SELECT COUNT(*) AS total
        FROM usuario
        WHERE id_rol = 2;
    `);

    const [[productos]] = await pool.query(`
        SELECT COUNT(*) AS total
        FROM producto;
    `);

    const [[pedidos]] = await pool.query(`
        SELECT COUNT(*) AS total
        FROM pedido;
    `);

    const [[ventas]] = await pool.query(`
        SELECT COALESCE(SUM(total),0) AS total
        FROM pedido;
    `);

    const [[ticketPromedio]] = await pool.query(`
        SELECT COALESCE(ROUND(AVG(total),2),0) AS promedio
        FROM pedido;
    `);

    const [stockBajo] = await pool.query(`
        SELECT
            p.nombre,
            i.stock_actual,
            i.stock_minimo
        FROM inventario i
        INNER JOIN producto p
        ON p.id_producto=i.id_producto
        WHERE i.stock_actual<=i.stock_minimo
        ORDER BY i.stock_actual ASC;
    `);

    const [ultimosPedidos] = await pool.query(`
        SELECT
            p.id_pedido,
            u.nombre,
            p.total,
            ep.nombre AS estado,
            p.fecha
        FROM pedido p
        INNER JOIN usuario u
        ON u.id_usuario=p.id_usuario
        INNER JOIN estado_pedido ep
        ON ep.id_estado_pedido=p.id_estado_pedido
        ORDER BY p.fecha DESC
        LIMIT 5;
    `);

    return {
        clientes: clientes.total,
        productos: productos.total,
        pedidos: pedidos.total,
        ventas: ventas.total,
        ticketPromedio: ticketPromedio.promedio,
        stockBajo,
        ultimosPedidos
    };
};

module.exports = {
    getDashboard
};