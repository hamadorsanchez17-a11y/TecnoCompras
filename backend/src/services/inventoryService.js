const inventoryModel = require("../models/inventoryModel");

const getAllInventory = async () => {
    return await inventoryModel.getAllInventory();
};

const getInventoryById = async (id) => {

    const inventario = await inventoryModel.getInventoryById(id);

    if (!inventario) {
        throw new Error("Inventario no encontrado.");
    }

    return inventario;

};

const createInventory = async (inventario) => {
    return await inventoryModel.createInventory(inventario);
};

const updateInventory = async (id, inventario) => {
    return await inventoryModel.updateInventory(id, inventario);
};

const deleteInventory = async (id) => {
    return await inventoryModel.deleteInventory(id);
};

module.exports = {
    getAllInventory,
    getInventoryById,
    createInventory,
    updateInventory,
    deleteInventory
};