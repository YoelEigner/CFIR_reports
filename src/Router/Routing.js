import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import NavBar from "../NavBar";
import Denied from "../Login/Denied";
import { useSelector } from "react-redux";
import RegisterUser from './../RegisterUsers/RegisterUser';
import Login from "../Login/Login";

const Routing = () => {
    const storeData = useSelector(state => state)

    const loggedIn = storeData.authenticated

    return (
        <Router>
            <Routes>
                <Route exact path="/home" element={loggedIn ? <NavBar /> : <Denied />} />
                <Route path="/register" element={<div className="App"><RegisterUser /></div>} />
                <Route path="/*" element={<div className="App"><Login /></div>} />
            </Routes>
        </Router>

    );
}

export default Routing;
