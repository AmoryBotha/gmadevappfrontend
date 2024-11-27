import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Form.css";
import LoadingIndicator from "./LoadingIndicator";
import api from "../api";

function Form({ route, method }) {
    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        cell: "",
        id: "",
        username: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const name = method === "login" ? "Login" : "Register";

    // Fun placeholder animation and error highlighting
    const getInputClass = (field) => {
        return errors[field] ? "form-input error" : "form-input";
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "", // Clear error when user starts typing
        }));
    };

    const validateFields = () => {
        const newErrors = {};
        Object.keys(formData).forEach((field) => {
            if (!formData[field]) {
                newErrors[field] = `${field === "fname"
                    ? "First Name"
                    : field === "lname"
                    ? "Last Name"
                    : field === "cell"
                    ? "Mobile Number"
                    : field === "id"
                    ? "ID Number"
                    : field === "username"
                    ? "Email"
                    : "Password"} is required.`;
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateFields()) return;

        setLoading(true);

        const { fname, lname, cell, id, username, password } = formData;

        try {
            // API call to submit data
            const response = await fetch(
                "https://prod-91.westeurope.logic.azure.com:443/workflows/4e1c017f70d748bb9a1fefbfbfad48bf/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=a9p6TXKcwsjITmZyWkkLybBeTOgg0ddf976m69dZE-0",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        fname1: fname,
                        lname1: lname,
                        email1: username,
                        cell1: cell,
                        id1: id,
                    }),
                }
            );

            const dataRes = await response.json();

            // Save all data to localStorage permanently
            localStorage.setItem("fnameStore", fname);
            localStorage.setItem("lnameStore", lname);
            localStorage.setItem("cellStore", cell);
            localStorage.setItem("idStore", id);
            localStorage.setItem("usernameStore", username);
            localStorage.setItem("password", password);
            localStorage.setItem("webIdStore", dataRes.UserP);
            localStorage.setItem("conIdStore", dataRes.ContactID);

            if (method === "login") {
                const res = await api.post(route, { username, password });
                localStorage.setItem("ACCESS_TOKEN", res.data.access);
                localStorage.setItem("REFRESH_TOKEN", res.data.refresh);
                navigate("/home");
            } else {
                navigate("/login");
            }
        } catch (error) {
            alert("An error occurred: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-wrapper">
            <form onSubmit={handleSubmit} className="form-container">
                <div className="welcome-header">
                    <h1>🎉 Welcome to the GMA Portal 🎉</h1>
                    <h2>{name}</h2>
                </div>
                {["fname", "lname", "cell", "id", "username", "password"].map((field, index) => (
                    <div key={index} className="form-group">
                        <label htmlFor={field}>
                            {field === "fname"
                                ? "First Name"
                                : field === "lname"
                                ? "Last Name"
                                : field === "cell"
                                ? "Mobile Number"
                                : field === "id"
                                ? "ID Number"
                                : field === "username"
                                ? "Email"
                                : "Password"}
                        </label>
                        <input
                            id={field}
                            name={field}
                            type={field === "password" ? "password" : "text"}
                            value={formData[field]}
                            onChange={handleInputChange}
                            placeholder={`Enter your ${field}`}
                            className={getInputClass(field)}
                        />
                        {errors[field] && <span className="error-message">{errors[field]}</span>}
                    </div>
                ))}
                {loading && <LoadingIndicator />}
                <button type="submit" className="form-button" disabled={loading}>
                    {loading ? "Processing..." : name}
                </button>
            </form>
        </div>
    );
}

export default Form;
