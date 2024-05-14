const express = require("express");
const router = express.Router();
const { registerEmployee } = require("../controllers/registrationController");

router.post("/", registerEmployee);

module.exports = router;
