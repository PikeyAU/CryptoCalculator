import React, { useEffect, useState } from 'react'
import CoinCardExpand from './CoinCardExpand';
import { BounceLoader } from 'react-spinners';

const CoinPortfolioCard = (props) => {
    const [data, setData] = useState([{}]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [clicked , setClicked] = useState(false);
    const [isHover, setIsHover] = useState(false);


    function transactionQuantity() {
        let quantity = 0;

        props.transactions.forEach(transaction => {
            quantity += transaction.coin_quantity
        }
        )
        return quantity;

    }

    function transactionProfitLoss() {
        let profitLoss = 0;

        props.transactions.forEach(transaction => {
            profitLoss += transaction.coin_quantity * (data[0].current_price - transaction.coin_buy_price)
            
        }
        )
        return (profitLoss);

    }

    function calcTotalInvestment() {
        let totalInvestment = 0;

        props.transactions.forEach(transaction => {
            totalInvestment += transaction.coin_quantity * transaction.coin_buy_price
        }
        )
        return totalInvestment;

    }

    function transactionProfitLossPercentage() {
        let profitLoss = transactionProfitLoss();
        let totalInvestment = calcTotalInvestment();
        return (profitLoss / totalInvestment) * 100;
        

    }

    function handleHover() {
        setIsHover(true)
    }

    function handleHoverLeave() {
        setIsHover(false)
    }

        
    const cardStyles = {

        display: 'grid',
        gridTemplateColumns: '0.5fr 1fr 1fr',
        gridTemplateRows: clicked ? 'auto auto' : 'auto',
        alignItems: 'center',
        justifyContent: 'left',
        color: 'white',
        border: isHover ? 'solid #DB7D13 1px' : 'solid white 1px',
        height: clicked ? 'auto' : '10vh',
        //glow effect on hover
        boxShadow: isHover ? '0 0 10px #DB7D13' : 'none',
        
        width: '25vw',
        margin: 'auto',
        marginTop: '4vh',
        //rounded corners
        borderRadius: '15px',
        //box shadow when hovering black and white
        backgroundColor:'#282C34',
        transition: 'all 0.3s ease-in-out',
        overflow: 'hidden',

        
    }

    useEffect(() => {

        const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${props.coin}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`

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
        return <div style={{...cardStyles, margin: 'auto'}}><BounceLoader/></div>
    } else {

        return (
            <div>
                {clicked ? 
                <CoinCardExpand trigger = {props.onDataFromChild} currentPrice = {data[0].current_price} coin = {props.coin} transactions = {props.transactions} setClicked = {setClicked} clicked = {clicked} profitCalc = {transactionProfitLossPercentage()} />
                
                :

                <div style={cardStyles} onClick = {() => setClicked(!clicked)} onMouseEnter = {handleHover} onMouseLeave = {handleHoverLeave}>
                
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
                        {transactionQuantity()} | ${(data[0].current_price * transactionQuantity()).toFixed(2)}
                    </div>
                
                    <div style={{gridRowStart: '2', fontFamily: 'Eras Light ITC', letterSpacing: '1px', marginLeft: 'auto', marginRight: '10px', color: transactionProfitLoss() > 0 ? 'green' : 'red' }}>
                        {transactionProfitLossPercentage().toFixed(2)}% | ${transactionProfitLoss().toFixed(2)}
                        
                    </div>
                </div>
                             
                        
                }
            </div>    
                
        )
    }
}

export default CoinPortfolioCard