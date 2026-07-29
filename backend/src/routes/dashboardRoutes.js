const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboardController");
// const verifyToken = require("../middleware/verifyToken");
//const verifyAdmin = require("../middleware/verifyAdmin");

// router.get("/", verifyToken, verifyAdmin, dashboardController.getDashboard);

router.get("/", dashboardController.getDashboard);

module.exports = router;