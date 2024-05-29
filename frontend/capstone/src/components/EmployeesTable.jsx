import React, { useEffect, useState } from "react";
import employeeFunctions from "../api/employeeFunctions";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import useAuth from "../hooks/useAuth";
import { CiEdit } from "react-icons/ci";

function EmployeesTable() {
  const auth = useAuth();
  const [employees, setEmployees] = useState();

  function deleteButton(employeeId) {
    const confirm = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (confirm) {
      employeeFunctions
        .deleteEmployee(auth.auth.accessToken, employeeId)
        .then(() => {
          setEmployees((prevEmployee) =>
            prevEmployee.filter((employee) => employee.is_active)
          );
        })
        .catch((err) => {
          alert(err);
        });
    }
  }

  useEffect(() => {
    employeeFunctions
      .fetchAllEmployees(auth.auth.accessToken)
      .then((employees) => {
        setEmployees(employees);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>Employees</h3>
      </div>
      <div>
        <Link to={"create"}>
          <button>Add Employee</button>
        </Link>
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
                  <tr key={employee.id}>
                    <th scope="row">{employee.id}</th>
                    <td>{employee.first_name}</td>
                    <td>{employee.last_name}</td>
                    <td>{employee.user_name}</td>
                    <td>{employee.phone}</td>
                    <td>{employee.email}</td>
                    <td>
                      <span>
                        <Link to={`update/${employee.id}`}>
                          <CiEdit className="icon m-2" />
                        </Link>
                        <MdDelete
                          className="icon m-2"
                          onClick={() => deleteButton(employee.id)}
                        />
                      </span>
                    </td>
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
