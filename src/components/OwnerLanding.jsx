const webID = localStorage.getItem('webIdStore');
const conId = localStorage.getItem('conIdStore');
const mail = localStorage.getItem('usernameStore');

function OwnerLanding1(){
    return <div>
        <h1>OWNER LANDING PAGE</h1>
        <h1>ACCOUNTS</h1>
        <p>Under Construction...</p>

        <div>
            <h4>Accounts Linked To Your Account</h4>
            <p>ABC</p>
            <div>
            <div className="inline-container">
            <div className="inline-box">
            Owner Account Number
            <p>Test Acc</p>
            </div>
            <div className="inline-box">
            Reg/ID No
            <p>645395938</p>
            </div>
            <div className="inline-box">
            Phone Number
            <p>09876789980</p>
            </div>
            <div className="inline-box">
            Email
            <p>{mail}</p>
            </div>
            <div className="inline-box">
            <button className="form-button" type="submit">
                Modify
            </button>
            </div>
            </div>
            
            
            <div className="inline-container">
            <div className="inline-box">
            Levy Account
            <p>GMA001</p>
            </div>
            <div className="inline-box">
            Building
            <p>Test BC</p>
            </div>
            <div className="inline-box">
            Door Number
            <p>8</p>
            </div>
            <div className="inline-box">
            Current Balance
            <p>R 9000,09</p>
            </div>
            <div className="inline-box">
            <button className="form-button" type="submit">
                Download Statement
            </button>
            </div>
            <div className="inline-box">
            <button className="form-button" type="submit">
                Edit
            </button>
            </div>
            </div>
            </div>
        </div>
    </div>

}

export default OwnerLanding1