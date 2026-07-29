const cartModel = require("../models/cartModel");
const cartDetailModel = require("../models/cartDetailModel");

const getAllCarts = async () => {
    return await cartModel.getAllCarts();
};

const getCartById = async (id) => {

    const carrito = await cartModel.getCartById(id);

    if (!carrito) {
        throw new Error("Carrito no encontrado.");
    }

    return carrito;
};

const createCart = async (carrito) => {
    return await cartModel.createCart(carrito);
};

const updateCart = async (id, carrito) => {
    return await cartModel.updateCart(id, carrito);
};

const deleteCart = async (id) => {
    return await cartModel.deleteCart(id);
};
const addProduct = async (
    idUsuario,
    idProducto,
    cantidad,
    precio
) => {

    // Buscar carrito activo
    let carrito = await cartModel.getActiveCart(idUsuario);

    // Si no existe, crearlo
    if (!carrito) {

        const idCarrito = await cartModel.createActiveCart(idUsuario);

        carrito = {
            id_carrito: idCarrito
        };

    }

    // Buscar si el producto ya existe
    const detalle = await cartDetailModel.findProductInCart(
        carrito.id_carrito,
        idProducto
    );

    if (detalle) {

        await cartDetailModel.increaseQuantity(
            detalle.id_detalle,
            cantidad
        );

    } else {

        await cartDetailModel.createCartDetail({
            id_carrito: carrito.id_carrito,
            id_producto: idProducto,
            cantidad,
            precio
        });

    }

    return {
        mensaje: "Producto agregado al carrito correctamente."
    };

};

module.exports = {
    getAllCarts,
    getCartById,
    createCart,
    addProduct,
    updateCart,
    deleteCart
};