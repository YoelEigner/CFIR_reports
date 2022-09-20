import { Alert, Button, Col, Form } from 'react-bootstrap'
import { useState } from 'react';
import GetToken from '../BL/JWTtoken'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import GetProvinces from '../BL/GetProvinces';
import GetPaymentTypes from '../BL/GetPaymentTypes';
import LoadingSpinner from './../Loader/Loader';
import GetPhysicianFunc from './GetPhysicianFunc';
import GetAssociateLeval from './../BL/GetAssociateLeval';

const Login = () => {
    const [username, setUsername] = useState('')
    const [pass, setPass] = useState('')
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [err, setErr] = useState("")
    const [isLoading, setIsLoading] = useState(false);


    const submit = async (e) => {
        e.preventDefault()
        setIsLoading(true);
        try {
            let resp = await GetToken(username, pass)
            let respProvinces = await GetProvinces(resp.accessToken)
            let physicians = await GetPhysicianFunc(resp.accessToken)
            let paymentTypes = await GetPaymentTypes(resp.accessToken)
            let associateLeval = await GetAssociateLeval(resp.accessToken)
            dispatch({ type: "ACCESSTOKEN", payload: resp.accessToken })
            dispatch({ type: "REFRESHTOKEN", payload: resp.refreshToken })
            dispatch({ type: "AUTHENTICATED", payload: resp.authenticated })
            dispatch({ type: "USERNAME", payload: resp.username })
            dispatch({ type: "EXPIERSIN", payload: resp.expiresIn })
            dispatch({ type: "PROVENCE", payload: respProvinces })
            dispatch({ type: "PHYSICIANS", payload: physicians })
            dispatch({ type: "PAYMENTTYPES", payload: paymentTypes })
            dispatch({ type: "ASSOCIATELEVAL", payload: associateLeval })
            if (resp.authenticated === true) {
                setIsLoading(false)
                navigate('/home');
            }

        } catch (error) {
            setErr(error.response.data)
            setPass('')
            setIsLoading(false);
            setTimeout(() => {
                setErr("")
            }, 50000);
        }
    }



    return (
        <div className='spaceTop' style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'
        }}>
            {isLoading && <LoadingSpinner />}
            <Col>
                {err !== "" && <Alert key={'danger'} variant={'danger'}>
                    {err}
                </Alert>}
                <h3>Login</h3>
                <Form onSubmit={(e) => { submit(e) }}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Username" value={username} onChange={(e) => { setUsername(e.target.value) }} />
                    </Form.Group>
                    <div className="pass-wrapper">
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={pass} onChange={(e) => { setPass(e.target.value) }} />
                            {/* <i>{eye}</i> */}
                        </Form.Group>
                    </div>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
                <span><a href='/register'>Need to register?</a></span>
                <br />
            </Col>
        </div>)

}
export default Login