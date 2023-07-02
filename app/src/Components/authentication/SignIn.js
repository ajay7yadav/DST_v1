import React, { useState } from "react";
import "./Auth.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RouteURL, Redirects } from "../../language/constant.js";
import logo from "../../image/slider.png"
import "./Auth.css";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(Redirects.todo);
  };

  const handleForgetRedirect = () => {
    navigate(Redirects.forget);
  };

  const json = JSON.stringify({
    email: email,
    password: password,
  });

  const handleSignIn = async () => {
    try {
      const res = await axios.post(RouteURL.sign_in, json, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.data.status === true) {
        localStorage.setItem("key", res.data.data.dst_id);
        handleRedirect();
      }

    } catch (err) {
      setError(err.response.data);
    }
  };

  console.log("User ", email, password);

  return (
    <>

      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="row">
              <div className="col-lg-6  ">
                <div className="main-banner">

                </div>
                <div className="mt_150">

                  <header className="sign-header"></header>
                  <h3>Sign in your account</h3>
                  <div className="">
                    <form>
                      <label className="form-label">Email</label>
                      <input
                        placeholder="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <p color="red">
                        {error.data === 1
                          ? "email not found"
                          : error.data === 0
                            ? "enter email"
                            : ""}
                      </p>
                      <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                          placeholder="password"
                          className="form-control"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <p color="red">
                          {error.data === 2
                            ? "password not matched"
                            : error.data === 0
                              ? "enter password"
                              : ""}
                        </p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <button className="btn btn-success" onClick={handleSignIn}>Sign in</button>
                        <button className="btn btn-primary" onClick={handleForgetRedirect}>
                          Forget Password
                        </button>
                      </div>

                    </form>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div
                  className="right-image wow fadeInRight"
                  data-wow-duration="1s"
                  data-wow-delay="0.5s"
                >
                  <img className="w-100" src={logo} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>

  );
}
