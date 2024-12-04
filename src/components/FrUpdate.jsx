import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function UpdateFRFunc() {
  const [formData, setFormData] = useState({
    levyAccountNumber: "", // Populated from API
    friendlyReminderActive: "", // Populated from API
  });

  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch data when the component loads
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://prod-91.westeurope.logic.azure.com:443/workflows/4e1c017f70d748bb9a1fefbfbfad48bf/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=a9p6TXKcwsjITmZyWkkLybBeTOgg0ddf976m69dZE-0"
        );

        if (response.ok) {
          const data = await response.json();
          setFormData({
            levyAccountNumber: data.AccountNumber || "", // Ensure fallback for missing data
            friendlyReminderActive: data.Friendly || "",
          });
        } else {
          console.error("API Error:", response.statusText);
          setError("Failed to fetch data from the server.");
        }
      } catch (err) {
        console.error("Error:", err);
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData();
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
      const response = await fetch(
        "https://prod-91.westeurope.logic.azure.com:443/workflows/4e1c017f70d748bb9a1fefbfbfad48bf/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=a9p6TXKcwsjITmZyWkkLybBeTOgg0ddf976m69dZE-0",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            friendlyReminderActive: formData.friendlyReminderActive,
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        alert("Form submitted successfully!");
        console.log("API Response:", result);
      } else {
        alert("Failed to submit the form. Please try again.");
        console.error("API Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Friendly Reminder PAGE</h1>
      <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
        {/* Back to Accounts Button */}
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

        {/* Form Content */}
        <h5>You have selected to change your Friendly Reminder setting</h5>
        <p>
          Friendly Reminders are sent out monthly, around the 8th, at no cost. They serve to notify you of any Levy
          accounts that may be outstanding at the time of dispatch, offering a chance to resolve the issue prior to the
          commencement of Credit Control procedures.
        </p>
        <p>
          If the setting on the website is marked as 'Yes', it indicates that it is enabled, and our system will send a
          friendly reminder to you for the selected account when necessary.
        </p>
        <h3>Current Settings</h3>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {/* Levy Account Number */}
          <div>
            <label style={{ display: "block", fontWeight: "bold" }}>Levy Account Number:</label>
            <input
              type="text"
              value={formData.levyAccountNumber}
              readOnly
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                backgroundColor: "#f9f9f9",
              }}
            />
          </div>

          {/* Friendly Reminder Active */}
          <div>
            <label style={{ display: "block", fontWeight: "bold" }}>Friendly Reminder Active:</label>
            <select
              name="friendlyReminderActive"
              value={formData.friendlyReminderActive}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* Submit Button */}
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

export default UpdateFRFunc;
