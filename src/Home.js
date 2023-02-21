import React from 'react';
import HomeCard from './components/homeCard';
import Navbar from './components/navbar';
import NavBanner from './components/NavBanner';


const home_styles = {

    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
    width: '100vw',
    color: 'white',
    fontFamily: 'Eras Light ITC',
    fontSize: '1.5vw',
    letterSpacing: '2px',
    textAlign: 'center',
    position: 'absolute',
    top: '55%',
    transform: 'translateY(-50%)',
    overflow: 'hidden',

};

const Home = () => {
    return (
        <div style={{backgroundColor: '#282C34', height: '100vh', position: 'relative'}}>
            <Navbar />
            <div style={{overflow: 'hidden', width: '100%'}}>
                <div style={{float: 'left', width: '100%', animation: 'carousel 20s linear infinite'}}>
                    <NavBanner />
                </div>
            </div>
            <style>{`
                @keyframes carousel {
                    0% {
                        transform: translateX(125%);
                        }
                    100% {
                         transform: translateX(-125%);
                        }
                    }
                `}
            </style>
            <div style={home_styles}>
                    <HomeCard text="Dollar Cost Average" />
                    <HomeCard text="Portfolio" />
                    <HomeCard text="Crypto News" />
            </div>
        </div>
    );
}

export default Home;
