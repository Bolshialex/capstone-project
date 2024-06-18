const express = require("express");
const router = express.Router();
const notificationControllers = require("../controllers/notificationControllers");
const { checkToken } = require("../middlewares/tokenValidation");

router
  .get("/:user_id", checkToken, notificationControllers.getUnreadMessageCount)
  .put("/", checkToken, notificationControllers.setMessageRead);

module.exports = router;
