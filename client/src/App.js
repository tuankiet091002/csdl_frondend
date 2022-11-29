import React, { useEffect } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from "./components/Navbar/Navbar.js"
import Home from "./components/Home/Home.js"
import Auth from "./components/Auth/Auth.js"
import Employees from './components/Employees/Employees.js';
const App = () => {
	
    return (
		<BrowserRouter>
			<div class="row justify-content-start">
				<div class="col-auto">
					<Navbar />
				</div>
				<div class="col">
					<Routes>
						<Route exact path="/"  element={<Home />} />
						<Route exact path="/auth" element={<Auth />} />
                        <Route exact path="/emps" element={<Employees />}/>
					</Routes>
				</div>
			</div>
		</BrowserRouter>
    )};

export default App;

