import React, { useEffect, useState } from "react";
import customerFunctions from "../api/customerFunctions";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { IoArrowBackOutline } from "react-icons/io5";

function CustomerTable() {
  const auth = useAuth();
  const [customers, setCustomers] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    customerFunctions
      .fetchAllCustomers(auth.auth.accessToken)
      .then((customers) => {
        setCustomers(customers);
      })
      .catch((error) => console.error(error));
  }, []);

  const handle = (cust_id) => {
    navigate(`update/${cust_id}`);
  };

  return (
    <main className="main-container">
      <div className="header-container">
        <div className="main-title">
          <IoArrowBackOutline
            className="back-icon"
            onClick={() => navigate("/main")}
          />
          <h3>Customers</h3>
        </div>
        <div>
          <Link to={"create"}>
            <button className="btn btn-primary">Add Customer</button>
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
              <th scope="col">Phone</th>
              <th scope="col">Email</th>
              <th scope="col">Assigned Agent</th>
              <th scope="col">Lead Customer</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {customers &&
              customers.map((customer) =>
                customer.is_active ? (
                  <tr key={customer.id} onClick={() => handle(customer.id)}>
                    <th scope="row">{customer.id}</th>
                    <td>{customer.first_name}</td>
                    <td>{customer.last_name}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.email}</td>
                    <td>
                      {customer.assigned_agent
                        ? customer.assigned_agent
                        : "Agent not assigned"}
                    </td>
                    <td>{customer.is_lead ? "True" : "False"}</td>
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

export default CustomerTable;
