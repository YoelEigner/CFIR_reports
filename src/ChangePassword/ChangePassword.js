import React from 'react';
import { Alert, Button, Col, Form } from 'react-bootstrap'
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ChangePasswordBL from '../BL/ChangePasswordBL';
import { useEffect } from 'react';


const ChangePassword = () => {
    const [username, setUsername] = useState('')
    const [oldPass, setOldPass] = useState('')
    const [newPass, setNewPass] = useState('')
    const [err, setErr] = useState("")
    const [varient, setVarient] = useState('danger')
    const location = useLocation();

    const submit = async (e) => {
        e.preventDefault()
        try {
            let resp = await ChangePasswordBL(username, oldPass, newPass)
            console.log(resp.status)

            if (resp.status === 200) {
                setVarient('success');
                setErr("Password successfully changed!")
            }
        } catch (error) {
            setVarient('danger')
            setErr(error.response.data)
        }
    }
    useEffect(() => { console.log(location) }, [])
    return (
        <div className='spaceTop' style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'
        }}>
            <Col>
                {err !== "" && <Alert key={varient} variant={varient}>
                    {err}
                </Alert>}
                <h3>Change Password</h3>
                <Form onSubmit={(e) => { submit(e) }}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Username" onChange={(e) => { setUsername(e.target.value) }} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicOldPassword">
                        <Form.Label>Old Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e) => { setOldPass(e.target.value) }} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e) => { setNewPass(e.target.value) }} />
                    </Form.Group>
                    <Button variant="secondary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Col>
        </div>)
}

export default ChangePassword