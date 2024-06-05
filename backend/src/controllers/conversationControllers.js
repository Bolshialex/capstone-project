const connectDb = require("../configs/db");
const conversationSchemas = require("../models/conversationModel");

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
  conversationSchemas.insertIntoConversation(
    { chat_id, message_from, message },
    (err, result) => {
      if (err) {
        res
          .status(500)
          .send({ message: "Internal Server Error", err: err.message });
      } else {
        res.status(201).send("Message sent successfully");
      }
    }
  );
};

module.exports = { getConversationByChatId, insertIntoConversation };
