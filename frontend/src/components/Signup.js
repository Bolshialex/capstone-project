import React from "react";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <div className="signup template d-flex justify-content-center align-items-center 100-w vh-100 bg-primary ">
      <div className="w-25 p-5 rounded bg-white">
        <form>
          <h3 className="text-center">Sign Up</h3>
          <div className="mb-2">
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              placeholder="Enter First Name"
              className="form-control"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              placeholder="Enter Last Name"
              className="form-control"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="user_name">Username</label>
            <input
              type="text"
              placeholder="Enter Username"
              className="form-control"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              placeholder="Enter Phone Number"
              className="form-control"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control"
            />
          </div>
          <div className="d-grid">
            <button className="btn btn-primary">Sign Up!</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
