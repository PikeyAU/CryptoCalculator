import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';


const labelStyle = {
    color: 'white',
    fontSize: '18px',
    fontFamily: 'Eras Light ITC',
    letterSpacing: '2px',
    textAlign: 'left',
    marginRight: 'auto',
    marginLeft: '15px',
    display: 'inline-block',
    width: '50%',
}

const inputStyle = {
    display: 'inline-block',
    width: '36%',
    marginTop: '5px',
    marginBottom: '5px',
    marginLeft: 'auto',
    verticalAlign: 'middle',
    fontSize: '18px',
    borderRadius: 5,
    background: '#282c34',
    color: 'white',
    border: '1px solid white',
    fontFamily: 'Eras Light ITC',
    letterSpacing: '1px',
    padding: '5px 5px 5px 5px',
    

}


const AddCoinForm = (props) => {

    const [coinData, setCoinData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [selected, setSelected] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isHover, setIsHover] = useState(false);
    const [isHover2, setIsHover2] = useState(false);
    const [portfolio, setPortfolio] = useState(false);
    

    const submitStyle = {
        display: 'inline-block',
        width: '36%',
        marginTop: '15px',
        marginBottom: '5px',
        marginLeft: '35px',
        marginRight: 'auto',
        textAlign: 'center',
        verticalAlign: 'middle',
        fontSize: '18px',
        borderRadius: 5,
        background: '#282c34',
        color: 'white',
        border: '1px solid white',
        fontFamily: 'Eras Light ITC',
        letterSpacing: '1px',
        padding: '5px 5px 5px 5px',
        boxShadow: isHover ? '0px 0px 10px 0px white' : '0px 0px 10px 0px black',
        cursor: 'pointer',
        backgroundColor: isHover ? '#DB7D13' : '#282C34',
    }

    const submitStyle2 = {
        display: 'inline-block',
        width: '36%',
        marginTop: '15px',
        marginBottom: '5px',
        marginLeft: '35px',
        marginRight: 'auto',
        textAlign: 'center',
        verticalAlign: 'middle',
        fontSize: '18px',
        borderRadius: 5,
        background: '#282c34',
        color: 'white',
        border: '1px solid white',
        fontFamily: 'Eras Light ITC',
        letterSpacing: '1px',
        padding: '5px 5px 5px 5px',
        boxShadow: isHover2 ? '0px 0px 10px 0px white' : '0px 0px 10px 0px black',
        cursor: 'pointer',
        backgroundColor: isHover2 ? '#DB7D13' : '#282C34',
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('https://api.coingecko.com/api/v3/coins/list')
                if (response.ok) {
                    const data = await response.json();
                    setCoinData(data);
                    setLoading(false);
                } else {
                    throw new Error('Something went wrong');
                }
            } catch (error) {
                console.error('Error fetching data: ', error);
                setError(true)
            }
            finally {
                setLoading(false);
            }
        }

        fetchData();

    }, []);

    function handleSearch(e) {

        setSearchInput(e.target.value);
        const parsedNames = coinData.filter((coin) => coin.name.toLowerCase().includes(searchInput.toLowerCase()));
        setSearchResults(parsedNames);

    }

    
    const handleMouseEnter = () => {
        setIsHover(true);
    }

    const handleMouseLeave = () => {
        setIsHover(false);
    }

    const handleCancelEnter = () => {
        setIsHover2(true);
    }

    const handleCancelLeave = () => {
        setIsHover2(false);
    }

    
    async function addCoin(data)  {
       await axios.post('http://localhost:8000/api/user/add/coin/', data,
       {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token')}})
        .then((response) => {
            if (response.data === "Coin Added to Portfolio") {
                console.log('Coin added');
                props.onDataFromChild(response.data)
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    
    function handleSubmit(e) {
        e.preventDefault();
        const data = {
            coin: e.target[1].value,
            amount: e.target[2].value,
            buyprice: e.target[3].value,
            buydate: e.target[4].value,
        }
        console.log(data);

        
        
        addCoin(data);
        
           
}

    return (
        <div>
            <Form onSubmit = {handleSubmit} style={{transition: 'all 0.3s ease-in-out'}}>
                <FormGroup>
                    <Label style={labelStyle} for="search">Search</Label>
                    <Input style={inputStyle} type="text" name="search" id="search" value ={searchInput} onChange = {handleSearch}>
                    </Input>
                    <Label style={labelStyle} for="coin">Coin</Label>
                    <Input style={inputStyle} type="select" name="coin" id="coin" value={selected} onChange={(e) => setSelected(e.target.value)}>
                        {searchInput.length > 0 ? searchResults.map((coin) => <option key = {String(coin.id + coin.name)} value = {coin.id}>{coin.name}</option>) : coinData.map((coin) => <option key= {String(coin.id + coin.name)} value = {coin.id}>{coin.name}</option>)}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label style={labelStyle} for="amount">Quantity: </Label>
                    <Input style={inputStyle} type="float" name="amount" id="amount" placeholder="Amount" />
                </FormGroup>
                <FormGroup>
                    <Label style={labelStyle} for="price">Buy Price (USD)</Label>
                    <Input style={inputStyle} type="float" name="price" id="price" placeholder="Buy Price" />
                </FormGroup>
                <FormGroup>
                    <Label style={labelStyle} for="buyDate">Buy Date</Label>
                    <Input style={inputStyle} type="date" name="buyDate" id="buyDate" />
                </FormGroup>
                <Button style = {submitStyle} onMouseEnter = {handleMouseEnter} onMouseLeave = {handleMouseLeave}>Submit</Button>
                <Button style = {submitStyle2} onMouseEnter = {handleCancelEnter} onMouseLeave = {handleCancelLeave} onClick = {props.handleClick}>Cancel</Button>

            </Form>
        </div>



        
    );
}

export default AddCoinForm;
