import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import chatFunctions from "../api/chatFunctions";
import conversationFunctions from "../api/conversationFunctions";
import employeeFunctions from "../api/employeeFunctions";
import "../App.css";

function DisplayMessages({ chat_id }) {
  const [messages, setMessages] = useState([]);
  const [selectedChat, setSelectedChat] = useState(chat_id);
  const auth = useAuth();

  useEffect(() => {
    conversationFunctions
      .getConversationById(auth.auth.accessToken, chat_id)
      .then((messages) => setMessages(messages))
      .catch((error) => console.error("Error fetching messages:", error));
  }, []);

  return (
    <div className="messages-right">
      <div className="message-container">
        {messages &&
          messages.map((message, index) => (
            <div
              key={index}
              className={
                message.message_from == auth.auth.userId
                  ? "message received"
                  : "message sent"
              }
            >
              {message.message}
            </div>
          ))}
      </div>
      <div className="input-container row justify-content-between">
        <input
          className="col-9 message-fields"
          type="text"
          placeholder="Type your message..."
        />
        <button className="col-2 message-fields">Send</button>
      </div>
    </div>
  );
}

export default DisplayMessages;
