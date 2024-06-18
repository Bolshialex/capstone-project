const connectDb = require("../configs/db");

const notificationSchemas = {
  getUnreadMessageCount: (user_id, callback) => {
    const query = `
      SELECT 
        chats.chat_id, 
        conversations.message_from, 
        SUM(CASE WHEN conversations.is_read = FALSE THEN 1 ELSE 0 END) AS unread_message_count 
      FROM 
        chats 
      JOIN 
        conversations 
      ON 
        chats.chat_id = conversations.chat_id 
      WHERE 
        conversations.message_from != ? 
      GROUP BY 
        chats.chat_id, 
        conversations.message_from
    `;
    const values = [user_id];
    connectDb.query(query, values, callback);
  },

  setMessageRead: (chat_id, user_id, callback) => {
    const query = `UPDATE conversations SET is_read = 1 WHERE chat_id = ? AND message_from != ?`;
    const values = [chat_id, user_id];
    connectDb.query(query, values, callback);
  },
};

module.exports = notificationSchemas;
