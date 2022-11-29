import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { login } from "../../actions/authAction"



const Auth = () => {
    const initialState = { username: '', password:''};

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [form, setForm] = useState(initialState);
    const [err, setErr] = useState(''); 

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value || e.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(form, navigate)).catch((error) => {
            setErr(error.response.data.msg);
        });

    }

    return (
    <form style={{width:"50vw"}} onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <div class="form-group">
            <label htmlFor="#username">Username</label>
            <input type="text" id="usernme" class="form-control" name="username" onChange={handleChange}/>
        </div>
        <div class="form-group">
            <label htmlFor="#pass">Password</label>
            <input type="password" id="class" class="form-control" name="password" onChange={handleChange}/>
        </div>
        {err ? <div class="text-danger my-3">{err}</div> : <></>}
        <button type="submit" class="btn btn-primary me-4">Login</button>
    </form>
    );
}

export default Auth;
