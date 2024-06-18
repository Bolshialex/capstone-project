import React, { useEffect, useState } from "react";
import employeeFunctions from "../api/employeeFunctions";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { IoArrowBackOutline } from "react-icons/io5";
import RestrictionPopup from "./RestrictionPopup";

function EmployeesTable() {
  const auth = useAuth();
  const [employees, setEmployees] = useState();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (auth.auth.admin == false) setShowPopup(true);
    else setShowPopup(false);
    employeeFunctions
      .fetchAllEmployees(auth.auth.accessToken)
      .then((employees) => {
        setEmployees(employees);
      })
      .catch((error) => console.error(error));
  }, [auth.auth.admin]);

  const handle = (emp_id) => {
    navigate(`update/${emp_id}`);
  };

  return showPopup ? (
    <RestrictionPopup trigger={showPopup}>
      <div>
        <button
          className="btn btn-primary popup-btn"
          onClick={() => navigate("/main")}
        >
          Return to Dashboard
        </button>
        <button
          className="btn btn-primary popup-btn"
          onClick={() => navigate("/messages")}
        >
          Go to Messages
        </button>
      </div>
    </RestrictionPopup>
  ) : (
    <main className="main-container">
      <div className="header-container">
        <div className="main-title">
          <IoArrowBackOutline
            className="back-icon"
            onClick={() => navigate("/main")}
          />
          <h3>Employees</h3>
        </div>
        <div>
          <Link to={"create"}>
            <button className="btn btn-primary">Add Employee</button>
          </Link>
        </div>
      </div>
      <hr />
      <div className="table-wrapper">
        <table className="my-table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Username</th>
              <th scope="col">Phone</th>
              <th scope="col">Email</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {employees &&
              employees.map((employee) =>
                employee.is_active ? (
                  <tr key={employee.id} onClick={() => handle(employee.id)}>
                    <th scope="row">{employee.id}</th>
                    <td>{employee.first_name}</td>
                    <td>{employee.last_name}</td>
                    <td>{employee.user_name}</td>
                    <td>{employee.phone}</td>
                    <td>{employee.email}</td>
                    <td></td>
                  </tr>
                ) : null
              )}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default EmployeesTable;
