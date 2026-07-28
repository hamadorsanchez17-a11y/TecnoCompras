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

exports.getCatalogProducts = async (req, res) => {

    try {

        const productos = await productService.getCatalogProducts();

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

        res.status(201).json({
            mensaje: "Producto registrado correctamente.",
            producto
        });

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

        console.error(error);

        if (error.code === "ER_ROW_IS_REFERENCED_2") {
            return res.status(400).json({
                mensaje: "No se puede eliminar el producto porque tiene un registro asociado en inventario."
            });
        }

        res.status(500).json({
            mensaje: "Error interno del servidor."
        });

    }

};

exports.uploadProductImage = async (req, res) => {

    try {

        if (!req.file) {
            return res.status(400).json({
                mensaje: "Debe seleccionar una imagen."
            });
        }

        const { id } = req.params;

        const rutaImagen = `/uploads/products/${req.file.filename}`;

        await productService.uploadProductImage(id, rutaImagen);

        res.json({
            mensaje: "Imagen subida correctamente.",
            imagen: rutaImagen
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};