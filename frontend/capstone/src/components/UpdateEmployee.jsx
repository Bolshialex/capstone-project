import React, { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import employeeFunctions from "../api/employeeFunctions";
import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import DeletePopup from "./DeletePopup";
import RestrictionPopup from "./RestrictionPopup";

function UpdateEmployee() {
  const navigate = useNavigate();
  const { id } = useParams();
  const auth = useAuth();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

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
    if (auth.auth.admin == false) setShowPopup(true);
    else setShowPopup(false);

    if (employees.length > 0) {
      const employee = employees.find((employee) => employee.id == id);
      if (employee) {
        setFormData({
          id: employee.id || "",
          first_name: employee.first_name || "",
          last_name: employee.last_name || "",
          user_name: employee.user_name || "",
          phone: employee.phone || "",
          email: employee.email || "",
          is_admin: employee.is_admin ? "1" : "0",
        });
      }
    }
  }, [employees, id, auth.auth.admin]);

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

  function deleteButton(employeeId) {
    employeeFunctions
      .deleteEmployee(auth.auth.accessToken, employeeId)
      .then(() => {
        setEmployees((prevEmployee) =>
          prevEmployee.filter((employee) => employee.is_active)
        );
        navigate("/employees");
      })
      .catch((err) => {
        alert(err);
      });
  }

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
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="main-title">
              <IoArrowBackOutline
                className="back-icon"
                onClick={() => navigate("/employees")}
              />
              <h3>Edit Employee Profile</h3>
              <hr />
            </div>

            <form
              className="file-upload form-container"
              onSubmit={handleSubmit}
            >
              <div className="bg-secondary-soft px-4 py-5 rounded">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label custom-label">
                      First Name
                    </label>
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
                    <label className="form-label custom-label">Last Name</label>
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
                    <label className="form-label custom-label">Email</label>
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
                    <label className="form-label custom-label">
                      Phone number
                    </label>
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
                    <label className="form-label custom-label">Username</label>
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
                    <label className="form-label custom-label">Admin</label>
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
              <div className="gap-3 d-md-flex justify-content-md-end text-center">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {
                    setShowDeletePopup(true);
                  }}
                >
                  Delete Employee
                </button>
                <button type="submit" className="btn btn-primary">
                  Update Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <DeletePopup trigger={showDeletePopup}>
        <button
          className="btn btn-danger popup-btn"
          onClick={() => deleteButton(formData.id)}
        >
          Yes
        </button>
        <button
          className="btn btn-primary popup-btn"
          onClick={() => setShowDeletePopup(false)}
        >
          No
        </button>
      </DeletePopup>
    </main>
  );
}

export default UpdateEmployee;
