import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { Redirects } from '../../language/constant.js';

const Home = () => {
    
    const navigate = useNavigate();
    
    const handleSignIn = ()=>{
        navigate(Redirects.signin);
    }

    const handleSignUp = ()=>{
        navigate(Redirects.signup);
    }

  return (
    <>
      <div className="head-home">
        <h2> Welcome to Todo</h2>
      </div>
      <div className="dst-signin">
        <button onClick={handleSignIn}>Sign In</button>
      </div>
      <div className="dst-signup">
        <button onClick={handleSignUp}>Sign Up</button>
      </div>
    </>
  );
};

export default Home;
