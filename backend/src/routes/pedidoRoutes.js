const express = require("express");
const router = express.Router();

const PedidoController = require("../controllers/pedidoController");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

router.get(
    "/",
    verifyToken,
    PedidoController.obtenerPedidos
);

router.get(
    "/:id",
    verifyToken,
    PedidoController.obtenerDetallePedido
);

router.get(
    "/:id",
    verifyToken,
    PedidoController.obtenerDetallePedido
);

router.get(
    "/admin",
    verifyToken,
    verifyAdmin,
    PedidoController.obtenerTodosLosPedidos
);

router.put(
    "/:id/estado",
    verifyToken,
    verifyAdmin,
    PedidoController.actualizarEstadoPedido
);

router.post(
    "/",
    verifyToken,
    PedidoController.crearPedido
);


module.exports = router;