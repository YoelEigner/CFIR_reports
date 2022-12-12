

import axios from 'axios';

const GetProvinces = async (token) => {
    let resp = await axios.get(process.env.REACT_APP_API_URL + `/provinces`, { headers: { "authorization": `Bearer ${token}` } })
    return resp.data

}

export default GetProvinces
