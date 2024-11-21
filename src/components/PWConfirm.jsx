import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PasswordResetConfirm = () => {
  const { uidb64, token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      await axios.post(`/password-reset-confirm/${uidb64}/${token}/`, {
        new_password1: newPassword,
        new_password2: confirmPassword,
      });
      setMessage("Password reset successful! You can now log in.");
    } catch (error) {
      setMessage("Error resetting password.");
    }
  };

  return (
    <div>
      <h1>Set New Password</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PasswordResetConfirm;
