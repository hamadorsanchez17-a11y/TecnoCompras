const categoryModel = require("../models/categoryModel");

const getAllCategories = async () => {

    return await categoryModel.getAllCategories();

};

const getCategoryById = async (id) => {

    const categoria = await categoryModel.getCategoryById(id);

    if (!categoria) {
        throw new Error("Categoría no encontrada.");
    }

    return categoria;

};

const createCategory = async (categoria) => {

    return await categoryModel.createCategory(categoria);

};

const updateCategory = async (id, categoria) => {

    return await categoryModel.updateCategory(id, categoria);

};

const deleteCategory = async (id) => {

    return await categoryModel.deleteCategory(id);

};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};  