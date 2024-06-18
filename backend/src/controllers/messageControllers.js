const connectDb = require("../configs/db");
const messageSchemas = require("../models/messageModel");

connectDb;

const createMessage = (req, res) => {
  const messageInfo = req.body;
  messageSchemas.createMessage(messageInfo, (err, newMessage) => {
    if (err) {
      res.status(500).json({ error: "Internal Server Error" });
      console.log(err);
      return;
    }
    res.json(newMessage);
  });
};

const getMessagesBySender = (req, res) => {
  const senderId = req.params.sender_id;
  messageSchemas.getMessagesBySender(senderId, (err, result) => {
    if (err) {
      res.status(500).json({ error: "Internal Server Error" });
      console.log(err);
      return;
    }
    res.json(result);
  });
};

const getMessagesByReceiver = (req, res) => {
  const receiverId = req.params.receiver_id;
  messageSchemas.getMessagesByReceiver(receiverId, (err, result) => {
    if (err) {
      res.status(500).json({ error: "Internal Server Error" });
      console.log(err);
      return;
    }
    res.json(result);
  });
};

const getAllMessages = (req, res) => {
  messageSchemas.getAllMessages((err, result) => {
    if (err) {
      res.status(500).json({ error: "Internal Server Error" });
      console.log(err);
      return;
    }
    res.json(result);
  });
};

const getMessagesById = (req, res) => {
  const messageId = req.params.id;
  messageSchemas.getMessagesById(messageId, (err, result) => {
    if (err) {
      res.status(500).json({ error: "Internal Server Error" });
      console.log(err);
      return;
    }
    res.json(result);
  });
};

const getMessagesBySenderAndReceiver = (req, res) => {
  const senderId = req.params.sender_id;
  const receiverId = req.params.receiver_id;
  messageSchemas.getMessagesBySenderAndReceiver(
    senderId,
    receiverId,
    (err, result) => {
      if (err) {
        res.status(500).json({ error: "Internal Server Error" });
        console.log(err);
        return;
      }
      res.json(result);
    }
  );
};

module.exports = {
  createMessage,
  getMessagesBySender,
  getMessagesByReceiver,
  getAllMessages,
  getMessagesById,
  getMessagesBySenderAndReceiver,
};
