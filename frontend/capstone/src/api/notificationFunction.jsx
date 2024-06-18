import axios from "axios";
const API_URL = "http://localhost:3000";

function getUnreadMessages(token, user_id) {
  return axios
    .get(`${API_URL}/notification/${user_id}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching unread messages:", error);
      throw error;
    });
}

function setMessageRead(token, chat_id, user_id) {
  return axios
    .put(
      `${API_URL}/notification`,
      { chat_id, user_id },
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error setting message read:", error);
      throw error;
    });
}

export default { getUnreadMessages, setMessageRead };
