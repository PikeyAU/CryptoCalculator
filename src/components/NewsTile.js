import React, { useState } from 'react'

const NewsTile = (props) => {
    const [loaded, setLoaded] = useState(false)

    const newsTileStyles = {
        
        alignItems: 'center',
        justifyContent: 'left',
        color: 'white',
        border: 'solid white 1px',
        height: '35vh',
        width: '25vw',
        margin: 'auto',
        marginTop: '4vh',
        borderRadius: '15px',
        backgroundColor:'#282C34',
        transition: 'all 0.3s ease-in-out',
        overflow: 'hidden',
    }


    return (
        //props available: props.title, props.body, props.image, props.url
        <div style={newsTileStyles}>
            <h4>{props.title}</h4>
            <img style = {{marginLeft: '25%'}}src = {props.image} height = '50%' width = '50%'  alt = 'News Article'></img>
            <p>{props.body}</p>
            <a style = {{textDecoration: 'none', color: 'white', marginLeft: '45%', marginRight: 'auto', border: 'solid white 1px', borderRadius: '15px',padding: 4 }}href = {props.url} target='_Blank' rel='noreferrer'>Read More</a>
        </div>


        

    )
}

export default NewsTile