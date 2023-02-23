import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserDropdown from './UserDropdown';



const Navbar = () => {

    const [username, setUsername] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    const [data, setData] = useState([{}]);

    const styles = {
        nav: {
            display: 'flex',
            justifyContent: 'right',
            gap: '20px',
            width: '100vw',
            height: '5vh',
            margin: 'auto',
            
            
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

    const getGlobalInfo = async() => {
        const url = `https://api.coingecko.com/api/v3/global`
        try {
            const response = await fetch(url);
            if (response.ok) {
                const json = await response.json();
                setData(json.data.total_market_cap.usd);
            } else {
                throw response;
            }
        } catch (error) {
            console.error('Error fetching data: ', error);
        };
    }



    

    useEffect (() => {
        getUserInfo(); 
        getGlobalInfo();
    }, []);



    return (
        <div>
            <nav style={styles.nav}>
                <div style={{color: 'white', fontSize: '2vh', marginTop: 15, marginRight:'auto', marginLeft: 'auto'}}>Total Market Cap: $USD {data.toLocaleString()}</div>
                <Link to="/" style={styles.link}>Home</Link>
                <Link to="/dca" style={styles.link}>Dollar Cost Average</Link>
                <Link to="/portfolio" style={styles.link}>Portfolio</Link>
                <Link to="/market" style={styles.link}>News</Link>
                {isAuth ? <div style={styles.link}><UserDropdown name = {username}/></div> : <Link to="/login" style={styles.link}>Login</Link>}

            </nav>
            <hr></hr>
        </div>

    );
        
    
    }

export default Navbar;