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
	<div class="navbar navbar-dark bg-dark">
        <Link to="/"  class="navbar-brand mx-3">
            <h1><i class="bi bi-truck me-1 text-primary"></i>BTL CSDL</h1>
		</Link>
		<div class="navbar-text mx-3" style={{width: "12em"}}>
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
			
			
    	</div>
	</div>
  
  
	</>
    )};

export default Navbar;