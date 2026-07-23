const orderDetailModel=require("../models/orderDetailModel");

const getAllOrderDetails=async()=>{
    return await orderDetailModel.getAllOrderDetails();
};

const getOrderDetailById=async(id)=>{

    const detalle=await orderDetailModel.getOrderDetailById(id);

    if(!detalle){
        throw new Error("Detalle del pedido no encontrado.");
    }

    return detalle;

};

const createOrderDetail=async(detalle)=>{
    return await orderDetailModel.createOrderDetail(detalle);
};

const updateOrderDetail=async(id,detalle)=>{
    return await orderDetailModel.updateOrderDetail(id,detalle);
};

const deleteOrderDetail=async(id)=>{
    return await orderDetailModel.deleteOrderDetail(id);
};

module.exports={
    getAllOrderDetails,
    getOrderDetailById,
    createOrderDetail,
    updateOrderDetail,
    deleteOrderDetail
};