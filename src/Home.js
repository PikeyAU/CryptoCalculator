import React from 'react';
import HomeCard from './components/homeCard';
import Navbar from './components/navbar';
import NavBanner from './components/NavBanner';


const grid_styles = {

    display: 'grid',
    gridGap: '20px',
    width: '100vw',
    color: 'white',
    fontFamily: 'Eras Light ITC',
    fontSize: '1.5vw',
    letterSpacing: '2px',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '100px',
    
};

const Home = () => {
    return (
        <div style={{backgroundColor: '#282C34', height: '100vh'}}>
            <Navbar />
            <NavBanner />
            <div style={grid_styles}>
                <HomeCard text="Dollar Cost Average" />
                <HomeCard text="Portfolio" />
                <HomeCard text="Crypto Market" />
            </div>
        </div>
    );
}

export default Home;
