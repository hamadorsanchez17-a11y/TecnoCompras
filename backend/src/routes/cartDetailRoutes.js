const express = require("express");
const router = express.Router();

const cartDetailController = require("../controllers/cartDetailController");

const {
    verifyToken,
    verifyAdmin
} = require("../middleware/authMiddleware");

router.get("/", cartDetailController.getAllCartDetails);

router.get("/:id", cartDetailController.getCartDetailById);

router.post(
    "/",
    verifyToken,
    verifyAdmin,
    cartDetailController.createCartDetail
);

router.put(
    "/:id",
    verifyToken,
    verifyAdmin,
    cartDetailController.updateCartDetail
);

router.delete(
    "/:id",
    verifyToken,
    verifyAdmin,
    cartDetailController.deleteCartDetail
);

module.exports = router;