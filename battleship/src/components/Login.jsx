
import React, { useState, useEffect } from 'react';
import './Login.css';
import { useNavigate } from 'react-router';

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
        // console.log(userdata);

        const response = await fetch(
            'http://localhost:5298/login',
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
            
            console.log(json);
            sessionStorage.setItem('userjwttoken', json['token']);
            sessionStorage.setItem('username', username);
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
                    <p>Username</p>
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

