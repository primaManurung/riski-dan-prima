import React, { useContext, useState } from "react";
import { Button, Form, Input } from "antd";
import { UserContext } from "./UserContext";
import axios from "axios";

const Change = () => {
  const [user, setUser] = useContext(UserContext);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

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
    }
    user.password(password);
  };

  return (
    <>
      <h1>{user.name}</h1>
      <h1>{user.email}</h1>
      <h1>{user.password}</h1>

      <input onChange={inputPassword}></input>
      <input onChange={inputPassword2}></input>

      <button onClick={changePassword}>Submit</button>
    </>
  );
};
export default Change;
