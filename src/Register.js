import React from 'react';
import Navbar from './components/navbar';
import RegisterForm from './components/RegisterForm';


const Login = () => {
    return (
        <div style = {{background: '#282c34', height: '100vh'}}>
            <Navbar />
            <RegisterForm />
        </div>
    );
}

export default Login;