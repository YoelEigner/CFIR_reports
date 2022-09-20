import GetPhysician from './../DALs/GetPhysicians';

const GetPhysicianFunc = async (token) => {
    let resp = await GetPhysician(token)
    let arr = []
    resp.data.forEach(user => {
        let temp = user
        let status = temp.status === true ? " (Active)" : " (Not Active)"
        temp.associateName = user.associateType + " - " + temp.associateName + status
        arr.push(temp)
    })
    return resp.data
}

export default GetPhysicianFunc