const checkoutService = require("../services/checkoutService");

exports.confirmPurchase = async (req, res) => {

    try {

        const idUsuario = req.usuario.id;
        const { id_direccion } = req.body;

        const resultado = await checkoutService.confirmPurchase(
            idUsuario,
            id_direccion
        );

        res.status(201).json(resultado);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};