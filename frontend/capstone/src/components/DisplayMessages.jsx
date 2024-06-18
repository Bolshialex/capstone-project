import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import conversationFunctions from "../api/conversationFunctions";
import io from "socket.io-client";
import "../App.css";

const socket = io("http://localhost:3000", {
  withCredentials: true,
});

function DisplayMessages({ chat_id }) {
  const [messages, setMessages] = useState([]);
  const auth = useAuth();
  const [newMessage, setNewMessage] = useState("");
  const newMessageRef = React.useRef(null);

  useEffect(() => {
    // Get messages
    conversationFunctions
      .getConversationById(auth.auth.accessToken, chat_id)
      .then((messages) => setMessages(messages))
      .catch((error) => console.error("Error fetching messages:", error));

    // Listen for new messages
    socket.on("new-message", (message) => {
      if (message.chat_id === chat_id) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });
    newMessageRef.current.scrollIntoView({ behavior: "smooth" });

    return () => {
      socket.off("new-message");
    };
  }, [chat_id, auth.auth.accessToken, newMessage]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const messageData = {
      chat_id,
      message_from: auth.auth.userId,
      message: newMessage,
    };

    // Send the message to the socket server
    conversationFunctions
      .sendMessage(auth.auth.accessToken, messageData)
      .then(() => {
        console.log("Message sent successfully");

        socket.emit("new-message", messageData);

        // Clear input field
        setNewMessage("");
      })
      .catch((error) => console.error("Error sending message:", error));
  };
  return (
    <div className="messages-right">
      <div className="message-container">
        {messages &&
          messages.map((message, index) => (
            <div key={index}>
              <div
                className={
                  message.message_from === auth.auth.userId
                    ? "message received"
                    : "message sent"
                }
              >
                {message.message}
              </div>
              <div
                className={
                  message.message_from === auth.auth.userId
                    ? "time left"
                    : "time right"
                }
              >
                {new Date(message.timestamp).toLocaleString("en-US", {
                  hour12: true,
                  month: "numeric",
                  day: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          ))}
        <div ref={newMessageRef}></div>
      </div>
      <div className="input-container row justify-content-between">
        <input
          className="col-9 message-fields ms-3"
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button className="col-2 message-fields" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default DisplayMessages;
