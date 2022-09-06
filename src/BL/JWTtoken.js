import axios from 'axios';

const GetToken = async (username, password) => {
    let resp = await axios.post(process.env.REACT_APP_API_AUTH_URL + `/login`, { "username": username, "password": password })
    return resp.data

}

export default GetToken
