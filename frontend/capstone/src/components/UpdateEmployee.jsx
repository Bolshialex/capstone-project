import React from "react";
import useAuth from "../hooks/useAuth";
import { useState, useEffect } from "react";
import employeeFunctions from "../api/employeeFunctions";
import { useNavigate, useParams } from "react-router-dom";

function UpdateEmployee() {
  const navigate = useNavigate();
  const { id } = useParams();
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

  const employee = employees?.find((employee) => employee.id == id);
  const oldEmployee = { ...employee };
  const [formData, setFormData] = useState({
    first_name: oldEmployee.first_name,
    last_name: oldEmployee.last_name,
    phone: oldEmployee.phone,
    email: oldEmployee.email,
  });

  function handle(e) {
    const newFormData = { ...formData };
    newFormData[e.target.id] = e.target.value;
    setFormData(newFormData);
  }

  function handleSubmit(e) {
    e.preventDefault();
    employeeFunctions
      .updateEmployee(auth.auth.accessToken, id, formData)
      .then(navigate("/customers"))
      .catch((error) => console.error(err));
  }

  return (
    <main className="main-container">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="my-5">
              <h3>Edit Employee Profile</h3>
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
                          value={oldEmployee.first_name}
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
                          value={oldEmployee.last_name}
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
                          value={oldEmployee.email}
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
                          value={oldEmployee.phone}
                          required
                          name="phone"
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">Username</label>
                        <input
                          type="text"
                          name="user_name"
                          className="form-control"
                          placeholder="user_name"
                          value={oldEmployee.user_name}
                          onChange={(e) => handle(e)}
                          id="user_name"
                          required
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">Admin</label>
                        <select
                          name="is_admin"
                          className="form-control"
                          value={oldEmployee.is_admin}
                          onChange={(e) => handle(e)}
                          id="is_admin"
                          required
                        >
                          {oldEmployee.is_admin ? (
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

export default UpdateEmployee;
