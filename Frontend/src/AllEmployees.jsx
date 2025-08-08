import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

function AllEmployees() {
  const [employees, setEmployees] = useState([]); // Renamed from 'result' for clarity
  const [loading, setLoading] = useState(true); // For initial data fetch loading
  const [error, setError] = useState(null); // For fetch errors
  const [deleteStatus, setDeleteStatus] = useState(null); // For delete success/error messages

  const fetchAllEmployees = async () => {
    setLoading(true); // Start loading
    setError(null); // Clear previous errors
    setDeleteStatus(null); // Clear any previous delete messages
    try {
      const response = await axios.get("http://127.0.0.1:5000/employee/all");
      setEmployees(response.data.result || []); // Ensure it's an array
    } catch (e) {
      console.error("Error fetching employees:", e);
      setError("Failed to load employees. Please try again later.");
    } finally {
      setLoading(false); // End loading
    }
  };

  const deleteRecord = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      setDeleteStatus(null); // Clear previous delete messages
      try {
        await axios.delete(`http://127.0.0.1:5000/employee/delete/${id}`);
        setDeleteStatus({ type: "success", text: "Employee deleted successfully!" });
        fetchAllEmployees(); // Re-fetch to update the list
      } catch (e) {
        console.error("Error deleting employee:", e);
        setDeleteStatus({
          type: "error",
          text: "Failed to delete employee. " + (e.response?.data?.message || "Please try again."),
        });
      }
    }
  };

  useEffect(() => {
    fetchAllEmployees();
  }, []);

  if (loading) {
    return <p className="message">Loading employees...</p>;
  }

  if (error) {
    return <p className="message error">{error}</p>;
  }

  if (employees.length === 0) {
    return <p className="message">No employees found. Add some new employees!</p>;
  }

  return (
    <>
      <h2 className="form-title">All Employees</h2>

      {deleteStatus && (
        <p className={`message ${deleteStatus.type}`}>
          {deleteStatus.text}
        </p>
      )}

      <table className="data-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Designation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((row) => (
            <tr key={row._id}>
              <td>{row._id}</td>
              <td>{row.firstName}</td>
              <td>{row.lastName}</td>
              <td>{row.email}</td>
              <td>{row.contact}</td>
              <td>{row.designation}</td>
              <td>
                <Link to={`/editemployee/${row._id}`} className="action-button edit-button">
                  Edit
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    deleteRecord(row._id);
                  }}
                  className="action-button delete-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default AllEmployees;