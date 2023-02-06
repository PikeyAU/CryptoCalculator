import React, { useState } from 'react';
import axios from 'axios';

const registerFormStyle = {
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




function RegisterForm() {

    const [isHover, setIsHover] = useState(false);
    

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

    const handleSubmit = (e) => {
        e.preventDefault();

        const username = e.target.username.value;
        const email = e.target.email.value;
        const first_name = e.target.first_name.value;
        const last_name = e.target.last_name.value;
        const password = e.target.password.value;
        const confirm_password = e.target.confirm_password.value;

        if (password === confirm_password) {
            fetch('http://localhost:8000/api/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    first_name: first_name,
                    last_name: last_name,
                    password: password,
                }),
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            })

            
            const user = {
                username: username,
                password: password
            };
            const {data} = axios.post('http://localhost:8000/api/token/', user,
            {headers: {'Content-Type': 'application/json'}, withCredentials: true})
    
            .then(res => {
                localStorage.clear();
                localStorage.setItem('access_token', res.data.access);
                localStorage.setItem('refresh_token', res.data.refresh);
                window.location = '/';
            })


        } else {
            console.log('Passwords do not match');
        }

        
    }



    return (
        <div style={registerFormStyle}>
            <form onSubmit = {handleSubmit} style = {{display: 'inline-block', textAlign: 'left', padding: '50px 75px 50px 75px',  borderRadius: 50, background: '#282c34', boxShadow:  '31px 31px 62px #22252c, -31px -31px 62px #2e333c'}}>
                <label style={labelStyles}>Username</label>
                <input style={inputStyles} type="text" name="username" placeholder="Username" required></input>
                <br></br>
                <label style={labelStyles}>Email</label>
                <input style={inputStyles} type="email" name="email" placeholder="Email" required></input>
                <br></br>
                <label style={labelStyles}>First Name</label>
                <input style={inputStyles} type="text" name="first_name" placeholder="First Name" required></input>
                <br></br>
                <label style={labelStyles}>Last Name</label>
                <input style={inputStyles} type="text" name="last_name" placeholder="Last Name" required></input>
                <br></br>
                <label style={labelStyles}>Password</label>
                <input style={inputStyles} type="password" name="password" placeholder="Password" required></input>
                <br></br>
                <label style={labelStyles}>Confirm Password</label>
                <input style={inputStyles} type="password" name="confirm_password" placeholder="Confirm Password" required></input>
                <br></br>
                <div style={buttonWrapperStyles}>
                    <button style={submitStyles} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} type = "submit">Register</button>
                </div>
            </form>
        </div>
    );
}

export default RegisterForm;
