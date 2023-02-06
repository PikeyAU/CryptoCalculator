import React, { useState, useEffect } from 'react';

import axios from 'axios';

const Logout = () => {

    useEffect(() => {
        (async () => {
            try {
                const {data} = await axios.post('http://localhost:8000/api/logout/', {refresh_token: localStorage.getItem('refresh_token')}, 
                {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token')}})
                
                localStorage.clear();

                axios.defaults.headers.common['Authorization'] = null;
                window.location = '/';
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    return (
        <div>
            <h1>Logging out...</h1>
        </div>
    );
}

export default Logout;


        