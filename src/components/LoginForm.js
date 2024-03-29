import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const loginFormStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '19vh'
  };

const buttonWrapperStyles = {
  display: 'flex',
  justifyContent: 'center',
};

const inputStyles = {
    display: 'inline-block',
    width: '36%',
    marginTop: '5px',
    marginBottom: '5px',
    marginLeft: '20px',
    verticalAlign: 'middle',
    fontSize: '18px',
    borderRadius: 5,
    background: '#282c34',
    color: 'white',
    border: '1px solid white',
    fontFamily: 'Eras Light ITC',
    letterSpacing: '1px',
    padding: '5px 5px 5px 5px',
    

}

const labelStyles = {
    color: 'white',
    fontSize: '24px',
    fontFamily: 'Eras Light ITC',
    letterSpacing: '2px',
    textAlign: 'left',
    marginRight: '10px',
    display: 'inline-block',
    width: '50%',
}

const linkStyles = {
    color: 'white',
    fontSize: '18px',
    fontFamily: 'Eras Light ITC',
    letterSpacing: '2px',
    display: 'inline-block',
    width: '100%',
    textDecoration: 'none',
    margin: 'auto',
}


function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isHover, setIsHover] = useState(false);
    const [linkHover, setLinkHover] = useState(false);

   

    const submitStyles = {
        display: 'inline-block',
        width: '36%',
        marginTop: '5px',
        marginBottom: '5px',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
        verticalAlign: 'middle',
        fontSize: '18px',
        borderRadius: 5,
        background: '#282c34',
        color: 'white',
        border: '1px solid white',
        fontFamily: 'Eras Light ITC',
        letterSpacing: '1px',
        padding: '5px 5px 5px 5px',
        boxShadow: isHover ? '0px 0px 10px 0px white' : '0px 0px 10px 0px black',
        cursor: 'pointer',
        backgroundColor: isHover ? '#DB7D13' : '#282C34',
    }

    const linkAdditionalStyles = {
        color: linkHover ? '#DB7D13' : 'white'
    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            username: username,
            password: password
        };
        const {data} = await axios.post('http://localhost:8000/api/token/', user,
        {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token')}})

        localStorage.clear();
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);

        axios.defaults.headers.common['Authorization'] = `Bearer ${data['access']}`;
        window.location = '/';
         
    };

    const handleMouseEnter = () => {
        setIsHover(true);
    }

    const handleMouseLeave = () => {
        setIsHover(false);
    }

    const handleLinkEnter = () => {
        setLinkHover(true);
    }

    const handleLinkLeave = () => {
        setLinkHover(false);
    }


    return (
        <div style = {loginFormStyles}>
            <form onSubmit={handleSubmit} style = {{display: 'inline-block', textAlign: 'left', padding: '50px 75px 50px 75px',  borderRadius: 50, background: '#282c34', boxShadow:  '31px 31px 62px #22252c, -31px -31px 62px #2e333c'}}>
                <label style = {labelStyles} htmlFor="username">Username:</label>
                <input style = {inputStyles} type="text" name="text" id="text" value={username} onChange={e => setUsername(e.target.value)} />
                <br/>
                <label style = {labelStyles} htmlFor="password">Password:</label>
                <input style = {inputStyles} type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                <br/>
                <br/>
            
                <p style={linkStyles}>Don't have an account?</p>
                <br/>
                <Link style = {Object.assign({}, linkStyles, linkAdditionalStyles)} onMouseEnter = {handleLinkEnter} onMouseLeave = {handleLinkLeave}  to="/register">Click Here to Sign Up!</Link>
                <br/>
                <br/>
                <div style={buttonWrapperStyles}>
                    <button style = {submitStyles} onMouseEnter = {handleMouseEnter} onMouseLeave = {handleMouseLeave} type="submit">Login</button>
                </div>
                <div>
                    {error ? <p style = {{color: 'red', fontSize: '18px', fontFamily: 'Eras Light ITC', letterSpacing: '2px', textAlign: 'center'}}>{error}</p> : null}
                </div>
            </form>
        </div>
    );
}

export default LoginForm;



