const express = require("express");
const router = express.Router();

const orderStatusController = require("../controllers/estadoPedidoController");

router.get("/", orderStatusController.getAllOrderStatus);

module.exports = router;