import React, { useState } from 'react'
import { BiDownArrow } from 'react-icons/bi'

const UserDropdown = (props) => {
    const [show, setShow] = useState(false)
    const [hover1, setHover1] = useState(false)
    const [hover2, setHover2] = useState(false)
    const [hover3, setHover3] = useState(false)


    const handleHover = () => {
        setShow(true)
    }

    const handleLeave = () => {
        setShow(false)

    }


    const handleHover1 = () => {
        setHover1(true)
    }

    const handleLeave1 = () => {
        setHover1(false)
    }
    const handleHover2 = () => {
        setHover2(true)
    }

    const handleLeave2 = () => {
        setHover2(false)
    }
    const handleHover3 = () => {
        setHover3(true)
    }

    const handleLeave3 = () => {
        setHover3(false)
    }



    const anchorStyle1 = {
        textDecoration: 'none',
        color: 'white',
        display: 'block',
        padding: '6px',
        border: '1px solid white',
        textAlign: 'center',
        background: hover1 ? '#DB7D13' : '#282C34',

    }

    const anchorStyle2 = {
        textDecoration: 'none',
        color: 'white',
        display: 'block',
        padding: '6px',
        border: '1px solid white',
        textAlign: 'center',
        background: hover2 ? '#DB7D13' : '#282C34',

    }

    const anchorStyle3 = {
        textDecoration: 'none',
        color: 'white',
        display: 'block',
        padding: '6px',
        border: '1px solid white',
        textAlign: 'center',
        background: hover3 ? '#DB7D13' : '#282C34',

    }


    return (
        <div onMouseEnter = {handleHover} onMouseLeave = {handleLeave} style={{cursor: 'pointer'}}>
            {props.name} <BiDownArrow/>
            {show && <div style = {{background: '#282C34', marginTop: '15px', zIndex: 100, position: 'relative' }}>
                <a style = {anchorStyle1} onMouseEnter = {handleHover1}  onMouseLeave = {handleLeave1}href = "/profile">Profile</a>
                <a style = {anchorStyle2} onMouseEnter = {handleHover2}  onMouseLeave = {handleLeave2}href = "/settings">Settings</a>
                <a style = {anchorStyle3} onMouseEnter = {handleHover3}  onMouseLeave = {handleLeave3}href = "/logout">Logout</a>
            </div>}
        </div>
    )
}

export default UserDropdown
