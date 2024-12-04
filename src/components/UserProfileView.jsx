import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Form.css";
import LoadingIndicator from "./LoadingIndicator";

function UserProfileFunc() {
    const [fname, setFName] = useState("");
    const [lname, setLName] = useState("");
    const [cell, setCell] = useState("");
    const [id, setID] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Retrieve data from localStorage
    useEffect(() => {
        setFName(localStorage.getItem("fnameStore") || "");
        setLName(localStorage.getItem("lnameStore") || "");
        setCell(localStorage.getItem("cellStore") || "");
        setID(localStorage.getItem("idStore") || "");
        setUsername(localStorage.getItem("usernameStore") || "");
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Construct the payload with data from localStorage
            const payload = {
                Type: "UpdateUser",
                End: "end",
                displayName: `${fname} ${lname}`,
                name: fname,
                email: username,
                lastName: lname,
                cell,
                idNum: id,
                webID: localStorage.getItem("webIdStore") || "",
            };

            // Make the API call
            const resp = await fetch(
                "https://prod-102.westeurope.logic.azure.com:443/workflows/81c9f765597640d4aeaf78b8061c17c9/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=h8bHLcCcsMDx9XZSPJRcqEPJ9WNEbPrGnW-A6Cz1ngA",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                }
            );

            const data = await resp.json();

            // Update localStorage after successful update
            localStorage.setItem("fnameStore", fname);
            localStorage.setItem("lnameStore", lname);
            localStorage.setItem("cellStore", cell);
            localStorage.setItem("idStore", id);
            localStorage.setItem("usernameStore", username);

            alert("Profile updated successfully!");
            navigate("/user");
        } catch (error) {
            alert("An error occurred while updating your profile.");
        } finally {
            setLoading(false);
        }
    };

    // Back button click handler
    const handleBack = () => {
        navigate(-1); // Go back to the previous page in history
    };

    return (
        <div className="form-container">
            <div className="form-header">
                <h1>User Profile</h1>
                <h2>Update Your Information</h2>
                {/* Back Button */}
                <button className="back-button" onClick={handleBack}>
                    Back
                </button>
            </div>
            <form onSubmit={handleSubmit}>
                {/* First Name */}
                <div className="form-group">
                    <label htmlFor="fname">First Name</label>
                    <input
                        id="fname"
                        type="text"
                        value={fname}
                        onChange={(e) => setFName(e.target.value)}
                        placeholder="Enter your first name"
                        className="form-input"
                    />
                </div>

                {/* Last Name */}
                <div className="form-group">
                    <label htmlFor="lname">Last Name</label>
                    <input
                        id="lname"
                        type="text"
                        value={lname}
                        onChange={(e) => setLName(e.target.value)}
                        placeholder="Enter your last name"
                        className="form-input"
                    />
                </div>

                {/* Mobile Number */}
                <div className="form-group">
                    <label htmlFor="cell">Mobile Number</label>
                    <input
                        id="cell"
                        type="text"
                        value={cell}
                        onChange={(e) => setCell(e.target.value)}
                        placeholder="Enter your mobile number"
                        className="form-input"
                    />
                </div>

                {/* ID Number */}
                <div className="form-group">
                    <label htmlFor="id">ID Number</label>
                    <input
                        id="id"
                        type="text"
                        value={id}
                        onChange={(e) => setID(e.target.value)}
                        placeholder="Enter your ID number"
                        className="form-input"
                    />
                </div>

                {/* Email */}
                <div className="form-group">
                    <label htmlFor="username">Email</label>
                    <input
                        id="username"
                        type="email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your email"
                        className="form-input"
                    />
                </div>

                {/* Loading Indicator */}
                {loading && <LoadingIndicator />}

                {/* Submit Button */}
                <div className="form-actions">
                    <button type="submit" className="form-button" disabled={loading}>
                        {loading ? "Saving..." : "Update Profile"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UserProfileFunc;
