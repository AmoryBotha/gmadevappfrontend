import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/Navbar.css"; // Importing the Navbar styles

function EmailStmntFunc() {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const navigate = useNavigate();

  const email1 = localStorage.getItem("usernameStore") || "user@example.com"; // Assuming email is stored in localStorage
  const conIdStore = localStorage.getItem("conIdStore") || "12345678"; // Example connection ID
  const web = localStorage.getItem("webIdStore") || "web123"; // Example userProfileID

  // Function to go back to the previous page
  const goBack = () => {
    navigate(-1);
  };

  const handleExcelDownload = async () => {
    if (!fromDate || !toDate) {
      alert("Please select both From and To dates.");
      return;
    }
  
    alert(
      `The system is generating your Excel report. It will be emailed to ${email1} as soon as it is finished.`
    );
  
    try {
      const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      };
  
      const from = formatDate(fromDate);
      const to = formatDate(toDate);
  
      const resp = await fetch(
        "https://prod-91.westeurope.logic.azure.com:443/workflows/4e1c017f70d748bb9a1fefbfbfad48bf/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=a9p6TXKcwsjITmZyWkkLybBeTOgg0ddf976m69dZE-0",
        {
          method: "POST",
          body: JSON.stringify({
            Type: "AccNumbState",
            End: "end",
            email: email1,
            ID: conIdStore,
            from: from,
            to: to,
            userProfileID: web,
          }),
        }
      );
  
      const data = await resp.json();
      if (data.status === "success") {
        alert(`Successfully sent Excel report to ${email1}`);
      } else {
        alert("Failed to generate Excel report. Please try again.");
      }
    } catch (error) {
      alert("An error occurred while generating the Excel report.");
    }
  };

  const handlePdfDownload = async () => {
    if (!fromDate || !toDate) {
      alert("Please select both From and To dates.");
      return;
    }
  
    alert(
      `The system is generating your Excel report. It will be emailed to ${email1} as soon as it is finished.`
    );
  
    try {
      const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      };
  
      const from = formatDate(fromDate);
      const to = formatDate(toDate);
  
      const resp = await fetch(
        "https://prod-91.westeurope.logic.azure.com:443/workflows/4e1c017f70d748bb9a1fefbfbfad48bf/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=a9p6TXKcwsjITmZyWkkLybBeTOgg0ddf976m69dZE-0",
        {
          method: "POST",
          body: JSON.stringify({
            Type: "AccNumbState",
            End: "end",
            email: email1,
            ID: conIdStore,
            from: from,
            to: to,
            userProfileID: web,
          }),
        }
      );
  
      const data = await resp.json();
      if (data.status === "success") {
        alert(`Successfully sent Excel report to ${email1}`);
      } else {
        alert("Failed to generate Excel report. Please try again.");
      }
    } catch (error) {
      alert("An error occurred while generating the Excel report.");
    }
  };

  return (
    <div>
      
      <header style={{ textAlign: "center", marginBottom: "20px" }}>
        <h1>Download Statement Page</h1>
      </header>

      {/* Back Button below the header */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button
          onClick={goBack}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
            fontSize: "1rem",
          }}
        >
          &#8592; Back
        </button>
      </div>

      {/* Date Pickers and Download Buttons */}
      <div
        style={{
          padding: "20px",
          fontFamily: "Arial, sans-serif",
          textAlign: "center",
        }}
      >
        <h2>Date Selector</h2>
        <div style={{ margin: "20px 0" }}>
          <label
            htmlFor="fromDatePicker"
            style={{ marginRight: "10px", fontWeight: "bold" }}
          >
            From Date:
          </label>
          <DatePicker
            id="fromDatePicker"
            selected={fromDate}
            onChange={(date) => setFromDate(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select From Date"
          />
        </div>
        <div style={{ margin: "20px 0" }}>
          <label
            htmlFor="toDatePicker"
            style={{ marginRight: "10px", fontWeight: "bold" }}
          >
            To Date:
          </label>
          <DatePicker
            id="toDatePicker"
            selected={toDate}
            onChange={(date) => setToDate(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select To Date"
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
  );
}

export default EmailStmntFunc;