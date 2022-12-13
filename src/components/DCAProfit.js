import React, { useState, useEffect } from 'react';

const outputStyle = {
    backgroundColor: '#282C34',
    color: 'white',
    fontFamily: 'Eras Light ITC',
    fontSize: '18px',
    letterSpacing: '1px',
    width: '20vw',
    marginTop: '20px',
    marginBottom: '10px',
    padding: '10px 10px 10px 10px',
    textAlign: 'left',
    //centering the div
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 50,
    boxShadow:  '31px 31px 62px #22252c, -31px -31px 62px #2e333c'
}


const DCAProfit = (props) => {

    
    const [profit, setProfit] = useState(0);
    const [totalInvested, setTotalInvested] = useState(0);
    const [cryptoOwned, setCryptoOwned] = useState(0);
    const [timesInvested, setTimesInvested] = useState(0);

    
    const dailyCalc = (coin, amount, chartData) => {
        let totalInvested = 0;
        let cryptoOwned = 0;
        let timesInvested = 0;
        

        chartData.forEach((item) => {
            totalInvested += Number(amount);
            cryptoOwned += Number(amount) / item.price;
            timesInvested++;
            
        });


        setTotalInvested(totalInvested);
        setCryptoOwned(cryptoOwned);
        setTimesInvested(timesInvested);
        
        setProfit(cryptoOwned * props.currentPrice - totalInvested);
    }

    const weeklyCalc = (coin, amount, chartData) => {
        let totalInvested = 0;
        let cryptoOwned = 0;
        let timesInvested = 0;

        // for each week in chartData (7 days)
        for (let i = 0; i < chartData.length; i += 7) {
            totalInvested += Number(amount);
            cryptoOwned += Number(amount) / chartData[i].price;
            timesInvested++;
        }

        setTotalInvested(totalInvested);
        setCryptoOwned(cryptoOwned);
        setTimesInvested(timesInvested);

        setProfit(cryptoOwned * props.currentPrice - totalInvested);
    }

    const biWeeklyCalc = (coin, amount, chartData) => {
        let totalInvested = 0;
        let cryptoOwned = 0;
        let timesInvested = 0;

        // for each week in chartData (14 days)
        for (let i = 0; i < chartData.length; i += 14) {
            totalInvested += Number(amount);
            cryptoOwned += Number(amount) / chartData[i].price;
            timesInvested++;
        }

        setTotalInvested(totalInvested);
        setCryptoOwned(cryptoOwned);
        setTimesInvested(timesInvested);

        setProfit(cryptoOwned * props.currentPrice - totalInvested);
    }

    const monthlyCalc = (coin, amount, chartData) => {
        let totalInvested = 0;
        let cryptoOwned = 0;
        let timesInvested = 0;

        // for each week in chartData (30 days)
        for (let i = 0; i < chartData.length; i += 30) {
            totalInvested += Number(amount);
            cryptoOwned += Number(amount) / chartData[i].price;
            timesInvested++;
        }

        setTotalInvested(totalInvested);
        setCryptoOwned(cryptoOwned);
        setTimesInvested(timesInvested);

        setProfit(cryptoOwned * props.currentPrice - totalInvested);

    }

     
    useEffect(() => {
        
        const coin = props.formData.coin;
        const amount = props.formData.amount;
        const frequency = props.formData.frequency;
        const chartData = props.chartData;
        
        
        if (frequency === 'Daily') {
            dailyCalc(coin, amount, chartData);
        } else if (frequency === 'Weekly') {
            weeklyCalc(coin, amount, chartData);
        } else if (frequency === 'Bi-Weekly') {
            biWeeklyCalc(coin, amount, chartData);
        } else if (frequency === 'Monthly') {
            monthlyCalc(coin, amount, chartData);
        }

    }, [props.formData, props.chartData]);

    return (
        <div style={outputStyle}>
            <p>Total Number of Investments: {timesInvested}</p>
            <p>Total Invested USD: ${totalInvested}</p>
            <p>Total {props.formData.coin.toUpperCase()} Owned: {cryptoOwned.toFixed(2)}</p>
            <p>Current Price of {props.formData.coin.toUpperCase()}: ${props.currentPrice.toFixed(2)}</p>
            <p>Profit: ${profit.toFixed(2)}</p>
        </div>
    );
}

export default DCAProfit;