import { useState } from "react";
import NavBar from "./NavBar";

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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
            password
        }
        console.log(user)
        const url = 'http://localhost:8000/token/'
        const data = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        }).then((response) => response.json());
            console.log('Data is', data);
            const {access, refresh} = data;
            if (access !== undefined) {
                window.location.href = '/WelcomePage';
                localStorage.clear();
                localStorage.setItem('access_token',access)
                localStorage.setItem('refresh_token', refresh)
            }
            
    }

    return (
        <form onSubmit={handleSubmit}>
            <NavBar/>
            <label>Username
              <input type="text" name="username" value={username} onChange={handleChangeUsername}></input>
            </label>
            <label>Password
              <input type="password" name="password" value={password} onChange={handleChangePassword}></input>
            </label>
            <button type="submit">Login</button>
        </form>
    )
}