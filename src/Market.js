import React, { useEffect, useState } from 'react';
import Navbar from './components/navbar';
import NewsTile from './components/NewsTile';



const Market = () => {
    const [newsData, setNewsData] = useState([{}]);
    const [loading, setLoading] = useState(true);
    const [splitData, setSplitData] = useState([{}]);
    const [numReturned , setNumReturned] = useState(6);
    const [isHovered, setIsHovered] = useState(false);

    const showMoreStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '5vh',
        width: '10vw',
        margin: 'auto',
        background: '#282c34',
        color: 'white',
        fontSize: '2vh',
        cursor: 'pointer',
        border: isHovered ? 'solid #DB7D13 1px' : 'solid white 1px',
        borderRadius: '10px',
        marginTop: '10px',
        boxShadow: isHovered ? '0 0 10px #DB7D13' : 'none',
    
        
    }

    async function getNews() {
        const response = await fetch('https://min-api.cryptocompare.com/data/v2/news/?lang=EN&feeds=cryptocompare%2Ccointelegraph%2Ccoindesk&api_key=6ac84ee8efb1aa9be89aabee1eb585c5d710b7d139e7649a0e209e746cc03d23')
        .then(response => response.json())
        .then(data => setNewsData(data.Data))
        .then(console.log(newsData));
        
        setSplitData(newsData.slice(0, numReturned));

    }

    useEffect(() => {
        getNews();
        setLoading(false);

    }, [newsData]);

    const handleHover = () => {
        setIsHovered(true);
    }

    const handleLeave = () => {
        setIsHovered(false);
    }

    const handleClick = () => {
        setNumReturned(numReturned + 3);
        setSplitData(newsData.slice(0, numReturned));
    }


    return (
        <div style = {{background: '#282c34', height: '100vh', backgroundSize: 'cover'}}>
            <Navbar />
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10}}>
            {loading ? <div style = {{margin: 'auto'}}>Loading</div> :
            splitData.map((news) => {
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
            <div style = {showMoreStyle} onMouseEnter={handleHover} onMouseLeave={handleLeave} onClick = {handleClick} >Show More</div>
        </div>
    );
}

export default Market;
