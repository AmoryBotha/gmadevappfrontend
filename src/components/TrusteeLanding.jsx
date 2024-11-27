import React from "react";
import "../styles/UnderConstruction.css"; // Reuse or modify the same CSS file

function TrusteeLanding1() {
    return (
        <div className="construction-container">
            <div className="construction-header">
                <h1>🚧 Trustee Landing Page 🚧</h1>
                <p>We’re building something great for trustees!</p>
            </div>
            <div className="construction-content">
                <img
                    src="https://via.placeholder.com/400x300?text=Under+Construction"
                    alt="Under Construction"
                    className="construction-image"
                />
                <p className="construction-message">
                    This page is under construction. Please come back soon for updates!
                </p>
            </div>
            <div className="construction-footer">
                <div className="loader"></div>
                <p>Loading new trustee features...</p>
            </div>
        </div>
    );
}

export default TrusteeLanding1;
