const inventoryService = require("../services/inventoryService");

// Obtener todo el inventario
exports.getAllInventory = async (req, res) => {

    try {

        const inventario = await inventoryService.getAllInventory();

        res.json(inventario);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// Obtener inventario por ID
exports.getInventoryById = async (req, res) => {

    try {

        const { id } = req.params;

        const inventario = await inventoryService.getInventoryById(id);

        res.json(inventario);

    } catch (error) {

        if (error.message === "Inventario no encontrado.") {
            return res.status(404).json({
                mensaje: error.message
            });
        }

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// Crear inventario
exports.createInventory = async (req, res) => {

    try {

        if (req.body.stock_actual < 0) {
            return res.status(400).json({
            mensaje: "El stock actual no puede ser negativo."
            });
        }

        if (req.body.stock_minimo < 0) {
            return res.status(400).json({
            mensaje: "El stock mínimo no puede ser negativo."
         });
        }
        if (req.body.stock_minimo > req.body.stock_actual) {
            return res.status(400).json({
            mensaje: "El stock mínimo no puede ser mayor que el stock actual."
            });
        }
        await inventoryService.createInventory(req.body);

        res.status(201).json({
            mensaje: "Inventario creado correctamente."
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// Actualizar inventario
exports.updateInventory = async (req, res) => {

    try {

        if (req.body.stock_actual < 0) {
            return res.status(400).json({
                mensaje: "El stock actual no puede ser negativo."
            });
        }

        if (req.body.stock_minimo < 0) {
            return res.status(400).json({
                mensaje: "El stock mínimo no puede ser negativo."
            });
        }

        if (req.body.stock_minimo > req.body.stock_actual) {
           return res.status(400).json({
               mensaje: "El stock mínimo no puede ser mayor que el stock actual."
           });
        }       

        const { id } = req.params;

        const resultado = await inventoryService.updateInventory(id, req.body);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensaje: "Inventario no encontrado."
            });
        }

        res.json({
            mensaje: "Inventario actualizado correctamente."
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// Eliminar inventario
exports.deleteInventory = async (req, res) => {

    try {

        const { id } = req.params;

        const resultado = await inventoryService.deleteInventory(id);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensaje: "Inventario no encontrado."
            });
        }

        res.json({
            mensaje: "Inventario eliminado correctamente."
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};