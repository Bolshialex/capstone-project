import { useState } from "react";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Register from "./pages/Register";
import MainPage from "./pages/MainPage";
import EmployeesPage from "./pages/EmployeesPage";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<SignUp />} />
        <Route path="register" element={<Register />} />
        <Route element={<RequireAuth />}>
          <Route path="main" element={<MainPage />} />
          <Route path="employees" element={<EmployeesPage />} />
        </Route>

        <Route path="*" />
      </Route>
    </Routes>
  );
}

export default App;
