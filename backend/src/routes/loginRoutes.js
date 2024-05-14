const express = require("express");
const router = express.Router();
const { loginEmployee } = require("../controllers/loginController");

router.post("/", loginEmployee);

module.exports = router;
