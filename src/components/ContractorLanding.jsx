import React from "react";
import "../styles/UnderConstruction.css"; // Create a CSS file for styles

function ContractorLanding1() {
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
        </div>
    );
}

export default ContractorLanding1;
