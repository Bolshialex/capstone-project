import axios from "axios";
const API_URL = "http://localhost:3000";

function fetchAllMessages(token) {
  return axios
    .get(`${API_URL}/message`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching messages:", error);
      throw error;
    });
}

function createNewMessage(token, messageData) {
  return axios
    .post(`${API_URL}/message`, messageData, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error creating message:", error.message);
      throw error;
    });
}

function getMessagesBySender(token, senderId) {
  return axios
    .get(`${API_URL}/message/sender/${senderId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching messages by sender:", error);
      throw error;
    });
}

function getMessagesByReceiver(token, receiverId) {
  return axios
    .get(`${API_URL}/message/receiver/${receiverId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching messages by receiver:", error);
      throw error;
    });
}

function getMessagesById(token, messageId) {
  return axios
    .get(`${API_URL}/message/${messageId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching message by id:", error);
      throw error;
    });
}

function getMessagesBySenderAndReceiver(token, senderId, receiverId) {
  return axios
    .get(`${API_URL}/sender/${senderId}/receiver/${receiverId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching messages by sender and receiver:", error);
      throw error;
    });
}

export default {
  fetchAllMessages,
  createNewMessage,
  getMessagesBySender,
  getMessagesByReceiver,
  getMessagesById,
  getMessagesBySenderAndReceiver,
};
