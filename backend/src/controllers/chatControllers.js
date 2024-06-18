const connectDb = require("../configs/db");
const chatSchemas = require("../models/chatModel");

connectDb;

const chatControllers = {
  createChat: (req, res) => {
    const chatInfo = [req.body.receiver_id, req.body.sender_id];
    chatSchemas.createChat(chatInfo, (err, result) => {
      if (err) {
        res.status(500).send("Internal Server Error");
      } else {
        res.status(201).send(result);
      }
    });
  },
  getChatsBySenderOrReceiverId: (req, res) => {
    const { sender_id, receiver_id } = req.params;
    chatSchemas.getChatsBySenderOrReceiverId(
      { sender_id, receiver_id },
      (err, result) => {
        if (err) {
          res
            .status(500)
            .send({ message: "Internal Server Error", error: err.message });
        } else {
          res.status(200).send(result);
        }
      }
    );
  },
};
module.exports = chatControllers;
