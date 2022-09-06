import { useEffect, useState } from "react"
import { Alert, Col } from "react-bootstrap"
import { useSelector } from "react-redux";
import Select from 'react-select';
import GetWorkerProfile from "../BL/GetWorkerProfile";
import WorkerProfileTable from './TablesColumns';
import { useDispatch } from "react-redux";

const WorkerProfiles = () => {
    const [physicians, setPhysicians] = useState([])
    const storeData = useSelector(state => state)
    // const [workerObjKeys, setWorkerObjKeys] = useState([{ dataField: 'id', text: 'Product ID' }])
    // const [workerObjects, setWorkerObjects] = useState([{}])
    const [physicianNmae, setPhysicianName] = useState('')
    const [worker, setWorker] = useState([])
    const dispatch = useDispatch()
    const [err, setErr] = useState("")


    useEffect(() => {
        setPhysicians(storeData.Physician)
    }, [storeData.Physician])


    const physiciansOptions = () => {
        let arr = []
        physicians.forEach(x => {
            arr.push({ value: x.id, label: x.associateName })
        })
        return arr
    }
    const handleChange = async (id) => {
        try {
            let resp = await GetWorkerProfile(id, storeData.accessToken)
            if (resp.length !== 0) {
                setWorker(resp[0])
                dispatch({ type: "WORKER", payload: resp[0] })
                setPhysicianName(id)
            }
            else if (resp.length === 0) {
                setErr("User not found, please check with your administrator!")
                setTimeout(() => {
                    setErr("")
                }, 5000);
            }
        } catch (error) {
            setErr(String(error))
        }
    }

    return (<div className="spaceTop">
        <br />
        <br />
        {err !== '' && <Alert key={1} variant={'danger'}  >
            {err}
        </Alert>}
        <Col>
            <Select
                className="basic-single"
                styles={{ zIndex: 1 }}
                classNamePrefix="select"
                isSearchable={true}
                name="color"
                options={physiciansOptions()}
                placeholder="Please select"
                onChange={(e) => handleChange((e.value))}
            />
            <br />
            <WorkerProfileTable selected={physicianNmae} worker={worker} />


        </Col>





    </div>)
}

export default WorkerProfiles