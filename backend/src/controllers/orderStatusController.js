const orderStatusService = require("../services/orderStatusService");

const getAllOrderStatus = async (req, res) => {
    try {
        const estados = await orderStatusService.getAllOrderStatus();

        res.status(200).json(estados);
    } catch (error) {
        console.error("Error al obtener los estados de pedido:", error);

        res.status(500).json({
            mensaje: "Error interno del servidor"
        });
    }
};

module.exports = {
    getAllOrderStatus
};