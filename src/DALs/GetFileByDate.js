import axios from 'axios'
import moment from 'moment'
import configureStore from '../store/ReduxStore'
import saveAs from 'file-saver';

const GetFile = async (start, end, token, reportType, users, action, excahngeRate) => {
    const { store } = configureStore();
    axios.post(process.env.REACT_APP_API_URL + '/generatepdf',
        { start: moment(start, 'DD-MM-YYYY').format('YYYY/MMM/DD'), end: moment(end, 'DD-MM-YYYY').format('YYYY/MMM/DD'), users: users, action: action, excahngeRate, reportType },
        { responseType: 'blob', headers: { "authorization": `Bearer ${token}` } })
        .then(response => {
            //Create a Blob from the PDF Stream
            const file = new Blob([response.data], reportType === 'singlepdf' ? { type: 'application/pdf' } : { type: 'application/zip' });
            const url = URL.createObjectURL(file)
            if (response.status === 403) {
                store.dispatch({ type: "RESET", payload: "" })
                window.location.href = '/login'
            }
            if (reportType === 'singlepdf') {
                window.open(url);
            }
            else if (reportType === 'multipdf') {
                saveAs(file, "reports.zip")
                if (action === 'both') {
                    saveAs(file, "reports.zip")
                }
            }

            return response

        })
        .catch(error => {
            if (error.response.status === 403) {
                // store.dispatch({ type: "RESET", payload: "" })
                console.log(error.response.status)
                // window.location.href = '/login'
            }
            return error
        });
}
export default GetFile

//     const { store } = configureStore();
//     axios.post(process.env.REACT_APP_API_URL + `/${url}`,
//         { start: moment(start, 'DD-MM-YYYY').format('YYYY/MMM/DD'), end: moment(end, 'DD-MM-YYYY').format('YYYY/MMM/DD'), worker: worker, action: action, email: email, id: id, excahngeRate },
//         { responseType: 'blob', headers: { "authorization": `Bearer ${token}` } })
//         .then(response => {
//             //Create a Blob from the PDF Stream
//             const file = new Blob(
//                 [response.data],
//                 { type: 'application/pdf' });
//             const fileURL = URL.createObjectURL(file);
//             if (response.status === 403) {
//                 store.dispatch({ type: "RESET", payload: "" })
//                 window.location.href = '/login'
//             }
//             //Build a URL from the file
//             if (action === 'save') {
//                 ZipFiles(file, worker)
//                 // saveAs(file, worker + ".pdf");
//             }
//             else if (action === 'run') {
//                 //Open the URL on new Window
//                 window.open(fileURL);
//             }
//             else if (action === 'both') {
//                 //Open the URL on new Window
//                 window.open(fileURL);
//             }

//         })
//         .catch(error => {
//             if (error.response.status === 403) {
//                 store.dispatch({ type: "RESET", payload: "" })
//                 console.log(error.response.status)
//                 window.location.href = '/login'
//             }
//             return error
//         });

// }


