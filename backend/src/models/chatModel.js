const connectDb = require("../configs/db");

const chatSchemas = {
  createChat: ({ receiver_id, sender_id }, callback) => {
    const query = "INSERT INTO chats (receiver_id, sender_id) VALUES (?, ?)";
    const values = [receiver_id, sender_id];
    connectDb.query(query, values, callback);
  },
  getChatsBySenderOrReceiverId: ({ sender_id, receiver_id }, callback) => {
    const query = "SELECT * FROM chats WHERE sender_id = ? OR receiver_id = ?";
    const values = [sender_id, receiver_id];
    connectDb.query(query, values, callback);
  },
};

module.exports = chatSchemas;
