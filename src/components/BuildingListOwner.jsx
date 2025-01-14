import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import "../styles/Buildings.css";

function Buildings() {
  const navigate = useNavigate();

  const buildings = [
    {
      name: "Greenwood Apartments",
      address: "123 Forest Lane, Springfield",
    },
    {
      name: "Maple Heights",
      address: "456 Maple Street, Springfield",
    },
    {
      name: "Oak Ridge Condos",
      address: "789 Oak Avenue, Springfield",
    },
  ];

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="buildings-container">
      <nav className="navbar">
        <button className="nav-button" onClick={() => navigate(-1)}>
          ⬅️ Back
        </button>
        <h1 className="navbar-title">Buildings</h1>
      </nav>

      <div className="buildings-list">
        {buildings.map((building, index) => (
          <div className="building-card" key={index}>
            <h2>{building.name}</h2>
            <p><strong>Address:</strong> {building.address}</p>
            <div className="building-actions">
              <button
                className="action-button view-payments"
                onClick={() => handleNavigate("/payments")}
              >
                View Payments
              </button>
              <button
                className="action-button view-tasks"
                onClick={() => handleNavigate("/publicTasks")}
              >
                View Public Tasks
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Buildings;
