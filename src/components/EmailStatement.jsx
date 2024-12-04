import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function EmailStmntFunc() {
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();

  const email1 = localStorage.getItem("emailStore") || "user@example.com"; // Assuming email is stored in localStorage
  const conIdStore = localStorage.getItem("conIdStore") || "12345678"; // Example connection ID
  const web = localStorage.getItem("webIdStore") || "web123"; // Example userProfileID

  // Function to go back to the previous page
  const goBack = () => {
    navigate(-1);
  };

  const handleExcelDownload = async () => {
    if (!selectedDate) {
      alert("Please select a date first.");
      return;
    }

    alert(
      `The system is generating your Excel report. It will be emailed to ${email1} as soon as it is finished.`
    );

    try {
      const fromDate = selectedDate.toISOString().split("T")[0]; // Format as yyyy-MM-dd
      const toDate = fromDate; // Assuming single-day reports

      const resp = await fetch(
        "https://prod-73.westeurope.logic.azure.com:443/workflows/486474e82cfd4e26a831e171282bb59a/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=SmMHwN-vqCyjt9bEA2f_orViEyCWDm9YCiH6ux71yJE",
        {
          method: "POST",
          body: JSON.stringify({
            Type: "AccNumbState",
            End: "end",
            email: email1,
            ID: conIdStore,
            from: fromDate,
            to: toDate,
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
    if (!selectedDate) {
      alert("Please select a date first.");
      return;
    }

    alert(
      `The system is generating your PDF report. It will be emailed to ${email1} as soon as it is finished.`
    );

    try {
      const fromDate = selectedDate.toISOString().split("T")[0];
      const toDate = fromDate;

      const resp = await fetch(
        "https://prod-235.westeurope.logic.azure.com:443/workflows/20fd3ee4d8f34f22a0dc2cd46404b9ff/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=i8HCRlS3NDZXQpt5-Q6sHztHY5YXdWDgXQ5H6EpAGSE",
        {
          method: "POST",
          body: JSON.stringify({
            Type: "AccNumbState",
            End: "end",
            email: email1,
            ID: conIdStore,
            from: fromDate,
            to: toDate,
            userProfileID: web,
          }),
        }
      );

      const data = await resp.json();
      if (data.status === "success") {
        alert(`Successfully sent PDF report to ${email1}`);
      } else {
        alert("Failed to generate PDF report. Please try again.");
      }
    } catch (error) {
      alert("An error occurred while generating the PDF report.");
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

      {/* Date Picker and Download Buttons */}
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
            htmlFor="datePicker"
            style={{ marginRight: "10px", fontWeight: "bold" }}
          >
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
  );
}

export default EmailStmntFunc;
