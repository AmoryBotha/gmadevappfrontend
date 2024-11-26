import React, { useState } from "react";
import { Link } from "react-router-dom";

function UpdateFRFunc(){

    const [formData, setFormData] = useState({
        levyAccountNumber: "GMA001", // Example value, read-only
        friendlyReminderActive: "Yes", // Editable field
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Form submitted!"); // Replace with actual submission logic
        console.log("Submitted Data:", formData);
    };

    return <div>
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
                accounts that may be outstanding at the time of dispatch, offering a chance to resolve the issue prior
                to the commencement of Credit Control procedures.
            </p>
            <p>
                If the setting on the website is marked as 'Yes', it indicates that it is enabled, and our system will
                send a friendly reminder to you for the selected account when necessary.
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

}

export default UpdateFRFunc