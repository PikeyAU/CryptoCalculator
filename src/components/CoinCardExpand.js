import React, { useEffect, useState } from 'react'

const CoinCardExpand = (props) => {
    const [data, setData] = useState([{}]);
    const [error, setError] = useState(null);

    const clicked = props.clicked

    const cardStyles = {

        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
        justifyContent: 'left',
        color: 'white',
        border: 'solid white 1px',
        height: '10vh',
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


        return (
            
            <div style={cardStyles} onClick = {() => props.setClicked(!props.clicked)}> 
                <div style = {{gridColumnStart: 1, gridColumnEnd: 2}}>Date</div>
                <div style = {{gridColumnStart: 2, gridColumnEnd: 3}}>Quantity</div>
                <div style = {{gridColumnStart: 3, gridColumnEnd: 4}}>Price</div>
                <div style = {{gridColumnStart: 4, gridColumnEnd: 5}}>Total</div>
                <div style = {{gridColumnStart: 5, gridColumnEnd: 6}}>Profit/Loss</div>

            {props.transactions.map((transaction, index)  => {
                return (
                    <div key = {transaction.id} style = {{...cardStyles2, top: `${index * 35}px`, marginTop: '5%', marginLeft: '1.5%' }} >
                        <div style = {{gridColumnStart: 1, gridColumnEnd: 2, width: '20%'}}>{transaction.coin_buy_date}</div>
                        <div style = {{gridColumnStart: 2, gridColumnEnd: 3, width: '20%'}}>{transaction.coin_quantity}</div>
                        <div style = {{gridColumnStart: 3, gridColumnEnd: 4, width: '20%'}}>{transaction.coin_buy_price}</div>
                        <div style = {{gridColumnStart: 4, gridColumnEnd: 5, width: '20%'}}>{transaction.coin_quantity * transaction.coin_buy_price}</div>
                        <div style = {{gridColumnStart: 5, gridColumnEnd: 6, width: '20%'}}>{props.profitCalc.toFixed(2)}</div>
                    </div>
                )
            })}
            </div>
        
            
        )
    }


export default CoinCardExpand