import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import "../styles/LogTicket.css";

function LogTicket() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    building: "",
    issue: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Ticket submitted:", formData);
    alert("Your ticket has been submitted successfully!");
    setFormData({ name: "", email: "", building: "", issue: "" });
  };

  return (
    <div className="log-ticket-container">
      <nav className="navbar">
        <button className="nav-button" onClick={() => navigate(-1)}>
          ⬅️ Back
        </button>
        <h1 className="navbar-title">Log a Ticket</h1>
      </nav>

      <div className="log-ticket-form-container">
        <h2>Report an Issue</h2>
        <form className="log-ticket-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="building">Building:</label>
            <input
              type="text"
              id="building"
              name="building"
              value={formData.building}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="issue">Issue Description:</label>
            <textarea
              id="issue"
              name="issue"
              value={formData.issue}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-button">
            Submit Ticket
          </button>
        </form>
      </div>
    </div>
  );
}

export default LogTicket;
