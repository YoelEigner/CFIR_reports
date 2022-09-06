const { default: GetVideoTech } = require("../BL/GetVideoTech")

exports.videoTechAPI = async () => {
    let resp = await GetVideoTech(storeData.accessToken)
    let arr = []
    resp.forEach(x => {
        x.id !== selected && arr.push({ value: x.id, label: x.name })
    })
    setVideoTech(arr)
}