import React, { useEffect, useState } from "react";
import employeeFunctions from "../api/employeeFunctions";
import messageFunction from "../api/messageFunction";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function SendMessage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [employees, setEmployees] = useState();
  const [formData, setFormData] = useState({
    receiver_id: "",
    message: "",
    sender_id: auth.auth.userId,
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
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    messageFunction
      .createNewMessage(auth.auth.accessToken, formData)
      .then()
      .catch((err) => console.error(err));
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <h1>New Message</h1>
        <label>User: </label>
        <select
          id="receiver_id"
          className="form-control"
          value={formData.receiver_id}
          onChange={handle}
          name="receiver_id"
        >
          <option>Choose a user</option>
          {employees &&
            employees.map((employee) =>
              employee.is_active ? (
                <option key={employee.id} value={employee.id}>
                  ID: {employee.id} Name: {employee.first_name}{" "}
                  {employee.last_name}
                </option>
              ) : null
            )}
        </select>
        <br />
        <label>Message: </label>
        <textarea
          id="message"
          className="form-control"
          value={formData.message}
          onChange={handle}
          name="message"
        />
        <br />
        <button type="submit">Send</button>
      </form>
    </main>
  );
}

export default SendMessage;
