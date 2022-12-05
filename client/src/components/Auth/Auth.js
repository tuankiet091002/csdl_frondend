import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './form.css';
import ji from './image/jisoo.jpg';
import ro from './image/rose.jpg';
import li from './image/lisa.jpg';
import che from './image/cheni.jpg';
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
        <form onSubmit={handleSubmit} class="all">
            <section class="Form my-4 mx-5">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-5 px-5 pt-5">
                            <div class="form-signup">
                                <h3>Sign into your account</h3>
                                <div class="form-group">
                                    <label htmlFor="#username"></label>
                                    <input type="text" id="username" class="form-control" name="username" onChange={handleChange} placeholder="Your username" my-3 p-4/>
                                </div>
                                <div class="form-group">
                                    <label htmlFor="#pass"></label>
                                    <input type="password" id="class" class="form-control" name="password" onChange={handleChange} placeholder="Your password"/>
                                </div>
                                {err ? <div class="text-danger my-3">{err}</div> : <></>}
                                <div class="form-group">
                                    <button type="submit" class="btn1" mt-3 mb-5>Login</button>
                                </div>
                                <a href='#' class="let">Forgot password</a>
                                <p>Don't have an account? <a href='#' class="let">Register here</a> </p> 
                            </div>
                        </div>
                        {/* <div class="col-lg-7">
                            <img src={ji} class="img-fluid"></img>
                        </div> */}
                        
                            <div class="col-lg-7 carousel slide" id="slides" data-ride="carousel">
                                <ul class="carousel-indicators">
                                    <li data-target="#slides" data-slide-to="0" class="active"></li>
                                    <li data-target="#slides" data-slide-to="1"></li>
                                    <li data-target="#slides" data-slide-to="2"></li>
                                    <li data-target="#slides" data-slide-to="3"></li>
                                    <li data-target="#slides" data-slide-to="4"></li>
                                </ul>
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <img class="img-responsive" src={ji}></img>
                                    </div>
                                    <div class="carousel-item">
                                        <img class="img-responsive" src={ro} alt="third"></img>
                                        {/* <div class="carousel-caption">
                                            <a href="#gtcms"><button type="button" class="btn btn-primary btn-lg">Giới thiệu</button></a>
                                        </div> */}
                                    </div>
                                    <div class="carousel-item">
                                        <img class="img-responsive" src={li}></img>
                                        {/* <div class="carousel-caption">
                                            <a href="#udsdcms"><button type="button" class="btn btn-primary btn-lg">Ưu điểm</button></a>
                                        </div> */}
                                    </div>
                                    <div class="carousel-item">
                                        <img class="img-responsive" src={che}></img>
                                        {/* <div class="carousel-caption">
                                        <a href="#cmsnt"><button type="button" class="btn btn-primary btn-lg">Famous CMS</button></a>
                                        </div> */}
                                    </div>
                                    <div class="carousel-item">
                                        <div class="img-responsive">
                                        <iframe src="https://assets.pinterest.com/ext/embed.html?id=387802217925936329" height="520" width="300" frameborder="0" scrolling="no" ></iframe>
                                        </div>
                                        {/* <div class="carousel-caption">
                                            <h1>About us</h1>
                                            
                                            <a href="https://www.youtube.com/watch?v=cpwwT61drkA&t=205s"><button type="button" class="btn btn-primary btn-lg">Thuyết trình</button></a>
                                        </div> */}
                                    </div>
                                </div>
                                <a class="carousel-control-prev" href="#slides" role="button" data-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Previous</span>
                                </a>
                                <a class="carousel-control-next" href="#slides" role="button" data-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Next</span>
                                </a>
                            </div>
                        
                    </div>
                </div>
            </section>
    </form>
    );
}

export default Auth;
