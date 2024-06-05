import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import chatFunctions from "../api/chatFunctions";
import conversationFunctions from "../api/conversationFunctions";
import employeeFunctions from "../api/employeeFunctions";
import "../App.css";

function Messenger() {
  const auth = useAuth();
  const [employees, setEmployees] = useState([]);
  const [chats, setChats] = useState([]);
  const [conversation, setConversation] = useState([]);

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
              <div className="card-content">
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
      <div className="messages-right">
        <div className="message-container">
          <div className="message received">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </div>
          <div className="message sent">
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
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
    </main>
  );
}

export default Messenger;
