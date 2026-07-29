const pool = require("../config/database");

class DireccionModel {

    static async obtenerConexion() {
        return await pool.getConnection();
    }

    static async crearDireccion(
        conexion,
        idUsuario,
        calle,
        ciudad,
        departamento,
        codigoPostal,
        referencia,
        principal
    ) {

        // Si será la principal, quitar la principal anterior
        if (principal) {
            await conexion.query(
                `
                UPDATE direccion
                SET principal = FALSE
                WHERE id_usuario = ?
                `,
                [idUsuario]
            );
        }

        const [resultado] = await conexion.query(
            `
            INSERT INTO direccion (
                id_usuario,
                calle,
                ciudad,
                departamento,
                codigo_postal,
                referencia,
                principal
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)
            `,
            [
                idUsuario,
                calle,
                ciudad,
                departamento,
                codigoPostal,
                referencia,
                principal
            ]
        );

        return resultado.insertId;
    }

    static async obtenerDireccionesUsuario(conexion, idUsuario) {

        const [rows] = await conexion.query(
            `
            SELECT *
            FROM direccion
            WHERE id_usuario = ?
            ORDER BY principal DESC, id_direccion DESC
            `,
            [idUsuario]
        );

        return rows;
    }

    static async obtenerDireccionPrincipal(conexion, idUsuario) {

        const [rows] = await conexion.query(
            `
            SELECT *
            FROM direccion
            WHERE id_usuario = ?
            AND principal = TRUE
            LIMIT 1
            `,
            [idUsuario]
        );

        return rows[0];
    }
}

module.exports = DireccionModel;