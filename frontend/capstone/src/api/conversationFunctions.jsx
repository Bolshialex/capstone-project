import axios from "axios";
const API_URL = "http://localhost:3000";

function getConversationById(token, conversationId) {
  return axios
    .get(`${API_URL}/conversation/${conversationId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching conversation:", error);
      throw error;
    });
}

function sendMessage(token, { chat_id, message_from, message }) {
  return axios
    .post(
      `${API_URL}/conversation`,
      { chat_id, message_from, message },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error sending message:", error.message);
      throw error;
    });
}

function updateIsRead(token, { chat_id, message_from }) {
  return axios
    .put(
      `${API_URL}/conversation`,
      { chat_id, message_from },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error updating isRead:", error.message);
      throw error;
    });
}

export default { getConversationById, sendMessage, updateIsRead };
