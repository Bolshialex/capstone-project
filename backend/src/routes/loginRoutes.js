const express = require("express");
const router = express.Router();
const { loginEmployee } = require("../controllers/loginController");

router.post("/employee", loginEmployee);

module.exports = router;
