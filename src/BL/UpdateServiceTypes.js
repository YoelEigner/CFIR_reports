import axios from 'axios';

const UpdateServiceTypes = async (token, arr, id, covrage) => {
    let resp = await axios.post(process.env.REACT_APP_API_URL + `/updateservicetypes`, { arr: arr, id: id, covrage: covrage }, { headers: { "authorization": `Bearer ${token}` } })
    return resp.data

}

export default UpdateServiceTypes