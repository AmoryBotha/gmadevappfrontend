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
      console.log("Fetching accounts...");

      const response = await fetch(
        "https://prod-91.westeurope.logic.azure.com:443/workflows/4e1c017f70d748bb9a1fefbfbfad48bf/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=a9p6TXKcwsjITmZyWkkLybBeTOgg0ddf976m69dZE-0",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Type: "Owner",
            ID: contactID,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch accounts: ${response.status}`);
      }

      const data = await response.json();

      const updatedAccounts = await Promise.all(
        data.map(async (account) => {
          console.log(`Fetching levy accounts for AccountID: ${account.AccountID}`);
          const levyResponse = await fetch(
            "https://prod-26.westeurope.logic.azure.com:443/workflows/01fe4398170e437bbc3b0d8d2689f151/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=8zQrsZYowlCUps2EOSJ6W5tlBuP4zmhnnjgetdsCK68",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ accountId: account.AccountID }),
            }
          );

          if (!levyResponse.ok) {
            throw new Error(
              `Failed to fetch levy accounts for AccountID: ${account.AccountID}, Status: ${levyResponse.status}`
            );
          }

          const levyAccounts = await levyResponse.json();
          return {
            ...account,
            levyAccounts: levyAccounts.map((levy) => ({
              LevyAccountID: levy.AccountNumberID,
              LevyAccountNumber: levy.AccountNumber,
              BuildingName: levy.BuildingName,
              DoorNumber: levy.DoorNumb,
              Balance: levy.Outstanding,
            })),
          };
        })
      );

      setAccounts(updatedAccounts);
      console.log("Accounts and levy accounts fetched successfully.");
    } catch (error) {
      console.error("Error fetching accounts or levy accounts:", error);
    }
  };

  // useEffect to fetch accounts when the component mounts
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
                <strong>Account Name:</strong> {account.AccountName || "N/A"}
              </p>
              <p>
                <strong>Reg/ID No:</strong> {account.RegID || "N/A"}
              </p>
              <p>
                <strong>Phone Number:</strong> {account.Phone || "N/A"}
              </p>
              <p>
                <strong>Email:</strong> {account.PrimaryContactEmail || "N/A"}
              </p>
              <Link
                to={`/account/${account.AccountID}`}
                className="button modify-btn"
              >
                Modify
              </Link>

              <h5>Levy Account Details</h5>
              <div className="levy-account-list">
                {account.levyAccounts.map((levy) => (
                  <div className="levy-account-item" key={levy.LevyAccountID}>
                    <p>
                      <strong>Levy Account:</strong>{" "}
                      {levy.LevyAccountNumber || "N/A"}
                    </p>
                    <p>
                      <strong>Building:</strong> {levy.BuildingName || "N/A"}
                    </p>
                    <p>
                      <strong>Door Number:</strong> {levy.DoorNumber || "N/A"}
                    </p>
                    <p>
                      <strong>Current Balance:</strong> R{" "}
                      {levy.Balance || "0.00"}
                    </p>
                    <div className="levy-buttons">
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
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default OwnerLanding1;
