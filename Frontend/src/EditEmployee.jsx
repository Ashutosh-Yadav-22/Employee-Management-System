import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditEmployee() { // Renamed component to EditEmployee
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [designation, setDesignation] = useState("");
  const [loading, setLoading] = useState(true); // For initial data fetch loading
  const [submitting, setSubmitting] = useState(false); // For form submission loading
  const [message, setMessage] = useState(null); // For success/error messages

  const { id } = useParams();
  const navigate = useNavigate();

  const fetchOneDetails = async () => {
    setLoading(true); // Start loading for fetch
    setMessage(null); // Clear previous messages
    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/employee/edit/${id}`
      );
      const employee = response.data.result;
      setFirstName(employee.firstName);
      setLastName(employee.lastName);
      setEmail(employee.email);
      setContact(employee.contact);
      setDesignation(employee.designation);
    } catch (e) {
      console.error("Error fetching employee details:", e);
      setMessage({
        type: "error",
        text: "Failed to load employee details. Please check the ID or try again.",
      });
      // Optionally redirect if employee not found
      // setTimeout(() => navigate('/allemployees'), 2000);
    } finally {
      setLoading(false); // End loading for fetch
    }
  };

  useEffect(() => {
    fetchOneDetails();
  }, [id]); // Add id to dependency array to refetch if ID changes

  const submitHandler = async (e) => {
    e.preventDefault();
    setSubmitting(true); // Start loading for submission
    setMessage(null); // Clear previous messages

    // Basic client-side validation
    if (!firstName || !lastName || !email || !contact || !designation) {
      setMessage({ type: "error", text: "All fields are required!" });
      setSubmitting(false);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage({ type: "error", text: "Please enter a valid email address." });
      setSubmitting(false);
      return;
    }

    try {
      const data = { firstName, lastName, email, contact, designation };
      await axios.put(`http://127.0.0.1:5000/employee/update/${id}`, data);
      setMessage({ type: "success", text: "Employee record updated successfully!" });
      // Redirect after a short delay to allow message to be seen
      setTimeout(() => navigate("/allemployees"), 1500);
    } catch (e) {
      console.error("Error updating employee:", e);
      setMessage({
        type: "error",
        text: "Failed to update employee. " + (e.response?.data?.message || "Please try again."),
      });
    } finally {
      setSubmitting(false); // End loading for submission
    }
  };

  if (loading) {
    return <p className="message">Loading employee details...</p>;
  }

  // If there was an error loading the details initially and no data is set
  if (!loading && message && message.type === "error" && !firstName) {
    return (
      <p className="message error">
        {message.text}
      </p>
    );
  }

  return (
    <>
      <h2 className="form-title">Edit Employee</h2>

      {/* Message Display */}
      {message && (
        <p className={`message ${message.type}`}>
          {message.text}
        </p>
      )}

      <form onSubmit={submitHandler} className="employee-form">
        <table className="form-table">
          <tr>
            <td>First Name</td>
            <td>
              <input
                type="text"
                id="fname"
                name="fname"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={submitting}
                required
              />
            </td>
          </tr>
          <tr>
            <td>Last Name</td>
            <td>
              <input
                type="text"
                id="lname"
                name="lname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={submitting}
                required
              />
            </td>
          </tr>
          <tr>
            <td>Email</td>
            <td>
              <input
                type="email" // Changed type to email
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={submitting}
                required
              />
            </td>
          </tr>
          <tr>
            <td>Contact</td>
            <td>
              <input
                type="text" // Keep as text or change to tel with pattern
                id="contact"
                name="contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                disabled={submitting}
                required
              />
            </td>
          </tr>
          <tr>
            <td>Designation</td>
            <td>
              <input
                type="text"
                id="designation"
                name="designation"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                disabled={submitting}
                required
              />
            </td>
          </tr>
          <tr>
            <td colSpan={2} align="center">
              <input
                type="submit"
                id="submit"
                name="submit"
                value={submitting ? "Updating..." : "Update"}
                disabled={submitting}
              />
            </td>
          </tr>
        </table>
      </form>
    </>
  );
}

export default EditEmployee;