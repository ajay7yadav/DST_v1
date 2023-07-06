import React, { useState, useEffect } from "react";
import axios from "axios";
import { RouteURL } from "../../language/constant";
import "./profile.css";
import sideImg from "../../image/slider-img.jpg";
import defaultImg from "../../image/dmy-avt.png";

export default function Profile() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [Email, setEmail] = useState("");
  const userid = localStorage.getItem("key");
  const [edit, setEdit] = useState(true);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState({ preview: "", raw: "" });

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
    } else {
      setEdit(false);
    }
  };

  const updateJSON = {
    firstname: firstname,
    lastname: lastname,
    address: address,
    phone: phone,
    updated_at: Date.now(),
  };
  const HandlerUpdate = async () => {
    try {
      const res = await axios.put(
        `${RouteURL.updateProfile}?dst_id=${userid}`,
        updateJSON,
        {
          headers: {
            "Content-Type": "Application/json",
          },
        }
      );
      if (res.data.status === true) {
        setEdit(true);
      }
    } catch (err) {
      setEdit(true);
      console.log(err);
    }
  };

  const handleChange = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image.raw);

    await fetch("YOUR_URL", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });
  };

  return (
    <>
      <div className="hero_area">
        <section className=" slider_section position-relative">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-7 bg-d">
                <div className="container prf">
                  <div className="col-md-6" style={{textAlign : "center"}}>
                    <label htmlFor="upload-button">
                      <img src={image.preview ? image.preview : defaultImg} alt="dummy" width="300" height="300" className="hover-zoom avatar" />
                    </label>
                    <input
                      type="file"
                      id="upload-button"
                      style={{ display: "none" }}
                      onChange={handleChange}
                    />
                    <br />
                    <button onClick={handleUpload} className="btn btn-success upl-btn">Upload</button>
                  </div>
                  <div className="col-6 ">
                    <label className="form-label"> Firstname : </label>
                    <input
                      className="form-control rad"
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
                      className="form-control rad"
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
                      className="form-control rad"
                      placeholder=""
                      value={Email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      disabled={true}
                      readOnly={edit}
                    />
                  </div>

                  <div className="col-6">
                    <label className="form-label">Address : </label>
                    <input
                      className="form-control rad"
                      placeholder=""
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                      readOnly={edit}
                    />
                  </div>

                  <div className="col-6">
                    <label className="form-label">Mobile : </label>
                    <input
                      className="form-control rad"
                      placeholder=""
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
                      readOnly={edit}
                    />
                  </div>

                  <div className="col-6 btn-rad d-flex justify-content-between">
                    <button
                      className="btn btn-warning cl-btn"
                      onClick={() => HandlerEdit()}
                    >
                      Edit Profile
                    </button>
                    <button
                      className="btn btn-success cl-btn"
                      onClick={() => HandlerUpdate()}
                    >
                      Update Profile
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-5 px-0">
                <div className="img-box">
                  <img src={sideImg} alt="" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
