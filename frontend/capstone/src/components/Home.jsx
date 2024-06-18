import React, { useEffect, useState } from "react";
import employeeFunctions from "../api/employeeFunctions";
import useAuth from "../hooks/useAuth";
import { FaPeopleArrows } from "react-icons/fa";
import { BsPeopleFill } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { Link } from "react-router-dom";

function Home() {
  const auth = useAuth();
  const [employee, setEmployee] = useState({});

  useEffect(() => {
    employeeFunctions
      .fetchEmployeeById(auth.auth.accessToken, auth.auth.userId)
      .then((employee) => setEmployee(employee))
      .catch((error) => console.error(error));
  }, []);

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>Welcome, {employee.first_name}</h3>
      </div>

      <div className="main-cards">
        <Link className="sidebar-link" to={"/customers"}>
          <div className="card ">
            <div className="card-inner">
              <h3>Customers</h3>
              <FaPeopleArrows className="card_icon" />
            </div>
            <h1></h1>
          </div>
        </Link>
        <Link className="sidebar-link" to={"/employees"}>
          <div className="card">
            <div className="card-inner">
              <h3>Employees</h3>
              <BsPeopleFill className="card_icon" />
            </div>
            <h1></h1>
          </div>
        </Link>
        <Link className="sidebar-link" to={"/messages"}>
          <div className="card">
            <div className="card-inner">
              <h3>Messages</h3>
              <AiOutlineMail className="card_icon" />
            </div>
            <h1></h1>
          </div>
        </Link>
      </div>
    </main>
  );
}

export default Home;
