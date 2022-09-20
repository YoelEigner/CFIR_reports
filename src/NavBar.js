import { Alert, Container, Nav, Navbar } from "react-bootstrap"
import { useState } from 'react';
import WorkerProfiles from './Workers/WorkerProfiles';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import GetPhysicianFunc from './Login/GetPhysicianFunc';
import UpdateEmailPassword from "./UpdateEmailPassword/UpdateEmailPassword";
import resetadjustmentfee from './BL/ResetAjustmentFees';
import ResetAdjustmentFeeModal from './ResetAdjustmentFeeModal/ResetAdjustmentFeeModal';
import Main from "./HomePage/Main";

const NavBar = () => {
    const [physiciansVisable, setWorkerProfile] = useState(false)
    const [getByDateVisable, setGetByDateVisable] = useState(true)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [isActive, setIsActive] = useState(true)
    const [updatePass, setUpdatePass] = useState(false)
    const storeData = useSelector(state => state)
    const [msg, setMsg] = useState("")
    const [varient, setVarient] = useState("success")
    const [showHide, setShowHide] = useState(false)

    const clickAction = (btn) => {
        if (btn === 'byDate') {
            setGetByDateVisable(true)
            setWorkerProfile(false)
            setUpdatePass(false)
            setIsActive(true)
        }
        else if (btn === 'workerprofile') {
            setGetByDateVisable(false)
            setWorkerProfile(true)
            setUpdatePass(false)
            setIsActive(false)
        }
        else if (btn === 'updatepass') {
            setGetByDateVisable(false)
            setWorkerProfile(false)
            setUpdatePass(true)
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

    const handleResp = async (resp) => {
        setShowHide(false)
        setIsActive(false)
        if (resp === 'OK') {
            setVarient("success")
            setMsg("Adjustment fees have been reset")

            setTimeout(() => {
                setMsg("")
            }, 5000);
        }
        else {
            setVarient("danger")
            setMsg('Error!')
        }

    }
    return (
        <div >
            <Navbar bg="dark" variant="dark" style={{ position: 'sticky', top: '0', zIndex: "1" }}>
                <Container>
                    <Nav className="me-auto">
                        <Nav.Link href="#getbydate" onClick={() => clickAction('byDate')} activeclassname="active" active={isActive}>Get By Date</Nav.Link>
                        <Nav.Link href="#workerprofile" onClick={() => clickAction('workerprofile')} activeclassname="active">Worker Profile</Nav.Link>
                        <Nav.Link href="#updatepassword" onClick={() => clickAction('updatepass')} activeclassname="active">Update Password</Nav.Link>
                        <Nav.Link href="#resetAdjustmentFees" onClick={() => setShowHide(true)} activeclassname="active">Reset Adjustment Fees</Nav.Link>
                        <Nav.Link href="#logout" onClick={() => clickAction('logout')} >Logout</Nav.Link>


                    </Nav>
                    <Navbar.Text>
                        Signed in as: <a href="#">{storeData.username}</a>
                    </Navbar.Text>
                </Container>
            </Navbar>
            {msg !== "" && <Alert style={{ textAlign: "center", position: "sticky", top: 45 }} key={'success'} variant={'success'}>
                {msg}
            </Alert>}
            <div className="App">
                <div className="spaceTop">
                    <ResetAdjustmentFeeModal show={showHide} setShow={(e) => { setShowHide(e) }} token={storeData.accessToken} handleResp={(resp) => handleResp(resp)} />
                    {getByDateVisable && <Main />}
                    {physiciansVisable && <WorkerProfiles />}
                    {updatePass && <UpdateEmailPassword />}
                </div>
            </div>
        </div>
    )
}

export default NavBar