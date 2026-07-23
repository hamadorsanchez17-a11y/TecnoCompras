const express=require("express");
const router=express.Router();

const orderController=require("../controllers/orderController");

const{
    verifyToken,
    verifyAdmin
}=require("../middleware/authMiddleware");

router.get("/",orderController.getAllOrders);

router.get("/:id",orderController.getOrderById);

router.post(
    "/",
    verifyToken,
    verifyAdmin,
    orderController.createOrder
);

router.put(
    "/:id",
    verifyToken,
    verifyAdmin,
    orderController.updateOrder
);

router.delete(
    "/:id",
    verifyToken,
    verifyAdmin,
    orderController.deleteOrder
);

module.exports=router;