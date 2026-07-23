const express = require("express");
const router = express.Router();

const orderDetailController = require("../controllers/orderDetailController");

const {
    verifyToken,
    verifyAdmin
} = require("../middleware/authMiddleware");

router.get("/", orderDetailController.getAllOrderDetails);

router.get("/:id", orderDetailController.getOrderDetailById);

router.post(
    "/",
    verifyToken,
    verifyAdmin,
    orderDetailController.createOrderDetail
);

router.put(
    "/:id",
    verifyToken,
    verifyAdmin,
    orderDetailController.updateOrderDetail
);

router.delete(
    "/:id",
    verifyToken,
    verifyAdmin,
    orderDetailController.deleteOrderDetail
);

module.exports = router;