const connectDb = require("../configs/db");

const messageSchemas = {
  createMessage: ({ message, sender_id, receiver_id }, callback) => {
    const query =
      "INSERT INTO messages (message, sender_id, receiver_id) VALUES (?, ?, ?)";
    const values = [message, sender_id, receiver_id];
    connectDb.query(query, values, callback);
  },
  getMessagesBySender: (sender_id, callback) => {
    const query = "SELECT * FROM messages WHERE sender_id = ?";
    const values = [sender_id];
    connectDb.query(query, values, callback);
  },
  getMessagesByReceiver: (receiver_id, callback) => {
    const query = "SELECT * FROM messages WHERE receiver_id = ?";
    const values = [receiver_id];
    connectDb.query(query, values, callback);
  },
  getAllMessages: (callback) => {
    connectDb.query("SELECT * FROM messages", callback);
  },
  getMessagesById: (messageId, callback) => {
    const query = "SELECT * FROM messages WHERE id = ?";
    const values = [messageId];
    connectDb.query(query, values, callback);
  },
  getMessagesBySenderAndReceiver: (sender_id, receiver_id, callback) => {
    const query =
      "SELECT * FROM messages WHERE sender_id = ? AND receiver_id = ?";
    const values = [sender_id, receiver_id];
    connectDb.query(query, values, callback);
  },
};

module.exports = messageSchemas;
