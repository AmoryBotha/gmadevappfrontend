import { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import "../styles/Form.css";
import LoadingIndicator from "./LoadingIndicator";
import { ACCESS_TOKEN, REFRESH_TOKEN, fnameStore, lnameStore, cellStore, idStore, usernameStore, webIdStore, conIdStore } from "../constants";

function Form({ route, method }) {
    const [fname, setFName] = useState("");
    const [lname, setLName] = useState("");
    const [password, setPassword] = useState("");
    const [cell, setCell] = useState("");
    const [id, setID] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const [bearerToken, setBearerToken] = useState(null);
    const navigate = useNavigate();

    const name = "Register";

    // Fetch bearer token on page load
    useEffect(() => {
        const fetchToken = async () => {
            const config = {
                url: "https://login.microsoftonline.com/2c1efee9-7fce-4cce-b9f9-d58273ffeac3/oauth2/v2.0/token",
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    scope: "https://gmacc.crm4.dynamics.com/.default",
                    tenant: "2c1efee9-7fce-4cce-b9f9-d58273ffeac3",
                    client_id: "1423f8e0-c141-4207-9ab7-4a75c56c1a94",
                    grant_type: "client_credentials",
                    client_secret: "L1J8Q~Yq806uoQpzhzzF_WTLAJauQFxaaxxTfdBR",
                }),
            };

            try {
                const response = await fetch(config.url, {
                    method: config.method,
                    headers: config.headers,
                    body: config.body,
                });

                const data = await response.json();
                if (response.ok && data.access_token) {
                    setBearerToken(data.access_token);
                    console.log("Bearer token retrieved:", data.access_token);
                } else {
                    console.error("Failed to fetch bearer token:", data);
                }
            } catch (error) {
                console.error("Error fetching bearer token:", error);
            }
        };

        fetchToken();
    }, []);

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const userPayload = {
                fname1: fname,
                lname1: lname,
                email1: username,
                cell1: cell,
                id1: id,
            };

            const response = await fetch(
                "https://prod-91.westeurope.logic.azure.com:443/workflows/4e1c017f70d748bb9a1fefbfbfad48bf/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=a9p6TXKcwsjITmZyWkkLybBeTOgg0ddf976m69dZE-0",
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        Authorization: `Bearer ${bearerToken}`, // Use the retrieved token
                    },
                    body: JSON.stringify(userPayload),
                }
            );

            const dataRes = await response.json();

            // Set LocalStorage Items For User
            localStorage.setItem(fnameStore, fname);
            localStorage.setItem(lnameStore, lname);
            localStorage.setItem(cellStore, cell);
            localStorage.setItem(idStore, id);
            localStorage.setItem(usernameStore, username);
            localStorage.setItem(webIdStore, dataRes.UserP);
            localStorage.setItem(conIdStore, dataRes.ContactID);

            console.log("Response Data:", dataRes);

            const res = await api.post(route, { username, password });
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/home");
            } else {
                navigate("/login");
            }
        } catch (error) {
            console.error("Error during submission:", error);
            alert("An error occurred. Please try again.");
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
            <div className="text">
                <p>First Name</p>
            </div>
            <input
                className="form-input"
                type="text"
                value={fname}
                onChange={(e) => setFName(e.target.value)}
                placeholder="First Name"
            />
            <div className="text">
                <p>Last Name</p>
            </div>
            <input
                className="form-input"
                type="text"
                value={lname}
                onChange={(e) => setLName(e.target.value)}
                placeholder="Last Name"
            />
            <div className="text">
                <p>Mobile Number</p>
            </div>
            <input
                className="form-input"
                type="text"
                value={cell}
                onChange={(e) => setCell(e.target.value)}
                placeholder="Mobile Number"
            />
            <div className="text">
                <p>ID Number</p>
            </div>
            <input
                className="form-input"
                type="text"
                value={id}
                onChange={(e) => setID(e.target.value)}
                placeholder="ID Number"
            />
            <div className="text">
                <p>Email</p>
            </div>
            <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <div className="text">
                <p>Password</p>
            </div>
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            {loading && <LoadingIndicator />}
            <button className="form-button" type="submit" disabled={!bearerToken}>
                {name}
            </button>
        </form>
    );
}

export default Form;
