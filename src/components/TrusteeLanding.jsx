import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import "../styles/ApprovalsPage.css"; // New CSS for approvals page styling

const approvalsData = {
  active: [
    {
      id: 1,
      subject: "Budget Approval Q1",
      type: "Financial",
      createdDate: "2024-12-01",
    },
    {
      id: 2,
      subject: "Policy Update",
      type: "Administrative",
      createdDate: "2024-12-05",
    },
  ],
  history: [
    {
      id: 3,
      subject: "Project Approval",
      type: "Operational",
      createdDate: "2024-10-15",
      status: "Approved",
    },
    {
      id: 4,
      subject: "Hiring Plan",
      type: "HR",
      createdDate: "2024-10-20",
      status: "Declined",
    },
  ],
};

function TrusteeLanding1() {
  const navigate = useNavigate();
  const [view, setView] = useState("active");
  const [approvals, setApprovals] = useState([]);

  useEffect(() => {
    // Load approvals based on the current view
    switch (view) {
      case "active":
        setApprovals(approvalsData.active);
        break;
      case "history":
        setApprovals(approvalsData.history);
        break;
      default:
        setApprovals([]);
    }
  }, [view]);

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="approvals-container">
      {/* Navbar */}
      <nav className="navbar">
        <button className="nav-button" onClick={handleBackClick}>
          ⬅️ Back
        </button>
        <h1 className="navbar-title">Trustee Dashboard</h1>
        <button className="nav-button" onClick={handleLogout}>
          ❌ Logout
        </button>
      </nav>

      {/* View Selector */}
      <div className="view-selector">
        <button
          className={`view-button ${view === "active" ? "active" : ""}`}
          onClick={() => handleViewChange("active")}
        >
          My Active Approvals
        </button>
        <button
          className={`view-button ${view === "history" ? "active" : ""}`}
          onClick={() => handleViewChange("history")}
        >
          My History
        </button>
      </div>

      {/* Approvals List */}
      <div className="approvals-list">
        {approvals.map((approval) => (
          <div key={approval.id} className="approval-item">
            <h3 className="approval-subject">{approval.subject}</h3>
            <p className="approval-type">Type: {approval.type}</p>
            <p className="approval-date">Created: {approval.createdDate}</p>
            {approval.status && <p className="approval-status">Status: {approval.status}</p>}
            <button
              className="approval-button"
              onClick={() => navigate(`/approval/${approval.id}`)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrusteeLanding1;
//Add the necessary CSS in ApprovalsPage.css for the pastel theme.
//Integrate real API calls to fetch approvals dynamically.
//Ensure routing for View Details to the appropriate approval detail page.