import React, { useEffect, useState} from 'react'
import { BsTrash } from 'react-icons/bs'
import { AiOutlineEdit, AiOutlineSave, AiOutlineArrowLeft, AiOutlineClose, AiOutlineCheck } from 'react-icons/ai'

import axios from 'axios'

const CoinCardExpand = (props) => {
    const [data, setData] = useState([{}]);
    const [error, setError] = useState(null);
    const [isHover, setIsHover] = useState(false);
    const [transactionLength , setTransactionLength] = useState(0);
    const [editing, setEditing] = useState({});
    const [amount, setAmount] = useState(0);
    const [buyPrice, setBuyPrice] = useState(0);
    const [buyDate, setBuyDate] = useState(new Date());
    const [editHover, setEditHover] = useState({});
    const [trashHover, setTrashHover] = useState({});
    const [cancelHover, setCancelHover] = useState({});
    const [confirmHover, setConfirmHover] = useState({});
    const [deleting, setDeleting] = useState({});

    const clicked = props.clicked

    const cardStyles = {

        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 0.25fr 0.25fr',
        justifyContent: 'center',
        color: 'white',
        border: 'solid white 1px',
        
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
        zIndex: 1,
        
    }

    const cardStyles2 = {
        display: 'flex',
        width: '100%',
        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr',
        alignItems: 'center',
        color: 'white',
        //box shadow when hovering black and white
        transition: 'all 0.3s ease-in-out',
        position: 'absolute',
        
    }

    const backArrowStyles = {
        //Centre div
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        //rounded corners
        color: 'white',
        cursor: 'pointer',

    }


    function handleHover() {
        setIsHover(true)
    }

    function handleHoverLeave() {
        setIsHover(false)
    }

    const handleEdit = (id) => {
        setEditing({ ...editing, [id]: true})
    }

    const handleSave = (id) => {
        setEditing({ ...editing, [id]: false})
        editHolding(id)
    }

    const handleCancelEdit = (id) => {
        setEditing({ ...editing, [id]: false})
    }

    const handleEditHover = (id) => {
        setEditHover((prevState) => ({ ...prevState, [id]: true}))
        
    }

    const handleEditHoverLeave = (id) => {
        setEditHover((prevState) => ({ ...prevState, [id]: false}))
    }

    const handleTrashHover = (id) => {
        setTrashHover({...trashHover, [id]: true})

    }

    const handleTrashHoverLeave = (id) => {
        setTrashHover({...trashHover, [id]: false})
        
    }

    const handleCancelHover = (id) => {
        setCancelHover({...cancelHover, [id]: true})
    }

    const handleCancelHoverLeave = (id) => {
        setCancelHover({...cancelHover, [id]: false})
    }

    const handleConfirmHover = (id) => {
        setConfirmHover({...confirmHover, [id]: true})
    }

    const handleConfirmHoverLeave = (id) => {
        setConfirmHover({...confirmHover, [id]: false})
    }

    const handleDelete = (id) => {
        setDeleting({...deleting, [id]: true})
    }

    const handleCancelDelete = (id) => {
        setDeleting({...deleting, [id]: false})
    }

    function deleteHolding(id) {
        const response = axios.post('http://localhost:8000/api/user/delete/holding/', {id: id},

            {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token')}})
        .then((response) => {
            console.log(response)
            props.trigger(response.data)
        }
        )

    }

    function handleDeleteClick(id) {
        setDeleting({...deleting, [id]: true})
    }

    function cancelDeleteHolding(id) {
        setDeleting({...deleting, [id]: false})
    }


    function editHolding(id) {
        const response = axios.post('http://localhost:8000/api/user/edit/holding/', {
            id: id,
            amount: amount
            },
            

            {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token')}})
        .then((response) => {
            console.log(response)
        }
        )
    }

    const handleContainerClick = () => {
        props.setClicked(!clicked)

    }



    useEffect(() => {
        setTransactionLength(5 + (props.transactions.length * 2.5))
    }, [props.transactions])

    

        return (
            <div>
            <div id = 'card' style={cardStyles} onMouseEnter = {handleHover} onMouseLeave = {handleHoverLeave}> 
                <div style = {{gridColumnStart: 1, gridColumnEnd: 2, marginLeft: '6%'}}>Date</div>
                <div style = {{gridColumnStart: 2, gridColumnEnd: 3, marginLeft: '0%'}}>Quantity</div>
                <div style = {{gridColumnStart: 3, gridColumnEnd: 4, marginLeft: '0%'}}>Price $</div>
                <div style = {{gridColumnStart: 4, gridColumnEnd: 5, marginLeft: '0%'}}>Total $</div>
                <div style = {{gridColumnStart: 5, gridColumnEnd: 6, marginRight: '20%'}}>Profit/Loss</div>

            {props.transactions.map((transaction, index)  => {
                const isEditing = editing[transaction.id]
                const isDelete = deleting[transaction.id]
                const isEditHover = editHover[transaction.id]
                const isHoverTrash = trashHover[transaction.id]
                const isHoverCancel = cancelHover[transaction.id]
        
                
                return (
                    <div key = {transaction.id} style = {{...cardStyles2, top: `${index * 35}px`, marginTop: '5%', marginLeft: '1.5%' }} >
                        <div style = {{gridColumnStart: 1, gridColumnEnd: 2, width: '19%'}}>{transaction.coin_buy_date}</div>
                        {isEditing ? <input style = {{gridColumnStart: 2, gridColumnEnd: 3, width: '19%', color: 'red' }} type = 'number' value = {amount} onChange = {(e) => setAmount(e.target.value)}></input> : <div style = {{gridColumnStart: 2, gridColumnEnd: 3, width: '19%'}}>{transaction.coin_quantity}</div>}
                        {/*<div style = {{gridColumnStart: 2, gridColumnEnd: 3, width: '19%'}}>{transaction.coin_quantity}</div>*/}
                        <div style = {{gridColumnStart: 3, gridColumnEnd: 4, width: '19%'}}>{transaction.coin_buy_price}</div>
                        <div style = {{gridColumnStart: 4, gridColumnEnd: 5, width: '19%'}}>{transaction.coin_quantity * transaction.coin_buy_price}</div>
                        <div style = {{gridColumnStart: 5, gridColumnEnd: 6, width: '19%', color: transaction.coin_buy_price < props.currentPrice ? 'green' : 'red'}}>{((transaction.coin_quantity * (props.currentPrice - transaction.coin_buy_price)) / (transaction.coin_quantity * transaction.coin_buy_price) * 100).toFixed(2)}%</div>
                        {isEditing ? <div id = 'cancel' style= {{marginRight: '3%', cursor: 'pointer', color: isHoverCancel ? '#DB7D13' : 'white'}} onMouseEnter ={() => handleCancelHover(transaction.id)} onMouseLeave={() => handleCancelHoverLeave(transaction.id)}><AiOutlineClose onClick = {() => handleCancelEdit(transaction.id)}/></div> :
                        <div id = 'delete' style= {{marginRight: '3%', cursor: 'pointer', color: isHoverTrash ? '#DB7D13' : 'white'}} onMouseEnter ={() => handleTrashHover(transaction.id)} onMouseLeave={() => handleTrashHoverLeave(transaction.id)}><BsTrash onClick = {() => deleteHolding(transaction.id)}/></div>}
                        {isEditing ? <div id = 'save' style= {{marginRight: '3%', cursor: 'pointer', color: isEditHover ? '#DB7D13' : 'white' }} onMouseEnter ={() => handleEditHover(transaction.id)} onMouseLeave={() => handleEditHoverLeave(transaction.id)}><AiOutlineSave onClick = {() => handleSave(transaction.id)}/></div>
                        : <div id = 'edit' style= {{marginRight: '3%', cursor: 'pointer', color: isEditHover ? '#DB7D13' : 'white' }} onMouseEnter ={() => handleEditHover(transaction.id)} onMouseLeave={() => handleEditHoverLeave(transaction.id)} ><AiOutlineEdit onClick = {() => handleEdit(transaction.id)}/></div>}
                        
                        
                    </div>
                )
            })}
            </div>
                <div style = {backArrowStyles} onClick = {handleContainerClick}><AiOutlineArrowLeft/> Back</div>
            </div>
        
            
        )
    }


export default CoinCardExpand