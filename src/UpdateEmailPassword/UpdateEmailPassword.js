import { useState } from "react";
import { Alert, Button, Form, InputGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import UpdateEmailPasswordBL from "../BL/UpdateEmailPasswordBL";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";

const UpdateEmailPassword = () => {
    const [pass, setPass] = useState("")
    const storeData = useSelector(state => state)
    const [msg, setMsg] = useState("")
    const [varient, setVarient] = useState("danger")
    const [showHide, setShowHide] = useState('password')
    // const eye = <FontAwesomeIcon icon={faEye} />;
    // const { register, handleSubmit, watch, formState: { errors } } = useForm();


    const onSubmit = async (e) => {
        try {
            let resp = await UpdateEmailPasswordBL(storeData.accessToken, pass)
            if (resp.status === 200) {
                setVarient('success')
                setMsg('Password has been updated')
                setTimeout(() => {
                    setMsg('')
                }, 5000);
            }

        } catch (error) {
            setVarient("danger")
            setMsg(error.message)
            setTimeout(() => {
                setMsg('')
            }, 5000);
        }
    }

    return (
        <div style={{ paddingTop: '100%' }}>
            {msg !== "" && <Alert key={varient} variant={varient}>
                {msg}
            </Alert>}

            <Form className="" onSubmit={onSubmit}>
                <div className="pass-wrapper">

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Update email password</Form.Label>
                        <Form.Control type={showHide} placeholder="Password" onChange={(e) => setPass(e.target.value)}
                        />
                        {/* <i>{eye}</i> */}
                        {/* {errors.requierd && <span style={{ color: 'red' }}>This field is required</span>} */}

                    </Form.Group>
                </div>
                <Button variant="dark" type="submit">
                    Update Password
                </Button>
            </Form>

        </div>
    );
}
export default UpdateEmailPassword