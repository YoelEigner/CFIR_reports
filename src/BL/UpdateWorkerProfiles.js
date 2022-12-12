import axios from 'axios';

const UpdateWorkerProfile = async (token, obj, id) => {
    let resp = await axios.post(process.env.REACT_APP_API_URL + `/updateworkerprofile`, { obj: obj, id: id, }, { headers: { "authorization": `Bearer ${token}` } })
    return resp.data

}

export default UpdateWorkerProfile