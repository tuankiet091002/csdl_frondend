import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import { login, register } from "../../actions/authAction"
import { AUTH } from "../../constants/actionTypes"


const Auth = () => {
    const initialState = { name: '', username: '', password: '', role: ''};

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(false);

    const switchMode = () => {
        setIsSignup((prev) => !prev);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value || e.value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignup) {
            dispatch(register(form, navigate));
        } else {
            dispatch(login(form, navigate));
        }
    }

    return (
    <form style={{width:"50vw"}} onSubmit={handleSubmit}>
        <h1>{ isSignup ? 'Sign Up': 'Sign In' }</h1>
        {   isSignup && (
            <div class="form-group">
            <label for="#fname">Name</label>
            <input type="text" id="fname" class="form-control" name="name" onChange={handleChange}/>
            </div>
        )
        }
        <div class="form-group">
            <label for="#username">Username</label>
            <input type="text" id="usernme" class="form-control" name="username" onChange={handleChange}/>
        </div>
        <div class="form-group">
            <label for="#pass">Password</label>
            <input type="password" id="class" class="form-control" name="password" onChange={handleChange}/>
        </div>
        { isSignup && (<div class="form-group">
            <label for="role">Role</label>
            <select class="form-control" id="role" name = "role" onChange={handleChange}>
                <option value="janitor">Janitor</option>
                <option value="collector">Collector</option>
                <option value="backofficer">Back Officer</option>
                <option value="admin">Admin</option>
            </select>
        </div>)
        }
        <hr/>
        <button type="submit" class="btn btn-primary me-4">{isSignup ? 'Sign Up' : 'Sign In'}</button>
        <button type="button" class="btn btn-secondary" onClick={switchMode}>
            { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
        </button>
    </form>
    );
}

export default Auth;
