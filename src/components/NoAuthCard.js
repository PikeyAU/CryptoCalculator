import React, { useState } from 'react';
import AddCoinForm from './AddCoinForm';
import { Link } from 'react-router-dom';


const NoAuthCard = (props) => {
    const [hover, setHover] = useState(false);

    const styles = {

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'left',
        border: 'solid white 1px',
        width: '25vw',
        margin: 'auto',
        height: '10vh',
        marginTop: '4vh',
        //rounded corners
        borderRadius: '15px',
        //box shadow when hovering black and white
        backgroundColor:'#282C34',
        transition: 'all 0.3s ease-in-out',
    
    
    }



    return (
        <div style={styles}>
    
           <Link to = '/login' style= {{fontFamily: 'Eras Light ITC', letterSpacing: '1px', margin: 'auto', textDecoration: 'none', color: hover ? '#DB7D13' : 'white'}}>Login To Build A Portfolio</Link>
    
        </div>
    )
    
    }

export default NoAuthCard;