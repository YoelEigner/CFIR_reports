import { Alert, Container, Nav, Navbar } from "react-bootstrap"
import { Children, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import GetPhysicianFunc from './Login/GetPhysicianFunc';
import ResetAdjustmentFeeModal from './ResetAdjustmentFeeModal/ResetAdjustmentFeeModal';
import TokenRefreshModal from "./Login/TokenRefreshModal";


const NavBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const storeData = useSelector(state => state)
    const [msg, setMsg] = useState("")
    const [varient, setVarient] = useState("success")
    const [showHide, setShowHide] = useState(false)
    const [open, setOpen] = useState(false)
    const [active, setActive] = useState('default');


    const logout = () => {
        dispatch({ type: "RESET" })
        navigate('/login')
    }
    const onReload = async () => {
        let physicians = await GetPhysicianFunc(storeData.accessToken)
        dispatch({ type: "PHYSICIANS", payload: physicians })

    }
    useEffect(() => {
        onReload()
    }, [])

    // useEffect(() => {
    //     revokeAccess()
    // }, [])

    const revokeAccess = () => {
        setTimeout(() => {
            setOpen(true)
        }, storeData.expiresIn);
    }

    const handleResp = async (resp) => {
        setShowHide(false)
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
            <TokenRefreshModal open={open} setOpen={(close) => setOpen(close)} revokeAccess={() => revokeAccess()} />

            <Navbar bg="dark" variant="dark" style={{ position: 'sticky', top: '0', zIndex: "1" }}>
                <Container>
                    <Nav className="me-auto"
                        activeKey={active}
                        onSelect={(selectedKey) => setActive(selectedKey)}
                    >
                        <Nav.Link href="" onClick={() => window.open('/home')} eventKey="default" >Get By Date</Nav.Link>
                        <Nav.Link href="" onClick={() => window.open('/workerprofile', '_blank')} eventKey="link-1" >Worker Profile</Nav.Link>
                        <Nav.Link href="" onClick={() => setShowHide(true)} eventKey="link-2">Reset Adjustment Fees</Nav.Link>
                        <Nav.Link href="" onClick={() => navigate('changepass', { user: 'yoel' })} eventKey="link-3" >Change Password</Nav.Link>
                        <Nav.Link href="" onClick={() => logout()} >Logout</Nav.Link>

                    </Nav>
                    <Navbar.Text>
                        Signed in as: <a href="#/" onClick={() => navigate('changepass')}>{storeData.username}</a>
                    </Navbar.Text>
                </Container>
            </Navbar>
            {msg !== "" && <Alert style={{ textAlign: "center", position: "sticky", top: 50 }} key={'success'} variant={varient}>
                {msg}
            </Alert>}
            <ResetAdjustmentFeeModal show={showHide} setShow={(e) => { setShowHide(e) }} token={storeData.accessToken} handleResp={(resp) => handleResp(resp)} />
        </div>
    )
}

export default NavBar