const express = require("express");
const router = express.Router();
const { checkToken } = require("../middlewares/tokenValidation");
const messageControllers = require("../controllers/messageControllers");

router
  .post("/", checkToken, messageControllers.createMessage)
  .get("/", checkToken, messageControllers.getAllMessages);
router.get(
  "/sender/:sender_id",
  checkToken,
  messageControllers.getMessagesBySender
);
router.get(
  "/receiver/:receiver_id",
  checkToken,
  messageControllers.getMessagesByReceiver
);
router.get("/:id", checkToken, messageControllers.getMessagesById);
router.get(
  "/sender/:sender_id/receiver/:receiver_id",
  checkToken,
  messageControllers.getMessagesBySenderAndReceiver
);

module.exports = router;
