import React, { useEffect, useState } from 'react';
import Navbar from './components/navbar';
import NewsTile from './components/NewsTile';


const Market = () => {
    const [newsData, setNewsData] = useState([{}]);
    const [loading, setLoading] = useState(true);

    async function getNews() {
        const response = await fetch('https://min-api.cryptocompare.com/data/v2/news/?lang=EN&feeds=cryptocompare%2Ccointelegraph%2Ccoindesk&api_key=6ac84ee8efb1aa9be89aabee1eb585c5d710b7d139e7649a0e209e746cc03d23')
        .then(response => response.json())
        .then(data => setNewsData(data.Data))
        .then(console.log(newsData));
        

    }

    useEffect(() => {
        getNews();
        setLoading(false);

    }, [newsData]);


    return (
        <div style = {{background: '#282c34', height: '100vh'}}>
            <Navbar />
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10}}>
            {loading ? <div style = {{margin: 'auto'}}>Loading</div> :
            newsData.map((news) => {
                return (
                    <NewsTile
                        key = {news.id}
                        body = {news.body}
                        title = {news.title}
                        image = {news.imageurl}
                        url = {news.url}
                    />
                )
            })}
            </div>
        </div>
    );
}

export default Market;
