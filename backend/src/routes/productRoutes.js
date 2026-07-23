const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

const {
    verifyToken,
    verifyAdmin
} = require("../middleware/authMiddleware");

// Obtener todos los productos
router.get("/", productController.getAllProducts);

// Obtener un producto por ID
router.get("/:id", productController.getProductById);

// Crear un producto (Solo administradores)
router.post(
    "/",
    verifyToken,
    verifyAdmin,
    productController.createProduct
);

// Actualizar un producto (Solo administradores)
router.put(
    "/:id",
    verifyToken,
    verifyAdmin,
    productController.updateProduct
);

router.delete(
    "/:id",
    verifyToken,
    verifyAdmin,
    productController.deleteProduct
);

module.exports = router;