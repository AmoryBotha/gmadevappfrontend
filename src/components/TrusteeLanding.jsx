import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import "../styles/ApprovalsPage.css"; // CSS for approvals page styling

const approvalsData = {
  active: [
    {
      id: 1,
      subject: "Budget Approval Q1",
      type: "Financial",
      createdDate: "2024-12-01",
      building: "Building A",
    },
    {
      id: 2,
      subject: "Policy Update",
      type: "Administrative",
      createdDate: "2024-12-05",
      building: "Building B",
    },
  ],
  history: [],
  approved: [],
  declined: [],
  abstained: [],
};

function TrusteeLanding1() {
  const navigate = useNavigate();
  const [view, setView] = useState("active");
  const [approvals, setApprovals] = useState([]);

  useEffect(() => {
    // Load approvals based on the current view
    setApprovals(approvalsData[view]);
  }, [view]);

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const handleAction = (approvalId, action) => {
    // Find the approval
    const approval = approvalsData.active.find((item) => item.id === approvalId);
    if (!approval) return;

    // Remove from active approvals
    approvalsData.active = approvalsData.active.filter((item) => item.id !== approvalId);

    // Add to appropriate history
    approval.status = action;
    approvalsData.history.push(approval);
    approvalsData[action].push(approval);

    // Refresh the view
    setApprovals(approvalsData[view]);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const groupedApprovals = approvals.reduce((groups, approval) => {
    const { building } = approval;
    if (!groups[building]) {
      groups[building] = [];
    }
    groups[building].push(approval);
    return groups;
  }, {});

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
        <button
          className={`view-button ${view === "approved" ? "active" : ""}`}
          onClick={() => handleViewChange("approved")}
        >
          My Approved
        </button>
        <button
          className={`view-button ${view === "declined" ? "active" : ""}`}
          onClick={() => handleViewChange("declined")}
        >
          My Declined
        </button>
        <button
          className={`view-button ${view === "abstained" ? "active" : ""}`}
          onClick={() => handleViewChange("abstained")}
        >
          My Abstained
        </button>
      </div>

      {/* Approvals List */}
      <div className="approvals-list">
        {Object.entries(groupedApprovals).map(([building, buildingApprovals]) => (
          <div key={building} className="building-section">
            <h2>{building}</h2>
            {buildingApprovals.map((approval) => (
              <div key={approval.id} className="approval-item">
                <h3 className="approval-subject">{approval.subject}</h3>
                <p className="approval-type">Type: {approval.type}</p>
                <p className="approval-date">Created: {approval.createdDate}</p>
                {view === "active" && (
                  <>
                    <a href="#" className="approval-link">File Link</a>
                    <button
                      className="approval-button approve"
                      onClick={() => handleAction(approval.id, "approved")}
                    >
                      Approve
                    </button>
                    <button
                      className="approval-button decline"
                      onClick={() => handleAction(approval.id, "declined")}
                    >
                      Decline
                    </button>
                    <button
                      className="approval-button abstain"
                      onClick={() => handleAction(approval.id, "abstained")}
                    >
                      Abstain
                    </button>
                  </>
                )}
                {approval.status && <p className="approval-status">Status: {approval.status}</p>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrusteeLanding1;
