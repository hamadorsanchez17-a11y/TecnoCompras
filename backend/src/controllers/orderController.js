const orderService = require("../services/orderService");

// Obtener todos los pedidos
exports.getAllOrders = async (req, res) => {

    try {

        const pedidos = await orderService.getAllOrders();

        res.json(pedidos);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// Obtener pedido por ID
exports.getOrderById = async (req, res) => {

    try {

        const { id } = req.params;

        const pedido = await orderService.getOrderById(id);

        res.json(pedido);

    } catch (error) {

        if (error.message === "Pedido no encontrado.") {
            return res.status(404).json({
                mensaje: error.message
            });
        }

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// Crear pedido
exports.createOrder = async (req, res) => {

    try {

        await orderService.createOrder(req.body);

        res.status(201).json({
            mensaje: "Pedido creado correctamente."
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// Actualizar pedido
exports.updateOrder = async (req, res) => {

    try {

        const { id } = req.params;

        const resultado = await orderService.updateOrder(id, req.body);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensaje: "Pedido no encontrado."
            });
        }

        res.json({
            mensaje: "Pedido actualizado correctamente."
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// Eliminar pedido
exports.deleteOrder = async (req, res) => {

    try {

        const { id } = req.params;

        const resultado = await orderService.deleteOrder(id);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensaje: "Pedido no encontrado."
            });
        }

        res.json({
            mensaje: "Pedido eliminado correctamente."
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};