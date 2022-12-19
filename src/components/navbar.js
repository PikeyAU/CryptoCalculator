import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {

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

    return (
        <div>
            <nav style={styles.nav}>

                <Link to="/" style={styles.link}>Home</Link>
                <Link to="/dca" style={styles.link}>Dollar Cost Average</Link>
                <Link to="/portfolio" style={styles.link}>Portfolio</Link>
                <Link to="/market" style={styles.link}>Market</Link>
                <Link to="/login" style={styles.link}>Login</Link>

            </nav>
            <hr></hr>
        </div>

    );
        
    
    }

export default Navbar;