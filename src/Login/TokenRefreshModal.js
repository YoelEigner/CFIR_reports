import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Timer from 'react-compound-timer/build';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import RefreshToken from '../BL/RefreshToken';
import { useEffect } from 'react';


const RefreshToeknModal = ({ open, setOpen, revokeAccess }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const storeData = (useSelector(state => state))

    const handleClose = () => {
        dispatch({ type: "RESET" })
        navigate('/login')
        setOpen(false)
    }
    const handleStay = async () => {
        let resp = await RefreshToken(storeData.refreshToken)
        dispatch({ type: "ACCESSTOKEN", payload: resp.accessToken });
        dispatch({ type: "AUTHENTICATED", payload: true })
        revokeAccess()
        setOpen(false)
    }


    return (
        <>
            <Modal
                show={open}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className='myModal'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    You will be logged out in {""}
                    <Timer initialTime={59000} checkpoints={[
                        {
                            time: 0,
                            callback: () => handleClose(),
                        }
                    ]}
                        direction="backward">
                        <Timer.Seconds />
                    </Timer> seconds, need more time?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Logout
                    </Button>
                    <Button variant="primary" onClick={handleStay}>Stay logged in</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default RefreshToeknModal
