const cartDetailService = require("../services/cartDetailService");

// Obtener todos los detalles
exports.getAllCartDetails = async (req, res) => {

    try {

        const detalles = await cartDetailService.getAllCartDetails();

        res.json(detalles);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// Obtener detalle por ID
exports.getCartDetailById = async (req, res) => {

    try {

        const { id } = req.params;

        const detalle = await cartDetailService.getCartDetailById(id);

        res.json(detalle);

    } catch (error) {

        if (error.message === "Detalle del carrito no encontrado.") {
            return res.status(404).json({
                mensaje: error.message
            });
        }

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// Crear detalle
exports.createCartDetail = async (req, res) => {

    try {

        await cartDetailService.createCartDetail(req.body);

        res.status(201).json({
            mensaje: "Detalle del carrito creado correctamente."
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// Actualizar detalle
exports.updateCartDetail = async (req, res) => {

    try {

        const { id } = req.params;

        const resultado = await cartDetailService.updateCartDetail(id, req.body);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensaje: "Detalle del carrito no encontrado."
            });
        }

        res.json({
            mensaje: "Detalle del carrito actualizado correctamente."
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// Eliminar detalle
exports.deleteCartDetail = async (req, res) => {

    try {

        const { id } = req.params;

        const resultado = await cartDetailService.deleteCartDetail(id);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensaje: "Detalle del carrito no encontrado."
            });
        }

        res.json({
            mensaje: "Detalle del carrito eliminado correctamente."
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};