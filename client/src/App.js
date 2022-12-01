import React, { useEffect } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from "./components/Navbar/Navbar.js"
import Home from "./components/Home/Home.js"
import Auth from "./components/Auth/Auth.js"
const App = () => {
	
    return (
		<BrowserRouter>
			<Navbar />
            <div class="container">
			    <Routes>
                    <Route exact path="/"  element={<Home />} />
                    <Route exact path="/auth" element={<Auth />} />
			    </Routes>
            </div>
		</BrowserRouter>
    )};

export default App;

