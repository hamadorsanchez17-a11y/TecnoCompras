const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cartController");

const {
    verifyToken,
    verifyAdmin
} = require("../middleware/authMiddleware");

router.get("/", cartController.getAllCarts);

router.get("/:id", cartController.getCartById);

router.post(
    "/",
    verifyToken,
    verifyAdmin,
    cartController.createCart
);

router.post(
    "/add-product",
    verifyToken,
    cartController.addProduct
);

router.put(
    "/:id",
    verifyToken,
    verifyAdmin,
    cartController.updateCart
);

router.delete(
    "/:id",
    verifyToken,
    verifyAdmin,
    cartController.deleteCart
);



module.exports = router;