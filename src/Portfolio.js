import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import AddPortfolioCard from './components/AddPortfolioCard';
import CoinPortfolioCard from './components/CoinPortfolioCard';
import axios from 'axios';
import { TbIceSkating } from 'react-icons/tb';


const Portfolio = () => {
    const [userCoinData , setUserCoinData] = useState([{}])
    const [userCoinDataLoaded, setUserCoinDataLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);


    const fetchUserCoinData = async () => {
        const url = 'http://localhost:8000/api/user/get/holdings/';

        const response = await axios.get(url, {headers: {'Content-Type': 'application/json'}}, {withCredentials: true});
        const data = response.data;
        setUserCoinData(data);
        setUserCoinDataLoaded(true);
        setLoading(false);
    }


    useEffect(() => {
        fetchUserCoinData();
    }, []);



    return (
        <div style = {{background: '#282c34', height: '100vh'}}>
            <Navbar />
            <AddPortfolioCard />
            {userCoinDataLoaded ? userCoinData.map((coin) => {
                console.log(coin)
                return (
                    <CoinPortfolioCard 
                        key = {coin.id}
                        coin = {coin.coin_name}
                        amount = {coin.coin_quantity}
                        buyprice = {coin.coin_buy_price}
                        buydate = {coin.coin_buy_date}
                    />
                )
            }
            ) : <div>Loading...</div>}

        </div>
    );
}

export default Portfolio;