import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "../App.css";
import loginFunction from "../api/auth/loginFunction";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginFunction.login(email, password);
    } catch (error) {
      console.log(error);
      alert("login unsuccessful");
    }
  };

  return (
    <section className="sign-up vh-100">
      <div className="h-custom card p-5 ">
        <div className="row d-flex  m-auto justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
              Login
            </p>
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Sample image"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={handleSubmit}>
              <div data-mdb-input-init className="form-outline mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="form3Example3"
                  className="form-control form-control-lg"
                  placeholder="Enter a valid email address"
                />
                <label className="form-label" htmlFor="form3Example3">
                  Email address
                </label>
              </div>

              <div data-mdb-input-init className="form-outline mb-3">
                <input
                  type="password"
                  id="form3Example4"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control form-control-lg"
                  placeholder="Enter password"
                />
                <label className="form-label" htmlFor="form3Example4">
                  Password
                </label>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <a href="#!" className="text-body">
                  Forgot password?
                </a>
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="submit"
                  data-mdb-button-init
                  data-mdb-ripple-init
                  className="btn btn-primary btn-lg"
                >
                  Login
                </button>

                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Don't have an account?{" "}
                  <Link to={"/register"} className="link-danger">
                    Register
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
