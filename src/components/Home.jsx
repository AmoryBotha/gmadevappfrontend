import { Link } from "react-router-dom";
import "../styles/Home.css";
import "../styles/Form.css";

function Home1() {
  const userRoles = {
    owner: localStorage.getItem("ownerStore") === "true",
    contractor: localStorage.getItem("contractorStore") === "true",
    trustee: localStorage.getItem("trusteeStore") === "true",
  };

  const portalLinks = [
    { role: "owner", label: "Owner Landing", path: "/ownerLanding" },
    { role: "contractor", label: "Contractor Landing", path: "/contractorLanding" },
    { role: "trustee", label: "Trustee Landing", path: "/trusteeLanding" },
  ];

  const accessibleLinks = portalLinks.filter((link) => userRoles[link.role]);

  return (
    <div className="home-container">
      {/* Header */}
      <header className="home-header">
        <h1>GMA USER PORTAL</h1>
      </header>

      {/* Welcome Message */}
      <section className="welcome-section">
        <h4>Welcome to the GMA Portal</h4>
        {accessibleLinks.length > 0 ? (
          <>
            <p>Select a portal to proceed:</p>
            <ul className="portal-list">
              {accessibleLinks.map((link) => (
                <li key={link.path} className="form-button">
                  <Link to={link.path}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>You do not have access to any portals. Please contact us for assistance.</p>
        )}
      </section>

      {/* Additional Links */}
      <section className="additional-links">
        <ul>
          <li className="form-button">
            <Link to="/user">User Profile</Link>
          </li>
          <li className="form-button">
            <Link to="/password-reset-confirm">Reset Password</Link>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default Home1;
