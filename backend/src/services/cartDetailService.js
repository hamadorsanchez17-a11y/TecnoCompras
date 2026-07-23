const cartDetailModel = require("../models/cartDetailModel");

const getAllCartDetails = async () => {
    return await cartDetailModel.getAllCartDetails();
};

const getCartDetailById = async (id) => {

    const detalle = await cartDetailModel.getCartDetailById(id);

    if (!detalle) {
        throw new Error("Detalle del carrito no encontrado.");
    }

    return detalle;
};

const createCartDetail = async (detalle) => {
    return await cartDetailModel.createCartDetail(detalle);
};

const updateCartDetail = async (id, detalle) => {
    return await cartDetailModel.updateCartDetail(id, detalle);
};

const deleteCartDetail = async (id) => {
    return await cartDetailModel.deleteCartDetail(id);
};

module.exports = {
    getAllCartDetails,
    getCartDetailById,
    createCartDetail,
    updateCartDetail,
    deleteCartDetail
};