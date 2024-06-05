const connectDb = require("../configs/db");

const conversationSchemas = {
  getConversationByChatId: ({ chat_id }, callback) => {
    const query = "SELECT * FROM conversations WHERE chat_id = ?";
    const values = [chat_id];
    connectDb.query(query, values, callback);
  },
  insertIntoConversation: ({ chat_id, message_from, message }, callback) => {
    const query =
      "INSERT INTO conversations (chat_id, message_from, message) VALUES (?, ?, ?)";
    const values = [chat_id, message_from, message];
    connectDb.query(query, values, callback);
  },
};

module.exports = conversationSchemas;
