import React, { useState, useEffect } from "react";
import axios from "axios";
import { RouteURL } from "../../language/constant";

export default function Profile() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [Email, setEmail] = useState("");
  const userid = localStorage.getItem("key");

  const getProfile = async () => {
    try {
      const res = await axios.get(`${RouteURL.getProfile}?dst_id=${userid}`);
      console.log("response", res.data.data);

      setFirstname(res.data.data.firstname);
      setLastname(res.data.data.lastname);
      setEmail(res.data.data.email);
    } catch (error) {}
  };

  useEffect(() => {
    getProfile();
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-mb-12">
            <div>
              <label>firstname : </label>
              <input 
                placeholder=""
                value={firstname}
                onChange={(e)=>{ setFirstname(e.target.value)}}
              />
            </div>

            <div>
              <label>lastname : </label>
              <input 
                placeholder=""
                value={lastname}
                onChange={(e)=>{ setLastname(e.target.value)}}
              />
            </div>

            <div>
              <label>email : </label>
              <input 
                placeholder=""
                value={Email}
                onChange={(e)=>{ setEmail(e.target.value)}}
                disabled={true}
              />
            </div>
        </div>
      </div>
    </div>
  );
}
