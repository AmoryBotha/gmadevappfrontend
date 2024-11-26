import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/OwnerLanding.css";

const webID = localStorage.getItem("webIdStore") || "N/A";
const conId = localStorage.getItem("conIdStore") || "N/A";
const mail = localStorage.getItem("usernameStore") || "N/A";

function OwnerLanding1() {
  const navigate = useNavigate();

  // Function to go back to the previous page
  const goBack = () => {
    navigate(-1); // This will take the user back to the previous page in history
  };

  return (
    <div className="owner-landing">
      <header className="header">
        <button className="back-button" onClick={goBack}>
          Back to Previous Page
        </button>
        <h1>Owner Landing Page</h1>
        <h2>Accounts</h2>
      </header>

      <section className="accounts-section">
        <h4>Accounts Linked to Your Account</h4>

        <div className="account-details">
          <div className="account-card">
            <h5>Owner Account Details</h5>
            <p>
              <strong>Account Number:</strong> Test Acc
            </p>
            <p>
              <strong>Reg/ID No:</strong> 645395938
            </p>
            <p>
              <strong>Phone Number:</strong> 09876789980
            </p>
            <p>
              <strong>Email:</strong> {mail}
            </p>
            <Link to="/account" className="button modify-btn">
              Modify
            </Link>
          </div>

          <div className="account-card">
            <h5>Levy Account Details</h5>
            <p>
              <strong>Levy Account:</strong> GMA001
            </p>
            <p>
              <strong>Building:</strong> Test BC
            </p>
            <p>
              <strong>Door Number:</strong> 8
            </p>
            <p>
              <strong>Current Balance:</strong> R 9000,09
            </p>
            <Link to="/statement" className="button download-btn">
              Download Statement
            </Link>
            <Link to="/levyAccounts" className="button edit-btn">
              Edit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default OwnerLanding1;
