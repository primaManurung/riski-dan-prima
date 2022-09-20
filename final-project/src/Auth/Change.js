import React, { useContext, useState } from "react";
import { Button, Form, Input } from "antd";
import { UserContext } from "./UserContext";
import axios from "axios";
import SideNavMenu from "../Layout/Sidenav";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const Change = () => {
  const url = "https://super-bootcamp-backend.sanbersy.com";
  const [user, setUser] = useContext(UserContext);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [fetchTrigger, setFetchTrigger] = useState(true);
  const [name, setInputName] = useState("");
  const [email, setInputEmail] = useState("");
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await axios.get(`${url}/api/change-password/`);
  //     const currentScore = result.data;
  //     // setCurrentId(id);
  //     setInputName(currentScore.name);
  //     setInputEmail(currentScore.email);
  //     setFetchTrigger(false);
  //   };
  //   if (fetchTrigger) {
  //     fetchData();
  //   }
  // }, [fetchTrigger]);

  const test = () => {
    alert(name);
  };

  const inputPassword = (event) => {
    let setValue = event.target.value;
    setPassword(setValue);
  };
  const inputPassword2 = (event) => {
    let setValue = event.target.value;
    setPassword2(setValue);
  };

  const changePassword = (event) => {
    event.preventDefault();
    if (password !== password2) {
      alert("Password Tidak sama");
    } else if (password === password2) {
      alert("Password sama");
      axios.put(`${url}/api/change-password`);
    }
  };

  return (
    <>
      <button onClick={test}>submit</button>
      <div className={user ? `MainContainerUser1` : `MainContainer`}>
        <div className={user ? `SideContainerUser` : `SideContainer`}>
          {user ? <SideNavMenu /> : <></>}
          <div className="MainContainerUser1">
            <div className="gamesTittle">Form Game</div>
            <div>
              <h1>{user.name}</h1>
            </div>
            <div>
              <h1>{user.email}</h1>{" "}
            </div>

            <div>
              password baru :<input onChange={inputPassword}></input>
            </div>
            <div>
              ulangi password :<input onChange={inputPassword2}></input>
            </div>
            <button onClick={changePassword}>Submit</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Change;
