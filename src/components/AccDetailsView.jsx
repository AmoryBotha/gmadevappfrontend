import React, { useState } from "react";
import { Link } from "react-router-dom";

function AccDetailsViewFunc(){

    const [formData, setFormData] = useState({
        accountName: "John Doe", // Example default value, this is read-only
        email: "john.doe@example.com",
        mobileNumber: "1234567890",
        idReg: "AB12345678",
        billingAddress1: "123 Main Street",
        billingAddress2: "Suite 456",
        billingAddress3: "City, Country",
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
        <h1>Acc Details View PAGE</h1>
        <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
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
                You can edit the details of your account here. Please note that if you alter the details here it will alter the details for all the Levy Statements of this entity on the GMA system.
            </p>
            <h2>Information</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <div>
                    <label style={{ display: "block", fontWeight: "bold" }}>Account Name</label>
                    <input
                        type="text"
                        value={formData.accountName}
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
                <div>
                    <label style={{ display: "block", fontWeight: "bold" }}>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        style={{
                            width: "100%",
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                        }}
                    />
                </div>
                <div>
                    <label style={{ display: "block", fontWeight: "bold" }}>Mobile Number</label>
                    <input
                        type="tel"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        style={{
                            width: "100%",
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                        }}
                    />
                </div>
                <div>
                    <label style={{ display: "block", fontWeight: "bold" }}>ID/Reg # of Account Holder</label>
                    <input
                        type="text"
                        name="idReg"
                        value={formData.idReg}
                        onChange={handleChange}
                        style={{
                            width: "100%",
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                        }}
                    />
                </div>
                <div>
                    <label style={{ display: "block", fontWeight: "bold" }}>Billing Address 1</label>
                    <input
                        type="text"
                        name="billingAddress1"
                        value={formData.billingAddress1}
                        onChange={handleChange}
                        style={{
                            width: "100%",
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                        }}
                    />
                </div>
                <div>
                    <label style={{ display: "block", fontWeight: "bold" }}>Billing Address 2</label>
                    <input
                        type="text"
                        name="billingAddress2"
                        value={formData.billingAddress2}
                        onChange={handleChange}
                        style={{
                            width: "100%",
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                        }}
                    />
                </div>
                <div>
                    <label style={{ display: "block", fontWeight: "bold" }}>Billing Address 3</label>
                    <input
                        type="text"
                        name="billingAddress3"
                        value={formData.billingAddress3}
                        onChange={handleChange}
                        style={{
                            width: "100%",
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                        }}
                    />
                </div>
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

export default AccDetailsViewFunc