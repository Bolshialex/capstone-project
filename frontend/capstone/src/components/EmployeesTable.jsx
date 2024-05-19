import React, { useEffect, useState } from "react";
import employeeFunctions from "../api/employeeFunctions";
import { useFetcher } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import useAuth from "../hooks/useAuth";
import { CiEdit } from "react-icons/ci";

function EmployeesTable() {
  const auth = useAuth();
  const [employees, setEmployees] = useState();

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
        <h3>EMPLOYEES</h3>
      </div>
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
              employees.map((employee) => (
                <tr>
                  <th scope="row">{employee.id}</th>
                  <td>{employee.first_name}</td>
                  <td>{employee.last_name}</td>
                  <td>{employee.user_name}</td>
                  <td>{employee.phone}</td>
                  <td>{employee.email}</td>
                  <td>
                    <span>
                      <CiEdit className="icon" />
                      <MdDelete className="icon" />
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default EmployeesTable;
