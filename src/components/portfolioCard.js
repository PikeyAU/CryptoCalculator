import React, { useState } from 'react';
import { CiSquarePlus } from 'react-icons/ci';

const PortfolioCard = (props) => {

    
    const styles = {

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'left',
        color: 'white',
        border: 'solid white 1px',
        height: '10vh',
        width: '20vw',
        margin: 'auto',
        marginTop: '4vh',
        //rounded corners
        borderRadius: '15px',
        //box shadow when hovering black and white
        backgroundColor:'#282C34',
        transition: 'all 0.3s ease-in-out',
    
    
    }

    return (
        <div style={styles}>
            
            <div style= {{fontFamily: 'Eras Light ITC', letterSpacing: '1px', margin: 'auto'}}>Add Coin To Portfolio</div>
            <div style={{marginLeft: 'auto', fontSize: '50px', marginRight: 'auto', color: 'greenyellow'}}><CiSquarePlus/></div>
            
        </div>
    );
}

export default PortfolioCard;