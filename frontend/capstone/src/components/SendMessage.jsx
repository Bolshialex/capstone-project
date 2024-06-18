import React, { useEffect, useState } from "react";
import employeeFunctions from "../api/employeeFunctions";
import chatFunctions from "../api/chatFunctions";
import conversationFunctions from "../api/conversationFunctions";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";

function SendMessage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [employees, setEmployees] = useState();
  const [formData, setFormData] = useState({
    receiver_id: "",
    sender_id: auth.auth.userId,
  });
  const [message, setMessage] = useState({
    message: "",
  });
  useEffect(() => {
    employeeFunctions
      .fetchAllEmployees(auth.auth.accessToken)
      .then((employees) => {
        setEmployees(employees);
      })
      .catch((error) => console.error(error));
  }, []);

  function handle(e) {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setMessage((prevMessage) => ({
      ...prevMessage,
      [name]: value,
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    chatFunctions
      .createChat(auth.auth.accessToken, formData)
      .then((response) => {
        conversationFunctions
          .sendMessage(auth.auth.accessToken, {
            chat_id: response.insertId,
            message_from: auth.auth.userId,
            message: message.message,
          })
          .then(navigate("/messages"))
          .catch((error) => console.error(error));
      })
      .catch((err) => console.error(err));
  };

  return (
    <main className="main-container">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="main-title">
              <IoArrowBackOutline
                className="back-icon"
                onClick={() => navigate("/messages")}
              />
              <h3>New Message</h3>
              <hr />
            </div>

            <form
              className="file-upload form-container"
              onSubmit={handleSubmit}
            >
              <div className="bg-secondary-soft px-4 py-5 rounded">
                <div className="row g-3">
                  <div className="col-md-12">
                    <label className="form-label custom-label">User</label>
                    <select
                      id="receiver_id"
                      className="form-control"
                      value={formData.receiver_id}
                      onChange={handle}
                      name="receiver_id"
                      required
                    >
                      <option>Choose a user</option>
                      {employees &&
                        employees.map((employee) =>
                          employee.is_active &&
                          employee.id !== auth.auth.userId ? (
                            <option key={employee.id} value={employee.id}>
                              ID: {employee.id} Name: {employee.first_name}{" "}
                              {employee.last_name}
                            </option>
                          ) : null
                        )}
                    </select>
                  </div>

                  <div className="col-md-12">
                    <label className="form-label custom-label">Message</label>
                    <textarea
                      id="message"
                      className="form-control"
                      value={message.message}
                      onChange={handle}
                      name="message"
                      rows="4"
                    />
                  </div>
                </div>
              </div>

              <div className="gap-3 d-md-flex justify-content-md-end text-center">
                <button type="submit" className="btn btn-primary">
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SendMessage;
