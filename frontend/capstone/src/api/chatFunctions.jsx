import axios from "axios";
const API_URL = "http://localhost:3000";

function getChats(token, { sender_id, receiver_id }) {
  return axios
    .get(`${API_URL}/chat/${sender_id}/${receiver_id}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching chats:", error);
      throw error;
    });
}

function createChat(token, chatInfo) {
  return axios
    .post(`${API_URL}/chat`, chatInfo, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error creating chat:", error.message);
      throw error;
    });
}

export default { getChats, createChat };
