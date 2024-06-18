import React, { useEffect, useState } from "react";
import employeeFunctions from "../api/employeeFunctions";
import useAuth from "../hooks/useAuth";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";

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
        <div className="card ">
          <div className="card-inner">
            <h3>Customers</h3>
            <BsFillArchiveFill className="card_icon" />
          </div>
          <h1></h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>Employees</h3>
            <BsFillGrid3X3GapFill className="card_icon" />
          </div>
          <h1></h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>Messages</h3>
            <BsPeopleFill className="card_icon" />
          </div>
          <h1></h1>
        </div>
      </div>
    </main>
  );
}

export default Home;
