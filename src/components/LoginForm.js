import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/login/', {
            username: username,
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
                <label for="password">Password</label>
                <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginForm;



