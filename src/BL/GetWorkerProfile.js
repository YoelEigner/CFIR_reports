import axios from "axios"

const GetWorkerProfile = async (id, token, invalidateCache) => {
    const headers = {
        "authorization": `Bearer ${token}`
    }
    invalidateCache && (headers["invalidate-cache"] = invalidateCache)

    let resp = await axios.post(process.env.REACT_APP_API_URL + '/workprofiles', { id: id },
        { headers: headers })
    return resp.data
}

export default GetWorkerProfile