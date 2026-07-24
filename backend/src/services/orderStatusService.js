const orderStatusModel = require("../models/orderStatusModel");

const getAllOrderStatus = async () => {
    return await orderStatusModel.getAllOrderStatus();
};

module.exports = {
    getAllOrderStatus
};