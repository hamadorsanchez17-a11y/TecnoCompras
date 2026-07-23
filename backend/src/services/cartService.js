const cartModel = require("../models/cartModel");

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

module.exports = {
    getAllCarts,
    getCartById,
    createCart,
    updateCart,
    deleteCart
};