import React from 'react';
import Navbar from './components/navbar';
import AddPortfolioCard from './components/AddPortfolioCard';
import CoinPortfolioCard from './components/CoinPortfolioCard';


const Portfolio = () => {
    return (
        <div style = {{background: '#282c34', height: '100vh'}}>
            <Navbar />
            <AddPortfolioCard />
            <CoinPortfolioCard />
            
        </div>
    );
}

export default Portfolio;