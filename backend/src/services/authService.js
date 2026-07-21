const bcrypt = require("bcrypt");
const authModel = require("../models/authModel");
const jwt = require("jsonwebtoken");

const register = async (usuario) => {
    
    try {
        const existe = await authModel.findUserByEmail(usuario.correo);

        if (existe) {
            throw new Error("El correo ya está registrado.");
        }

        const hash = await bcrypt.hash(usuario.password, 10);

        const nuevoUsuario = {
            ...usuario,
            password: hash
        };

        await authModel.createUser(nuevoUsuario);

        return {
            mensaje: "Usuario registrado correctamente."
        };

    } catch (error) {
        throw error;
    }
};

const login = async (correo, password) => {

    const usuario = await authModel.findUserByEmail(correo);

    if (!usuario) {
        throw new Error("Correo o contraseña incorrectos.");
    }

    const coincide = await bcrypt.compare(password, usuario.password);

    if (!coincide) {
        throw new Error("Correo o contraseña incorrectos.");
    }

    const token = jwt.sign(
        {
            id: usuario.id_usuario,
            rol: usuario.id_rol
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "8h"
        }
    );

    return {
        mensaje: "Inicio de sesión exitoso.",
        token
    };
};

module.exports = {
    register,
    login
};