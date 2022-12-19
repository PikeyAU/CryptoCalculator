import React from 'react';
import Navbar from './components/navbar';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';


const Login = () => {
    return (
        <div style = {{background: '#282c34', height: '100vh'}}>
            <Navbar />
            <LoginForm />
            <SignUpForm />
        </div>
    );
}

export default Login;