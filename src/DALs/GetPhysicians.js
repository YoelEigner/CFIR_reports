import axios from "axios"


const GetPhysician = async (token) => {
    let resp = await axios.get(process.env.REACT_APP_API_URL + '/physicians', {
        headers: {
            "authorization": `Bearer ${token}`
        }
    })
    return resp

}

export default GetPhysician