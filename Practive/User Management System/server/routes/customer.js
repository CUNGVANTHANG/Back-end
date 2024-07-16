const express = require("express");
const customController = require("../controller/customerController");

const router = express.Router();

router.get("/", customController.homePage);
router.get("/add", customController.addCustomer);
router.post("/add", customController.postCustomer);

module.exports = router;
