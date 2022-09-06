import axios from "axios"

const GetWorkerProfile = async (id, token) => {
    let resp = await axios.post(process.env.REACT_APP_API_URL + '/workprofiles', { id: id }, { headers: { "authorization": `Bearer ${token}` } })
    return resp.data
}

export default GetWorkerProfile