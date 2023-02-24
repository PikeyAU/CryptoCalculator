import React, { useState, useEffect } from 'react';
import { TbArrowBigDownLines }  from 'react-icons/tb';
import { TbArrowBigUpLines } from 'react-icons/tb';

{/*

    This component is responsible for displaying the top 10 coins in the market.
    It uses the coingecko API to get the data.
    
*/}

const NavBanner = () => {

    const [data, setData] = useState([{}]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {

        const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2Cethereum%2Cripple%2Ctether%2Cbinancecoin%2Ccardano%2Clitecoin%2Cpolkadot%2Cchainlink%2Cstellar&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (response.ok) {
                    const json = await response.json();
                    setData(json);
                } else {
                    throw response;
                }
            } catch (error) {
                console.error('Error fetching data: ', error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>
    } else if (error) {
        return <div>Error</div>
    } else {
        return (
            <div style={{display: 'flex', justifyContent: 'space-around', flexDirection: 'row'}} >
                {data.map(coin => (
                    <div key={coin.id} style= {{height: 100, marginTop: 10}}>
                        

                        <a href = {'https://www.coingecko.com/en/coins/' + coin.id} target="_blank"> <img src={coin.image} alt={coin.name} height="40px" /></a>
                        <p>{coin.price_change_percentage_24h > 0 ? <span style={{color: 'green', lineHeight: 0, verticalAlign: 'midlle'}}>{coin.price_change_percentage_24h.toFixed(2)}% <TbArrowBigUpLines /></span> : <span style={{color: 'red',lineHeight: 0, verticalAlign: 'midlle'}}>{coin.price_change_percentage_24h.toFixed(2)}% <TbArrowBigDownLines/></span> }</p>

                    </div>
                ))}
            </div>
        );
          
    }
}

export default NavBanner;
