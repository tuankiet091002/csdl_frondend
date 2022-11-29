import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { createMCP } from '../../../actions/mcpsAction'

const MCPForm = () => {
    const initialState = {name:'', latitude:'', longitude:'', capacity: ''};
    const dispatch = useDispatch();
    const [form, setForm] = useState(initialState);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value || e.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createMCP(form));
    }

    const clear = () => {
        setForm(initialState);
    };

    return (
    <>
        <h1>MCP Form</h1>
        <form autoComplete='off' onSubmit={handleSubmit}>
            <div class="form-group">
                <label htmlFor="exampleName">Name</label>
                <input type="text" class="form-control" id="exampleName" name="name" onChange={handleChange}/>
            </div>
            <div class="form-group">
                <label htmlFor="exampleLat">Latitude</label>
                <input type="text" class="form-control" id="exampleLat" name="latitude" onChange={handleChange}/>
            </div>
            <div class="form-group">
                <label htmlFor="exampleLng">Longitude</label>
                <input type="text" class="form-control" id="exampleLng" name="longitude" onChange={handleChange}/>
            </div>
            <div class="form-group">
                <label htmlFor="exampleCap">Capacity</label>
                <input type="text" class="form-control" id="exampleCap" name="capacity" onChange={handleChange}/>
            </div>
            <br/>
            <button type="submit" class="btn btn-primary">Submit</button>
            <button type="clear" class="btn btn-danger mx-3" onCLick={clear}>Clear</button>
        </form>
    </>
    );
}

export default MCPForm