import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
//import { ACCESS_TOKEN, REFRESH_TOKEN, fnameStore,lnameStore,cellStore,idStore,usernameStore,webIdStore,conIdStore,ownerStore,trusteeStore,contractorStore } from "../constants";
import "../styles/Form.css"
import LoadingIndicator from "./LoadingIndicator";
import { ACCESS_TOKEN, REFRESH_TOKEN, fnameStore,lnameStore,cellStore,idStore,usernameStore,webIdStore,conIdStore } from "../constants";
function Form({ route, method }) {
    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        password: "",
        cell: "",
        id: "",
        username: "",
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const name = method === "login" ? "Login" : "Register";

    const validateFields = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.fname.trim()) newErrors.fname = "First Name is required.";
        if (!formData.lname.trim()) newErrors.lname = "Last Name is required.";
        if (!formData.cell.trim()) newErrors.cell = "Mobile Number is required.";
        if (!formData.id.trim()) newErrors.id = "ID Number is required.";
        if (!formData.username.trim()) newErrors.username = "Email is required.";
        else if (!emailRegex.test(formData.username)) newErrors.username = "Enter a valid email address.";
        if (!formData.password.trim()) newErrors.password = "Password is required.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "", // Clear error for the field being updated
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateFields()) return;

        setLoading(true);
        try {
            // API call to create user profile
            const response = await fetch(
                "https://prod-91.westeurope.logic.azure.com:443/workflows/4e1c017f70d748bb9a1fefbfbfad48bf/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=a9p6TXKcwsjITmZyWkkLybBeTOgg0ddf976m69dZE-0",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        fname1: formData.fname,
                        lname1: formData.lname,
                        email1: formData.username,
                        cell1: formData.cell,
                        id1: formData.id,
                        pw: formData.password,
                    }),
                }
            );

            const dataRes = await response.json();

            // Save data permanently to localStorage
            Object.entries(formData).forEach(([key, value]) => {
                localStorage.setItem(`${key}Store`, value);
            });
            localStorage.setItem("webIdStore", dataRes.UserP);
            localStorage.setItem("conIdStore", dataRes.ContactID);

            if (method === "login") {
                const res = await api.post(route, { username: formData.username, password: formData.password });
                localStorage.setItem("ACCESS_TOKEN", res.data.access);
                localStorage.setItem("REFRESH_TOKEN", res.data.refresh);
                navigate("/home");
            } else {
                navigate("/login");
            }
        } catch (error) {
            alert(`An error occurred: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <div className="welcome">
                <h1>Welcome to the GMA Portal</h1>
                <h1>{name}</h1>
            </div>

            {[
                { name: "fname", label: "First Name", type: "text", placeholder: "Enter your first name" },
                { name: "lname", label: "Last Name", type: "text", placeholder: "Enter your last name" },
                { name: "cell", label: "Mobile Number", type: "text", placeholder: "Enter your mobile number" },
                { name: "id", label: "ID Number", type: "text", placeholder: "Enter your ID number" },
                { name: "username", label: "Email", type: "text", placeholder: "Enter your email" },
                { name: "password", label: "Password", type: "password", placeholder: "Enter your password" },
            ].map((field, index) => (
                <div key={index} className="form-group">
                    <label htmlFor={field.name}>{field.label}</label>
                    <input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        value={formData[field.name]}
                        onChange={handleInputChange}
                        placeholder={field.placeholder}
                        className={`form-input ${errors[field.name] ? "error" : ""}`}
                    />
                    {errors[field.name] && <span className="error-message">{errors[field.name]}</span>}
                </div>
            ))}

            {loading && <LoadingIndicator />}
            <button className="form-button" type="submit" disabled={loading}>
                {loading ? "Processing..." : name}
            </button>
        </form>
    );
}

export default Form;