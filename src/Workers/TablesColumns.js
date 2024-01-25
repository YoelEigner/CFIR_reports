/* eslint-disable */
import React from "react"
import { useEffect, useState } from "react"
import { Alert, Button, Card, Form, InputGroup, Table, ToggleButton } from "react-bootstrap"
import Select from 'react-select';
import { useSelector } from 'react-redux';
import GetVideoTech from "../BL/GetVideoTech";
import WorkerOptionModal from "./WorkerOptionModal";
import UpdateWorkerProfile from "../BL/UpdateWorkerProfiles";
import { useDispatch } from "react-redux";
import NewWorkerProfile from "../BL/NewWorkerProfile";
import { NumbersOnly } from "../HomePage/NumbersOnly";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DeleteWorkerProfile from "../BL/DeleteWorkerProfile";
import DeleteProfileModual from "../ResetAdjustmentFeeModal/DeleteProfileModual";
import GetNewWorkers from "../BL/GetNewWorkers";

const WorkerProfileTable = ({ selected, worker, setSelected }) => {
    const [tglSuperviser, setTglSuperviser] = useState(false)
    const [tglIsSupervised, setTglIsSupervised] = useState(false)
    const [directorSupervised, setDirectorsupervised] = useState(false)
    const [supOnegetMoney, setSupOneGetsMoney] = useState(false)
    const [supTwoGetMoney, setSupTwoGetsMoney] = useState(false)
    const [hst, setHst] = useState(false)
    const [active, setActive] = useState(true)
    const [copyProfile, setCopyProfile] = useState(false)
    const [associateName, setAssociateName] = useState({ value: "Please Select", label: "Please Select" })
    // const [associateName, setAssociateName] = useState("")
    const [associateEmail, setAssociateEmail] = useState("")
    const [associate, setAssociate] = useState({ value: "Please Select", label: "Please Select" })
    const [superviserOne, setSupervierOne] = useState({ value: "Please Select", label: "Please Select" })
    const [superviserTwo, setSupervierTwo] = useState({ value: "Select Second Superviser", label: "Select Second Superviser" })
    const [videoFee, setVideoFee] = useState('0')
    const [provValue, setProvValue] = useState({ value: "Please Select", label: "Please Select" })
    const [videoTech, setVideoTech] = useState([])
    const [superviserOneCovrage, setSuperviserOneCovrage] = useState([])
    const [superviserTwoCovrage, setSuperviserTwoCovrage] = useState([])
    const [selectedVideoTech, setSelectedVideoTech] = useState({ value: "Please Select", label: "Please Select" })
    const [inOfficeBlocks, setInOfficeBlocks] = useState('0')
    const [inOfficeBlockHours, setInOfficeBlockHours] = useState('0')
    const [inOfficeBlockTimes, setInOfficeBlockTimes] = useState("")
    const [blocksHourlyRate, setBlocksHourlyRate] = useState('0')
    const [blocksBiWeeklyCharge, setBlocksBiWeeklyCharge] = useState('0')
    const [assessmentRate, setAssessmentRate] = useState('0')
    const [assessmentRate_c, setAssessmentRate_c] = useState('0')
    const [assessmentRate_f, setAssessmentRate_f] = useState('0')
    const [associateFeeBaseRate, setAssociateFeeBaseRate] = useState('0')
    const [associateFeeBaseRate_c, setAssociateFeeBaseRate_c] = useState('0')
    const [associateFeeBaseRate_f, setAssociateFeeBaseRate_f] = useState('0')
    const [associateFeeBaseRateTwo, setAssociateFeeBaseRateTwo] = useState('0')
    const [associateFeeBaseRateTwo_c, setAssociateFeeBaseRateTwo_c] = useState('0')
    const [associateFeeBaseRateTwo_f, setAssociateFeeBaseRateTwo_f] = useState('0')
    const [associateFeebaseRateOverRide33, setAssociateFeeBaseRate33] = useState('0')
    const [associateFeebaseRateOverRide33_c, setAssociateFeeBaseRate33_c] = useState('0')
    const [associateFeebaseRateOverRide33_f, setAssociateFeeBaseRate33_f] = useState('0')
    const [associateFeebaseRateOverRide33Two, setAssociateFeeBaseRate33Two] = useState('0')
    const [associateFeebaseRateOverRide33Two_c, setAssociateFeeBaseRate33Two_c] = useState('0')
    const [associateFeebaseRateOverRide33Two_f, setAssociateFeeBaseRate33Two_f] = useState('0')
    const [associateFeebaseRateOverRide34, setAssociateFeeBaseRate34] = useState('0')
    const [associateFeebaseRateOverRide34_c, setAssociateFeeBaseRate34_c] = useState('0')
    const [associateFeebaseRateOverRide34_f, setAssociateFeeBaseRate34_f] = useState('0')
    const [associateFeebaseRateOverRide34Two, setAssociateFeeBaseRate34Two] = useState('0')
    const [associateFeebaseRateOverRide34Two_c, setAssociateFeeBaseRate34Two_c] = useState('0')
    const [associateFeebaseRateOverRide34Two_f, setAssociateFeeBaseRate34Two_f] = useState('0')
    const [associateFeeBaseRateOverrideAsseements, setAssociateFeeBaseRateOverrideAsseements] = useState(false)
    const [associateFeeBaseRateOverrideAsseements_c, setAssociateFeeBaseRateOverrideAsseements_c] = useState(false)
    const [associateFeeBaseRateOverrideAsseements_f, setAssociateFeeBaseRateOverrideAsseements_f] = useState(false)
    const [associateFeeBaseType, setAssociateFeeBaseType] = useState('')
    const [associateFeeBaseTypeTwo, setAssociateFeeBaseTypeTwo] = useState('')
    const storeData = useSelector(state => state)
    const [superviserSelect, setSuperviserSelect] = useState([])
    const [newWorkers, setNewWorkers] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [modalHeader, setModalHeader] = useState("")
    const [msg, setMsg] = useState('')
    const [varient, setVarient] = useState('success')
    const [nonChargeablesTable, setNonChargeablesTable] = useState(true)
    const [duplicateTable, setDuplicateTable] = useState(true)
    const [associateFeesTable, setAssociateFeesTable] = useState(true)
    const [totalRemittenceTable, setTotalRemittenceTable] = useState(true)
    const [nonRemittablesTable, setNonRemittablesTable] = useState(true)
    const [transactionsTable, setTransactionsTable] = useState(true)
    const [superviseeTotalTabel, setSuperviseeTotalTable] = useState(true)
    const [appliedPaymentsTotalTable, setAppliedPaymentsTotalTable] = useState(true)
    const [comments, setComments] = useState('')
    const [adjustmentFee, setAdjustmentFee] = useState([{ name: "", value: 0 }])
    const [adjustmentPaymentFee, setAdjustmentPAymentFee] = useState([{ name: "", value: 0 }])
    const dispatch = useDispatch()
    const [subPrac, setSubPrac] = useState(false)
    const [showHide, setShowHide] = useState(false)
    const [assessmentMoneyToSupervisorOne, setAssessmentMoneyToSupervisorOne] = useState(false)
    const [assessmentMoneyToSupervisorTwo, setAssessmentMoneyToSupervisorTwo] = useState(false)
    const [probono, setProbono] = useState(0)


    const [date, setDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())


    useEffect(() => {
        setSuperviserSelect(superviserSelectOptions(storeData.Physician))
    }, [worker])

    useEffect(() => {
        videoTechAPI()
    }, [])

    useEffect(() => { setCopyProfile(false) }, [worker])

    useEffect(() => {
        const getNewWorker = async () => {
            let arr = []

            const resp = await GetNewWorkers(storeData.accessToken)
            resp?.forEach(x => {
                arr.push({ value: x.id, label: x.associateName })
            })
            setNewWorkers(arr)
        }
        getNewWorker()
    }, [])
    const superviserSelectOptions = (physicians) => {
        let arr = []
        arr.push({ value: 'NOT SUPERVISED', label: 'NOT SUPERVISED' }, { value: 'EXTERNAL SUPERVISOR', label: 'EXTERNAL SUPERVISOR' })
        physicians.forEach(x => {
            if (!x.associateName.includes("Not")) {
                x.id !== selected && arr.push({ value: x.id, label: x.associateName })
            }
        })
        return arr
    }

    const provs = () => {
        let arr = []
        storeData.provence.forEach(x => {
            arr.push({ value: x.id, label: x.name })
        })
        return arr
    }

    const videoTechAPI = async () => {
        let resp = await GetVideoTech(storeData.accessToken)
        let arr = []
        resp.forEach(x => {
            x.id !== selected && arr.push({ value: x.id, label: x.name })
        })
        setVideoTech(arr)
    }
    const levals = () => {
        let arr = []
        try {
            storeData.associateLeval.forEach(x => {
                arr.push({ value: x.id, label: x.leval })
            })
        } catch (error) {

        }
        return arr
    }

    const openModal = (text, id) => {
        setModalHeader(text)
        setShowModal(true)

    }


    useEffect(() => {
        console.log(worker)
        if (worker.length !== 0) {
            worker.associateType === 'L1 (Sup Prac)' ? setSubPrac(true) : setSubPrac(false)
            setActive(worker.status)
            setDate(new Date(worker.startDate))
            setEndDate(new Date(worker.endDate))
            setProvValue({ value: worker.site, label: worker.site })
            setAssociate({ value: worker.associateType, label: worker.associateType })
            setAssociateName({ value: worker.associateName, label: worker.associateName })
            setAssociateEmail(worker.associateEmail)
            setTglSuperviser(worker.isSuperviser)
            setTglIsSupervised(worker.isSupervised)
            setDirectorsupervised(worker.IsSupervisedByNonDirector)
            setSupervierOne({ value: worker.supervisor1, label: worker.supervisor1 })
            setSupervierTwo({ value: worker.supervisor1, label: worker.supervisor2 })
            setSuperviserOneCovrage(worker.supervisor1Covrage)
            setSuperviserTwoCovrage(worker.supervisor2Covrage)
            setSupOneGetsMoney(worker.supervisorOneGetsMoney)
            setSupTwoGetsMoney(worker.supervisorTwoGetsMoney)
            setAssessmentMoneyToSupervisorOne(worker.assessmentMoneyToSupervisorOne)
            setAssessmentMoneyToSupervisorTwo(worker.assessmentMoneyToSupervisorTwo)
            setAssociateFeeBaseType(worker.associateFeeBaseType)
            setAssociateFeeBaseTypeTwo(worker.associateFeeBaseType2)
            setProbono(worker.probono)
            setAssessmentRate(worker.assessmentRate)
            setAssessmentRate_c(worker.assessmentRate_c)
            setAssessmentRate_f(worker.assessmentRate_f)
            setAssociateFeeBaseRate(worker.associateFeeBaseRate)
            setAssociateFeeBaseRate_c(worker.associateFeeBaseRate_c)
            setAssociateFeeBaseRate_f(worker.associateFeeBaseRate_f)
            setAssociateFeeBaseRateTwo(worker.associateFeeBaseRateTwo)
            setAssociateFeeBaseRateTwo_c(worker.associateFeeBaseRateTwo_c)
            setAssociateFeeBaseRateTwo_f(worker.associateFeeBaseRateTwo_f)
            setAssociateFeeBaseRate33(worker.associateFeeBaseRateOverrideLessThen)
            setAssociateFeeBaseRate33_c(worker.associateFeeBaseRateOverrideLessThen_c)
            setAssociateFeeBaseRate33_f(worker.associateFeeBaseRateOverrideLessThen_f)
            setAssociateFeeBaseRate33Two(worker.associateFeeBaseRateOverrideLessThenTwo)
            setAssociateFeeBaseRate33Two_c(worker.associateFeeBaseRateOverrideLessThenTwo_c)
            setAssociateFeeBaseRate33Two_f(worker.associateFeeBaseRateOverrideLessThenTwo_f)
            setAssociateFeeBaseRate34(worker.associateFeeBaseRateOverrideGreaterThen)
            setAssociateFeeBaseRate34_c(worker.associateFeeBaseRateOverrideGreaterThen_c)
            setAssociateFeeBaseRate34_f(worker.associateFeeBaseRateOverrideGreaterThen_f)
            setAssociateFeeBaseRate34Two(worker.associateFeeBaseRateOverrideGreaterThenTwo)
            setAssociateFeeBaseRate34Two_c(worker.associateFeeBaseRateOverrideGreaterThenTwo_c)
            setAssociateFeeBaseRate34Two_f(worker.associateFeeBaseRateOverrideGreaterThenTwo_f)
            setAssociateFeeBaseRateOverrideAsseements(worker.associateFeeBaseRateOverrideAsseements)
            setAssociateFeeBaseRateOverrideAsseements_c(worker.associateFeeBaseRateOverrideAsseements_c)
            setAssociateFeeBaseRateOverrideAsseements_f(worker.associateFeeBaseRateOverrideAsseements_f)
            setInOfficeBlocks(worker.inOfficeBlocks)
            setInOfficeBlockHours(worker.inOfficeBlockHours)
            setInOfficeBlockTimes(worker.inOfficeBlockTimes)
            setBlocksBiWeeklyCharge(worker.blocksBiWeeklyCharge)
            setBlocksHourlyRate(worker.blocksHourlyRate)
            setSelectedVideoTech({ value: worker.videoTech, label: worker.videoTech })
            setVideoFee(worker.cahrgeVideoFee)
            setDuplicateTable(worker.duplicateTable)
            setNonChargeablesTable(worker.nonChargeablesTable)
            setAssociateFeesTable(worker.associateFeesTable)
            setTotalRemittenceTable(worker.totalRemittenceTable)
            setNonRemittablesTable(worker.nonRemittablesTable)
            setTransactionsTable(worker.transactionsTable)
            setSuperviseeTotalTable(worker.superviseeTotalTabel)
            setAppliedPaymentsTotalTable(worker.appliedPaymentsTotalTable)
            setComments(worker.comments)
            setAdjustmentFee(JSON.parse(worker.adjustmentFee))
            setAdjustmentPAymentFee(JSON.parse(worker.adjustmentPaymentFee))

        }
    }, [worker])

    const removeStatus = (name) => {
        try {
            let status = storeData.Physician.find(x => x.associateName.includes(name))
            return status.status === true ? name.split("(Active)")[0].split(':')[1].trim() : name.split("(Not Active)")[0].split(':')[1].trim()
        } catch (error) {
            return name
        }


    }

    const handleSave = async (e) => {
        e.preventDefault()
        var temp = {}
        temp.status = active
        temp.startDate = date
        temp.endDate = endDate
        temp.site = provValue.label
        temp.associateType = associate.label
        temp.associateEmail = associateEmail
        temp.associateName = associateName.label.trim()
        temp.isSuperviser = tglSuperviser
        temp.isSupervised = tglIsSupervised
        temp.IsSupervisedByNonDirector = directorSupervised
        temp.supervisor1 = removeStatus(superviserOne.label)
        temp.supervisor1Covrage = superviserOneCovrage
        temp.supervisor2 = removeStatus(superviserTwo.label)
        temp.supervisor2Covrage = superviserTwoCovrage
        temp.supervisorOneGetsMoney = supOnegetMoney
        temp.supervisorTwoGetsMoney = supTwoGetMoney
        temp.assessmentMoneyToSupervisorTwo = assessmentMoneyToSupervisorTwo
        temp.assessmentMoneyToSupervisorOne = assessmentMoneyToSupervisorOne
        temp.chargesHST = hst
        temp.associateFeeBaseType = associateFeeBaseType
        temp.associateFeeBaseType2 = associateFeeBaseTypeTwo
        temp.probono = probono
        temp.assessmentRate = assessmentRate
        temp.assessmentRate_c = assessmentRate_c
        temp.assessmentRate_f = assessmentRate_f
        temp.associateFeeBaseRate = associateFeeBaseRate.trim()
        temp.associateFeeBaseRate_c = associateFeeBaseRate_c.trim()
        temp.associateFeeBaseRate_f = associateFeeBaseRate_f.trim()
        temp.associateFeeBaseRateTwo = associateFeeBaseRateTwo.trim()
        temp.associateFeeBaseRateTwo_c = associateFeeBaseRateTwo_c.trim()
        temp.associateFeeBaseRateTwo_f = associateFeeBaseRateTwo_f.trim()
        temp.associateFeeBaseRateOverrideLessThen = associateFeebaseRateOverRide33.trim()
        temp.associateFeeBaseRateOverrideLessThen_c = associateFeebaseRateOverRide33_c.trim()
        temp.associateFeeBaseRateOverrideLessThen_f = associateFeebaseRateOverRide33_f.trim()
        temp.associateFeeBaseRateOverrideLessThenTwo = associateFeebaseRateOverRide33Two.trim()
        temp.associateFeeBaseRateOverrideLessThenTwo_c = associateFeebaseRateOverRide33Two_c.trim()
        temp.associateFeeBaseRateOverrideLessThenTwo_f = associateFeebaseRateOverRide33Two_f.trim()
        temp.associateFeeBaseRateOverrideGreaterThen = associateFeebaseRateOverRide34.trim()
        temp.associateFeeBaseRateOverrideGreaterThen_c = associateFeebaseRateOverRide34_c.trim()
        temp.associateFeeBaseRateOverrideGreaterThen_f = associateFeebaseRateOverRide34_f.trim()
        temp.associateFeeBaseRateOverrideGreaterThenTwo = associateFeebaseRateOverRide34Two.trim()
        temp.associateFeeBaseRateOverrideGreaterThenTwo_c = associateFeebaseRateOverRide34Two_c.trim()
        temp.associateFeeBaseRateOverrideGreaterThenTwo_f = associateFeebaseRateOverRide34Two_f.trim()
        temp.associateFeeBaseRateOverrideAsseements = associateFeeBaseRateOverrideAsseements
        temp.associateFeeBaseRateOverrideAsseements_c = associateFeeBaseRateOverrideAsseements_c
        temp.associateFeeBaseRateOverrideAsseements_f = associateFeeBaseRateOverrideAsseements_f
        temp.inOfficeBlocks = inOfficeBlocks.trim()
        temp.inOfficeBlockHours = inOfficeBlockHours.trim()
        temp.inOfficeBlockTimes = inOfficeBlockTimes
        temp.blocksBiWeeklyCharge = blocksBiWeeklyCharge
        temp.blocksHourlyRate = blocksHourlyRate.trim()
        temp.videoTech = selectedVideoTech.label
        temp.cahrgeVideoFee = videoFee
        temp.duplicateTable = duplicateTable
        temp.nonChargeablesTable = nonChargeablesTable
        temp.associateFeesTable = associateFeesTable
        temp.totalRemittenceTable = totalRemittenceTable
        temp.nonRemittablesTable = nonRemittablesTable
        temp.transactionsTable = transactionsTable
        temp.superviseeTotalTabel = superviseeTotalTabel
        temp.appliedPaymentsTotalTable = appliedPaymentsTotalTable
        temp.comments = comments
        temp.adjustmentFee = JSON.stringify(adjustmentFee)
        temp.adjustmentPaymentFee = JSON.stringify(adjustmentPaymentFee)

        let validate = Object.keys(temp).map(key => { return temp[key] })
        // let validateTemp = Object.keys(temp).map(key => { return temp[key] })
        // console.log(temp)
        if (validate.includes("Please Select") || associateFeeBaseType === "" || associateFeeBaseTypeTwo === "" || date === "date") {
            setVarient('danger')
            setMsg("Please fill the requied items!")
            return
        }
        else {
            let tempUser = storeData.Physician
            let resp

            dispatch({ type: "WORKER", payload: temp })

            if (selected === "") { resp = await NewWorkerProfile(storeData.accessToken, temp) }
            else { resp = await UpdateWorkerProfile(storeData.accessToken, temp, worker.id) }

            if (resp.response === 200 && resp.new_id !== undefined) {
                tempUser.push({ id: resp.new_id.new_id, associateName: associateName })

                dispatch({ type: "PHYSICIANS", payload: tempUser })

                setVarient('success')
                setMsg('User created!')
                window.location.reload(true);
            }
            else if (resp === 200) {
                let index = tempUser.findIndex(x => x.id === worker.id)
                let status = active === true ? "(Active)" : "(Not Active)"

                tempUser[index].associateName = status === true ? tempUser[index].associateName.split("(Active)")[0] + status : tempUser[index].associateName.split("(Not Active)")[0]
                dispatch({ type: "PHYSICIANS", payload: tempUser })

                setVarient('success')
                setMsg('User Updated!')
                // window.location.reload(true);
            }
            else {
                setVarient('danger')
                setMsg(resp.errMsg)
            }
        }
    }


    useEffect(() => {
        setTimeout(() => {
            setMsg('')
        }, 10000);
    }, [msg])

    const handleAddClick = () => {
        setAdjustmentFee([...adjustmentFee, { name: "", value: 0 }])
    }

    const handleAddPaymentClick = () => {
        setAdjustmentPAymentFee([...adjustmentPaymentFee, { name: "", value: 0 }])
    }
    const handleRemoveClick = (name, value) => {
        if (adjustmentFee.length === 1) { setAdjustmentFee([{ name: "", value: 0 }]) }
        else {
            let temp = adjustmentFee
            let index = adjustmentFee.findIndex(x => x.name === name && x.value === value)
            temp.splice(index, 1)
            setAdjustmentFee([...temp])
        }
    }
    const handleRemovePaymentClick = (name, value) => {
        if (adjustmentPaymentFee.length === 1) { setAdjustmentPAymentFee([{ name: "", value: 0 }]) }
        else {
            let temp = adjustmentPaymentFee
            let index = adjustmentPaymentFee.findIndex(x => x.name === name && x.value === value)
            temp.splice(index, 1)
            setAdjustmentPAymentFee([...temp])
        }

    }

    const updateAdjustmentArr = (value, item, index) => {
        let tempArr = [...adjustmentFee]
        item === 'name' ? tempArr[index].name = value : tempArr[index].value = value
        setAdjustmentFee(tempArr)
    }
    const updatePaymentAdjustmentArr = (value, item, index) => {
        let tempArr = [...adjustmentPaymentFee]
        item === 'name' ? tempArr[index].name = value : tempArr[index].value = value
        setAdjustmentPAymentFee(tempArr)
    }

    const clearSuperviser = (e) => {
        setTglIsSupervised(e.currentTarget.checked)
        if (!tglIsSupervised === false) {
            setSupervierOne({ value: "Please Select", label: "Please Select" })
            setSupervierTwo({ value: "Select Second Superviser", label: "Select Second Superviser" })
        }
    }

    const setAssociateLeval = (e) => {
        e.value === 2 ? setSubPrac(true) : setSubPrac(false)
        setAssociate(e)
    }

    useEffect(() => {
        let hours = inOfficeBlocks * inOfficeBlockHours
        setBlocksBiWeeklyCharge(isNaN((hours * blocksHourlyRate) * 2) ? 0 : (hours * blocksHourlyRate) * 2)
    }, [blocksHourlyRate, inOfficeBlockHours, inOfficeBlocks])

    const handleCopyProfile = () => {
        setSelected('')
        setCopyProfile(true)
    }

    const handleResp = async (resp) => {
        try {
            // let resp = await DeleteWorkerProfile(storeData.accessToken, selected)
            setShowHide(false)
            if (resp.status === 200) {
                setVarient('success')
                setMsg("User successfully deleted")
                setTimeout(() => {
                    window.location.reload(true);
                }, 1000);
            }
            else {
                setVarient('danger')
                setMsg(`Error: ${resp.message}`)
            }
        } catch (error) {
            console.log('dd')
            setVarient('danger')
            setMsg(`Error: ${error.message}`)
        }

    }

    const onUserSelect = () => {

    }

    const style = { margin: 20 }
    return (
        <>
            <DeleteProfileModual show={showHide} setShow={(e) => { setShowHide(e) }} token={storeData.accessToken} handleResp={(resp) => handleResp(resp)} worker={worker} id={selected} />

            <ToggleButton
                className="toggle-button-center"
                style={{ marginBottom: 20 }}
                id="copyProfile"
                type="checkbox"
                variant="outline-dark"
                checked={copyProfile}
                disabled={selected === '' ? true : false}
                size="sm"
                onChange={(e) => handleCopyProfile(e)}
            >
                {copyProfile === true ? "Profile Copied!" : "Copy Profile"}
            </ToggleButton>
            {" "}
            <Button
                className="toggle-button-center"
                style={{ marginBottom: 20 }}
                id="copyProfile"
                type="checkbox"
                variant="outline-dark"
                // checked={copyProfile}
                disabled={selected === '' ? true : false}
                size="sm"
                onClick={(e) => setShowHide(!showHide)}
            >
                {'Delete Profile'}
            </Button>
            {msg !== '' && <Alert key={1} style={{ position: 'sticky', top: '70px', zIndex: 1 }} variant={varient}  >
                {msg}
            </Alert>}
            <WorkerOptionModal open={showModal} setOpen={(close) => setShowModal(close)} header={modalHeader} accessToken={storeData.accessToken}
                id={selected} setCovrage1={(e) => { setSuperviserOneCovrage("[" + e + "]") }} setCovrage2={(e) => { setSuperviserTwoCovrage("[" + e + "]") }}
                covrage1={superviserOneCovrage} covrage2={superviserTwoCovrage} superviser2={superviserTwo}
            />
            <Form onSubmit={(e) => handleSave(e)}>
                <Table className="mytable box">
                    <thead>
                        <Card style={style}>
                            <tr >
                                <th className="required toggle-button-left" >Active</th>
                                <td aria-required className="center-items-table">
                                    <div className="toggle-button-right">
                                        <ToggleButton
                                            className="toggle-button-center"
                                            id="active"
                                            type="checkbox"
                                            variant="outline-dark"
                                            checked={active}
                                            disabled={worker.status === false}
                                            size="sm"
                                            onChange={(e) => setActive(e.currentTarget.checked)}
                                        >
                                            {active === true ? "Yes" : "No"}
                                        </ToggleButton>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th className="required toggle-button-left" >Start Date</th>
                                <td className="center-items-table">
                                    <div className="toggle-button-right">
                                        <DatePicker selected={date} onChange={(date) => setDate(date)} />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th className="required toggle-button-left" >End Date</th>
                                <td className="center-items-table">
                                    <div className="toggle-button-right">
                                        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th className="required toggle-button-left">Site</th>
                                <td aria-required className="center-items-table" >
                                    <div className="toggle-button-right" style={{ width: 300 }}>
                                        <Select
                                            className="basic-single"
                                            classNamePrefix="select"
                                            isSearchable={true}
                                            name="color"
                                            options={provs()}
                                            placeholder="Please select"
                                            value={provValue}
                                            onChange={(e) => setProvValue((e))}
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th className="required toggle-button-left">Associate Name</th>
                                <td aria-required className="center-items-table" >
                                    <div className="toggle-button-right" style={{ width: 300 }}>
                                        <Select
                                            className="basic-single"
                                            classNamePrefix="select"
                                            isSearchable={true}
                                            name="associateName"
                                            options={newWorkers}
                                            placeholder="Please select"
                                            value={associateName}
                                            onChange={(e) => setAssociateName(e)} />
                                    </div>
                                </td>
                            </tr>
                            {/* <tr>
                                <th className="required toggle-button-left">Associate Name</th>
                                <td className="center-items-table">
                                    <div className="toggle-button-right">
                                        <InputGroup size="sm" >
                                            <Form.Control disabled={true} required aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={associateName} onChange={(e) => { setAssociateName(e.target.value) }} />
                                        </InputGroup>
                                    </div>

                                </td>
                            </tr> */}
                            <tr>
                                <th className="required toggle-button-left">Associate Email</th>
                                <td className="center-items-table">
                                    <div className="toggle-button-right">
                                        <InputGroup size="sm" >
                                            <Form.Control required aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={associateEmail} onChange={(e) => { setAssociateEmail(e.target.value) }} />
                                        </InputGroup>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th className="required toggle-button-left">Associate Type</th>
                                <td className="center-items-table" >
                                    <div className="toggle-button-right" style={{ width: 300 }}>
                                        <Select
                                            className="basic-single"
                                            classNamePrefix="select"
                                            isSearchable={true}
                                            name="color"
                                            options={levals()}
                                            placeholder="Please select"
                                            value={associate}
                                            onChange={(e) => setAssociateLeval((e))}
                                        />
                                    </div>
                                </td>
                            </tr>
                        </Card>
                        <Card style={style}>
                            <tr>
                                <th className="required toggle-button-left">Is Superviser</th>
                                <td className="center-items-table">
                                    <div className="toggle-button-right">
                                        <ToggleButton
                                            className="mb-2"
                                            id="toggle-check-2"
                                            type="checkbox"
                                            variant="outline-dark"
                                            checked={tglSuperviser}
                                            value="1"
                                            size="sm"
                                            onChange={(e) => setTglSuperviser(e.currentTarget.checked)}
                                        >
                                            {tglSuperviser === true ? "Yes" : "No"}
                                        </ToggleButton>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th className="required toggle-button-left">Is Supervised</th>
                                <td className="center-items-table">
                                    <div className="toggle-button-right">
                                        <ToggleButton
                                            className="mb-2"
                                            id="toggle-check-3"
                                            type="checkbox"
                                            variant="outline-dark"
                                            checked={tglIsSupervised}
                                            value="1"
                                            size="sm"
                                            onChange={(e) => clearSuperviser(e)}
                                        >
                                            {tglIsSupervised === true ? "Yes" : "No"}
                                        </ToggleButton>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th className={tglIsSupervised === true ? 'required toggle-button-left' : "toggle-button-left"}>Is Supervised By Non Director</th>
                                <td className="center-items-table">
                                    <div className="toggle-button-right">
                                        <ToggleButton
                                            aria-required={true}
                                            className="mb-2"
                                            id="toggle-check4"
                                            type="checkbox"
                                            variant="outline-dark"
                                            checked={directorSupervised}
                                            value="1"
                                            size="sm"
                                            onChange={(e) => setDirectorsupervised(e.currentTarget.checked)}
                                        >
                                            {directorSupervised === true ? "Yes" : "No"}
                                        </ToggleButton>
                                    </div>
                                </td>
                            </tr>
                        </Card>
                        <Card style={style}>
                            <tr>
                                <th className={'required toggle-button-left'}>Superviser One</th>
                                <td className="center-items-table">
                                    <div className="toggle-button-right" style={{ width: 300 }}>
                                        <Select
                                            aria-required={true}
                                            className="basic-single"
                                            classNamePrefix="select"
                                            isSearchable={true}
                                            name="superviserOne"
                                            options={superviserSelect}
                                            placeholder="Please select"
                                            value={superviserOne}
                                            onChange={(e) => setSupervierOne(e)} />
                                    </div>
                                </td>
                            </tr>
                            {/* <tr>
                                <th className={tglIsSupervised === true ? 'required toggle-button-left' : "toggle-button-left"}>Supervisor One Covrage</th>
                                <td className="center-items-table">
                                    <div className="toggle-button-right">
                                        <Button disabled={superviserOne.value === 'Please Select'} variant="outline-dark" size="sm" onClick={() => openModal('Supervisor One Covrage', 1)}>Covrage Type</Button>
                                    </div>

                                </td>
                            </tr> */}
                            <tr>
                                <th className={tglIsSupervised === true ? 'required toggle-button-left' : " toggle-button-left"}>Therapy Money to Supervisor One</th>
                                <td className="center-items-table">
                                    <div className="toggle-button-right-custom-margin">
                                        <ToggleButton
                                            className="mb-2"
                                            id="toggle-money"
                                            type="checkbox"
                                            variant="outline-dark"
                                            checked={supOnegetMoney}
                                            value="1"
                                            size="sm"
                                            onChange={(e) => setSupOneGetsMoney(e.currentTarget.checked)}
                                            disabled={supTwoGetMoney}
                                        >
                                            {supOnegetMoney === true ? "Yes" : "No"}
                                        </ToggleButton>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th className={tglIsSupervised === true ? 'required toggle-button-left' : "toggle-button-left"}>Assessment Money to Supervisor One</th>
                                <td className="center-items-table">
                                    <div className="toggle-button-right-custom-margin">
                                        <ToggleButton
                                            aria-required={true}
                                            className="mb-2"
                                            id="toggle-check5"
                                            type="checkbox"
                                            variant="outline-dark"
                                            checked={assessmentMoneyToSupervisorOne}
                                            value="1"
                                            size="sm"
                                            onChange={(e) => setAssessmentMoneyToSupervisorOne(e.currentTarget.checked)}
                                            disabled={assessmentMoneyToSupervisorTwo}
                                        >
                                            {assessmentMoneyToSupervisorOne === true ? "Yes" : "No"}
                                        </ToggleButton>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th className="toggle-button-left">Superviser Two</th>
                                <td className="center-items-table">
                                    <div className="toggle-button-right" style={{ width: 300 }}>
                                        <Select
                                            className="basic-single"
                                            classNamePrefix="select"
                                            isSearchable={true}
                                            name="superviserTwo"
                                            options={superviserSelect}
                                            placeholder="Please select"
                                            value={superviserTwo}
                                            onChange={(e) => setSupervierTwo(e)} />
                                    </div>
                                </td>
                            </tr>
                            {/* <tr>
                                <th className="toggle-button-left">Supervisor Two Covrage</th>
                                <td className="center-items-table">
                                    <div className="toggle-button-right">
                                        <Button disabled={superviserTwo.label === 'Select Second Superviser'} variant="outline-dark" size="sm" onClick={() => openModal('Supervisor Two Covrage', 2)}>Covrage Type</Button>
                                    </div>
                                </td>
                            </tr> */}
                            <tr>
                                <th className={tglIsSupervised === true ? 'required toggle-button-left' : "toggle-button-left"}>Therapy Money to Supervisor Two</th>
                                <td className="center-items-table">
                                    <div className="toggle-button-right-custom-margin">
                                        <ToggleButton
                                            className="mb-2"
                                            id="toggle-money-Two"
                                            type="checkbox"
                                            variant="outline-dark"
                                            checked={supTwoGetMoney}
                                            value="1"
                                            size="sm"
                                            onChange={(e) => setSupTwoGetsMoney(e.currentTarget.checked)}
                                            disabled={supOnegetMoney}
                                        >
                                            {supTwoGetMoney === true ? "Yes" : "No"}
                                        </ToggleButton>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th className={tglIsSupervised === true ? 'required toggle-button-left' : "toggle-button-left"}>Assessment Money to Supervisor Two</th>
                                <td className="center-items-table">
                                    <div className="toggle-button-right-custom-margin">
                                        <ToggleButton
                                            aria-required={true}
                                            className="mb-2"
                                            id="toggle-check6"
                                            type="checkbox"
                                            variant="outline-dark"
                                            checked={assessmentMoneyToSupervisorTwo}
                                            value="1"
                                            size="sm"
                                            onChange={(e) => setAssessmentMoneyToSupervisorTwo(e.currentTarget.checked)}
                                            disabled={assessmentMoneyToSupervisorOne}
                                        >
                                            {assessmentMoneyToSupervisorTwo === true ? "Yes" : "No"}
                                        </ToggleButton>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th className="required toggle-button-left">Charges HST</th>
                                <td className="center-items-table">
                                    <div className="toggle-button-right">
                                        <ToggleButton
                                            className="mb-2"
                                            id="toggle-hst"
                                            type="checkbox"
                                            variant="outline-dark"
                                            checked={hst}
                                            value="1"
                                            size="sm"
                                            onChange={(e) => setHst(e.currentTarget.checked)}
                                        >
                                            {hst === true ? "Yes" : "No"}
                                        </ToggleButton>
                                    </div>
                                </td>
                            </tr>
                        </Card>
                        <Card style={style}>
                            <tr>
                                <th className="required toggle-button-left">Associate Fee Base Type</th>
                                <td className="center-items-table">
                                    <div className="toggle-button-right">
                                        <Form.Check type={'radio'} label={'Online Only'} id={'online'} checked={associateFeeBaseType == 1} name="group1" onChange={() => setAssociateFeeBaseType(1)} />
                                        <Form.Check type={'radio'} label={'In Person Only'} id={'inPerson'} checked={associateFeeBaseType == 2} name="group1" onChange={() => setAssociateFeeBaseType(2)} />
                                        <Form.Check type={'radio'} label={'Both'} id={'both'} checked={associateFeeBaseType == 3} name="group1" onChange={() => setAssociateFeeBaseType(3)} />
                                        <Form.Check type={'radio'} label={'Hybrid (ABOVE SENIOR)'} id={'Hybrid'} checked={associateFeeBaseType == 4} name="group1" onChange={() => setAssociateFeeBaseType(4)} />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th className="required toggle-button-left">Associate Fee Base Type Two</th>
                                <td className="center-items-table">
                                    <div className="toggle-button-right">
                                        <Form.Check type={'radio'} label={'Junior Advanced'} id={'junior'} checked={associateFeeBaseTypeTwo == 1} name="group2" onChange={() => setAssociateFeeBaseTypeTwo(1)} />
                                        <Form.Check type={'radio'} label={'Senior Advanced'} id={'senior'} checked={associateFeeBaseTypeTwo == 2} name="group2" onChange={() => setAssociateFeeBaseTypeTwo(2)} />
                                        <Form.Check type={'radio'} label={'Above Senior'} id={'above'} checked={associateFeeBaseTypeTwo == 3} name="group2" onChange={() => setAssociateFeeBaseTypeTwo(3)} />
                                    </div>
                                </td>
                            </tr>
                        </Card>
                        <Card style={style}>
                            {/* <Card.Header style={{ backgroundColor: '#e9ecef' }}>CFIR</Card.Header> */}
                            <tr>
                                {<th className="toggle-button-left">Probono Rate</th>}
                                <td className="center-items-table" style={{ marginRight: 30 }}>
                                    <div className="toggle-button-right">
                                        <InputGroup size="sm">
                                            <Form.Control style={{ marginRight: 5 }} aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={probono}
                                                onChange={(e) => { setProbono(e.target.value) }} onKeyPress={(e) => NumbersOnly(e)} />
                                        </InputGroup>
                                    </div>
                                </td>
                            </tr>


                        </Card>
                        <Card style={style}>
                            <Card.Header style={{ backgroundColor: '#e9ecef' }}>CFIR</Card.Header>
                            <tr>
                                {<th className="toggle-button-left">Assesment Rate Fee%</th>}
                                <td className="center-items-table" style={{ marginRight: 30 }}>
                                    <div className="toggle-button-right">
                                        <InputGroup size="sm">
                                            <Form.Control style={{ marginRight: 5 }} aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={assessmentRate}
                                                onChange={(e) => { setAssessmentRate(e.target.value) }} onKeyPress={(e) => NumbersOnly(e)} />
                                        </InputGroup>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                {subPrac ? <th className="toggle-button-left">Superviser</th> : <th className="toggle-button-left">Associate Fee Base Rate</th>}
                                <td className="toggle-button-right">
                                    <div>

                                        <InputGroup size="sm">
                                            <Form.Control style={{ marginRight: 5 }} aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={associateFeeBaseRate}
                                                onChange={(e) => { setAssociateFeeBaseRate(e.target.value) }} onKeyPress={(e) => NumbersOnly(e)} />
                                            <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={associateFeeBaseRateTwo}
                                                onChange={(e) => { setAssociateFeeBaseRateTwo(e.target.value) }} onKeyPress={(e) => NumbersOnly(e)} />
                                        </InputGroup>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                {subPrac ? <th className="toggle-button-left">Worker</th> : <th className="toggle-button-left">Associate Fee Base Rate Override({'<33'})</th>}
                                <td className="toggle-button-right">
                                    <div>
                                        <InputGroup size="sm">
                                            <Form.Control style={{ marginRight: 5 }} aria-label="Small" aria-describedby="inputGroup-sizing-sm"
                                                value={associateFeebaseRateOverRide33}
                                                onChange={(e) => { setAssociateFeeBaseRate33(e.target.value) }} onKeyPress={(e) => NumbersOnly(e)} />
                                            <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={associateFeebaseRateOverRide33Two}
                                                onChange={(e) => { setAssociateFeeBaseRate33Two(e.target.value) }} onKeyPress={(e) => NumbersOnly(e)} />
                                        </InputGroup>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                {subPrac ? <th className="toggle-button-left">CFIR</th> : <th className="toggle-button-left">Associate Fee Base Rate Override({'>34'})</th>}
                                <td className="toggle-button-right">
                                    <div>
                                        <InputGroup size="sm">
                                            <Form.Control style={{ marginRight: 5 }} aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={associateFeebaseRateOverRide34}
                                                onChange={(e) => { setAssociateFeeBaseRate34(e.target.value) }} onKeyPress={(e) => NumbersOnly(e)} />
                                            <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={associateFeebaseRateOverRide34Two}
                                                onChange={(e) => { setAssociateFeeBaseRate34Two(e.target.value) }} onKeyPress={(e) => NumbersOnly(e)} />
                                        </InputGroup>
                                    </div>
                                </td>
                            </tr>
                            {/* <tr>
                                <th className="toggle-button-left">Associate Fee Base Rate Override (Assessments)</th>
                                <td className="center-items-table">
                                    <div className="toggle-button-right">
                                        <ToggleButton
                                            className="mb-2"
                                            id="associateFeeBaseRateOverrideAsseements"
                                            type="checkbox"
                                            variant="outline-dark"
                                            checked={associateFeeBaseRateOverrideAsseements}
                                            // value="1"
                                            size="sm"
                                            onChange={(e) => setAssociateFeeBaseRateOverrideAsseements(e.currentTarget.checked)}
                                        >
                                            {associateFeeBaseRateOverrideAsseements === true ? "Yes" : "No"}
                                        </ToggleButton>
                                    </div>
                                </td>
                            </tr> */}
                        </Card>
                        <Card style={style}>
                            <Card.Header style={{ backgroundColor: '#e9ecef' }}>CBT</Card.Header>
                            <tr>
                                {<th className="toggle-button-left">Assesment Rate Fee%</th>}
                                <td className="center-items-table" >
                                    <div className="toggle-button-right" style={{ marginRight: 30 }}>
                                        <InputGroup size="sm">
                                            <Form.Control style={{ marginRight: 5 }} aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={assessmentRate_c}
                                                onChange={(e) => { setAssessmentRate_c(e.target.value) }} onKeyPress={(e) => NumbersOnly(e)} />
                                        </InputGroup>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                {subPrac ? <th className="toggle-button-left">Superviser</th> : <th className="toggle-button-left">Associate Fee Base Rate</th>}
                                <td className="toggle-button-right">
                                    <div>
                                        <InputGroup size="sm">
                                            <Form.Control style={{ marginRight: 5 }} aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={associateFeeBaseRate_c}
                                                onChange={(e) => { setAssociateFeeBaseRate_c(e.target.value) }} onKeyPress={(e) => NumbersOnly(e)} />
                                            <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={associateFeeBaseRateTwo_c}
                                                onChange={(e) => { setAssociateFeeBaseRateTwo_c(e.target.value) }} onKeyPress={(e) => NumbersOnly(e)} />
                                        </InputGroup>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                {subPrac ? <th className="toggle-button-left">Worker</th> : <th className="toggle-button-left">Associate Fee Base Rate Override({'<33'})</th>}

                                <td className="toggle-button-right">
                                    <div>
                                        <InputGroup size="sm">
                                            <Form.Control style={{ marginRight: 5 }} aria-label="Small" aria-describedby="inputGroup-sizing-sm"
                                                value={associateFeebaseRateOverRide33_c}
                                                onChange={(e) => { setAssociateFeeBaseRate33_c(e.target.value) }} onKeyPress={(e) => NumbersOnly(e)} />
                                            <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={associateFeebaseRateOverRide33Two_c}
                                                onChange={(e) => { setAssociateFeeBaseRate33Two_c(e.target.value) }} onKeyPress={(e) => NumbersOnly(e)} />
                                        </InputGroup>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                {subPrac ? <th className="toggle-button-left">CFIR</th> : <th className="toggle-button-left">Associate Fee Base Rate Override({'>34'})</th>}
                                <td className="toggle-button-right">
                                    <div>
                                        <InputGroup size="sm">
                                            <Form.Control style={{ marginRight: 5 }} aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={associateFeebaseRateOverRide34_c}
                                                onChange={(e) => { setAssociateFeeBaseRate34_c(e.target.value) }} onKeyPress={(e) => NumbersOnly(e)} />
                                            <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={associateFeebaseRateOverRide34Two_c}
                                                onChange={(e) => { setAssociateFeeBaseRate34Two_c(e.target.value) }} onKeyPress={(e) => NumbersOnly(e)} />
                                        </InputGroup>
                                    </div>
                                </td>
                            </tr>
                            {/* <tr>
                                <th className="toggle-button-left">Associate Fee Base Rate Override (Assessments)</th>
                                <td className="center-items-table">
                                    <div className="toggle-button-right">
                                        <ToggleButton
                                            className="mb-2"
                                            id="associateFeeBaseRateOverrideAsseements_c"
                                            type="checkbox"
                                            variant="outline-dark"
                                            checked={associateFeeBaseRateOverrideAsseements_c}
                                            // value="1"
                                            size="sm"
                                            onChange={(e) => setAssociateFeeBaseRateOverrideAsseements_c(e.currentTarget.checked)}
                                        >
                                            {associateFeeBaseRateOverrideAsseements_c === true ? "Yes" : "No"}
                                        </ToggleButton>
                                    </div>
                                </td>
                            </tr> */}
                        </Card>
                        <Card style={style}>
                            <Card.Header style={{ backgroundColor: '#e9ecef' }}>CPRI</Card.Header>
                            <tr>
                                {<th className="toggle-button-left">Assesment Rate Fee%</th>}
                                <td className="center-items-table">
                                    <div className="toggle-button-right" style={{ marginRight: 30 }}>
                                        <InputGroup size="sm">
                                            <Form.Control style={{ marginRight: 5 }} aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={assessmentRate_f}
                                                onChange={(e) => { setAssessmentRate_f(e.target.value) }} onKeyPress={(e) => NumbersOnly(e)} />
                                        </InputGroup>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                {subPrac ? <th className="toggle-button-left">Superviser</th> : <th className="toggle-button-left">Associate Fee Base Rate</th>}
                                <td className="toggle-button-right">
                                    <div>
                                        <InputGroup size="sm">
                                            <Form.Control style={{ marginRight: 5 }} aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={associateFeeBaseRate_f}
                                                onChange={(e) => { setAssociateFeeBaseRate_f(e.target.value) }} onKeyPress={(e) => NumbersOnly(e)} />
                                            <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={associateFeeBaseRateTwo_f}
                                                onChange={(e) => { setAssociateFeeBaseRateTwo_f(e.target.value) }} onKeyPress={(e) => NumbersOnly(e)} />
                                        </InputGroup>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                {subPrac ? <th className="toggle-button-left">Worker</th> : <th className="toggle-button-left">Associate Fee Base Rate Override({'<33'})</th>}
                                <td className="toggle-button-right">
                                    <div>
                                        <InputGroup size="sm">
                                            <Form.Control style={{ marginRight: 5 }} aria-label="Small" aria-describedby="inputGroup-sizing-sm"
                                                value={associateFeebaseRateOverRide33_f}
                                                onChange={(e) => { setAssociateFeeBaseRate33_f(e.target.value) }} onKeyPress={(e) => NumbersOnly(e)} />
                                            <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={associateFeebaseRateOverRide33Two_f}
                                                onChange={(e) => { setAssociateFeeBaseRate33Two_f(e.target.value) }} onKeyPress={(e) => NumbersOnly(e)} />
                                        </InputGroup>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                {subPrac ? <th className="toggle-button-left">CFIR</th> : <th className="toggle-button-left">Associate Fee Base Rate Override({'>34'})</th>}
                                <td className="toggle-button-right">
                                    <div>
                                        <InputGroup size="sm">
                                            <Form.Control style={{ marginRight: 5 }} aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={associateFeebaseRateOverRide34_f}
                                                onChange={(e) => { setAssociateFeeBaseRate34_f(e.target.value) }} onKeyPress={(e) => NumbersOnly(e)} />
                                            <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={associateFeebaseRateOverRide34Two_f}
                                                onChange={(e) => { setAssociateFeeBaseRate34Two_f(e.target.value) }} onKeyPress={(e) => NumbersOnly(e)} />
                                        </InputGroup>
                                    </div>
                                </td>
                            </tr>
                            {/* <tr>
                                <th className="toggle-button-left">Associate Fee Base Rate Override (Assessments)</th>
                                <td className="center-items-table">
                                    <div className="toggle-button-right">

                                        <ToggleButton
                                            className="mb-2"
                                            id="associateFeeBaseRateOverrideAsseements_f"
                                            type="checkbox"
                                            variant="outline-dark"
                                            checked={associateFeeBaseRateOverrideAsseements_f}
                                            // value="1"
                                            size="sm"
                                            onChange={(e) => setAssociateFeeBaseRateOverrideAsseements_f(e.currentTarget.checked)}
                                        >
                                            {associateFeeBaseRateOverrideAsseements_f === true ? "Yes" : "No"}
                                        </ToggleButton>
                                    </div>
                                </td>
                            </tr> */}
                        </Card>
                        <Card style={style}>
                            <tr>
                                <th className={associateFeeBaseType === 1 || associateFeeBaseType === 2 ? 'required toggle-button-left' : "toggle-button-left"}> In Office Blocks</th>
                                <td className="center-items-table">
                                    <div className="toggle-button-right">
                                        <InputGroup size="sm">
                                            <Form.Control style={{ marginRight: 5 }} placeholder="Blocks" required={true}
                                                aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={inOfficeBlocks} onChange={(e) => { setInOfficeBlocks(e.target.value) }} onKeyPress={(e) => NumbersOnly(e)} />
                                        </InputGroup>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th className={associateFeeBaseType === 1 || associateFeeBaseType === 2 ? 'required toggle-button-left' : "toggle-button-left"}> In Office Block Hours</th>
                                <td className="center-items-table">
                                    <div className="toggle-button-right">
                                        <InputGroup size="sm">
                                            <Form.Control placeholder="Block Hours" required={associateFeeBaseType === 1 || associateFeeBaseType === 2}
                                                aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={inOfficeBlockHours} onChange={(e) => { setInOfficeBlockHours(e.target.value) }} onKeyPress={(e) => NumbersOnly(e)} />
                                        </InputGroup>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th className={associateFeeBaseType === 1 || associateFeeBaseType === 4 ? 'required toggle-button-left' : "toggle-button-left"}>Block Hourly Rate</th>
                                <td className="center-items-table">
                                    <div className="toggle-button-right">
                                        <InputGroup size="sm">
                                            <Form.Control required={associateFeeBaseType === 1 || associateFeeBaseType === 4}
                                                aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={blocksHourlyRate}
                                                onChange={(e) => { setBlocksHourlyRate(e.target.value) }} onKeyPress={(e) => NumbersOnly(e)} />
                                        </InputGroup>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th className={associateFeeBaseType === 1 || associateFeeBaseType === 4 ? 'required toggle-button-left' : "toggle-button-left"}>Blocks Bi Weekly Charge</th>
                                <td className="center-items-table">
                                    <div className="toggle-button-right">
                                        <InputGroup size="sm">
                                            <Form.Control disabled={true}
                                                aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={blocksBiWeeklyCharge} />
                                        </InputGroup>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th className={"toggle-button-left"}>In Office Block Times</th>
                                <td className="center-items-table">
                                    <div className="toggle-button-right" >
                                        <InputGroup size="sm" >
                                            <Form.Control as={'textarea'} style={{ width: 350 }} //required={associateFeeBaseType === 1}
                                                aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={inOfficeBlockTimes} onChange={(e) => { setInOfficeBlockTimes(e.target.value) }} />
                                        </InputGroup>
                                    </div>
                                </td>
                            </tr>
                        </Card>
                        <Card style={style}>
                            <tr>
                                <th className="required toggle-button-left">Video Technology</th>
                                <td className="center-items-table">
                                    <div className="toggle-button-right" style={{ width: 300 }}>
                                        <Select
                                            className="basic-single"
                                            classNamePrefix="select"
                                            isSearchable={true}
                                            name="color"
                                            options={videoTech}
                                            placeholder="Please select"
                                            value={selectedVideoTech}
                                            onChange={(e) => setSelectedVideoTech((e))} />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th className="toggle-button-left">Charge Video Fee?</th>
                                <td className="center-items-table" >
                                    <div className="toggle-button-right">
                                        <ToggleButton
                                            aria-required={true}
                                            className="mb-2"
                                            id="toggle-check8"
                                            type="checkbox"
                                            variant="outline-dark"
                                            checked={videoFee}
                                            value="1"
                                            size="sm"
                                            onChange={(e) => setVideoFee(e.currentTarget.checked)}
                                        >
                                            {videoFee === true ? "Yes" : "No"}
                                        </ToggleButton>
                                    </div>
                                </td>
                            </tr>
                        </Card>
                        <Card style={style}>
                            <tr>
                                <th className="toggle-button-left">Tables to show on invoice report</th>
                                <td className="center-items-table" >
                                    <div className="toggle-button-right" >
                                        <Form.Check type={'checkbox'} id={`duplicateTable`} label={`Duplicate Table`} checked={duplicateTable} onChange={(e) => setDuplicateTable(e.target.checked)} />
                                        <Form.Check type={'checkbox'} id={`nonChargeablesTable`} label={`Non-chargeables`} checked={nonChargeablesTable} onChange={(e) => setNonChargeablesTable(e.target.checked)} />
                                        <Form.Check type={'checkbox'} id={`associateFeesTable`} label={`Associate Fees Table`} checked={associateFeesTable} onChange={(e) => setAssociateFeesTable(e.target.checked)} />
                                        <Form.Check type={'checkbox'} id={`totalRemittanceTable`} label={`Total Remittance Table`} checked={totalRemittenceTable} onChange={(e) => setTotalRemittenceTable(e.target.checked)} />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th className="toggle-button-left">Tables to show on payment report</th>
                                <td className="center-items-table" >
                                    <div className="toggle-button-right" >
                                        <Form.Check type={'checkbox'} id={`nonRemittablesTable`} label={`Non Remittables Table`} checked={nonRemittablesTable} onChange={(e) => setNonRemittablesTable(e.target.checked)} />
                                        <Form.Check type={'checkbox'} id={`transactionsTable`} label={`Transactions Table `} checked={transactionsTable} onChange={(e) => setTransactionsTable(e.target.checked)} />
                                        <Form.Check type={'checkbox'} id={`superviseeTotalTable`} label={`Supervisee Total Table`} checked={superviseeTotalTabel} onChange={(e) => setSuperviseeTotalTable(e.target.checked)} />
                                        <Form.Check type={'checkbox'} id={`appliedPaymentsTable`} label={`Applied Payments Table`} checked={appliedPaymentsTotalTable} onChange={(e) => setAppliedPaymentsTotalTable(e.target.checked)} />
                                    </div>
                                </td>
                            </tr>
                        </Card>
                        <Card style={style}>
                            {
                                adjustmentFee.map((x, index) => {
                                    return <tr key={index}>
                                        <th className="toggle-button-left">Invoice Adjustment fee</th>
                                        <td className="center-items-table" >
                                            <div className="toggle-button-right" >
                                                <InputGroup size="sm"  >
                                                    <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={x.name} placeholder={'Invoice Adjustment Fee'} style={{ marginRight: '5px' }}
                                                        onChange={(e) => { updateAdjustmentArr(e.target.value, 'name', index) }} />
                                                    <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={x.value}
                                                        onChange={(e) => { updateAdjustmentArr(e.target.value, 'vlaue', index) }} onKeyPress={(e) => NumbersOnly(e)} />
                                                    <Button style={{ marginLeft: '5px' }} variant="dark" onClick={handleAddClick}>+</Button>
                                                    <Button style={{ marginLeft: '5px' }} variant="dark" onClick={() => handleRemoveClick(x.name, x.value)}>-</Button>
                                                </InputGroup>
                                            </div>
                                        </td>
                                    </tr>
                                })
                            }
                            {
                                adjustmentPaymentFee.map((x, index) => {
                                    return <tr key={index}>
                                        <th className="toggle-button-left">Payment Adjustment fee</th>
                                        <td className="center-items-table" >
                                            <div className="toggle-button-right" >
                                                <InputGroup size="sm"  >
                                                    <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={x.name} placeholder={'Payment Adjustment Fee'} style={{ marginRight: '5px' }}
                                                        onChange={(e) => { updatePaymentAdjustmentArr(e.target.value, 'name', index) }} />
                                                    <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={x.value}
                                                        onChange={(e) => { updatePaymentAdjustmentArr(e.target.value, 'vlaue', index) }} onKeyPress={(e) => NumbersOnly(e)} />
                                                    <Button style={{ marginLeft: '5px' }} variant="dark" onClick={handleAddPaymentClick}>+</Button>
                                                    <Button style={{ marginLeft: '5px' }} variant="dark" onClick={() => handleRemovePaymentClick(x.name, x.value)}>-</Button>
                                                </InputGroup>
                                                
                                            </div>
                                        </td>
                                    </tr>
                                })
                            }
                        </Card>

                        <Card style={style}>
                            <tr>
                                <th className="toggle-button-left">Comments</th>
                                <td className="center-items-table" >
                                    <div className="toggle-button-right" style={{ width: 350 }}>
                                        <InputGroup size="sm"  >
                                            <Form.Control as={'textarea'}
                                                aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={comments} onChange={(e) => { setComments(e.target.value) }} />
                                        </InputGroup>
                                    </div>
                                </td>
                            </tr>
                        </Card>
                    </thead>
                </Table >
                {<Button variant={'dark'} disabled={worker.status === false} type="submit">{selected === "" ? "Save user" : "Update user"}</Button>}
            </Form>
            <br />
            <br />
            <br />
        </ >
    )
}
export default WorkerProfileTable