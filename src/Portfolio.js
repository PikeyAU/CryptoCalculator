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
    const [triggerMessage, setTriggerMessage] = useState(false);
    const [portfolio, setPortfolio] = useState(false);
    const {isAuth , setIsAuth} = useState(false);


    const fetchUserCoinData = async () => {
        const url = 'http://localhost:8000/api/user/get/holdings/';

        const response = await axios.get(url, {headers: {'Content-Type': 'application/json'}}, {withCredentials: true});
        const data = response.data;
        setUserCoinData(data);
        setUserCoinDataLoaded(true);
        setLoading(false);
    }

    async function createPortfolio() {
        await axios.post('http://localhost:8000/api/user/create/portfolio/', {headers: {'Content-Type': 'application/json'}}, {withCredentials: true})
        .then((response) => {
            if (response.data === "Success") {
                console.log('Portfolio created');
                setPortfolio(true);
            }
        })
        .catch((error) => {
            console.log(error);
            setPortfolio(false);
        })
    }

    async function checkPortfolio() {

        try {
            const response = await axios.get('http://localhost:8000/api/user/check/portfolio/', {headers: {'Content-Type': 'application/json'}}, {withCredentials: true})
            
            if (response.data === "Portfolio Does Not Exist") {
                setPortfolio(false);
            } else {
                setPortfolio(true);
                console.log('Portfolio Exists');

            }
        } catch (error) {
            
                console.error('Error fetching data: ', error);
                console.log(error);
        
        }
    }
    



    const handleDataFromChild = (data) => {
        if (data === "Coin Added to Portfolio") {
            setTriggerMessage(true);
        }
    }


    useEffect(() => {

        if (localStorage.getItem('access_token') !== null) {
            setIsAuth(true);
            checkPortfolio();
            if (portfolio === false) {
                createPortfolio();
                fetchUserCoinData();
            } else {
                fetchUserCoinData();
            }
        }
        }, [triggerMessage, portfolio]);
    



    return (
        <div style = {{background: '#282c34', height: '100vh'}}>
            <Navbar />
            <AddPortfolioCard onDataFromChild = {handleDataFromChild}/>
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
            ) : <div></div>}

        </div>
    );
}

export default Portfolio;