import axios from "axios"

const RegisterUserBL = async (username, oldPassword, password) => {
    let resp = await axios.post(process.env.REACT_APP_API_AUTH_URL +`/register`, {
        username: username, oldPassword: oldPassword, password: password
    })
    return resp
}
export default RegisterUserBL