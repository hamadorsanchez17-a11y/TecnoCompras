const brandModel = require("../models/brandModel");

const getAllBrands = async () => {

    return await brandModel.getAllBrands();

};

const getBrandById = async (id) => {

    const marca = await brandModel.getBrandById(id);

    if (!marca) {
        throw new Error("Marca no encontrada.");
    }

    return marca;

};

const createBrand = async (marca) => {

    return await brandModel.createBrand(marca);

};

const updateBrand = async (id, marca) => {

    return await brandModel.updateBrand(id, marca);

};

const deleteBrand = async (id) => {

    return await brandModel.deleteBrand(id);

};

module.exports = {
    getAllBrands,
    getBrandById,
    createBrand,
    updateBrand,
    deleteBrand
};