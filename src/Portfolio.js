import React from 'react';
import Navbar from './components/navbar';
import PortfolioCard from './components/portfolioCard';


const Portfolio = () => {
    return (
        <div style = {{background: '#282c34', height: '100vh'}}>
            <Navbar />
            <PortfolioCard />
            
        </div>
    );
}

export default Portfolio;