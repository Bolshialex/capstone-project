import React, { useEffect, useState } from "react";
import customerFunctions from "../api/customerFunctions";
import { useFetcher } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import useAuth from "../hooks/useAuth";
import { CiEdit } from "react-icons/ci";

function CustomerTable() {
  const auth = useAuth();
  const [customers, setCustomers] = useState();

  useEffect(() => {
    customerFunctions
      .fetchAllCustomers(auth.auth.accessToken)
      .then((customers) => {
        setCustomers(customers);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <main className="main-container">
      <div className="main-title">
        <h3>Customers</h3>
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
            {customers &&
              customers.map((customer) => (
                <tr>
                  <th scope="row">{customer.id}</th>
                  <td>{customer.first_name}</td>
                  <td>{customer.last_name}</td>
                  <td>{customer.user_name}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.email}</td>
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

export default CustomerTable;
