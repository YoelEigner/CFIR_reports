

import axios from 'axios';

const GetNewWorkers = async (token) => {
    let resp = await axios.get(process.env.REACT_APP_API_URL + `/newphysicians`, { headers: { "authorization": `Bearer ${token}` } })
    return resp.data

}

export default GetNewWorkers
