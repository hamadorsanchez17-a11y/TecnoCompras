const DireccionModel = require("../models/direccionModel");

class DireccionService {

    static async crearDireccion(datos, idUsuario) {

        const conexion = await DireccionModel.obtenerConexion();

        try {

            await conexion.beginTransaction();

            const idDireccion = await DireccionModel.crearDireccion(
                conexion,
                idUsuario,
                datos.calle,
                datos.ciudad,
                datos.departamento,
                datos.codigo_postal,
                datos.referencia,
                datos.principal ?? true
            );

            await conexion.commit();
            conexion.release();

            return {
                ok: true,
                id_direccion: idDireccion,
                mensaje: "Dirección creada correctamente."
            };

        } catch (error) {

            await conexion.rollback();
            conexion.release();

            throw error;
        }
    }

    static async obtenerDirecciones(idUsuario) {

        const conexion = await DireccionModel.obtenerConexion();

        try {

            const direcciones =
                await DireccionModel.obtenerDireccionesUsuario(
                    conexion,
                    idUsuario
                );

            conexion.release();

            return direcciones;

        } catch (error) {

            conexion.release();
            throw error;

        }
    }

    static async obtenerDireccionPrincipal(idUsuario) {

        const conexion = await DireccionModel.obtenerConexion();

        try {

            const direccion =
                await DireccionModel.obtenerDireccionPrincipal(
                    conexion,
                    idUsuario
                );

            conexion.release();

            return direccion;

        } catch (error) {

            conexion.release();
            throw error;

        }
    }

}

module.exports = DireccionService;