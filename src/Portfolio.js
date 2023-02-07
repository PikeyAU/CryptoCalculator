import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import AddPortfolioCard from './components/AddPortfolioCard';
import CoinPortfolioCard from './components/CoinPortfolioCard';
import axios from 'axios';
import { Puff } from 'react-loading-icons';
import NoAuthCard from './components/NoAuthCard';


const Portfolio = () => {
    const [userCoinData , setUserCoinData] = useState([{}])
    const [userCoinDataLoaded, setUserCoinDataLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [triggerMessage, setTriggerMessage] = useState(false);
    const [portfolio, setPortfolio] = useState(false);
    const [isAuth, setIsAuth] = useState(false);


    const fetchUserCoinData = async () => {
        const result = await checkCreatePortfolio();

        if (result === "Portfolio Exists") {
            
            const url = 'http://localhost:8000/api/user/get/holdings/';

            const response = await axios.get(url,
                {headers: {'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem('access_token')}})
                

            const data = response.data;

            const coinData = [];

            //check if coin exists in coinData array, if exists, add to quantity, if not, add to array
            data.forEach((coin) => {
                coin.transaction_count = 1;
                const coinExists = coinData.find((coinData) => coinData.coin_name === coin.coin_name);
                if (coinExists) {
                    coinExists.coin_quantity += coin.coin_quantity;
                    coinExists.transaction_count += 1;
                } else {
                    coinData.push(coin);
                }
            })

            setUserCoinData(coinData);
            setUserCoinDataLoaded(true);
            setLoading(false);

        }
        

    }


    async function checkCreatePortfolio() {
        try {
            const response = await axios.get('http://localhost:8000/api/user/check/portfolio/',
                                    {headers: {'Content-Type': 'application/json',
                                                'Authorization': 'Bearer ' + localStorage.getItem('access_token')}})
            
            if (response.data === "Portfolio Exists") {
                setPortfolio(true);
                console.log('Portfolio Exists');
                return ('Portfolio Exists')
            } else {
                const createResponse = await axios.post('http://localhost:8000/api/user/create/portfolio/',
                                    {headers: {'Content-Type': 'application/json',
                                                'Authorization': 'Bearer ' + localStorage.getItem('access_token')}})
                if (createResponse.data === "Success") {
                    setPortfolio(true);
                    console.log('Portfolio Created');
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    }



    const handleDataFromChild = (data) => {
        if (data === "Coin Added to Portfolio") {
            setTriggerMessage(true);
        }
    } 


    useEffect(() => {

            if (localStorage.getItem('access_token')) {
                setIsAuth(true);
            }

            fetchUserCoinData();
            
    
        }, [triggerMessage]);
    

    return (
        <div style = {{background: '#282c34', height: '100vh'}}>
            <Navbar />
            {isAuth ? <AddPortfolioCard onDataFromChild = {handleDataFromChild}/> : <NoAuthCard />}
            {userCoinDataLoaded ? userCoinData.map((coin) => {
                return (
                    <CoinPortfolioCard 
                        key = {coin.id}
                        coin = {coin.coin_name}
                        amount = {coin.coin_quantity}
                        buyprice = {coin.coin_buy_price}
                        buydate = {coin.coin_buy_date}
                        transaction_count = {coin.transaction_count}
                    />
                )
            }
            ) : <div style = {{margin: 'auto'}}></div>}
        </div>
    );
}

export default Portfolio;