import React, { useState } from "react";
import "./Auth.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RouteURL, Redirects } from "../../language/constant.js";

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

  console.log("User ",email, password);

  return (
    <div>
      <div className="container fluid">
        <div className="row">
          <div className="col-xl-2 col-lg-2 col-md-6 col-sm-12 m-auto">
            <header className="sign-header"></header>
            <h3>Sign in your account</h3>
            <div className="">
              <form>
                <label>Email</label>
                <input
                  placeholder="email"
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
                  <label>Password</label>
                  <input
                    placeholder="password"
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
                <div>
                  <button onClick={handleSignIn}>Sign in</button>
                </div>
                <div>
                  <button onClick={handleForgetRedirect}>
                    Forget Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
