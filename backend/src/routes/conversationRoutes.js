const express = require("express");
const router = express.Router();
const { checkToken } = require("../middlewares/tokenValidation");

const conversationControllers = require("../controllers/conversationControllers");

router
  .get("/:chat_id", checkToken, conversationControllers.getConversationByChatId)
  .post("/", checkToken, conversationControllers.insertIntoConversation)
  .put("/", checkToken, conversationControllers.updateIsRead);
module.exports = router;
