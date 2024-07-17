const express = require("express");
const customController = require("../controller/customerController");

const router = express.Router();

// Routes
router.get("/", customController.homePage);
router.get("/add", customController.addCustomer);
router.post("/add", customController.postCustomer);
router.get("/view/:id", customController.view);
router.get("/edit/:id", customController.edit);
router.put("/edit/:id", customController.editPost);
router.delete("/edit/:id", customController.deleteCustomer);
router.post("/search", customController.searchCustomer);

module.exports = router;
