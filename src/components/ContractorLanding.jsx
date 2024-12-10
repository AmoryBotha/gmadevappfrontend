import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/UnderConstruction.css"; // Create a CSS file for styles
import "../styles/Navbar.css"; // Importing the Navbar styles

function ContractorLanding1() {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1); // Navigate to the previous page
    };

    return (
        <div className="construction-container">
            <div className="construction-header">
                <h1>🚧 Contractor Landing Page 🚧</h1>
                <p>We’re working hard to bring you something amazing!</p>
            </div>
            <div className="construction-content">
                <img
                    src="https://via.placeholder.com/400x300?text=Under+Construction"
                    alt="Under Construction"
                    className="construction-image"
                />
                <p className="construction-message">
                    This page is currently under construction. Please check back soon for updates!
                </p>
            </div>
            <div className="construction-footer">
                <div className="loader"></div>
                <p>Loading exciting features...</p>
            </div>
            {/* Fun Back Button */}
            <div className="back-button-container">
                <button className="fun-back-button" onClick={handleBackClick}>
                    🏠 Go Back to Safety!
                </button>
            </div>
        </div>
    );
}

export default ContractorLanding1;
