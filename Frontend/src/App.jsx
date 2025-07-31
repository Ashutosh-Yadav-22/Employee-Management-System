import React from "react";
import AddEmployee from "./AddEmployee";
import AllEmployees from "./AllEmployees";
import EditEmployee from "./EditEmployee"; // Renamed from UpdateEmployees for consistency
import "./App.css";
import { Link, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className="header">
        <h1>Employee Management System</h1>
        <nav className="main-nav">
          <Link to="/allemployees" className="nav-button">
            All Employees
          </Link>
          <Link to="/addemployee" className="nav-button">
            Add Employee
          </Link>
        </nav>
      </div>
      <div className="content">
        <Routes>
          <Route path="/" element={<AllEmployees />} />
          <Route path="/addemployee" element={<AddEmployee />} />
          <Route path="/allemployees" element={<AllEmployees />} />
          <Route path="/editemployee/:id" element={<EditEmployee />} />
        </Routes>
      </div>
      <div className="footer">
        <h3 align="center">EMS&copy;2025. All Rights Reserved</h3>
      </div>
    </div>
  );
}

export default App;