const express = require("express");
const router = express.Router();
const {
    verifyToken,
    verifyAdmin
} = require("../middleware/authMiddleware");

const brandController = require("../controllers/brandController");

router.get("/", brandController.getAllBrands);

router.get("/:id", brandController.getBrandById);
router.post(
    "/",
    verifyToken,
    verifyAdmin,
    brandController.createBrand
);

router.put(
    "/:id",
    verifyToken,
    verifyAdmin,
    brandController.updateBrand
);

router.delete(
    "/:id",
    verifyToken,
    verifyAdmin,
    brandController.deleteBrand
);

module.exports = router;