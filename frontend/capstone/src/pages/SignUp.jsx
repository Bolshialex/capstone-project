import React, { useState, useRef, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import axios from "axios";

const API_URL = "http://localhost:3000";
import "../App.css";

function SignUp() {
  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userRef = useRef();
  const errRef = useRef();

  const [err, setErr] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErr("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      //await loginFunction.login(email, password);

      const accessToken = response?.data?.token;
      const admin = response?.data?.is_admin;
      const userId = response?.data?.id;
      setAuth({ email, admin, accessToken, userId });
      //setCookie("accessToken", accessToken, 1);
      setEmail("");
      setPassword("");
      navigate("/main");
    } catch (error) {
      if (!error?.response) {
        setErr("No Server Response");
      } else if (error.response?.status === 400) {
        setErr("Incorrect Email or Password");
      } else {
        setErr("Login Failed");
      }
    }
  };

  return (
    <section className="sign-up vh-100">
      <div className="h-custom card p-5 shadow">
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
                {err == "" ? (
                  <div></div>
                ) : (
                  <div className="card text-center p-2 bg-danger text-white ">
                    {err}
                  </div>
                )}
                <label className="form-label" htmlFor="form3Example3">
                  Email address
                </label>
                <input
                  type="email"
                  ref={userRef}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="form3Example3"
                  className="form-control form-control-lg"
                  placeholder="Enter a valid email address"
                  autoComplete="off"
                  required
                />
              </div>

              <div data-mdb-input-init className="form-outline mb-3">
                <label className="form-label" htmlFor="form3Example4">
                  Password
                </label>
                <input
                  type="password"
                  id="form3Example4"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control form-control-lg"
                  placeholder="Enter password"
                  required
                />
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
              </div>
            </form>
            <p className="small fw-bold mt-2 pt-1 mb-0">
              Don't have an account?{" "}
              <Link to={"/register"} className="link-danger">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
