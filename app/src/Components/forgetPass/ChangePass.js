import React, { useState } from "react";
import axios from "axios";
import { RouteURL } from "../../language/constant";

const ChangePass = () => {
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [err, setErr] = useState("");
  const [changeStatus, setChangeStatus] = useState(false);
  const [inputBlock, setInputBlock] = useState(false);
  const userId = localStorage.getItem("key");

  const json = JSON.stringify({
    newpass1: password,
    newpass2: repassword,
  });
  const handleChangePass = async () => {
    try {
      const response = await axios.post(
        `${RouteURL.updatePass}?dst_id=${userId}`,
        json,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.status === true) {
        setInputBlock(true);
        setChangeStatus(true);
      }
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-mb-12">
          <div>
            <h2>Change Your Password</h2>
          </div>
          <div>
            <input
              placeholder="new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={inputBlock}
            />
          </div>
          <div>
            <input
              placeholder="re enter password"
              value={repassword}
              onChange={(e) => setRePassword(e.target.value)}
              disabled={inputBlock}
            />
            {err.status === false && <p>{err.message}</p>}
          </div>
          <div>
            <button onClick={handleChangePass} disabled={changeStatus}>
              submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePass;
