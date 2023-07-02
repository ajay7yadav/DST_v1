import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { RouteURL, Redirects } from '../../language/constant.js';
import hero from "../../image/hero.png"
import "./Auth.css";

export default function Signup() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [sex, setSex] = useState("");
    const navigate = useNavigate();

    const redirectToHome = () => {
        navigate(Redirects.home);
    }

    const json = JSON.stringify({
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: password,
        sex: sex
    });

    const handleSignup = async (e) => {
        e.preventDefault()
        console.log("json ", json);
        let response;
        try {
            response = await axios.post(RouteURL.sign_up, json, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log(response, "response");
            if (response.status === 201) {
                redirectToHome();
            }
        } catch (err) {
            alert(err)
            console.log(err);
        }
    };

    return (
        <>
            <div className="container-xxl position-relative p-0">
                <nav className="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0">
                    <a href="" className="navbar-brand p-0">
                        <h1 className="m-0">DST</h1>
                        {/* <img src="img/logo.png" alt="Logo"> */}
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarCollapse"
                    >
                        <span className="fa fa-bars" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <a href="" className="btn rounded-pill py-2 px-4 ms-3 d-none d-lg-block">
                            sign in
                        </a>
                    </div>
                </nav>
                <div className="container-xxl bg-primary hero-header">
                    <div className="container px-lg-5">
                        <div className="row g-5 align-items-end">
                         
                            <div className="col-lg-6 text-center text-lg-start boder-p "> 

                                <form>
                                    <div className="header">
                                        <h3>Personal Data</h3>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">First Name</label>
                                        <input className="form-control" placeholder="firstname" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                    <label className="form-label">Last Name</label>
                                        <input className="form-control" placeholder="lastname" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                    <label className="form-label">Email</label>
                                        <input className="form-control" placeholder="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                    <label className="form-label">Password</label>
                                        <input className="form-control" placeholder="password" type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                    <label className="form-label">Gender</label>
                                        <input className="form-control" placeholder="gender" type="text" value={sex} onChange={(e) => setSex(e.target.value)} />
                                    </div>
                                    <div>
                                        <button className="btn btn-success" onClick={handleSignup} value={"continue"}>continue</button>
                                    </div>
                                </form>
                            </div>
                            <div className="col-lg-6 text-center text-lg-start">
                                <img
                                    className="img-fluid animated zoomIn"
                                    src={hero}
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};