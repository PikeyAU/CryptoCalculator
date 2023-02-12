import React, { useEffect, useState } from 'react'

const CoinCardExpand = (props) => {
    const [data, setData] = useState([{}]);
    const [error, setError] = useState(null);
    const [isHover, setIsHover] = useState(false);
    const [transactionLength , setTransactionLength] = useState(0);

    const clicked = props.clicked

    const cardStyles = {

        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
        justifyContent: 'center',
        color: 'white',
        border: isHover ? 'solid #DB7D13 1px' : 'solid white 1px',
        boxShadow: isHover ? '0 0 10px #DB7D13' : 'none',
        height: props.transactions.length > 1 ? (transactionLength + 'vh') : '5vh',
        width: '25vw',
        margin: 'auto',
        marginTop: '4vh',
        //rounded corners
        borderRadius: '15px',
        //box shadow when hovering black and white
        backgroundColor:'#282C34',
        transition: 'all 0.3s ease-in-out',
        position: 'relative',
        
    }

    const cardStyles2 = {
        display: 'flex',
        width: '100%',
        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
        alignItems: 'center',
        color: 'white',
        //box shadow when hovering black and white
        transition: 'all 0.3s ease-in-out',
        position: 'absolute',
        
    }

    function handleHover() {
        setIsHover(true)
    }

    function handleHoverLeave() {
        setIsHover(false)
    }

    useEffect(() => {
        setTransactionLength(5 + (props.transactions.length * 2.5))
    }, [props.transactions])

    

        return (
            
            <div style={cardStyles} onClick = {() => props.setClicked(!props.clicked)} onMouseEnter = {handleHover} onMouseLeave = {handleHoverLeave}> 
                <div style = {{gridColumnStart: 1, gridColumnEnd: 2, marginLeft: '6%'}}>Date</div>
                <div style = {{gridColumnStart: 2, gridColumnEnd: 3, marginLeft: '6%'}}>Quantity</div>
                <div style = {{gridColumnStart: 3, gridColumnEnd: 4, marginLeft: '6%'}}>Price</div>
                <div style = {{gridColumnStart: 4, gridColumnEnd: 5, marginLeft: '6%'}}>Total</div>
                <div style = {{gridColumnStart: 5, gridColumnEnd: 6, marginLeft: '6%'}}>Profit/Loss</div>

            {props.transactions.map((transaction, index)  => {
                return (
                    <div key = {transaction.id} style = {{...cardStyles2, top: `${index * 35}px`, marginTop: '5%', marginLeft: '1.5%' }} >
                        <div style = {{gridColumnStart: 1, gridColumnEnd: 2, width: '20%'}}>{transaction.coin_buy_date}</div>
                        <div style = {{gridColumnStart: 2, gridColumnEnd: 3, width: '20%'}}>{transaction.coin_quantity}</div>
                        <div style = {{gridColumnStart: 3, gridColumnEnd: 4, width: '20%'}}>{transaction.coin_buy_price}</div>
                        <div style = {{gridColumnStart: 4, gridColumnEnd: 5, width: '20%'}}>{transaction.coin_quantity * transaction.coin_buy_price}</div>
                        <div style = {{gridColumnStart: 5, gridColumnEnd: 6, width: '20%', color: transaction.coin_buy_price < props.currentPrice ? 'green' : 'red'}}>{((transaction.coin_quantity * (props.currentPrice - transaction.coin_buy_price)) / (transaction.coin_quantity * transaction.coin_buy_price) * 100).toFixed(2)}%</div>
                    </div>
                )
            })}
            </div>
        
            
        )
    }


export default CoinCardExpand