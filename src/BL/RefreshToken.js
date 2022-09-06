import axios from 'axios';

const RefreshToken = async (refreshToken, status,) => {

    let resp = await axios.post(process.env.REACT_APP_API_AUTH_URL + `/token`, { token: refreshToken })
    return resp.data
}

export default RefreshToken
