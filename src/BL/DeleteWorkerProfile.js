import axios from "axios"

const DeleteWorkerProfile = async (token, id) => {
    let resp = await axios.post(process.env.REACT_APP_API_URL + `/deleteprofile`, { id: id }, { headers: { "authorization": `Bearer ${token}` } })
    return resp
}
export default DeleteWorkerProfile