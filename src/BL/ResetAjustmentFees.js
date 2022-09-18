import axios from 'axios';

const resetadjustmentfee = async (token) => {
    let resp = await axios.get(process.env.REACT_APP_API_URL + `/resetadjustmentfee`, { headers: { "authorization": `Bearer ${token}` } })
    return resp.data
}

export default resetadjustmentfee