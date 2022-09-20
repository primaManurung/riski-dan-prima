import React, { useContext } from "react";
import { Button, Form, Input } from "antd";
import { UserContext } from "./UserContext";
import axios from "axios";

const Register = () => {
  const [, setUser] = useContext(UserContext);

  const onFinish = (values) => {
    let { name, email, password } = values;

    axios
      .post("https://super-bootcamp-backend.sanbersy.com/api/register", {
        name,
        email,
        password,
      })
      .then((res) => {
        var user = res.data.user;
        var token = res.data.token;
        var currentUser = { name: user.name, email: user.email, token };
        setUser(currentUser);
        localStorage.setItem("user", JSON.stringify(currentUser));
        alert("Register Berhasil");
      })
      .catch((err) => {
        alert(err);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div className="MainContainer">
        <h1 className="gamesTittle">Register Form</h1>
        <Form
          name="basic"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 5,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            className="textColor"
            label="Name"
            name="name"            
            rules={[
              {
                required: true,
                message: "Please input your Name!",
              },
              
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            className="textColor"
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            className="textColor"
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            className="textColor"
            wrapperCol={{
              span: 10,
            }}
          >
            <Button className="btnTableGame" type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Register;
