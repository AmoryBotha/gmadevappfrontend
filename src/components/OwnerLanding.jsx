import React from 'react';
import { Link } from 'react-router-dom';

const webID = localStorage.getItem('webIdStore') || 'N/A';
const conId = localStorage.getItem('conIdStore') || 'N/A';
const mail = localStorage.getItem('usernameStore') || 'N/A';

function OwnerLanding1() {
    return (
        <div>
            <h1>OWNER LANDING PAGE</h1>
            <h1>ACCOUNTS</h1>
            <p>Under Construction...</p>

            <div>
                <h4>Accounts Linked To Your Account</h4>
                <p>ABC</p>
                <div>
                    <div className="inline-container">
                        <div className="inline-box">
                            <strong>Owner Account Number</strong>
                            <p>Test Acc</p>
                        </div>
                        <div className="inline-box">
                            <strong>Reg/ID No</strong>
                            <p>645395938</p>
                        </div>
                        <div className="inline-box">
                            <strong>Phone Number</strong>
                            <p>09876789980</p>
                        </div>
                        <div className="inline-box">
                            <strong>Email</strong>
                            <p>{mail}</p>
                        </div>
                        <div className="inline-box">
                            <li className="form-button">
                                <Link to="/account">Modify</Link>
                            </li>
                        </div>
                    </div>

                    <div className="inline-container">
                        <div className="inline-box">
                            <strong>Levy Account</strong>
                            <p>GMA001</p>
                        </div>
                        <div className="inline-box">
                            <strong>Building</strong>
                            <p>Test BC</p>
                        </div>
                        <div className="inline-box">
                            <strong>Door Number</strong>
                            <p>8</p>
                        </div>
                        <div className="inline-box">
                            <strong>Current Balance</strong>
                            <p>R 9000,09</p>
                        </div>
                        <div className="inline-box">
                            <li className="form-button">
                                <Link to="/statement">Download Statement</Link>
                            </li>
                        </div>
                        <div className="inline-box">
                            <li className="form-button">
                                <Link to="/levyAccounts">Edit</Link>
                            </li>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OwnerLanding1;