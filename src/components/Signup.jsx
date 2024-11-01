import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
//import { ACCESS_TOKEN, REFRESH_TOKEN, fnameStore,lnameStore,cellStore,idStore,usernameStore,webIdStore,conIdStore,ownerStore,trusteeStore,contractorStore } from "../constants";
import "../styles/Form.css"
import LoadingIndicator from "./LoadingIndicator";
import { ACCESS_TOKEN, REFRESH_TOKEN, fnameStore,lnameStore,cellStore,idStore,usernameStore,webIdStore,conIdStore } from "../constants";

function Form({ route, method }) {
    const [fname, setFName] = useState("");
    const [lname, setLName] = useState("");
    const [password, setPassword] = useState("");
    const [cell, setCell] = useState("");
    const [id, setID] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = "Register";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            //Replace with flow that creates user profile on DV eventually replace with Sirveo Link
          const data = await fetch("https://prod-91.westeurope.logic.azure.com:443/workflows/4e1c017f70d748bb9a1fefbfbfad48bf/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=a9p6TXKcwsjITmZyWkkLybBeTOgg0ddf976m69dZE-0", {
            method: "POST",
            body: JSON.stringify({
            "fname1" : fname,
            "lname1" : lname,
            "email1" : username,
            "cell1" : cell,
            "id1" : id

            }),headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
      });
        const dataRes = await data.json();
        //Set LocalStorage Items For User
        localStorage.setItem('fnameStore', fname);
        localStorage.setItem('lnameStore', lname);
        localStorage.setItem('cellStore', cell);
        localStorage.setItem('idStore', id);
        localStorage.setItem('usernameStore', username);
        localStorage.setItem('webIdStore', dataRes.UserP);
        localStorage.setItem('conIdStore', dataRes.ContactID);
        localStorage.setItem('ownerStore', dataRes.accOwn);
        localStorage.setItem('trusteeStore', dataRes.accTrus);
        localStorage.setItem('contractorStore', dataRes.accCont);
        console.log(dataRes.accOwn,dataRes.accTrus,dataRes.accCont);
        console.log(localStorage.getItem('trusteeStore'));
        console.log(localStorage.getItem('webIdStore'));

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
                <h1>Welcome to the GMA Portal</h1>
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
                placeholder="First Name"
            />
            <div class='text'>
                <p>Last Name</p>
            </div>
            <input
                className="form-input"
                type="text"
                value={lname}
                onChange={(e) => setLName(e.target.value)}
                placeholder="Last Name"
            />
            <div class='text'>
                <p>Mobile Number</p>
            </div>
            <input
                className="form-input"
                type="text"
                value={cell}
                onChange={(e) => setCell(e.target.value)}
                placeholder="Mobile Number"
            />
            <div class='text'>
                <p>ID Number</p>
            </div>
            <input
                className="form-input"
                type="text"
                value={id}
                onChange={(e) => setID(e.target.value)}
                placeholder="ID Number"
            />
            <div class='text'>
                <p>Email</p>
            </div>
            <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <div class='text'>
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
            <button className="form-button" type="submit">
                {name}
            </button>
        </form>
    );

}

export default Form