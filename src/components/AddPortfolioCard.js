import React, { useState } from 'react';
import { CiSquarePlus } from 'react-icons/ci';
import AddCoinForm from './AddCoinForm';


const AddPortfolioCard = (props) => {
    const [hover, setHover] = useState(false);
    const [clicked , setClicked] = useState(false);

    const handleMouseEnter = () => {
        setHover(true);
    }

    const handleMouseLeave = () => {
        setHover(false);
    }

    
    const styles = {

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'left',
        color: 'white',
        border: 'solid white 1px',
        height: clicked ? '32vh' : '10vh',
        width: '20vw',
        margin: 'auto',
        marginTop: '4vh',
        //rounded corners
        borderRadius: '15px',
        //box shadow when hovering black and white
        backgroundColor:'#282C34',
        transition: 'all 0.3s ease-in-out',
    
    
    }


    const handleClick = () => {
        if (clicked === false) {
            setClicked(true);
        }
        else {
            setClicked(false);
        }

    }

    return (
        <div>
            
            {clicked
            ? <div style={styles}><AddCoinForm handleClick = {handleClick}/></div>

            :<div style={styles}><div style= {{fontFamily: 'Eras Light ITC', letterSpacing: '1px', margin: 'auto'}}>Add Coin To Portfolio</div>
                <div style={{marginLeft: 'auto', fontSize: '50px', marginRight: 'auto', color: hover ? 'greenyellow' : 'white'}} onClick={handleClick} onMouseEnter = {handleMouseEnter} onMouseLeave = {handleMouseLeave} ><CiSquarePlus/></div></div>
            
            }

        </div>
    );
}

export default AddPortfolioCard;