const { default: GetWorkerProfile } = require("../BL/GetWorkerProfile")

exports.GetSuperviserName = async (id, token) => {
    let resp = await GetWorkerProfile(id, token)
    try {
        if(typeof(resp) !== "string"){
            return resp[0]
        }
        else{
            return []
        }
    } catch (error) {
        return []
    }
}