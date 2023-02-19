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

            const compiledTransactions = compileTransactions(data);

            setUserCoinData(compiledTransactions);
            setUserCoinDataLoaded(true);
            setLoading(false);
            console.log(compiledTransactions)

        }
        

    }

    const compileTransactions = transactions => {
        const compiledTransactions = {};
      
        transactions.forEach(transaction => {
          const { coin_name, coin_quantity, coin_buy_price, coin_buy_date, id } = transaction;
          if (!compiledTransactions[coin_name]) {
            compiledTransactions[coin_name] = [];
          }
          compiledTransactions[coin_name].push({
            id,
            coin_name,
            coin_quantity,
            coin_buy_price,
            coin_buy_date
          });
        });

        return compiledTransactions;
        
      };


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
        if (data === "Holding Deleted") {
            setTriggerMessage(true);
            console.log("Holding Deleted")
        }
    } 


    useEffect(() => {

            if (localStorage.getItem('access_token')) {
                setIsAuth(true);
            }

            fetchUserCoinData();
            setTriggerMessage(false);
            
    
        }, [triggerMessage]);
    

    return (
        <div style = {{background: '#282c34', height: '100vh'}}>
            <Navbar />
            {isAuth ? <AddPortfolioCard onDataFromChild = {handleDataFromChild}/> : <NoAuthCard />}
            {userCoinDataLoaded ? Object.keys(userCoinData).map((coin) => {
                console.log(userCoinData[coin])
                return (
                    <CoinPortfolioCard 
                        key = {coin}
                        coin = {coin}
                        transactions = {userCoinData[coin]}
                        onDataFromChild = {handleDataFromChild}
                    />
                )
            }
        ) : <div style = {{margin: 'auto'}}></div>}
        </div>
    );
}

export default Portfolio;