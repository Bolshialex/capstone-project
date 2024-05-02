const express = require("express");
const router = express.Router();
const { registerEmployee } = require("../controllers/registrationController");

router.post("/employee", registerEmployee);

module.exports = router;
