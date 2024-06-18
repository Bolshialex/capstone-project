import React, { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import employeeFunctions from "../api/employeeFunctions";
import customerFunctions from "../api/customerFunctions";
import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import DeletePopup from "./DeletePopup";

function UpdateCustomer() {
  const navigate = useNavigate();
  const { id } = useParams();
  const auth = useAuth();
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const [employees, setEmployees] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    assigned_agent: "",
    is_lead: "",
  });

  useEffect(() => {
    employeeFunctions
      .fetchAllEmployees(auth.auth.accessToken)
      .then((employees) => setEmployees(employees))
      .catch((error) => console.error(error));
  }, [auth.auth.accessToken]);

  useEffect(() => {
    customerFunctions
      .fetchAllCustomers(auth.auth.accessToken)
      .then((customers) => setCustomers(customers))
      .catch((error) => console.error(error));
  }, [auth.auth.accessToken]);

  useEffect(() => {
    if (customers.length > 0) {
      const customer = customers.find((customer) => customer.id == id);
      if (customer) {
        setFormData({
          id: customer.id || "",
          first_name: customer.first_name || "",
          last_name: customer.last_name || "",
          phone: customer.phone || "",
          email: customer.email || "",
          assigned_agent: customer.assigned_agent || "",
          is_lead: customer.is_lead ? "1" : "0",
        });
      }
    }
  }, [customers, id]);

  const handle = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    customerFunctions
      .updateCustomer(auth.auth.accessToken, id, formData)
      .then(() => navigate("/customers"))
      .catch((error) => console.error(error));
  };

  function deleteButton(customerId) {
    customerFunctions
      .deleteCustomer(auth.auth.accessToken, customerId)
      .then(() => {
        setCustomers((prevCustomer) =>
          prevCustomer.filter((customer) => customer.id !== customerId)
        );
        navigate("/customers");
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <main className="main-container">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="main-title">
              <IoArrowBackOutline
                className="back-icon"
                onClick={() => navigate("/customers")}
              />
              <h3>Edit Customer Profile</h3>
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
                      value={formData.first_name}
                      name="first_name"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label custom-label">Last Name</label>
                    <input
                      type="text"
                      id="last_name"
                      className="form-control"
                      onChange={handle}
                      value={formData.last_name}
                      name="last_name"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label custom-label">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      onChange={handle}
                      value={formData.email}
                      name="email"
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
                      value={formData.phone}
                      name="phone"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label custom-label">
                      Assigned Agent
                    </label>
                    <select
                      id="assigned_agent"
                      className="form-control"
                      value={formData.assigned_agent}
                      onChange={handle}
                      name="assigned_agent"
                    >
                      <option value="" disabled>
                        Please select an agent
                      </option>
                      {employees &&
                        employees.map((employee, index) =>
                          employee.is_active ? (
                            <option key={employee.id} value={employee.id}>
                              {`ID: ${employee.id}`}
                            </option>
                          ) : null
                        )}
                      <option value="">No Agent Selected</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label custom-label">
                      Lead Customer
                    </label>
                    <select
                      id="is_lead"
                      className="form-control"
                      value={formData.is_lead}
                      onChange={handle}
                      name="is_lead"
                    >
                      <option value="1">True</option>
                      <option value="0">False</option>
                    </select>
                  </div>
                </div>
              </div>{" "}
              <div className="gap-3 d-md-flex justify-content-md-end text-center">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => setShowDeletePopup(true)}
                >
                  Delete Customer
                </button>
                <button type="submit" className="btn btn-primary">
                  Update Customer
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

export default UpdateCustomer;
