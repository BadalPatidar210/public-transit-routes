import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const defaultFormValue = {
    name: '',
    latitude: '',
    longitude: ''
}

const CreateStops = () => {
    const navigate = useNavigate();
    const url = 'http://localhost:9010/api/v1/stop/create'
    const [formValue, setFormValue] = useState({})

    const handleChange = (key, value) => {
        const newFormValue = { ...formValue };
        newFormValue[key] = value;
        setFormValue(newFormValue);
    }

    const handleSubmit = e => {
        e.preventDefault();
        const newFormValue = { ...formValue }
        fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(newFormValue)
        }).then((res) => res.json()).then((result) => {
            handleReset()
            navigate("/routes")
        })
    }

    const handleReset = e => {
        setFormValue(defaultFormValue)
    }

    return (
        <div className='form'>
            <form onSubmit={handleSubmit} className="route-form">
                <div className='fieldset' >
                    <label>Name</label>
                    <input name={"name"} placeholder={"Enter Stop Name"} type={"text"} onChange={(e) => handleChange('name', e.target.value)} value={formValue.name} />
                </div>
                <div className='fieldset' >
                    <label>Latitude</label>
                    <input name={"latitude"} placeholder={"Enter Latitude"} type={"text"} onChange={(e) => handleChange('latitude', e.target.value)} value={formValue.latitude} />
                </div>
                <div className='fieldset' >
                    <label>Longitude</label>
                    <input name={"longitude"} placeholder={"Enter Longitude"} type={"text"} onChange={(e) => handleChange('longitude', e.target.value)} value={formValue.longitude} />
                </div>
                <div className='justify-content-between d-flex mb-3'>
                    <button type={"submit"} className="btn btn-dark">Submit</button>
                    <button type={"button"} className="btn btn-dark" onClick={handleReset}>Reset</button>
                </div>
            </form>
        </div>
    )
}

export default CreateStops;