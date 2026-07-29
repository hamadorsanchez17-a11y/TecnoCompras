const DireccionService = require("../services/direccionService");

class DireccionController {

    static async crearDireccion(req, res) {

        try {

            const idUsuario = req.usuario.id;

            const resultado =
                await DireccionService.crearDireccion(
                    req.body,
                    idUsuario
                );

            return res.status(201).json(resultado);

        } catch (error) {

            return res.status(400).json({
                ok: false,
                mensaje: error.message
            });

        }

    }

    static async obtenerDirecciones(req, res) {

        try {

            const idUsuario = req.usuario.id;

            const direcciones =
                await DireccionService.obtenerDirecciones(idUsuario);

            return res.status(200).json({
                ok: true,
                direcciones
            });

        } catch (error) {

            return res.status(400).json({
                ok: false,
                mensaje: error.message
            });

        }

    }

    static async obtenerDireccionPrincipal(req, res) {

        try {

            const idUsuario = req.usuario.id;

            const direccion =
                await DireccionService.obtenerDireccionPrincipal(idUsuario);

            return res.status(200).json({
                ok: true,
                direccion
            });

        } catch (error) {

            return res.status(400).json({
                ok: false,
                mensaje: error.message
            });

        }

    }

}

module.exports = DireccionController;