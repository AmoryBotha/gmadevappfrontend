import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/BackButton.css";

function LevyAccDetailsViewFunc() {
  const [formData, setFormData] = useState({
    balance: "",
    current: "",
    days30: "",
    days60: "",
    days90: "",
    days120: "",
    days150: "",
    days180: "",
    owner: "",
    billAdd1: '',
    billAdd2: '',
    billAdd3: '',
    billAdd4: '',
    legal: '',
    aod: '',
    fr: ''
  });
  const navigate = useNavigate();

  // Function to go back to the previous page
  const goBack = () => {
    navigate(-1); // This will take the user back to the previous page in history
  };

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

        // Update formData with the fetched data
        setFormData({
          balance: data.bal || "",
          current: data.current || "",
          days30: data.days30 || "",
          days60: data.days60 || "",
          days90: data.days90 || "",
          days120: data.days120 || "",
          days150: data.days150 || "",
          days180: data.days180 || "",
          owner: data.owner || "",
          billAdd1: data.AddressLine1 || "",
          billAdd2: data.AddressLine2 || "",
          billAdd3: data.AddressLine3 || "",
          billAdd4: data.AddressLine4 || "",
          legal: data.legal || "",
          aod: data.aod || "",
          fr: data.FR || ""
        });

        console.log(data);
      } catch (error) {
        console.error("Error fetching account information:", error);
      }
    }

    getAccInfo();
  }, []); // Empty dependency array ensures this runs only once when the component loads

  return (
    <div className="levy-details-container" style={{ fontFamily: "Arial, sans-serif" }}>
      <header className="levy-header" style={{ marginBottom: "10px", textAlign: "center" }}>
        <h1>Levy Account Details View</h1>
      </header>

      <div className="back-button-container" style={{ textAlign: "center", marginBottom: "20px" }}>
        <button
          onClick={goBack}
          className="back-button"
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
        >
          &#8592; Back
        </button>
      </div>

      <div style={{ display: "flex", justifyContent: "space-around", padding: "20px" }}>
        {/* Age Details Form */}
        <div style={{ width: "30%" }}>
          <h2>Age Details</h2>
          <form>
            <div style={{ marginBottom: "10px" }}>
              <label style={{ display: "block", fontWeight: "bold" }}>Balance</label>
              <input
                type="text"
                readOnly
                value={formData.balance}
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  backgroundColor: "#f9f9f9",
                }}
              />
            </div>

            <div style={{ marginBottom: "10px" }}>
              <label style={{ display: "block", fontWeight: "bold" }}>Current</label>
              <input
                type="text"
                readOnly
                value={formData.current}
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  backgroundColor: "#f9f9f9",
                }}
              />
            </div>

            {["30", "60", "90", "120", "150", "180"].map((days, index) => (
              <div key={index} style={{ marginBottom: "10px" }}>
                <label style={{ display: "block", fontWeight: "bold" }}>{`${days} days`}</label>
                <input
                  type="text"
                  readOnly
                  value={formData[`days${days}`] || ""}
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    backgroundColor: "#f9f9f9",
                  }}
                />
              </div>
            ))}
          </form>
        </div>

        {/* Statement Address Form */}
        <div style={{ width: "30%" }}>
          <h2>Statement Address</h2>
          <form>
            <div style={{ marginBottom: "10px" }}>
              <label style={{ display: "block", fontWeight: "bold" }}>Owner</label>
              <input
                type="text"
                readOnly
                value={formData.owner}
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  backgroundColor: "#f9f9f9",
                }}
              />
            </div>

            {["billAdd1", "billAdd2", "billAdd3", "billAdd4"].map((field, index) => (
              <div key={index} style={{ marginBottom: "10px" }}>
                <label style={{ display: "block", fontWeight: "bold" }}>
                  {`Billing Address Line ${index + 1}`}
                </label>
                <input
                  type="text"
                  readOnly
                  value={formData[field]}
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    backgroundColor: "#f9f9f9",
                  }}
                />
              </div>
            ))}
            <p style={{ marginTop: "20px", fontSize: "0.9em", color: "#555" }}>
              To amend the billing details, go to the Accounts Page and click on the Modify button next to the account you want to amend.
            </p>
          </form>
        </div>

        {/* Information Form */}
        <div style={{ width: "30%" }}>
          <h2>Information</h2>
          <form>
            {["legal", "aod", "fr"].map((field, index) => (
              <div key={index} style={{ marginBottom: "10px" }}>
                <label style={{ display: "block", fontWeight: "bold" }}>
                  {field === "legal" ? "Handed Over To Legal" : field === "aod" ? "Active Arrangement" : "Friendly Letter Active"}
                </label>
                <input
                  type="text"
                  readOnly
                  value={formData[field]}
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    backgroundColor: "#f9f9f9",
                  }}
                />
              </div>
            ))}
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <li className="form-button" style={{ listStyle: "none" }}>
                <Link
                  to="/statement" // Ensure this route is correctly set up in your router
                  style={{
                    textDecoration: "none",
                    color: "#fff",
                    backgroundColor: "#28a745",
                    padding: "10px 20px",
                    borderRadius: "4px",
                  }}
                >
                  Download Statement
                </Link>
              </li>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LevyAccDetailsViewFunc;
