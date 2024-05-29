import React, { useEffect, useState } from "react";
import customerFunctions from "../api/customerFunctions";
import { Link } from "react-router-dom";
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

  function deleteButton(customerId) {
    const confirm = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (confirm) {
      customerFunctions
        .deleteCustomer(auth.auth.accessToken, customerId)
        .then(() => {
          setCustomers((prevCustomer) =>
            prevCustomer.filter((customer) => customer.id !== customerId)
          );
        })
        .catch((err) => {
          alert(err);
        });
    }
  }
  return (
    <main className="main-container">
      <div className="main-title">
        <h3>Customers</h3>
      </div>
      <div>
        <Link to={"create"}>
          <button>Add Customer</button>
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
                  <tr key={customer.id}>
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
                    <td>
                      <span>
                        <Link to={`update/${customer.id}`}>
                          <CiEdit className="icon m-2" />
                        </Link>

                        <MdDelete
                          className="icon m-2"
                          onClick={() => deleteButton(customer.id)}
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

export default CustomerTable;
