import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import Note from "../components/Note"
import "../styles/Home.css"
import "../styles/Form.css"
import LoadingIndicator from "./LoadingIndicator";
//import { usernameStore,webIdStore,conIdStore,ownerStore,trusteeStore,contractorStore } from "../constants";



function Home1() {

    const owner = localStorage.getItem('ownerStore');
    const contractor = localStorage.getItem('contractorStore');
    const trustee = localStorage.getItem('trusteeStore');
    localStorage.getItem('webIdStore');
    localStorage.getItem('conIdStore');
    localStorage.getItem('usernameStore');
    console.log(localStorage.getItem('ownerStore'));
    console.log(localStorage.getItem('contractorStore'));
    console.log(localStorage.getItem('trusteeStore'));
    console.log(localStorage.getItem('webIdStore'));
    console.log(owner, contractor, trustee);

    if(owner === "true" && contractor === "true" && trustee === "true" ){
    return (
        <div>
            <div>
                <h1>GMA USER PORTAL</h1>
            </div>
            <h4>Welcome To The GMA Portal</h4>
            <form>
            <li class='form-button'><Link to ="/ownerLanding">OwnerLanding</Link> </li>
            </form>
            <form>
            <li class='form-button'><Link to ="/trusteeLanding">TrusteeLanding</Link> </li>
            </form>
            <form>
            <li class='form-button'><Link to ="/contractorLanding">ContractorLanding</Link> </li>
            </form>
        </div>
    );
}else{if(owner === "false" && contractor === "true" && trustee === "true" )
    {
        return (
            <div>
                <div>
                    <h1>GMA USER PORTAL</h1>
                </div>
                <h4>Welcome To The GMA Portal</h4>
                <form>
                <li class='form-button'><Link to ="/trusteeLanding">TrusteeLanding</Link> </li>
                </form>
                <form>
                <li class='form-button'><Link to ="/contractorLanding">ContractorLanding</Link> </li>
                </form>
                </div>
        );
    }
    else{
        if(owner === "false" && contractor === "false" && trustee === "true" ){
            return (
                <div>
                    <div>
                        <h1>GMA USER PORTAL</h1>
                    </div>
                    <h4>Welcome To The GMA Portal</h4>
                    <form>
                     <li class='form-button'><Link to ="/trusteeLanding">TrusteeLanding</Link> </li>
                    </form>
                </div>
            );
        }
        else{
            if(owner === "false" && contractor === "true" && trustee === "false" ){
                return (
                    <div>
                        <div>
                            <h1>GMA USER PORTAL</h1>
                        </div>
                        <h4>Welcome To The GMA Portal</h4>
                        <form>
                        <li class='form-button'><Link to ="/contractorLanding">ContractorLanding</Link> </li>
                        </form>
                    </div>
                );
            } else{
                if(owner === "true" && contractor === "false" && trustee === "false" ){
                    return (
                        <div>
                            <div>
                                <h1>GMA USER PORTAL</h1>
                            </div>
                            <h4>Welcome To The GMA Portal</h4>
                            <form>
                            <li class='form-button'><Link to ="/ownerLanding">OwnerLanding</Link> </li>
                            </form>
                        </div>
                    );
                }
                else{if(owner === "true" && contractor === "true" && trustee === "false" )
                    {
                        return (
                            <div>
                                <div>
                                    <h1>GMA USER PORTAL</h1>
                                </div>
                                <h4>Welcome To The GMA Portal</h4>
                                <form>
                                 <li class='form-button'><Link to ="/ownerLanding">OwnerLanding</Link> </li>
                                 </form>
                                 <form>
                                <li class='form-button'><Link to ="/contractorLanding">ContractorLanding</Link> </li>
                                </form>
                            </div>
                        );
                    }else{
                        if(owner === "true" && contractor === "false" && trustee === "true" )
                            {
                                return (
                                    <div>
                                        <div>
                                            <h1>GMA USER PORTAL</h1>
                                        </div>
                                        <h4>Welcome To The GMA Portal</h4>
                                        <form>
                                          <li class='form-button'><Link to ="/ownerLanding">OwnerLanding</Link> </li>
                                        </form>
                                        <form>
                                            <li class='form-button'><Link to ="/trusteeLanding">TrusteeLanding</Link> </li>
                                        </form>
                                    </div>
                                );
                            }else{
                                return (
                                <div>
                                    <div>
                                        <h1>GMA USER PORTAL</h1>
                                    </div>
                                    <h4>Welcome To The GMA Portal</h4>
                                    <form onSubmit={createNote}>
                                    <h1>You do not have access to any portals, please contact us.</h1>
                                    </form>
                                </div>
                            );
                        }
                    }
                }  
        }
    }
    }
}
}
export default Home1;