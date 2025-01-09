import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import "../styles/ApprovalDetails.css";

function ApprovalDetails1() {
  const navigate = useNavigate();
  const location = useLocation();
  const approval = location.state?.approval;

  if (!approval) {
    return <p>No approval details found. Please go back and select an approval.</p>;
  }

  const handleBackClick = () => {
    navigate(-1);
  };

  const otherTrusteesInfo = [
    { name: "Trustee A", decision: "Approved" },
    { name: "Trustee B", decision: "Declined" },
    { name: "Trustee C", decision: "Abstained" },
  ];

  const counts = {
    approvalCount: 2,
    declineCount: 1,
    abstainCount: 1,
    requiredApprovalCount: 3,
  };

  return (
    <div className="approval-details-container">
      <nav className="navbar">
        <button className="nav-button" onClick={handleBackClick}>
          ⬅️ Back
        </button>
        <h1 className="navbar-title">Approval Details</h1>
      </nav>

      <div className="approval-top-section">
        <h2>{approval.building}</h2>
        <p className="approval-status">
          Status: <strong>{approval.status || "Pending"}</strong>
        </p>
      </div>

      <div className="approval-content">
        <div className="approval-user-section">
          <h3>Your Details</h3>
          <p><strong>Subject:</strong> {approval.subject}</p>
          <p><strong>Type:</strong> {approval.type}</p>
          <p><strong>Created Date:</strong> {approval.createdDate}</p>
          <p>
            <strong>Your Decision:</strong> {approval.status || "Not yet decided"}
          </p>
          {approval.status && (
            <p><strong>Decision Date:</strong> {approval.decisionDate || "Unknown"}</p>
          )}
        </div>

        <div className="approval-other-section">
          <h3>Other Details</h3>
          <p><strong>Approval Count:</strong> {counts.approvalCount}</p>
          <p><strong>Decline Count:</strong> {counts.declineCount}</p>
          <p><strong>Abstain Count:</strong> {counts.abstainCount}</p>
          <p><strong>Required Approval Count:</strong> {counts.requiredApprovalCount}</p>

          <h4>Trustee Decisions</h4>
          <ul>
            {otherTrusteesInfo.map((trustee, index) => (
              <li key={index}>
                {trustee.name}: <strong>{trustee.decision}</strong>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ApprovalDetails1;
