const pool = require("../config/database");

const findUserByEmail = async (correo) => {
    const [rows] = await pool.query(
        "SELECT * FROM usuario WHERE correo = ?",
        [correo]
    );

    return rows[0];
};

const createUser = async (usuario) => {

    const {
        nombre,
        apellido,
        correo,
        password,
        telefono
    } = usuario;

    const [result] = await pool.query(
        `INSERT INTO usuario
        (nombre, apellido, correo, password, telefono, tipo_usuario, id_nivel, estado, fecha_registro, id_rol)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?)`,
        [
            nombre,
            apellido,
            correo,
            password,
            telefono,
            "Cliente",
            1,
            "ACTIVO",
            2
        ]
    );

    return result;
};

module.exports = {
    findUserByEmail,
    createUser
};