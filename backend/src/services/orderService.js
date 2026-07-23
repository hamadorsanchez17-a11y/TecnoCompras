const orderModel=require("../models/orderModel");

const getAllOrders=async()=>{
    return await orderModel.getAllOrders();
};

const getOrderById=async(id)=>{

    const pedido=await orderModel.getOrderById(id);

    if(!pedido){
        throw new Error("Pedido no encontrado.");
    }

    return pedido;

};

const createOrder=async(pedido)=>{
    return await orderModel.createOrder(pedido);
};

const updateOrder=async(id,pedido)=>{
    return await orderModel.updateOrder(id,pedido);
};

const deleteOrder=async(id)=>{
    return await orderModel.deleteOrder(id);
};

module.exports={
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
};