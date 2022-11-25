import React, { useEffect } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Navbar from "./components/Navbar/Navbar.js"
import Home from "./components/Home/Home.js"
import Auth from './components/Auth/Auth.js';
import Map from './components/Map/Map.js';
import Employees from './components/Employees/Employees.js';

const App = () => {
	
    return (
	<GoogleOAuthProvider clientId='102581995176-77c0br3ckkgg0s1i7q9pufubqa6d1nm0.apps.googleusercontent.com'>
		<BrowserRouter>
			<div class="row justify-content-start">
				<div class="col-auto">
					<Navbar />
				</div>
				<div class="col">
					<Routes>
						<Route exact path="/"  element={<Home />} />
						<Route exact path="/auth" element={<Auth />} />
						<Route exact path="/emps" element ={<Employees />} />
						<Route exact path="/vehs" element ={<Map />} />
						<Route exact path="/mcps" element ={<Map />} />
						<Route exact path="/map" element ={<Map />} />
					</Routes>
				</div>
			</div>
		</BrowserRouter>
	</GoogleOAuthProvider>
    )};

export default App;

