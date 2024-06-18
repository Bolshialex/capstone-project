const connectDb = require("../configs/db");

const conversationSchemas = {
  //gets all conversations by chat_id
  getConversationByChatId: ({ chat_id }, callback) => {
    const query = "SELECT * FROM conversations WHERE chat_id = ?";
    const values = [chat_id];
    connectDb.query(query, values, callback);
  },
  //send a message
  insertIntoConversation: ({ chat_id, message_from, message }, callback) => {
    const query =
      "INSERT INTO conversations (chat_id, message_from, message) VALUES (?, ?, ?)";
    const values = [chat_id, message_from, message];
    connectDb.query(query, values, callback);
  },
  //updates the is_read column
  updateIsRead: (isReadInfo, callback) => {
    const query =
      "UPDATE conversations SET is_read = 1 WHERE chat_id = ? AND message_from = ?";
    const values = [...isReadInfo];
    connectDb.query(query, values, callback);
  },
};

module.exports = conversationSchemas;
