import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import NavBar from "../NavBar";
import Denied from "../Login/Denied";
import { useSelector } from "react-redux";
import RegisterUser from './../RegisterUsers/RegisterUser';
import Login from "../Login/Login";
import WorkerProfiles from './../Workers/WorkerProfiles';
import Main from './../HomePage/Main';
import ChangePassword from './../ChangePassword/ChangePassword';
import UpdateEmailPassword from "../UpdateEmailPassword/UpdateEmailPassword";

const Routing = () => {
    const storeData = useSelector(state => state)
    const [loggedIn, setLoggedin] = useState(false)
    // const [open, setOpen] = useState(false)

    useEffect(() => {
        revokeAccess()
        // setTimeout(() => {
        //     setLoggedin(false)
        //     console.log("loggedout")
        // }, 5000);
    }, [])

    useEffect(() => {
        setLoggedin(storeData.authenticated)
    }, [storeData.authenticated])

    const revokeAccess = () => {
        setTimeout(() => {
            setLoggedin(false)
        }, 43200000);
    }
    return (
        <Router>
            <div className="sticky">{loggedIn && <NavBar></NavBar>}</div>
            {/* <RefreshToeknModal open={open} setOpen={(close) => setOpen(close)} revokeAccess={() => revokeAccess()} /> */}
            <div className="App">
                <div className="spaceTop">
                    <Routes>
                        <Route exact path="/home" element={loggedIn ? <Main /> : <Denied />} />
                        <Route exact path="/workerprofile" element={loggedIn ? <WorkerProfiles /> : <Denied />} />
                        <Route exact path="/changepass" element={<ChangePassword />} />
                        <Route exact path="/emailpass" element={<UpdateEmailPassword />} />
                        <Route path="/register" element={<div className="App"><RegisterUser /></div>} />
                        <Route path="/login" element={<div className="App"><Login /></div>} />
                        <Route path="/logout" element={<div className="App"><Denied /></div>} />
                        <Route path="/" element={<div className="App"><Login /></div>} />
                    </Routes>
                </div>
            </div>
        </Router>

    );
}

export default Routing;
