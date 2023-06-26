import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { RouteURL, Redirects } from '../../language/constant.js';

export default function Signup (){

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [sex, setSex] = useState("");
    const navigate = useNavigate();

    const redirectToHome = () =>{
        navigate(Redirects.home);
    }

    const json = JSON.stringify({
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: password,
        sex: sex
    });

    const handleSignup = async(e) =>{
        e.preventDefault()
        console.log("json ",json);
        let response;
        try {
            response = await axios.post(RouteURL.sign_up, json, {
                headers : {
                    "Content-Type" : "application/json"
                }
            })
            if(response.status === 201){
                redirectToHome();
            }
        } catch (err) {
            alert(err)
            console.log(err);
        }
    };

    return(
        <div>
           
            <form>
                <div className="header">
                    <h3>Personal Data</h3>
                </div>
                <div>
                    <input placeholder="firstname" type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
                </div>
                <div>
                    <input placeholder="lastname" type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
                </div>
                <div>
                    <input placeholder="email" type="text" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div>
                    <input placeholder="password" type="text" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <div>
                    <input placeholder="gender" type="text" value={sex} onChange={(e)=>setSex(e.target.value)}/>
                </div>
                <div>
                    <button onClick={handleSignup} value={"continue"}>continue</button>
                </div>
            </form>
        </div>
    );
};