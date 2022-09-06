

import axios from 'axios';

const GetPaymentTypes = async (token) => {
    let resp = await axios.get(process.env.REACT_APP_API_URL + `/paymenttypes`, { headers: { "authorization": `Bearer ${token}` } })
    return resp.data

}

export default GetPaymentTypes
