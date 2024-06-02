import React, { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import employeeFunctions from "../api/employeeFunctions";
import { useNavigate, useParams } from "react-router-dom";

function UpdateEmployee() {
  const navigate = useNavigate();
  const { id } = useParams();
  const auth = useAuth();

  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    user_name: "",
    phone: "",
    email: "",
    is_admin: "",
  });

  useEffect(() => {
    employeeFunctions
      .fetchAllEmployees(auth.auth.accessToken)
      .then((employees) => setEmployees(employees))
      .catch((error) => console.log(error));
  }, [auth.auth.accessToken]);

  useEffect(() => {
    if (employees.length > 0) {
      const employee = employees.find((employee) => employee.id == id);
      if (employee) {
        setFormData({
          first_name: employee.first_name || "",
          last_name: employee.last_name || "",
          user_name: employee.user_name || "",
          phone: employee.phone || "",
          email: employee.email || "",
          is_admin: employee.is_admin ? "1" : "0",
        });
      }
    }
  }, [employees, id]);

  const handle = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    employeeFunctions
      .updateEmployee(auth.auth.accessToken, id, formData)
      .then(() => navigate("/employees"))
      .catch((error) => console.error(error));
  };

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
                          onChange={handle}
                          placeholder="First Name"
                          value={formData.first_name}
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">Last Name</label>
                        <input
                          type="text"
                          id="last_name"
                          className="form-control"
                          onChange={handle}
                          placeholder="Last Name"
                          value={formData.last_name}
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          id="email"
                          className="form-control"
                          onChange={handle}
                          placeholder="Email"
                          value={formData.email}
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">Phone number</label>
                        <input
                          type="text"
                          id="phone"
                          className="form-control"
                          onChange={handle}
                          placeholder="Phone"
                          value={formData.phone}
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">Username</label>
                        <input
                          type="text"
                          id="user_name"
                          className="form-control"
                          onChange={handle}
                          placeholder="Username"
                          value={formData.user_name}
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">Admin</label>
                        <select
                          id="is_admin"
                          className="form-control"
                          value={formData.is_admin}
                          onChange={handle}
                        >
                          <option value="1">True</option>
                          <option value="0">False</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="gap-3 d-md-flex justify-content-md-end text-center">
                <button type="submit" className="btn btn-primary">
                  Update Employee
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
