import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserDropdown from './UserDropdown';



const Navbar = () => {

    const [username, setUsername] = useState(null);
    const [isAuth, setIsAuth] = useState(false);

    const styles = {
        nav: {
            display: 'flex',
            justifyContent: 'space-around',
            width: '100vw',
            height: '5vh',
            margin: 'auto'
            
        },
        link: {
            marginTop: 15,
            textDecoration: 'none',
            color: 'white',
            marginLeft: '20px',
            fontSize: '2vh'
            
        }
    };

    const getUserInfo = async() => {
        if (localStorage.getItem('access_token') === null) {
            setIsAuth(false);
        } else {
        try {
            const {data} = await axios.get('http://localhost:8000/api/get/user/info',
                {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token')}})
            setUsername(data.username);
            setIsAuth(true);

        } catch (error) {
            console.log(error);
        }
    }
}


    

    useEffect (() => {
        getUserInfo(); 
    }, []);



    return (
        <div>
            <nav style={styles.nav}>

                <Link to="/" style={styles.link}>Home</Link>
                <Link to="/dca" style={styles.link}>Dollar Cost Average</Link>
                <Link to="/portfolio" style={styles.link}>Portfolio</Link>
                <Link to="/market" style={styles.link}>Market</Link>
                {isAuth ? <div style={styles.link}><UserDropdown name = {username}/></div> : <Link to="/login" style={styles.link}>Login</Link>}

            </nav>
            <hr></hr>
        </div>

    );
        
    
    }

export default Navbar;