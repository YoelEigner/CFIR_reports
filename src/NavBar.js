import { Container, Nav, Navbar } from "react-bootstrap"
import { useState } from 'react';
import WorkerProfiles from './Workers/WorkerProfiles';
import Main from "./GetFile/Main";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import GetPhysicianFunc from './Login/GetPhysicianFunc';

const NavBar = () => {
    const [physiciansVisable, setWorkerProfile] = useState(false)
    const [getByDateVisable, setGetByDateVisable] = useState(true)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [isActive, setIsActive] = useState(true)
    const storeData = useSelector(state => state)

    const clickAction = (btn) => {
        if (btn === 'byDate') {
            setGetByDateVisable(true)
            setWorkerProfile(false)
            setIsActive(true)
        }
        else if (btn === 'workerprofile') {
            setGetByDateVisable(false)
            setWorkerProfile(true)
            setIsActive(false)
        }
        else if (btn === 'logout') {
            dispatch({ type: "RESET" })
            navigate('/login')
        }
    }
    const onReload = async () => {
        let physicians = await GetPhysicianFunc(storeData.accessToken)
        dispatch({ type: "PHYSICIANS", payload: physicians })

    }
    useEffect(() => {
        onReload()
    }, [])


    return (
        <div >
            <Navbar bg="dark" variant="dark" style={{ position: 'sticky', top: '0', zIndex: "1" }}>
                <Container>
                    <Nav className="me-auto">
                        <Nav.Link href="#getbydate" onClick={() => clickAction('byDate')} activeclassname="active" active={isActive}>Get By Date</Nav.Link>
                        <Nav.Link href="#workerprofile" onClick={() => clickAction('workerprofile')} activeclassname="active">Worker Profile</Nav.Link>
                        <Nav.Link href="#logout" onClick={() => clickAction('logout')} >Logout</Nav.Link>
                    </Nav>
                    <Navbar.Text>
                        Signed in as: <a href="#">{storeData.username}</a>
                    </Navbar.Text>
                </Container>
            </Navbar>
            <div className="App">
                <div className="spaceTop">
                    {getByDateVisable && <Main />}
                    {physiciansVisable && <WorkerProfiles />}
                </div>
            </div>
        </div>
    )
}

export default NavBar