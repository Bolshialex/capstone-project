import { useState } from "react";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  RouterProvider,
} from "react-router-dom";
import SignUp from "./pages/SignUp";
import Register from "./pages/Register";
import MainPage from "./pages/MainPage";
import EmployeesPage from "./pages/EmployeesPage";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import CustomerPage from "./pages/CustomerPage";
import ProfilePage from "./pages/ProfilePage";
import CreateEmployeePage from "./pages/CreateEmployeePage";
import "./App.css";
import CreateCustomerPage from "./pages/CreateCustomerPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<SignUp />} />
        <Route path="register" element={<Register />} />
        <Route element={<RequireAuth />}>
          <Route path="main" element={<MainPage />} />
          <Route path="employees" element={<EmployeesPage />} />
          <Route path="customers" element={<CustomerPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route
            path="employees/create"
            element={<CreateEmployeePage />}
            exact
          />
          <Route
            path="customers/create"
            element={<CreateCustomerPage />}
            exact
          />
        </Route>

        <Route path="*" />
      </Route>
    </Routes>
  );
}

export default App;
