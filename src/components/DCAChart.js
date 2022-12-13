import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DCAProfit from './DCAProfit';


const DCAChart = (props) => {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [currentPrice, setCurrentPrice] = useState(0);
    const [minY, setMinY] = useState(0);
    const [maxY, setMaxY] = useState(0);

    const dateTimeToUnix = (date) => {
        return Math.round(new Date(date).getTime() / 1000);
    }

    const unixToDate = (unix) => {
        return new Date(unix).toLocaleDateString();
    }

    const getMaxY = (data) => {
        setMaxY(Math.max.apply(Math, data.map(function(o) { return o.price; })));
    }

    const getMinY = (data) => {
        setMinY(Math.min.apply(Math, data.map(function(o) { return o.price; })));
    }

    const getCurrentPrice = (coin) => {
        const url = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=0&interval=daily`
        fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw response;
        })
        .then(data => {
            let currentPrice = data.prices[0][1];
            setCurrentPrice(currentPrice);
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
        })
    }


    useEffect(() => {
        const coin = props.data.coin;
        const start = dateTimeToUnix(props.data.start);
        const end = dateTimeToUnix(props.data.end);
        getCurrentPrice(coin);

        const url = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart/range?vs_currency=usd&from=${start}&to=${end}`;
        
        fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw response;
        })
        .then(data => {
            //loop over data and create new array with unix converted to date and price
            const newData = data.prices.map((item) => {
                return {
                    date: unixToDate(item[0]),
                    price: item[1].toFixed(2)
                }
            
            });
            getMaxY(newData);
            getMinY(newData);
            setChartData(newData);
            
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
            setError(true);
        })
        .finally(() => {
            setLoading(false);
            
        });

    }, [props.data]);

    return (
        <div style = {{width: '35vw', position: 'relative', marginTop: '19vh'}}> 
            <LineChart
            width={700}
            height={400}
            data={chartData}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis dataKey="price" domain={[Math.round(minY - (minY * 0.1)), Math.round(maxY + (maxY * 0.1))]}/>
            <Tooltip />
            <Legend />
                <Line type="monotone" dataKey="price" name = "Price (USD)" stroke="#8884d8" dot={false} />
            </LineChart>
            {chartData.length > 0 && <DCAProfit chartData = {chartData} formData = {props.data} currentPrice = {currentPrice} />} 
    </div>
    );
}

export default DCAChart;