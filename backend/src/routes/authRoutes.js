const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

const {
    verifyToken,
    verifyAdmin
} = require("../middleware/authMiddleware");

router.post("/register", authController.register);
router.post("/login", authController.login);

router.get("/perfil", verifyToken, (req, res) => {

    res.json({
        mensaje: "Acceso autorizado",
        usuario: req.usuario
    });

});

module.exports = router;