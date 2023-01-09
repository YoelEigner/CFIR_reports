import axios from 'axios'
import moment from 'moment'
// import configureStore from '../store/ReduxStore'
import saveAs from 'file-saver';


const GetFile = async (start, end, token, reportType, users, action, videoFee, type) => {
    let resp = await axios.post(process.env.REACT_APP_API_URL + '/generatepdf', {
        start: moment(start).format('YYYY-MM-DD'), end: moment(end).format('YYYY-MM-DD'),
        users: users, action: action, videoFee, reportType, actionType: type
    }, { responseType: 'blob', headers: { "authorization": `Bearer ${token}` } })

    if (action === 'email') {
        return resp
    }
    else if (reportType === 'singlepdf') {
        const file = new Blob([resp.data], { type: 'application/pdf' });
        const urlOne = URL.createObjectURL(file)
        window.open(urlOne)
        return resp
    }
    else if (reportType === 'multipdf') {
        const file = new Blob([resp.data], { type: 'application/zip' });
        let date = new Date()
        var filename = type + "_reports_" + date.toJSON().slice(0, 10) + "T" + date.toLocaleTimeString().slice(0, 5) + ".zip";
        saveAs(file, filename)
        if (action === 'both') {
            saveAs(file, filename)
        }
        return resp
    }
}
export default GetFile