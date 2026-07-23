const orderDetailService = require("../services/orderDetailService");

// Obtener todos
exports.getAllOrderDetails = async (req, res) => {

    try {

        const detalles = await orderDetailService.getAllOrderDetails();

        res.json(detalles);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// Obtener por ID
exports.getOrderDetailById = async (req, res) => {

    try {

        const { id } = req.params;

        const detalle = await orderDetailService.getOrderDetailById(id);

        res.json(detalle);

    } catch (error) {

        if (error.message === "Detalle del pedido no encontrado.") {

            return res.status(404).json({
                mensaje: error.message
            });

        }

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// Crear
exports.createOrderDetail = async (req, res) => {

    try {

        await orderDetailService.createOrderDetail(req.body);

        res.status(201).json({
            mensaje: "Detalle del pedido creado correctamente."
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// Actualizar
exports.updateOrderDetail = async (req, res) => {

    try {

        const { id } = req.params;

        const resultado = await orderDetailService.updateOrderDetail(id, req.body);

        if (resultado.affectedRows === 0) {

            return res.status(404).json({
                mensaje: "Detalle del pedido no encontrado."
            });

        }

        res.json({
            mensaje: "Detalle del pedido actualizado correctamente."
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// Eliminar
exports.deleteOrderDetail = async (req, res) => {

    try {

        const { id } = req.params;

        const resultado = await orderDetailService.deleteOrderDetail(id);

        if (resultado.affectedRows === 0) {

            return res.status(404).json({
                mensaje: "Detalle del pedido no encontrado."
            });

        }

        res.json({
            mensaje: "Detalle del pedido eliminado correctamente."
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};