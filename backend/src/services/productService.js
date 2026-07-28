const productModel = require("../models/productModel");

const getAllProducts = async () => {

    return await productModel.getAllProducts();

};
const getProductById = async (id) => {

    const producto = await productModel.getProductById(id);

    if (!producto) {
        throw new Error("Producto no encontrado.");
    }

    return producto;
};

const getCatalogProducts = async () => {
    return await productModel.getCatalogProducts();
};

const createProduct = async (producto) => {

    return await productModel.createProduct(producto);

};

const updateProduct = async (id, producto) => {

    return await productModel.updateProduct(id, producto);

};

const deleteProduct = async (id) => {
    return await productModel.deleteProduct(id);
};

const uploadProductImage = async (id, rutaImagen) => {

    return await productModel.uploadProductImage(id, rutaImagen);

};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getCatalogProducts,
    uploadProductImage
};
