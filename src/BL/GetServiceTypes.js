

import axios from 'axios';

const GetServiceTypes = async (token) => {
    let resp = await axios.get(process.env.REACT_APP_API_URL + `/servicetypes`, { headers: { "authorization": `Bearer ${token}` } })
    return resp.data

}

export default GetServiceTypes
