const notificationSchemas = require("../models/notificationModel");
const connectDb = require("../configs/db");

connectDb;

const notificationControllers = {
  getUnreadMessageCount: (req, res) => {
    const user_id = req.params.user_id;

    notificationSchemas.getUnreadMessageCount(user_id, (err, result) => {
      if (err) {
        res
          .status(500)
          .send({ message: "Internal Server Error", error: err.message });
      } else {
        res.status(200).send(result);
      }
    });
  },
  setMessageRead: (req, res) => {
    const chat_id = req.body.chat_id;
    const user_id = req.body.user_id;

    notificationSchemas.setMessageRead(chat_id, user_id, (err, result) => {
      if (err) {
        res
          .status(500)
          .send({ message: "Internal Server Error", error: err.message });
      } else {
        res.status(200).send(result);
      }
    });
  },
};

module.exports = notificationControllers;
