const productService = require("../services/productService");

exports.getAllProducts = async (req, res) => {

    try {

        const productos = await productService.getAllProducts();

        res.status(200).json(productos);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

exports.getProductById = async (req, res) => {

    try {

        const producto = await productService.getProductById(req.params.id);

        res.status(200).json(producto);

    } catch (error) {

        res.status(404).json({
            mensaje: error.message
        });

    }

};

exports.createProduct = async (req, res) => {

    try {

        const producto = await productService.createProduct(req.body);

        res.status(201).json(producto);

    } catch (error) {

        res.status(400).json({
            mensaje: error.message
        });

    }

};

exports.updateProduct = async (req, res) => {

    try {

        const { id } = req.params;

        const resultado = await productService.updateProduct(id, req.body);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensaje: "Producto no encontrado."
            });
        }

        res.json({
            mensaje: "Producto actualizado correctamente."
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

exports.deleteProduct = async (req, res) => {

    try {

        const { id } = req.params;

        const resultado = await productService.deleteProduct(id);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensaje: "Producto no encontrado."
            });
        }

        res.json({
            mensaje: "Producto eliminado correctamente."
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};