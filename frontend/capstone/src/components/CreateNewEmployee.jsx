import React, { useState } from "react";
import employeeFunctions from "../api/employeeFunctions";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";

//change to emp profile for admin
// non admin cannot change their profile
//fix creating a employee that has an email already
function CreateNewEmployee() {
  const navigate = useNavigate();
  const [err, setErr] = useState(null);
  const auth = useAuth();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    user_name: "",
    phone: "",
    email: "",
    is_admin: "",
    password: "",
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
    setErr(null);
    if (!isStrongPassword(formData.password)) {
      setErr(
        "Password must contain at least 7 characters, one uppercase letter, one lowercase letter, one number, and one special character"
      );
      return;
    }
    employeeFunctions
      .createNewEmployee(auth.auth.accessToken, formData)
      .then(() => navigate("/employees"))
      .catch((err) => {
        if (err.response && err.response.status === 409) {
          setErr("Employee already exists");
        } else {
          console.error(err);
        }
      });
  };

  //checks if the password is strong
  const isStrongPassword = (password) => {
    const minLength = 7;
    //regex
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);

    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      hasSpecial
    );
  };

  return (
    <main className="main-container">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="main-title">
              <IoArrowBackOutline
                className="back-icon"
                onClick={() => navigate("/employees")}
              />

              <h3>Employee Profile</h3>
              <hr />
            </div>
            {err && (
              <div className="alert alert-danger text-center" role="alert">
                {err}
              </div>
            )}
            <form
              className="file-upload form-container"
              onSubmit={handleSubmit}
            >
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
                      name="last_name"
                      className="form-control"
                      placeholder="Last Name"
                      value={formData.last_name}
                      onChange={(e) => handle(e)}
                      id="last_name"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) => handle(e)}
                      id="email"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Phone number</label>
                    <input
                      type="text"
                      name="phone"
                      className="form-control"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) => handle(e)}
                      id="phone"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Username</label>
                    <input
                      type="text"
                      name="user_name"
                      className="form-control"
                      placeholder="user_name"
                      value={formData.user_name}
                      onChange={(e) => handle(e)}
                      id="user_name"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Password</label>
                    <input
                      type="text"
                      name="password"
                      className="form-control"
                      placeholder="Password"
                      value={formData.password}
                      onChange={(e) => handle(e)}
                      id="password"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Admin</label>
                    <select
                      name="is_admin"
                      className="form-control"
                      value={formData.is_admin}
                      onChange={(e) => handle(e)}
                      id="is_admin"
                      required
                    >
                      <option></option>
                      <option value="1">True</option>
                      <option value="0">False</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="gap-3 d-md-flex justify-content-md-end text-center">
                <button type="submit" className="btn btn-primary ">
                  Create Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CreateNewEmployee;
