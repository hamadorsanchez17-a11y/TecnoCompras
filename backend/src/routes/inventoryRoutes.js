const express = require("express");
const router = express.Router();

const inventoryController = require("../controllers/inventoryController");

const {
    verifyToken,
    verifyAdmin
} = require("../middleware/authMiddleware");

router.get("/", inventoryController.getAllInventory);

router.get("/:id", inventoryController.getInventoryById);

router.post(
    "/",
    verifyToken,
    verifyAdmin,
    inventoryController.createInventory
);

router.put(
    "/:id",
    verifyToken,
    verifyAdmin,
    inventoryController.updateInventory
);

router.delete(
    "/:id",
    verifyToken,
    verifyAdmin,
    inventoryController.deleteInventory
);

module.exports = router;