import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from "../../actions/authAction"
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
	<div class="d-flex flex-column flex-shrink-0 p-3 border border-right border-primary" style={{width: "280px",height:"100vh", float:"left"}}>
		<a href="/" class="navbar-brand d-flex align-items-center mb-3 mb-md-0 me-md-auto fs-2">
			<i class="bi bi-truck me-1 text-primary"></i>
			<span>Gì đó</span>
		</a>
		<hr/>
		<ul class="nav nav-pills flex-column mb-auto">
			<li class="nav-item">
				<Link to="/emps"  class={path=="/emps" ? "nav-link active" : "nav-link"}>
					<i class="bi bi-bar-chart me-3"></i>
					<span>Tổng quan</span>
				</Link>
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
			{user  ? (<div class="dropdown">
				<div class="d-flex align-items-center text-decoration-none dropdown-toggle show" data-bs-toggle="dropdown">
					<img src={user?.image} class="rounded-circle me-2" width="32" height="32"/>
					<strong>{user.name}</strong>					
				</div>
				<ul class="dropdown-menu text-small shadow">
					<li class="dropdown-item">
						<Link to="/auth" class="text-decoration-none">Change account</Link>
					</li>
					<li>
						<hr class="dropdown-divider"></hr>
					</li>
					<li class="dropdown-item" onClick={handleLogout}>Logout</li>
				</ul>
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