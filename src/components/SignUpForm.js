import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SignUpForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/register/', {
            username: username,
            email: email,
            password: password
            })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
                setError('Invalid username or password');
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label for="username">Username</label>
                <input type="text" name="text" id="text" value={username} onChange={e => setUsername(e.target.value)} />
                <label for = "email">Email</label>
                <input type="text" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
                <label for="password">Password</label>
                <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                <label for="firstName">First Name</label>
                <input type="text" name="firstName" id="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} />
                <label for="lastName">Last Name</label>
                <input type="text" name="lastName" id="lastName" value={lastName} onChange={e => setLastName(e.target.value)} />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUpForm;