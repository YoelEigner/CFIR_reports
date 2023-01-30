import { useState } from "react";
import { Alert, Button, Form, InputGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import UpdateEmailPasswordBL from "../BL/UpdateEmailPasswordBL";

const UpdateEmailPassword = () => {
    const [pass, setPass] = useState("")
    const storeData = useSelector(state => state)
    const [msg, setMsg] = useState("")
    const [varient, setVarient] = useState("danger")

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            let resp = await UpdateEmailPasswordBL(storeData.accessToken, pass)
            if (resp.status === 200) {
                setPass("")
                setVarient('success')
                setMsg('Password has been updated')
                setTimeout(() => {
                    setMsg('')
                }, 5000);
            }

        } catch (error) {
            setPass("")
            setVarient("danger")
            setMsg(error.message)
            setTimeout(() => {
                setMsg('')
            }, 5000);
        }
    }

    return (
        <div style={{ paddingTop: '80%' }}>
            {msg !== "" && <Alert key={varient} variant={varient}>
                {msg}
            </Alert>}
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>{`Update email password`}</Form.Label>
                    <Form.Control type={'password'} placeholder="Password" value={pass} onChange={(e) => setPass(e.target.value)}
                    />
                </Form.Group>
                <Button variant="dark" type="submit">
                    Update Password
                </Button>
            </Form>
            <div style={{ position: 'absolute', left: '30%', right: '30%' }}>
                {`This password is NOT the account password, this is the "App Password" in the email account settings!`}
            </div>
        </div>
    );
}
export default UpdateEmailPassword