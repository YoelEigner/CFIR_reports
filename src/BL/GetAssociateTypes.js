

import axios from 'axios';

const GetAssociateTypes = async (token, associateType) => {
    let resp = await axios.post(process.env.REACT_APP_API_URL + `/associatetypes`, { associateType: associateType }, { headers: { "authorization": `Bearer ${token}` } })
    return resp.data

}

export default GetAssociateTypes