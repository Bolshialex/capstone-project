import React from "react";
import useAuth from "../hooks/useAuth";
import { useState, useEffect } from "react";
import employeeFunctions from "../api/employeeFunctions";
import customerFunctions from "../api/customerFunctions";
import { useNavigate, useParams } from "react-router-dom";

function UpdateCustomer() {
  const navigate = useNavigate();
  const { id } = useParams();
  const auth = useAuth();

  const [employees, setEmployees] = useState();
  const [customers, setCustomers] = useState();

  useEffect(() => {
    employeeFunctions
      .fetchAllEmployees(auth.auth.accessToken)
      .then((employees) => {
        setEmployees(employees);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    customerFunctions
      .fetchAllCustomers(auth.auth.accessToken)
      .then((customers) => {
        setCustomers(customers);
      })
      .catch((error) => console.error(error));
  }, []);

  const customer = customers?.find((customer) => customer.id == id);

  const oldCustomer = { ...customer };

  const [formData, setFormData] = useState({
    first_name: oldCustomer.first_name,
    last_name: oldCustomer.last_name,
    phone: oldCustomer.phone,
    email: oldCustomer.email,
    assigned_agent: oldCustomer.assigned_agent,
    is_lead: oldCustomer.is_lead,
  });

  function handle(e) {
    const newFormData = { ...formData };

    newFormData[e.target.id] = e.target.value;

    setFormData(newFormData);
  }

  function handleSubmit(e) {
    e.preventDefault();
    customerFunctions
      .updateCustomer(auth.auth.accessToken, id, formData)
      .then(navigate("/customers"))
      .catch((error) => console.error(err));
  }

  return (
    <main className="main-container">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="my-5">
              <h3>Edit Customer Profile</h3>
              <hr />
            </div>

            <form className="file-upload" onSubmit={handleSubmit}>
              <div className="row mb-5 gx-5">
                <div className="col-xxl-8 mb-5 mb-xxl-0">
                  <div className="bg-secondary-soft px-4 py-5 rounded">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">First Name</label>
                        <input
                          type="text"
                          id="first_name"
                          className="form-control"
                          placeholder="First Name"
                          onChange={(e) => handle(e)}
                          value={oldCustomer.first_name}
                          required
                          name="first_name"
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">Last Name</label>
                        <input
                          type="text"
                          id="last_name"
                          className="form-control"
                          placeholder="Last Name"
                          onChange={(e) => handle(e)}
                          value={oldCustomer.last_name}
                          required
                          name="last_name"
                        />
                      </div>

                      <div className="col-md-6">
                        <label for="inputEmail4" className="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="form-control"
                          placeholder="Email"
                          onChange={(e) => handle(e)}
                          value={oldCustomer.email}
                          required
                          name="email"
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">Phone number</label>
                        <input
                          type="text"
                          id="phone"
                          className="form-control"
                          placeholder="Phone"
                          onChange={(e) => handle(e)}
                          value={oldCustomer.phone}
                          required
                          name="phone"
                        />
                      </div>

                      <div className="col-md-6">
                        <label for="inputEmail4" className="form-label">
                          Assigned Agent
                        </label>
                        <select
                          id="assigned_agent"
                          className="form-control"
                          placeholder="Assigned Agent"
                          onChange={(e) => handle(e)}
                          required
                          name="assigned_agent"
                        >
                          <option disabled selected>
                            Please select an agent (current agent highlighted)
                          </option>
                          {employees &&
                            employees.map((employee) =>
                              employee.is_active ? (
                                <option
                                  key={employee.id}
                                  value={employee.id}
                                  style={
                                    employee.id == oldCustomer.assigned_agent
                                      ? { backgroundColor: "yellow" }
                                      : {}
                                  }
                                >{`ID: ${employee.id}`}</option>
                              ) : null
                            )}
                          <option
                            style={
                              oldCustomer.assigned_agent == null
                                ? { backgroundColor: "yellow" }
                                : {}
                            }
                            value={-1}
                          >
                            No Agent Selected
                          </option>
                        </select>
                      </div>

                      <div className="col-md-6">
                        <label for="inputEmail4" className="form-label">
                          Lead Customer
                        </label>
                        <select
                          id="is_lead"
                          className="form-control"
                          placeholder="Lead Customer"
                          onChange={(e) => handle(e)}
                          value={formData.is_lead}
                          required
                          name="is_lead"
                        >
                          {oldCustomer.is_lead ? (
                            <option disabled selected>
                              True
                            </option>
                          ) : (
                            <option disabled selected>
                              False
                            </option>
                          )}
                          <option value="1">True</option>
                          <option value="0">False</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="gap-3 d-md-flex justify-content-md-end text-center">
                <button type="submit" className="btn btn-primary ">
                  Update Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default UpdateCustomer;
