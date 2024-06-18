const connectDb = require("../configs/db");
const conversationSchemas = require("../models/conversationModel");

const io = require("../../server");

connectDb;

const getConversationByChatId = (req, res) => {
  const { chat_id } = req.params;
  conversationSchemas.getConversationByChatId({ chat_id }, (err, result) => {
    if (err) {
      res
        .status(500)
        .send({ message: "Internal Server Error", err: err.message });
    } else {
      res.status(200).send(result);
    }
  });
};

const insertIntoConversation = (req, res) => {
  const { chat_id, message_from, message } = req.body;
  const messageInfo = { chat_id, message_from, message };
  conversationSchemas.insertIntoConversation(
    { chat_id, message_from, message },
    (err, result) => {
      if (err) {
        res
          .status(500)
          .send({ message: "Internal Server Error", err: err.message });
      } else {
        res.status(201).send("Message sent successfully");
        //sends out a signal that a new message has been sent
        io.emit("new-message", messageInfo);
      }
    }
  );
};

const updateIsRead = (req, res) => {
  const isReadInfo = [req.body.message_from, req.body.chat_id];
  chatSchemas.updateIsRead(isReadInfo, (err, result) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else {
      res.status(200).send(result);
    }
  });
};

module.exports = {
  getConversationByChatId,
  insertIntoConversation,
  updateIsRead,
};
