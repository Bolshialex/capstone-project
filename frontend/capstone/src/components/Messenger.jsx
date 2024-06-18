import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import chatFunctions from "../api/chatFunctions";
import notificationFunction from "../api/notificationFunction";
import employeeFunctions from "../api/employeeFunctions";
import DisplayMessages from "./DisplayMessages";
import { useNavigate } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";

import "../App.css";

function Messenger() {
  const auth = useAuth();
  const [employees, setEmployees] = useState([]);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [activeButton, setActiveButton] = useState(null);
  const [unreadMessages, setUnreadMessages] = useState([]);
  const navigate = useNavigate();

  const handleClick = (chatId) => {
    setSelectedChat(chatId);
    setActiveButton(chatId);
    setMessageRead(chatId);
  };

  useEffect(() => {
    chatFunctions
      .getChats(auth.auth.accessToken, {
        sender_id: auth.auth.userId,
        receiver_id: auth.auth.userId,
      })
      .then((chats) => setChats(chats))
      .catch((error) => console.error("Error fetching chats:", error));
    employeeFunctions
      .fetchAllEmployees(auth.auth.accessToken)
      .then((employees) => setEmployees(employees))
      .catch((error) => console.error("Error fetching employees:", error));
    notificationFunction
      .getUnreadMessages(auth.auth.accessToken, auth.auth.userId)
      .then((messages) => setUnreadMessages(messages))
      .catch((error) =>
        console.error("Error fetching unread messages:", error)
      );
  }, []);

  const mappedChats = chats.map((chat) => chat.chat_id);

  const handelNewChat = () => {
    navigate("/messages/send");
  };

  function setMessageRead(chat_id) {
    notificationFunction
      .setMessageRead(auth.auth.accessToken, chat_id, auth.auth.userId)
      .then()
      .catch((error) => console.error("Error setting message read:", error));
  }

  return (
    <main className="main-container-message">
      <div className="contacts-left">
        <div className="main-title">
          <IoArrowBackOutline
            className="back-icon"
            onClick={() => navigate("/main")}
          />
          <h3>Messages</h3>
        </div>
        <div>
          <button className="new-chat" onClick={handelNewChat}>
            New Chat
          </button>
        </div>
        <hr />
        {chats &&
          chats.map((chat) => (
            <div key={chat.chat_id}>
              <button
                className={`contact-btn ${
                  activeButton === chat.chat_id ? "contact-btn-active" : ""
                }`}
                onClick={() => handleClick(chat.chat_id)}
              >
                <div className="card-content">
                  <div className="name">
                    {employees
                      .filter(
                        (employee) =>
                          (employee.id === chat.receiver_id ||
                            employee.id === chat.sender_id) &&
                          employee.id !== auth.auth.userId
                      )
                      .map((filteredEmployee) => (
                        <span key={filteredEmployee.id}>
                          {filteredEmployee.first_name}{" "}
                          {filteredEmployee.last_name}
                        </span>
                      ))}
                    {unreadMessages &&
                      unreadMessages.map((message) => {
                        if (
                          message.chat_id == chat.chat_id &&
                          message.unread_message_count > 0
                        ) {
                          return <GoDotFill />;
                        }
                      })}
                  </div>
                </div>
              </button>
            </div>
          ))}
      </div>
      {selectedChat ? (
        <DisplayMessages chat_id={selectedChat} />
      ) : (
        <div className="no-chat">No chat selected...</div>
      )}
    </main>
  );
}

export default Messenger;
