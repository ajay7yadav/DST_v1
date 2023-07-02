import React, { useState, useEffect } from "react";
import axios from "axios";
import { RouteURL } from "../../language/constant";
import './profile.css';
import sideImg from "../../image/slider-img.jpg";

export default function Profile() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [Email, setEmail] = useState("");
  const userid = localStorage.getItem("key");
  const [edit, setEdit] = useState(true);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

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
  }, []);

  const HandlerEdit = () => {
    if (edit === false) {
      setEdit(true);
    }
    else {
      setEdit(false);
    }
  }

  const updateJSON = {
    firstname: firstname,
    lastname: lastname,
    address: address,
    phone: phone,
    updated_at: Date.now()
  }
  const HandlerUpdate = async () => {

    try {
      const res = await axios.put(`${RouteURL.updateProfile}?dst_id=${userid}`, updateJSON, {
        headers: {
          "Content-Type": "Application/json"
        }
      });
      if (res.data.status === true) {
        setEdit(true);
      }
    } catch (err) {
      setEdit(true);
      console.log(err);
    }

  }

  return (
    <>
      <div className="hero_area">
        {/* slider section */}
        <section className=" slider_section position-relative">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-5" style={{backgroundColor:"#e0f4f5"}}></div>
              <div className="col-md-6 px-0">
                <div className="img-box">
                  <img src={sideImg} alt="" />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* end slider section */}
      </div>
      <div className="">
        <div className="row">
          <div className="col-mb-12">
            <div className="col-6">
              <label className="form-label"> Firstname : </label>
              <input
                className="form-control"
                type="text"
                placeholder=""
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                readOnly={edit}
              />
            </div>

            <div className="col-6">
              <label className="form-label">Lastname : </label>
              <input
                className="form-control"
                type="text"
                placeholder=""
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                readOnly={edit}
              />
            </div>

            <div className="col-6">
              <label className="form-label">Email : </label>
              <input
                className="form-control"
                placeholder=""
                value={Email}
                onChange={(e) => { setEmail(e.target.value) }}
                disabled={true}
                readOnly={edit}
              />
            </div>

            <div className="col-6">
              <label className="form-label">Address : </label>
              <input
                className="form-control"
                placeholder=""
                value={address}
                onChange={(e) => { setAddress(e.target.value) }}
                readOnly={edit}
              />
            </div>

            <div className="col-6">
              <label className="form-label">Mobile : </label>
              <input
                className="form-control"
                placeholder=""
                value={phone}
                onChange={(e) => { setPhone(e.target.value) }}
                readOnly={edit}
              />
            </div>

            <div className="col-6">
              <button className="btn btn-warning" onClick={() => HandlerEdit()}>Edit</button>
              <button className="btn btn-success" onClick={() => HandlerUpdate()}>Update Profile</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
