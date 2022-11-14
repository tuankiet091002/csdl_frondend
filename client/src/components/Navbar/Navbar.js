import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {LOGOUT} from '../../constants/actionTypes';

const Navbar = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

	const handleLogout = () => {
		dispatch( {type: LOGOUT} );
		navigate('/');
		setUser(null);
	}
	useEffect( () => {
		const token = user?.token;

		setUser(JSON.parse(localStorage.getItem('profile')));
	}, [location]);

    return (
	<>
	<div class="d-flex flex-column flex-shrink-0 p-3 border border-right border-primary" style={{width: "280px",height:"100vh", float:"left"}}>
		<a href="/" class="navbar-brand d-flex align-items-center mb-3 mb-md-0 me-md-auto fs-2">
			<i class="bi bi-truck me-1 text-primary"></i>
			<span>UWC Remake</span>
		</a>
		<hr/>
		<ul class="nav nav-pills flex-column mb-auto">
			<li class="nav-item">
				<a href="#" class="nav-link active">
				<i class="bi bi-bar-chart me-3"></i>
				<span>Tổng quan</span>
				</a>
			</li>
			<li>
				<a href="#" class="nav-link ">
				<i class="bi bi-briefcase me-3"></i>
				<span>Thiết bị</span>
				</a>
			</li>
			<li>
				<a href="#" class="nav-link ">
				<i class="bi bi-person me-3"></i>
				<span>Phân công</span>
				</a>
			</li>
			<li>
				<a href="#" class="nav-link">
				<i class="bi bi-map me-3"></i>
				<span>Bản đồ</span>
				</a>
			</li>
			<li>
				<a href="#" class="nav-link">
				<i class="bi bi-chat-right-text me-3"></i>
				Tin nhắn
				</a>
			</li>
		</ul>
		<hr/>
		<ul class="nav nav-tabs flex-column text-muted mb-4">
			<li class="nav-item active">
				<a href="#" class="nav-link">
					<i class="bi bi-exclamation me-3"></i>
					<span>Trợ giúp</span>
				</a>
			</li>
			<li class="nav-item">
				<a href="#" class="nav-link">
					<i class="bi bi-chat-dots me-3"></i>
					<span>Liên hệ</span>
				</a>
			</li>
		</ul>
		<div class="container">
			{user?.result  ? (<div>
				<Link to="/" class="d-flex align-items-center text-decoration-none">
					<img src={user?.result.image} class="rounded-circle me-2" width="32" height="32"/>
					<strong>{user.result.name}</strong>					
				</Link>
				<button type="button" class="btn btn-danger mt-2" onClick={handleLogout}>Logout</button>
				</div> ) : (
				<Link to="/auth">
					<button class="btn btn-primary" role="button">Sign In</button>
				</Link>
				
			)}
			
			
    	</div>
	</div>
  
  
	</>
    )};

export default Navbar;