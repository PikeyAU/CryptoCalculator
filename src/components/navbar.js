import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {

    const [username, setUsername] = useState('');

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

    useEffect (() => {
        axios.get('http://localhost:8000/api/get/user/info')
        .then(res => {
            console.log(res.data);
            setUsername(res.data.username);
            console.log(username)
        })
        .catch(err => {
            console.log(err);
        })
    }, [username]);

    return (
        <div>
            <nav style={styles.nav}>

                <Link to="/" style={styles.link}>Home</Link>
                <Link to="/dca" style={styles.link}>Dollar Cost Average</Link>
                <Link to="/portfolio" style={styles.link}>Portfolio</Link>
                <Link to="/market" style={styles.link}>Market</Link>
                {username ? <Link to="/login" style={styles.link}>{username}</Link> : <Link to="/login" style={styles.link}>Login</Link>}

            </nav>
            <hr></hr>
        </div>

    );
        
    
    }

export default Navbar;