import React, { useState } from 'react';



const HomeCard = (props) => {

    const [isHover, setIsHover] = useState(false);


    const handleMouseEnter = () => {
        setIsHover(true);
    }

    const handleMouseLeave = () => {
        setIsHover(false);
    }

    const navigateOnClick = () => {
        if (props.text === "Dollar Cost Average") {
            window.location.href = "/dca";
        }
        else if (props.text === "Portfolio") {
            window.location.href = "/portfolio";
        }
        else if (props.text === "Crypto Market") {
            window.location.href = "/market";
        }
    }


    const styles = {

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'solid white 1px',
        height: '20vh',
        width: '60vw',
        margin: 'auto',
        //rounded corners
        borderRadius: '15px',
        //box shadow when hovering black and white
        boxShadow: isHover ? '0px 0px 10px 0px white' : '0px 0px 10px 0px black',
        cursor: 'pointer',
        backgroundColor: isHover ? '#DB7D13' : '#282C34',
        transition: 'all 0.3s ease-in-out',
    
    
    }

    return (
        <div>
            <div style={styles} onMouseEnter = {handleMouseEnter} onMouseLeave = {handleMouseLeave} onClick = {navigateOnClick}>
                <h1>{props.text}</h1>
            </div>
        </div>
    );
}

export default HomeCard;