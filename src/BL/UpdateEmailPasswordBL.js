import axios from 'axios';

const UpdateEmailPasswordBL = async (token, password) => {
    let resp = await axios.post(process.env.REACT_APP_API_URL + '/updateemailpassword', { password: password }, { headers: { "authorization": `Bearer ${token}` } })
    return resp
}
export default UpdateEmailPasswordBL