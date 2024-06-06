import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import chatFunctions from "../api/chatFunctions";
import conversationFunctions from "../api/conversationFunctions";
import employeeFunctions from "../api/employeeFunctions";
import DisplayMessages from "./DisplayMessages";
import "../App.css";

function Messenger() {
  const auth = useAuth();
  const [employees, setEmployees] = useState([]);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    chatFunctions
      .getChats(auth.auth.accessToken, {
        sender_id: auth.auth.userId,
        receiver_id: auth.auth.userId,
      })
      .then((chats) => setChats(chats))
      .catch((error) => console.error("Error fetching chats:", error));
  }, []);

  const mappedChats = chats.map((chat) => chat.chat_id);

  useEffect(() => {
    employeeFunctions
      .fetchAllEmployees(auth.auth.accessToken)
      .then((employees) => setEmployees(employees))
      .catch((error) => console.error("Error fetching employees:", error));
  }, []);

  return (
    <main className="main-container-message">
      <div className="contacts-left">
        {chats &&
          chats.map((chat) => (
            <div key={chat.chat_id} className="contacts-card">
              <div
                className="card-content"
                onClick={() => setSelectedChat(chat.chat_id)}
              >
                <div className="name">
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
                  </div>
                </div>
              </div>
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
