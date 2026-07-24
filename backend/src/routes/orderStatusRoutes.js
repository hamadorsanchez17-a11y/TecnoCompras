const express = require("express");
const router = express.Router();

const orderStatusController = require("../controllers/orderStatusController");

router.get("/", orderStatusController.getAllOrderStatus);

module.exports = router;