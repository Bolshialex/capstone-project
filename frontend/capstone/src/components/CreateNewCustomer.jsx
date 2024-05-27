import React from "react";
import useAuth from "../hooks/useAuth";
import { useState, useEffect } from "react";
import employeeFunctions from "../api/employeeFunctions";
import customerFunctions from "../api/customerFunctions";
import { useNavigate } from "react-router-dom";

//change to emp profile for admin
// non admin cannot change their profile
function CreateNewCustomer() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [employees, setEmployees] = useState();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    assigned_agent: "",
    is_lead: "",
  });

  function handle(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    customerFunctions
      .createCustomer(auth.auth.accessToken, formData)
      .then(navigate("/customers"))
      .catch((err) => console.error(err));
  };

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
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="my-5">
              <h3>Customer Profile</h3>
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
                          value={formData.first_name}
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
                          value={formData.last_name}
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
                          value={formData.email}
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
                          value={formData.phone}
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
                          value={formData.assigned_agent}
                          required
                          name="assigned_agent"
                        >
                          <option></option>
                          {employees &&
                            employees.map((employee) =>
                              employee.is_active ? (
                                <option
                                  value={employee.id}
                                >{`ID: ${employee.id} Name: ${employee.first_name} ${employee.last_name}`}</option>
                              ) : null
                            )}
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
                          <option></option>
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
                  Create Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CreateNewCustomer;
