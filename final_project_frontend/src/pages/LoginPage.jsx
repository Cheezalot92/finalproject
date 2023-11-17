import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";



const Background = styled.div`
  background-image:url(/background2.png);
  background-size: cover;
  background-position: center;
  height: 110vh;
  width: 130vw;
  display: flex;
  flex-direction: column;
  /* justify-content: space-around; */
`



const LoginForm = styled.form`
  background-color: #090909;
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
  width: 80%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  background-color: #ffba08;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const LoginTitle = styled.h1`
  background-color: #00000086;
  background-size:contain;
  margin: 0;
  margin-top: 140px;
  color:#ffba08;
`;

const LoginH2 = styled.h2`
  color:#ffb700;
  margin:0;
  margin-bottom:200px;
  background-color: #00000086;
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
    const { access, refresh, user_id, avatar } = data;
    if (access !== undefined) {
      window.location.href = "/WelcomePage";
      localStorage.clear();
      localStorage.setItem("access_token", access);
      localStorage.setItem("user_id", user_id);
      localStorage.setItem("refresh_token", refresh);
      localStorage.setItem("username", username)
      localStorage.setItem("avatar", avatar )
    }
  };

  return (
    <>
      <Background>
      <LoginTitle>AllAnime!</LoginTitle>
      <LoginH2>Your one-stop destination for all things anime!</LoginH2>
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
      <Button type="submit" disabled={!password || !username}>
        Login
      </Button>
      <p>
        If you don't have an account , register here{" "}
        <Link to="/register">Register Here</Link>
      </p>
        </LoginForm>
        </Background>
      </>
  );
}
