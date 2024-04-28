const express = require("express");
const router = express.Router();
const { registerCustomer } = require("../controllers/registrationController");

router.post("/customer", registerCustomer);

module.exports = router;
