import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from "../../actions/authAction";
import ng from "./image/NextGenLogo2-01.jpg";
import './nav.css';
const Navbar = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const path = location.pathname;
	const dispatch = useDispatch();
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
	const handleLogout = () => {
		dispatch( logout(navigate) );
		setUser(null);
	}
	useEffect( () => {
		setUser(JSON.parse(localStorage.getItem('profile')));
	}, [location]);
	
    return (
	<>
	<header class="header-area">
	<div className="main-menu">
	<div class="navbar navbar-expand-lg navbar-light">
        <a class="navbar-brand" href='#'><img src={ng} id="lg" alt="logo" ></img></a>
		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
        </button>
		<div class="collapse navbar-collapse" id="navbarNav">
                    <div class="mr-auto"></div>
                    <ul class="navbar-nav">
                        <li class="nav-item active">
                            <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="https://www.facebook.com/chacachiene/">about</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">services</a>
                        </li>
                        <li class="nav-item">
							{/* <div class="navbar-text"> */}
							{user  ? (<div class="dropdown">
							<div class="d-flex align-items-center text-decoration-none dropdown-toggle show text-light" data-bs-toggle="dropdown">
								<img src="https://lh3.googleusercontent.com/a/ALm5wu2AB7IT-xUd2FXVnbUwKYOBPiFbSHK5yvzFSbsS=s360-p-no" class="rounded-circle me-2 h2" width="32" height="32"/>
								<strong>{user.name}</strong>					
							</div>
								<ul class="dropdown-menu text-small shadow mr-auto">
									<li class="dropdown-item">
										<Link to="/auth" class="text-decoration-none text-primary">Change account</Link>
									</li>
									<li>
										<hr class="dropdown-divider"></hr>
									</li>
									<li class="dropdown-item text-danger" onClick={handleLogout}>Logout</li>
								</ul>
							</div> ) : (
								<Link to="/auth">
									<button class="btn btn-primary" role="button">Sign In</button>
								</Link>
					
								)}
							{/* </div> */}
                        </li>

                    </ul>
                </div>
		</div>
  
	</div>
	</header>
	</>
    )};

export default Navbar;