import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css"; // Importing the Navbar styles

function AccDetailsViewFunc() {
  const [formData, setFormData] = useState({
    accountName: "",
    email: "",
    mobileNumber: "",
    idReg: "",
    billingAddress1: "",
    billingAddress2: "",
    billingAddress3: "",
  });

  useEffect(() => {
    async function getAccInfo() {
      try {
        const accountID = localStorage.getItem("conIdStore") || "defaultID";
        const resp = await fetch(
          "https://prod-91.westeurope.logic.azure.com:443/workflows/4e1c017f70d748bb9a1fefbfbfad48bf/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=a9p6TXKcwsjITmZyWkkLybBeTOgg0ddf976m69dZE-0",
          {
            method: "POST",
            body: JSON.stringify({
              Type: "AccInfo",
              End: "end",
              ID: accountID,
            }),
          }
        );

        const data = await resp.json();
        setFormData({
          accountName: data.AccountName || "",
          email: data.Email || "",
          mobileNumber: data.MainPhone || "",
          idReg: data.ID || "",
          billingAddress1: data.AddressLine1 || "",
          billingAddress2: data.AddressLine2 || "",
          billingAddress3: data.AddressLine3 || "",
        });
      } catch (error) {
        console.error("Error fetching account information:", error);
      }
    }

    getAccInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch(
        "https://prod-91.westeurope.logic.azure.com:443/workflows/4e1c017f70d748bb9a1fefbfbfad48bf/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=a9p6TXKcwsjITmZyWkkLybBeTOgg0ddf976m69dZE-0",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (resp.ok) {
        const result = await resp.json();
        alert("Form submitted successfully!");
      } else {
        alert("Failed to submit the form.");
      }
    } catch (error) {
      alert("An error occurred while submitting the form.");
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">
          <h2>GMA Property Management</h2>
        </div>
        <ul className="navbar-links">
          <li>
            <Link to="/user" className="navbar-link">
              Profile
            </Link>
          </li>
          <li>
            <Link to="/login" className="navbar-link">
              Logout
            </Link>
          </li>
        </ul>
      </nav>

      {/* Page Content */}
      <h1>Acc Details View PAGE</h1>
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          padding: "20px",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <Link
            to="/accounts"
            style={{
              textDecoration: "none",
              color: "#fff",
              backgroundColor: "#007bff",
              padding: "10px 20px",
              borderRadius: "4px",
              fontSize: "16px",
            }}
          >
            Back to Accounts
          </Link>
        </div>
        <p style={{ marginBottom: "20px", color: "#555", fontSize: "14px" }}>
          You can edit the details of your account here. Please note that if you
          alter the details here it will alter the details for all the Levy
          Statements of this entity on the GMA system.
        </p>
        <h2>Information</h2>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          {/* Account details form */}
          {["accountName", "email", "mobileNumber", "idReg", "billingAddress1", "billingAddress2", "billingAddress3"].map(
            (field, index) => (
              <div key={index}>
                <label style={{ display: "block", fontWeight: "bold" }}>
                  {field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  readOnly={field === "accountName"}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    backgroundColor: field === "accountName" ? "#f9f9f9" : "white",
                  }}
                />
              </div>
            )
          )}
          <div style={{ textAlign: "right" }}>
            <button
              type="submit"
              style={{
                padding: "10px 20px",
                backgroundColor: "#28a745",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AccDetailsViewFunc;
