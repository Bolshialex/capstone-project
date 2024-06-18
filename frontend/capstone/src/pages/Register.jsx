import React, { useEffect, useState } from "react";
import registerFunction from "../api/registerFunction";
import "../App.css";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    user_name: "",
    phone: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    setErr("");
  }, []);

  const handle = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isStrongPassword(formData.password)) {
      setErr(
        "Password must contain at least 7 characters, one uppercase letter, one lowercase letter, one number, and one special character"
      );
      return;
    }
    if (formData.password !== formData.repeat_password) {
      setErr("Passwords do not match");
      return;
    }
    registerFunction
      .registerEmployee(formData)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        const status = err.response.status;
        const data = err.response.data;
        if (status === 409) {
          setErr("User already exists. Try another email address.");
        } else {
          setErr("Registration Failed - Please try again.");
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
    <section className="register vh-100 d-flex justify-content-center align-items-center">
      <div className="col-lg-6 col-md-8 col-sm-10">
        <div className="card shadow-lg p-4">
          <div className="card-body">
            <h1 className="text-center mb-5">Register</h1>
            {err && (
              <div className="alert alert-danger text-center" role="alert">
                {err}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label className="form-label custom-label" htmlFor="first_name">
                  First Name
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  className="form-control"
                  value={formData.first_name}
                  onChange={handle}
                  required
                />
              </div>

              <div className="form-group mb-3">
                <label className="form-label custom-label" htmlFor="last_name">
                  Last Name
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  className="form-control"
                  value={formData.last_name}
                  onChange={handle}
                  required
                />
              </div>

              <div className="form-group mb-3">
                <label className="form-label custom-label" htmlFor="user_name">
                  Username
                </label>
                <input
                  type="text"
                  id="user_name"
                  name="user_name"
                  className="form-control"
                  value={formData.user_name}
                  onChange={handle}
                  required
                />
              </div>

              <div className="form-group mb-3">
                <label className="form-label custom-label" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  className="form-control"
                  value={formData.phone}
                  onChange={handle}
                  required
                />
              </div>

              <div className="form-group mb-3">
                <label className="form-label custom-label" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handle}
                  required
                />
              </div>

              <div className="form-group mb-3">
                <label className="form-label custom-label" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handle}
                  required
                />
              </div>

              <div className="form-group mb-4">
                <label
                  className="form-label custom-label"
                  htmlFor="repeat_password"
                >
                  Repeat Password
                </label>
                <input
                  type="password"
                  id="repeat_password"
                  name="repeat_password"
                  className="form-control"
                  value={formData.repeat_password}
                  onChange={handle}
                  required
                />
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-primary btn-block">
                  Register
                </button>
              </div>
            </form>
            <p className="mt-3 ">
              Already have an account?{" "}
              <Link to="/" className="text-primary">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
