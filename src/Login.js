import React from 'react';
import Navbar from './components/navbar';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


const Login = () => {
    return (
        <div style = {{background: '#282c34', height: '100vh'}}>
            <Navbar />
            <LoginForm />
        </div>
    );
}

export default Login;