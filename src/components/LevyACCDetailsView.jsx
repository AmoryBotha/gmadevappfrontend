import React from "react";
import { Link } from "react-router-dom";

function LevyAccDetailsViewFunc(){
    return <div>
        <h1>Levy Acc Details View PAGE</h1>
        <div style={{ display: "flex", justifyContent: "space-around", padding: "20px", fontFamily: "Arial, sans-serif" }}>
            {/* Age Details Form */}
            <div style={{ width: "30%" }}>
                <h2>Age Details</h2>
                <form>
                    {["Balance", "Current", "30 days", "60 days", "90 days", "120 days", "150 days", "180+ days"].map((label, index) => (
                        <div key={index} style={{ marginBottom: "10px" }}>
                            <label style={{ display: "block", fontWeight: "bold" }}>{label}</label>
                            <input
                                type="text"
                                readOnly
                                value={`Value for ${label}`} // Example value, replace dynamically as needed
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
                    {["Owner", "Billing Address Line 1", "Billing Address Line 2", "Billing Address Line 3", "Billing Address Line 4"].map((label, index) => (
                        <div key={index} style={{ marginBottom: "10px" }}>
                            <label style={{ display: "block", fontWeight: "bold" }}>{label}</label>
                            <input
                                type="text"
                                readOnly
                                value={`Value for ${label}`} // Example value, replace dynamically as needed
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
                    {["Handed Over To Legal", "Active Arrangement", "Friendly Letter Active"].map((label, index) => (
                        <div key={index} style={{ marginBottom: "10px" }}>
                            <label style={{ display: "block", fontWeight: "bold" }}>{label}</label>
                            {label === "Friendly Letter Active" ? (
                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                    <input
                                        type="text"
                                        readOnly
                                        value={`Value for ${label}`} // Example value, replace dynamically as needed
                                        style={{
                                            flex: 1,
                                            padding: "8px",
                                            border: "1px solid #ccc",
                                            borderRadius: "4px",
                                            backgroundColor: "#f9f9f9",
                                        }}
                                    />
                                    <li className="form-button" style={{ listStyle: "none" }}>
                                        <Link
                                            to="/friendly"
                                            style={{
                                                textDecoration: "none",
                                                color: "#fff",
                                                backgroundColor: "#007bff",
                                                padding: "5px 10px",
                                                borderRadius: "4px",
                                            }}
                                        >
                                            Change
                                        </Link>
                                    </li>
                                </div>
                            ) : (
                                <input
                                    type="text"
                                    readOnly
                                    value={`Value for ${label}`} // Example value, replace dynamically as needed
                                    style={{
                                        width: "100%",
                                        padding: "8px",
                                        border: "1px solid #ccc",
                                        borderRadius: "4px",
                                        backgroundColor: "#f9f9f9",
                                    }}
                                />
                            )}
                        </div>
                    ))}
                    <div style={{ textAlign: "center", marginTop: "20px" }}>
                        <li className="form-button" style={{ listStyle: "none" }}>
                            <Link
                                to="/statement"
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
}

export default LevyAccDetailsViewFunc