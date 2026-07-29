const orderStatusModel = require("../models/estadoPedidoModel");

const getAllOrderStatus = async () => {
    return await orderStatusModel.getAllOrderStatus();
};

module.exports = {
    getAllOrderStatus
};