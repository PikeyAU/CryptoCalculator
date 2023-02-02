import React, { useEffect, useState } from 'react'

const CoinPortfolioCard = (props) => {
    const [data, setData] = useState([{}]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const cardStyles = {

        display: 'grid',
        gridTemplateColumns: '0.5fr 1fr 1fr',
        gridTemplateRows: '1fr 1fr',
        alignItems: 'center',
        justifyContent: 'left',
        color: 'white',
        border: 'solid white 1px',
        height: '10vh',
        width: '20vw',
        margin: 'auto',
        marginTop: '4vh',
        //rounded corners
        borderRadius: '15px',
        //box shadow when hovering black and white
        backgroundColor:'#282C34',
        transition: 'all 0.3s ease-in-out',
    }

    useEffect(() => {

        const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${props.coin}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`

        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (response.ok) {
                    const json = await response.json();
                    setData(json);
                    console.log(json)
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
            <div style={cardStyles}>
            
                <div style={{gridRowStart: '1', gridRowEnd: '3', fontSize: '50px', marginLeft: '15px', marginRight: 'auto', color: 'white'}}>
                    <img src = {data[0].image} alt = "coin icon" style = {{height: '50px', width: '50px'}}/>
                </div>
                
                <div style={{gridRowStart: '1', gridRowEnd: '1', fontFamily: 'Eras Light ITC', letterSpacing: '1px', marginRight: 'auto'}}>
                    {data[0].symbol.toUpperCase()} | {data[0].name}
                </div>
            
                <div style={{gridRowStart: '2', gridRowEnd: '1', fontFamily: 'Eras Light ITC', letterSpacing: '1px', marginLeft: 'auto', marginRight: '10px'}}>
                    ${data[0].current_price}
                </div>
                
                <div style={{gridRowStart: '2', fontFamily: 'Eras Light ITC', letterSpacing: '1px', marginRight: 'auto'}}>
                    {props.amount} | ${(data[0].current_price * props.amount).toFixed(2)}
                </div>
            
                <div style={{gridRowStart: '2', fontFamily: 'Eras Light ITC', letterSpacing: '1px', marginLeft: 'auto', marginRight: '10px', color: data[0].price_change_percentage_24h > 0 ? 'green' : 'red' }}>
                    {data[0].price_change_percentage_24h.toFixed(2)}%
                </div>
                
            </div>
        )
    }
}

export default CoinPortfolioCard