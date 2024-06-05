const messageSchema = require("../models/messageModel");

function createMessage(messageInfo, callback) {
  messageSchema.createMessage(messageInfo, callback);
}

module.exports = { createMessage };
