import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function AccDetailsViewFunc() {
  const [formData, setFormData] = useState({
    accountName: "",
    email: "",
    mobileNumber: "",
    idReg: "",
    billingAddress1: "",
    billingAddress2: "",
    billingAddress3: "",
  });

  useEffect(() => {
    async function getAccInfo() {
      try {
        const accountID = localStorage.getItem("conIdStore") || "defaultID";
        const resp = await fetch(
          //"https://prod-224.westeurope.logic.azure.com:443/workflows/d308b7d851f74c3f9d656433ce3d8d6f/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=u8zXC78ZjM99AvFC68rJ-1pYgNZ35XykeeNd9fjPh7k",
          "https://prod-91.westeurope.logic.azure.com:443/workflows/4e1c017f70d748bb9a1fefbfbfad48bf/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=a9p6TXKcwsjITmZyWkkLybBeTOgg0ddf976m69dZE-0",
          {
            method: "POST",
            body: JSON.stringify({
              Type: "AccInfo",
              End: "end",
              ID: accountID,
            }),
          }
        );

        const data = await resp.json();

        // Update formData with the fetched data
        setFormData({
          accountName: data.AccountName || "",
          email: data.Email || "",
          mobileNumber: data.MainPhone || "",
          idReg: data.ID || "",
          billingAddress1: data.AddressLine1 || "",
          billingAddress2: data.AddressLine2 || "",
          billingAddress3: data.AddressLine3 || "",
        });

        // Update specific DOM elements directly (optional)
        document.getElementById("accountHeading").textContent = data.AccountName;
        const style = document.getElementById("item-heading");
        const headingAcc = style.getElementsByTagName("H2")[0];
        headingAcc.textContent = data.AccountName;
        document.getElementById("Accountname").textContent = data.AccountName;
        document.getElementById("Email-Account-2").value = data.Email;
        document.getElementById("Mobile-Number").value = data.MainPhone;
        document.getElementById("ID-REG").value = data.ID;
        document.getElementById("Billing-Address-3").value = data.AddressLine1;
        document.getElementById("Billing-Address").value = data.AddressLine2;
        document.getElementById("Billing-Address-2").value = data.AddressLine3;

        console.log(data);
      } catch (error) {
        console.error("Error fetching account information:", error);
      }
    }

    getAccInfo();
  }, []); // Empty dependency array ensures this runs only once when the component loads

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch(
        "https://prod-91.westeurope.logic.azure.com:443/workflows/4e1c017f70d748bb9a1fefbfbfad48bf/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=a9p6TXKcwsjITmZyWkkLybBeTOgg0ddf976m69dZE-0",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (resp.ok) {
        const result = await resp.json();
        console.log("Form submitted successfully:", result);
        alert("Form submitted successfully!");
      } else {
        console.error("Failed to submit form:", resp.statusText);
        alert("Failed to submit the form.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  return (
    <div>
      <h1>Acc Details View PAGE</h1>
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          padding: "20px",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
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
          You can edit the details of your account here. Please note that if you
          alter the details here it will alter the details for all the Levy
          Statements of this entity on the GMA system.
        </p>
        <h2>Information</h2>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <div>
            <label style={{ display: "block", fontWeight: "bold" }}>
              Account Name
            </label>
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
            <label style={{ display: "block", fontWeight: "bold" }}>
              Mobile Number
            </label>
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
            <label style={{ display: "block", fontWeight: "bold" }}>
              ID/Reg # of Account Holder
            </label>
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
            <label style={{ display: "block", fontWeight: "bold" }}>
              Billing Address 1
            </label>
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
            <label style={{ display: "block", fontWeight: "bold" }}>
              Billing Address 2
            </label>
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
            <label style={{ display: "block", fontWeight: "bold" }}>
              Billing Address 3
            </label>
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
  );
}

export default AccDetailsViewFunc;
