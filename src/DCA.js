import React, { useState } from 'react';
import DCAForm from './components/DCAForm';
import Navbar from './components/navbar';
import DCAChart from './components/DCAChart';

const DCA = () => {

    const [formData, setFormData] = useState({});

    const handleFormSubmit = (data) => {
        setFormData(data);
    }

    return (
        
        <div style={{backgroundColor: '#282C34', height: '100vh', overflow: 'hidden' }}>
            <Navbar />
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                <DCAForm handleFormSubmit = {handleFormSubmit} />
                {Object.keys(formData).length > 0 && <DCAChart data = {formData} />}
            </div>

        </div>
    );
}

export default DCA;