import axios from "axios"

const ChangePasswordBL = async (username, oldPassword, nerwPassword) => {
    let resp = await axios.post(process.env.REACT_APP_API_AUTH_URL +`/changepass`, {
        username: username, oldpassword: oldPassword, newpassword: nerwPassword
    })
    return resp
}
export default ChangePasswordBL