import React, { useState } from "react";
import axios from "axios";
import { RouteURL, Redirects } from "../../language/constant.js";
import { useNavigate } from 'react-router'

const ForgetPass = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [err, setErr] = useState("");
  const [sent, setSent] = useState(false);
  const [userId, setUserId] = useState("");
  const [otpErr, setOTPErr] = useState("");
  const navigate = useNavigate();

  const json = JSON.stringify({
    email: email,
  });
  const handlerSendOTP = async () => {
    try {
      const response = await axios.post(RouteURL.forget, json, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.status === true) {
        setUserId(response.data.data)
        setSent(true);
        setErr("");
      }
    } catch (err) {
      setErr(err.response.data);
      setSent(false);
      setUserId("");
    }
  };

  const handleMatchOTP = async ()=>{
    try {
        const respose = await axios.get(`${RouteURL.matchOtp}?dst_id=${userId}&otp=${otp}`);

        if(respose.data.status === true){
          navigate(Redirects.updatePass);
          setOTPErr("");
          localStorage.setItem("key", userId)
        }

    } catch (err) {
      setOTPErr(err.response.data);
    }
  }
  console.log("otpErr ",otpErr);

  return (
    <>
      <div>
        <h2>Forget Your Password</h2>
      </div>
      <div>
        <label>Enter Your Email : </label>
        <input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handlerSendOTP}>Send OTP</button>
        {err.data === 1 && (
          <p>email not found</p>
        )}
      </div>

      {sent === true && (
          <div>
            <p>A one time password sent to your email {<b>{email} </b>}please confirm</p>
            <input
              placeholder="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            {otpErr.status === false && (
              <p>{otpErr.message}</p>
            )}
            <button 
              onClick={handleMatchOTP}
              // disabled={}
            >submit</button>
          </div>
      )}
    </>
  );
};

export default ForgetPass;
