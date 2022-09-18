import axios from 'axios';

const RefreshToken = async (token) => {

    let resp = await axios.post(process.env.REACT_APP_API_URL + `/newworkprofiles`, { headers: { "authorization": `Bearer ${token}` } })
    return resp.data
}

export default RefreshToken
