const express = require("express");
const { refreshToken } = require("../controllers/loginController");

const router = express.Router();

router.get("/", refreshToken);

module.exports = router;
