
import React, { useState } from 'react';
import './css/Login.css';

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
            `${import.meta.env.VITE_API}/register`,
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
            setMsg(`${name} Registered Succesfully. Login with ${email}`);
            
        } else if(response.status == 400) {
            
            let errors = Array.from(json.errors);
            let error_msg = '';
            errors.forEach((error) => {
                error_msg += error.description + "\n";
            });            
            setMsg(error_msg);
        } else {            
            setMsg(json.message);
        }
    };

    return(
        <div className="register-wrapper">
        <h1>Register Here</h1>
            <form className='register-form' onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
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
                    <p>Email</p>
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
