import { useState } from "react";

import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import Register from "./components/Register";
import MainPage from "./components/MainPage";
import PrivateRoutes from "./utils/PrivateRoutes";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
