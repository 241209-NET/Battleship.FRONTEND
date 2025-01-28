
import React, { useState } from 'react';
import './Login.css';

export default function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        const userdata = {
            "accountName": name,
            "email": email,
            "password": password
        };
        // console.log(userdata);

        const response = await fetch(
            'http://localhost:5298/register',
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
            setMsg(`${name} Registered Succesfully. Login with ${email}`);
            
        } else {            
            setMsg(json.message);
        }
    };

    return(
        <div className="register-wrapper">
        <h1>Register Here</h1>
            <form className='register-form' onSubmit={handleSubmit}>
                <label>
                    <p>Full Name</p>
                    <input 
                        type="text"
                        required
                        value={name} 
                        onChange={
                            (e) => setName(e.target.value)
                        } 
                    />
                </label>
                <label>
                    <p>Email ID</p>
                    <input 
                        type="text"
                        required
                        value={email} 
                        onChange={
                            (e) => setEmail(e.target.value)
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
                    <button type="submit" className='register-button'>Register</button>
                </div>
                <p> { msg } </p>
            </form>
        </div>
    )
}
