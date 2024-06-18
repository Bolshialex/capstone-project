const express = require("express");
const router = express.Router();
const { checkToken } = require("../middlewares/tokenValidation");
const chatControllers = require("../controllers/chatControllers");

router
  .get(
    "/:sender_id/:receiver_id",
    checkToken,
    chatControllers.getChatsBySenderOrReceiverId
  )
  .post("/", checkToken, chatControllers.createChat);

module.exports = router;
