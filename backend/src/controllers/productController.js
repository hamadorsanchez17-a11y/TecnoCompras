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