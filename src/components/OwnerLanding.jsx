import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/OwnerLanding.css";

const OwnerLanding1 = () => {
  const [accounts, setAccounts] = useState([]);
  const navigate = useNavigate();

  // Function to go back to the previous page
  const goBack = () => {
    navigate(-1);
  };
  const contactID = localStorage.getItem("conIdStore") || "defaultID";
  // Function to fetch account details
  const fetchAccounts = async () => {
    try {
      const response = await fetch(
        "https://prod-91.westeurope.logic.azure.com:443/workflows/4e1c017f70d748bb9a1fefbfbfad48bf/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=a9p6TXKcwsjITmZyWkkLybBeTOgg0ddf976m69dZE-0",
      
        {
          method: "POST",
          body: JSON.stringify({
            ID: contactID,
          }),
        }
      );
      const data = await response.json();

      // Fetch levy accounts for each account
      const updatedAccounts = await Promise.all(
        data.map(async (account) => {
          const levyResponse = await fetch(
            "https://prod-26.westeurope.logic.azure.com:443/workflows/01fe4398170e437bbc3b0d8d2689f151/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=8zQrsZYowlCUps2EOSJ6W5tlBuP4zmhnnjgetdsCK68",
            {
              method: "POST",
              body: JSON.stringify({ accountId: account.AccountID }),
            }
          );
          const levyAccounts = await levyResponse.json();
          return { ...account, levyAccounts };
        })
      );

      setAccounts(updatedAccounts);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <div className="owner-landing">
      <header className="header">
        <button className="back-button" onClick={goBack}>
          Back to Previous Page
        </button>
        <h1>Owner Landing Page</h1>
        <h2>Accounts</h2>
      </header>

      <section className="accounts-section">
        <h4>Accounts Linked to Your Account</h4>

        <div className="account-details">
          {accounts.map((account) => (
            <div className="account-card" key={account.AccountID}>
              <h5>Owner Account Details</h5>
              <p>
                <strong>Account Number:</strong> {account.AccountNumber}
              </p>
              <p>
                <strong>Reg/ID No:</strong> {account.RegID}
              </p>
              <p>
                <strong>Phone Number:</strong> {account.Phone}
              </p>
              <p>
                <strong>Email:</strong> {account.Email}
              </p>
              <Link to={`/account/${account.AccountID}`} className="button modify-btn">
                Modify
              </Link>

              <h5>Levy Account Details</h5>
              {account.levyAccounts.map((levy) => (
                <div className="levy-account" key={levy.LevyAccountID}>
                  <p>
                    <strong>Levy Account:</strong> {levy.LevyAccountNumber}
                  </p>
                  <p>
                    <strong>Building:</strong> {levy.BuildingName}
                  </p>
                  <p>
                    <strong>Door Number:</strong> {levy.DoorNumber}
                  </p>
                  <p>
                    <strong>Current Balance:</strong> R {levy.Balance}
                  </p>
                  <Link
                    to={`/statement/${levy.LevyAccountID}`}
                    className="button download-btn"
                  >
                    Download Statement
                  </Link>
                  <Link
                    to={`/levyAccounts/${levy.LevyAccountID}`}
                    className="button edit-btn"
                  >
                    Edit
                  </Link>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default OwnerLanding1;
