
import React, { useState } from 'react';
import './css/Login.css';
import { useNavigate } from 'react-router';
import { jwtDecode } from 'jwt-decode';


export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errormsg, setErrormsg] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userdata = {
            "email": username,
            "password": password
        };

        const response = await fetch(
            `${import.meta.env.VITE_API}/login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userdata)
            }
        );

        const json = await response.json();

        if (response.ok){
            sessionStorage.setItem('token', json['token']);
            sessionStorage.setItem('username', username);
            const token = sessionStorage.getItem("token");
            let decodedToken = jwtDecode(token);          
            sessionStorage.setItem("userid",decodedToken.UserID);
            sessionStorage.setItem("accountName", decodedToken.UserAccount);
            setErrormsg('');
            navigate('/Home');
        } else {
            if (sessionStorage.getItem('userjwttoken')) {
                sessionStorage.removeItem('userjwttoken');
            }
            if (sessionStorage.getItem('username')) {
                sessionStorage.removeItem('username');
            }
            setErrormsg(json.message);
        }
    };

    return(
        <div className="login-wrapper">
        <h1>Log In</h1>
            <form className='login-form' onSubmit={handleSubmit}>
                <label>
                    <p>Email</p>
                    <input 
                        type="text"
                        required
                        value={username} 
                        onChange={
                            (e) => setUsername(e.target.value)
                        }
                    />
                </label>
                <label>
                    <p>Password</p>
                    <input 
                    type="password"                    
                    required
                    value={password} 
                    onChange={
                        (e) => setPassword(e.target.value)
                    }
                    />
                </label>
                <div>
                    <button type="submit" className='login-button' >Login</button>
                </div>
                <p> { errormsg } </p>
            </form>
        </div>
    )
}

