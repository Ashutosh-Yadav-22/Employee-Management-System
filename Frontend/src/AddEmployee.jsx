import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Don't forget to import this!

function AddEmployee() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [designation, setDesignation] = useState("");
  const [loading, setLoading] = useState(false); // For form submission loading state
  const [message, setMessage] = useState(null); // For success/error messages

  const navigate = useNavigate(); // Initialize navigate

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setContact("");
    setDesignation("");
    setMessage(null); // Clear messages on reset
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setMessage(null); // Clear previous messages

    // Basic client-side validation
    if (!firstName || !lastName || !email || !contact || !designation) {
      setMessage({ type: "error", text: "All fields are required!" });
      setLoading(false);
      return;
    }
    // Simple email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage({ type: "error", text: "Please enter a valid email address." });
      setLoading(false);
      return;
    }

    try {
      const data = { firstName, lastName, email, contact, designation };
      await axios.post("http://127.0.0.1:5000/employee/store", data);

      setMessage({ type: "success", text: "New Employee Added Successfully!" });
      resetForm();
      // Optional: Redirect to all employees after a short delay
      setTimeout(() => navigate('/allemployees'), 1500);
    } catch (error) {
      console.error("Error adding employee:", error);
      setMessage({
        type: "error",
        text: "Failed to add employee. " + (error.response?.data?.message || "Please try again."),
      });
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <>
      <h2 className="form-title">Add New Employee</h2>

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
                disabled={loading}
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
                disabled={loading}
                required
              />
            </td>
          </tr>
          <tr>
            <td>Email</td>
            <td>
              <input
                type="email" // Changed type to email for browser validation
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
              />
            </td>
          </tr>
          <tr>
            <td>Contact</td>
            <td>
              <input
                type="text" // Keep as text for now, but consider type="tel" with pattern for phone numbers
                id="contact"
                name="contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                disabled={loading}
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
                disabled={loading}
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
                value={loading ? "Adding..." : "Submit"}
                disabled={loading}
              />
            </td>
          </tr>
        </table>
      </form>
    </>
  );
}

export default AddEmployee;