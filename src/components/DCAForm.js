import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const labelStyle = {
    color: 'white',
    fontSize: '24px',
    fontFamily: 'Eras Light ITC',
    letterSpacing: '2px',
    textAlign: 'left',
    marginRight: '10px',
    display: 'inline-block',
    width: '50%',
}

const inputStyle = {
    display: 'inline-block',
    width: '36%',
    marginTop: '5px',
    marginBottom: '5px',
    marginLeft: '20px',
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


const DCAForm = ({handleFormSubmit}) => {
    const [coinData, setCoinData] = useState([{}])
    const [loading , setLoading] = useState(true)
    const [isHover , setIsHover] = useState(false)
    const [error, setError] = useState(false)
    const [selected, setSelected] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([{}]);

    const submitStyle = {
        display: 'inline-block',
        width: '36%',
        marginTop: '5px',
        marginBottom: '5px',
        marginLeft: 'auto',
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

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            search: e.target[0].value,
            coin: e.target[1].value,
            amount: e.target[2].value,
            frequency: e.target[3].value,
            start: e.target[4].value,
            end: e.target[5].value,
        }

            handleFormSubmit(data);
            console.log(data)
        }
    
    const handleMouseEnter = () => {
            setIsHover(true);
    }
    
    const handleMouseLeave = () => {
            setIsHover(false);
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

    return (
        <div style = {{width: '35vw', height: '50vh', display: 'flex', justifyContent:'center', position: 'relative', marginTop: '10vh', marginLeft: '2vw'}}>
            <Form onSubmit = {handleSubmit} style = {{display: 'inline-block', textAlign: 'left', padding: '50px 75px 50px 75px',  borderRadius: 50, background: '#282c34', boxShadow:  '31px 31px 62px #22252c, -31px -31px 62px #2e333c'}}>
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
                    <Label style={labelStyle} for="amount">Amount (USD)</Label>
                    <Input style={inputStyle} type="number" name="amount" id="amount" placeholder="Amount" />
                </FormGroup>
                <FormGroup>
                    <Label style={labelStyle} for="frequency">Frequency</Label>
                    <Input style={inputStyle} type="select" name="frequency" id="frequency">
                        <option>Daily</option>
                        <option>Weekly</option>
                        <option>Bi-Weekly</option>
                        <option>Monthly</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label style={labelStyle} for="startDate">Start Date</Label>
                    <Input style={inputStyle} type="date" name="startDate" id="startDate" placeholder="Start Date" />
                </FormGroup>
                <FormGroup>
                    <Label style={labelStyle} for="endDate">End Date</Label>
                    <Input style={inputStyle} type="date" name="endDate" id="endDate" placeholder="End Date" />
                </FormGroup>
                <Button style = {submitStyle} onMouseEnter = {handleMouseEnter} onMouseLeave = {handleMouseLeave}>Submit</Button>
            </Form>
        </div>
    );

                    
}


export default DCAForm;


    
