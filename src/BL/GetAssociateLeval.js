

import axios from 'axios';

const GetAssociateLeval = async (token) => {
    let resp = await axios.get(process.env.REACT_APP_API_URL + `/getassociateleval`, { headers: { "authorization": `Bearer ${token}` } })
    return resp.data

}

export default GetAssociateLeval
