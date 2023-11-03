import React from 'react';
import { Alert, Button, Col, Form } from 'react-bootstrap'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterUserBL from '../BL/RegisterUserBL';

const RegisterUser = () => {
    const [username, setUsername] = useState('')
    const [oldPass, setOldPass] = useState('')
    const [newPass, setNewPass] = useState('')
    const navigate = useNavigate();
    const [err, setErr] = useState("")

    const submit = async (e) => {
        e.preventDefault()
        try {
            let resp = await RegisterUserBL(username, oldPass, newPass)
            if (resp.status === 200) { navigate('/login'); }
        } catch (error) {
            setErr(error.response.data)
            setTimeout(() => {
                setErr("")
            }, 5000);
        }
    }

    return (
        <div className='spaceTop' style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'
        }}>
            <Col>
                {err !== "" && <Alert key={'danger'} variant={'danger'}>
                    {err}
                </Alert>}
                <h3>Register</h3>
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
                        Register
                    </Button>
                </Form>
            </Col>
        </div>)

}
export default RegisterUser