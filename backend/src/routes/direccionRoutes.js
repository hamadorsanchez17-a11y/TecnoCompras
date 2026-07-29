const express = require("express");
const router = express.Router();

const DireccionController = require("../controllers/direccionController");
const { verifyToken } = require("../middleware/authMiddleware");

// Crear dirección
router.post(
    "/",
    verifyToken,
    DireccionController.crearDireccion
);

// Obtener todas las direcciones del usuario
router.get(
    "/",
    verifyToken,
    DireccionController.obtenerDirecciones
);

// Obtener dirección principal
router.get(
    "/principal",
    verifyToken,
    DireccionController.obtenerDireccionPrincipal
);

module.exports = router;