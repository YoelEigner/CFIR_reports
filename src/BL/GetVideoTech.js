

import axios from 'axios';

const GetVideoTech = async (token) => {
    let resp = await axios.get(process.env.REACT_APP_API_URL + `/videotech`, { headers: { "authorization": `Bearer ${token}` } })
    return resp.data

}

export default GetVideoTech
