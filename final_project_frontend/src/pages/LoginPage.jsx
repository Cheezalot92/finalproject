import { useState } from "react";
import styled from "styled-components";

const LoginForm = styled.form`
  background-color: #d90b0b;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  margin: 0 auto;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  background-color: #0c0c0c;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;





export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username,
      password,
    };
    console.log(user);
    const url = "http://localhost:8000/token/";
    const data = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((response) => response.json());
    console.log("Data is", data);
    const { access, refresh } = data;
    if (access !== undefined) {
      window.location.href = "/WelcomePage";
      localStorage.clear();
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
    }
  };

  return (
    <LoginForm onSubmit={handleSubmit}>
      <Label>
        Username
        <Input
          type="text"
          name="username"
          value={username}
          onChange={handleChangeUsername}
        ></Input>
      </Label>
      <Label>
        Password
        <Input
          type="password"
          name="password"
          value={password}
          onChange={handleChangePassword}
        ></Input>
      </Label>
      <Button type="submit" disabled={ !password || !username}>Login</Button>
    </LoginForm>
  );
}
