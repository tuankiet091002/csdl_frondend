import React, {useState, useEffect } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from "./components/Navbar/Navbar.js"
import Home from "./components/Home/Home.js"
import Auth from "./components/Auth/Auth.js"
import Detail from "./components/Detail/Detail.js"
const App = () => {
    const [user,setUser]=useState(JSON.parse(localStorage.getItem('profile')));
    return (
		<BrowserRouter>
			<Navbar />
            <div class="container p-5 mx-0 p-5" style={{minHeight:'100vh', minWidth:"100vw"}}>
			    <Routes>
                    <Route exact path="/" element={user ? <Home/>:<Auth/>} />
                    <Route exact path="/home"  element={<Home />} />
                    <Route exact path="/auth" element={<Auth />} />
                    <Route exact path="/:id" element={<Detail />} />
			    </Routes>
            </div>
		</BrowserRouter>
    )};
export default App;

