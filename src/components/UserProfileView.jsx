import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
//import { ACCESS_TOKEN, REFRESH_TOKEN, fnameStore,lnameStore,cellStore,idStore,usernameStore,webIdStore,conIdStore,ownerStore,trusteeStore,contractorStore } from "../constants";
import "../styles/Form.css"
import LoadingIndicator from "./LoadingIndicator";
import { ACCESS_TOKEN, REFRESH_TOKEN, fnameStore,lnameStore,cellStore,idStore,usernameStore,webIdStore,conIdStore } from "../constants";


       var one = localStorage.getItem('fnameStore');
        var two = localStorage.getItem('lnameStore');
        var three = localStorage.getItem('cellStore');
        var four = localStorage.getItem('idStore');
        var five = localStorage.getItem('usernameStore');
        
function UserProfileFunc({ route, method }) {
    const [fname, setFName] = useState("");
    const [lname, setLName] = useState("");
    const [password, setPassword] = useState("");
    const [cell, setCell] = useState("");
    const [id, setID] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = "Update";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
        localStorage.setItem('fnameStore', fname);
        localStorage.setItem('lnameStore', lname);
        localStorage.setItem('cellStore', cell);
        localStorage.setItem('idStore', id);
        localStorage.setItem('usernameStore', username);
        
            const res = await api.post(route, { username, password })
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/home")

            } else {
                navigate("/login")
            }
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    };

    return (
        
        <form onSubmit={handleSubmit} className="form-container">
            <div class='welcome'>
                <h1>User Profile Details</h1>
                <h1>{name}</h1>
            </div>
            <div class='text'>
                <p>First Name</p>
            </div>
            <input
                className="form-input"
                type="text"
                value={fname}
                onChange={(e) => setFName(e.target.value)}
                placeholder={one}
            />
            <div class='text'>
                <p>Last Name</p>
            </div>
            <input
                className="form-input"
                type="text"
                value={lname}
                onChange={(e) => setLName(e.target.value)}
                placeholder={two}
            />
            <div class='text'>
                <p>Mobile Number</p>
            </div>
            <input
                className="form-input"
                type="text"
                value={cell}
                onChange={(e) => setCell(e.target.value)}
                placeholder={three}
            />
            <div class='text'>
                <p>ID Number</p>
            </div>
            <input
                className="form-input"
                type="text"
                value={id}
                onChange={(e) => setID(e.target.value)}
                placeholder={four}
            />
            <div class='text'>
                <p>Email</p>
            </div>
            <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={five}
            />
            {loading && <LoadingIndicator />}
            <button className="form-button" type="submit">
                {name}
            </button>
        </form>
        
    );

}

export default UserProfileFunc