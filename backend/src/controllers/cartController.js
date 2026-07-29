const cartService = require("../services/cartService");

// Obtener todos los carritos
exports.getAllCarts = async (req, res) => {

    try {

        const carritos = await cartService.getAllCarts();

        res.json(carritos);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// Obtener carrito por ID
exports.getCartById = async (req, res) => {

    try {

        const { id } = req.params;

        const carrito = await cartService.getCartById(id);

        res.json(carrito);

    } catch (error) {

        if (error.message === "Carrito no encontrado.") {
            return res.status(404).json({
                mensaje: error.message
            });
        }

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// Crear carrito
exports.createCart = async (req, res) => {

    try {

        await cartService.createCart(req.body);

        res.status(201).json({
            mensaje: "Carrito creado correctamente."
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// Actualizar carrito
exports.updateCart = async (req, res) => {

    try {

        const { id } = req.params;

        const resultado = await cartService.updateCart(id, req.body);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensaje: "Carrito no encontrado."
            });
        }

        res.json({
            mensaje: "Carrito actualizado correctamente."
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// Eliminar carrito
exports.deleteCart = async (req, res) => {

    try {

        const { id } = req.params;

        const resultado = await cartService.deleteCart(id);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensaje: "Carrito no encontrado."
            });
        }

        res.json({
            mensaje: "Carrito eliminado correctamente."
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// Agregar producto al carrito
exports.addProduct = async (req, res) => {

    console.log("BODY:", req.body);
console.log("USUARIO:", req.usuario);

    try {

        const idUsuario = req.usuario.id;

        const {
            id_producto,
            cantidad,
            precio
        } = req.body;

        const resultado = await cartService.addProduct(
            idUsuario,
            id_producto,
            cantidad,
            precio
        );

        res.status(201).json(resultado);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};