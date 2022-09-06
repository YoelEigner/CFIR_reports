import axios from 'axios';

const NewWorkerProfile = async (token, arr) => {
    let resp = await axios.post(process.env.REACT_APP_API_URL + `/newworkprofiles`, { arr: arr }, { headers: { "authorization": `Bearer ${token}` } })
    return resp.data

}

export default NewWorkerProfile