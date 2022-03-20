import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { getAllStopsUrl } from '../../utility/base';

const defaultFormValue = {
    name: '',
    status: '',
    direction: '',
    stops: ''
}

const CreateRoute = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    let url = 'api/v1/route/create'
    const [formValue, setFormValue] = useState({})
    const [stopsOptionsList, setStopsOptionsList] = useState([]);

    const handleChange = (key, value) => {
        const newFormValue = { ...formValue };
        newFormValue[key] = value;
        setFormValue(newFormValue);
    }

    const handleSubmit = e => {
        e.preventDefault();
        const newFormValue = { ...formValue }
        newFormValue.stops = newFormValue.stops.map((item) => item.value)
        if (newFormValue.isEdit) {
            url = url + "?isEdit=true"
        }
        fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(newFormValue)
        }).then((res) => res.json()).then((result) => {
            handleReset()
            navigate("/")
            url = ""
        })
        url = ""
    }

    const handleReset = e => {
        setFormValue(defaultFormValue)
    }

    useEffect(() => {
        fetch(getAllStopsUrl).then(res => res.json()).then(result => {
            const optionsList = result.map(item => ({ label: item.name, value: item }));
            setStopsOptionsList(optionsList)
        })
    }, [])

    useEffect(() => {
        if (state) {
            const obj = state;
            console.log({ obj })
            const editDefaultValue = {
                name: obj.name,
                status: obj.status,
                direction: obj.direction,
                stops: obj.stops.map((item) => ({ label: item.name, value: item })),
                id: obj.id,
                isEdit: true
            }
            setFormValue(editDefaultValue)
        }
    }, [state])

    return (
        <div className='form'>
            <form onSubmit={handleSubmit} className="route-form">
                <div className='fieldset' >
                    <label>Name</label>
                    <input name={"name"} placeholder={"Enter Route Name"} type={"text"} onChange={(e) => handleChange('name', e.target.value)} value={formValue.name} />
                </div>
                <div className='fieldset'>
                    <label>Direction</label>
                    <fieldset id="direction" style={{ border: 0 }}>
                        <div className='fieldset-input'>
                            <input type="radio" value={"UP"} checked={formValue.direction === "UP"} name="direction" onChange={(e) => handleChange('direction', e.target.value)} /><span>UP</span>
                        </div>
                        <div className='fieldset-input'>
                            <input type="radio" value={"DOWN"} checked={formValue.direction === "DOWN"} name="direction" onChange={(e) => handleChange('direction', e.target.value)} /><span>DOWN</span>
                        </div>
                    </fieldset>
                </div>
                <div className='fieldset'>
                    <label>Status</label>
                    <fieldset id="status" style={{ border: 0 }}>
                        <div className='fieldset-input'>
                            <input type="radio" value={"Active"} checked={formValue.status === "Active"} name="status" onChange={(e) => handleChange('status', e.target.value)} /><span>ACTIVE</span>
                        </div>
                        <div className='fieldset-input'>
                            <input type="radio" value={"Inactive"} checked={formValue.status === "Inactive"} name="status" onChange={(e) => handleChange('status', e.target.value)} /><span>INACTIVE</span>
                        </div>
                    </fieldset>
                </div>
                <div className='form-group select '>
                    <label>List of stops</label>
                    <div className='justify-content-between d-flex mb-3'>
                        <Select name="stops" isMulti onChange={(stops) => { handleChange("stops", stops) }} isClearable options={stopsOptionsList} value={formValue.stops} className={'stops-list'} />
                        <button type='button' className='border-0 bg-dark text-white' onClick={() => { navigate("/stops") }} >Add Stop</button>
                    </div>
                </div>
                <div className='justify-content-between d-flex mb-3'>
                    <button type={"submit"} className='border-0 bg-dark text-white'>Submit</button>
                    <button type={"button"} className='border-0 bg-dark text-white' onClick={handleReset}>Reset</button>
                </div>
            </form>
        </div>
    )
}

export default CreateRoute;