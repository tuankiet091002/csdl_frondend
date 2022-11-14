import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';

import { signin, signup } from "../../actions/authAction"
import { AUTH } from "../../constants/actionTypes"


const Auth = () => {
    const initialState = { firstName: '', lastName: '', email: '', password: ''};

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(false);

    const switchMode = () => {
        setIsSignup((prev) => !prev);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    const handleGoogleSuccess = async (res) => {
        const userObj = jwt_decode(res.credential);
        const basic = { name: userObj.name, image: userObj.picture, email:userObj.email, sub: userObj.sub}
        try {
            dispatch({ type: AUTH, data: { result: basic, token: res.credential } });
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignup) {
            dispatch(signup(form, navigate));
        } else {
            dispatch(signin(form, navigate));
        }
    }

    return (
    <form style={{width:"50vw"}} onSubmit={handleSubmit}>
        <h1>{ isSignup ? 'Sign Up': 'Sign In' }</h1>
        {   isSignup && (
            <div class="form-group">
            <label for="#fname">First Name</label>
            <input type="text" id="fname" class="form-control" name="firstName" onChange={handleChange}/>
            <label for="#lname">Last Name</label>
            <input type="text" id="lname" class="form-control" name="lastName" onChange={handleChange}/>
            </div>
        )
        }
        <div class="form-group">
            <label for="#email">Email address</label>
            <input type="email" id="email" class="form-control" name="email" onChange={handleChange}/>
        </div>
        <div class="form-group">
            <label for="#pass">Password</label>
            <input type="password" id="class" class="form-control" name="password" onChange={handleChange}/>
        </div>
        <hr/>
        
        <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => {
                console.log('Login Failed');
            }}
        /> <br/>
        
        <button type="submit" class="btn btn-primary me-4">{isSignup ? 'Sign Up' : 'Sign In'}</button>
        <button type="button" class="btn btn-secondary" onClick={switchMode}>
            { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
        </button>
    </form>
    );
}

export default Auth;
