import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function EmailStmntFunc(){

    const [selectedDate, setSelectedDate] = useState(null);

    const handleExcelDownload = () => {
        alert(`Excel file for date: ${selectedDate?.toLocaleDateString() || "No date selected"}`);
        // Add functionality to generate/download Excel file
    };

    const handlePdfDownload = () => {
        alert(`PDF file for date: ${selectedDate?.toLocaleDateString() || "No date selected"}`);
        // Add functionality to generate/download PDF file
    };

    return <div>
        <h1>Download Statement PAGE</h1>
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", textAlign: "center" }}>
            <h1>Date Selector</h1>
            <div style={{ margin: "20px 0" }}>
                <label htmlFor="datePicker" style={{ marginRight: "10px", fontWeight: "bold" }}>
                    Select a Date:
                </label>
                <DatePicker
                    id="datePicker"
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Click to select a date"
                />
            </div>
            <div style={{ marginTop: "20px" }}>
                <button
                    onClick={handleExcelDownload}
                    style={{
                        padding: "10px 20px",
                        marginRight: "10px",
                        backgroundColor: "#28a745",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Download Excel
                </button>
                <button
                    onClick={handlePdfDownload}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#dc3545",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Download PDF
                </button>
            </div>
        </div>
        </div>

}

export default EmailStmntFunc