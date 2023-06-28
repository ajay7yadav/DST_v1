import React, { useState, useEffect } from "react";
import axios from "axios";
import { RouteURL } from "../../language/constant";
import './profile.css';

export default function Profile() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [Email, setEmail] = useState("");
  const userid = localStorage.getItem("key");
  const [edit , setEdit] = useState(true);
  const [address , setAddress] = useState("");
  const [phone , setPhone] = useState("");

  const getProfile = async () => {
    try {
      const res = await axios.get(`${RouteURL.getProfile}?dst_id=${userid}`);

      setFirstname(res.data.data.firstname);
      setLastname(res.data.data.lastname);
      setEmail(res.data.data.email);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  },[]);

  const HandlerEdit = ()=>{
    if(edit === false){
      setEdit(true);
    }
    else{
      setEdit(false);
    }
  }

  const updateJSON = {
    firstname : firstname,
    lastname : lastname,
    address : address,
    phone : phone,
    updated_at : Date.now()
  }
  const HandlerUpdate = async()=>{
  
    try {
      const res = await axios.put(`${RouteURL.updateProfile}?dst_id=${userid}`,updateJSON,{
        headers : {
          "Content-Type" : "Application/json"
        }
      });
      if(res.data.status === true){
        setEdit(true);
      }
    } catch (err) {
      setEdit(true);
      console.log(err);
    }

  }

  return (
    <div className="">
      <div className="row">
        <div className="col-mb-12">
            <div>
              <label>Firstname : </label>
              <input 
                className="mt-3 m-2"
                type="text"
                placeholder=""
                value={firstname}
                onChange={(e)=> setFirstname(e.target.value)}
                readOnly={edit}
              />
            </div>

            <div>
              <label className="col-form-label">Lastname : </label>
              <input 
                className="mt-3 m-2"
                type="text"
                placeholder=""
                value={lastname}
                onChange={(e)=> setLastname(e.target.value)}
                readOnly={edit}
              />
            </div>

            <div>
              <label>Email : </label>
              <input 
                className="mt-3 m-2"
                placeholder=""
                value={Email}
                onChange={(e)=>{ setEmail(e.target.value)}}
                disabled={true}
                readOnly={edit}
              />
            </div>

            <div>
              <label>Address : </label>
              <input 
                className="mt-3 m-2"
                placeholder=""
                value={address}
                onChange={(e)=>{ setAddress(e.target.value)}}
                readOnly={edit}
              />
            </div>

            <div>
              <label>Mobile : </label>
              <input 
                className="mt-3 m-2"
                placeholder=""
                value={phone}
                onChange={(e)=>{ setPhone(e.target.value)}}
                readOnly={edit}
              />
            </div>

            <div>
              <button className="btn edit" onClick={()=> HandlerEdit() }>Edit</button>
            </div>

            <div>
              <button className="btn premium-btn" onClick={()=> HandlerUpdate() }>Update Profile</button>
            </div>
        </div>
      </div>
    </div>
  );
}
