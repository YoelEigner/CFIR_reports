import { useEffect, useState } from "react"
import { Alert, Button, Form, FormGroup, InputGroup, Table, ToggleButton } from "react-bootstrap"
import Select from 'react-select';
import { useSelector } from 'react-redux';
import GetVideoTech from "../BL/GetVideoTech";
import { DatePicker } from "react-rainbow-components";
import WorkerOptionModal from "./WorkerOptionModal";
import UpdateWorkerProfile from "../BL/UpdateWorkerProfiles";
import { useDispatch } from "react-redux";
import NewWorkerProfile from "../BL/NewWorkerProfile";
import { NumbersOnly } from "../GetFile/NumbersOnly";
import { act } from "react-dom/test-utils";

const WorkerProfileTable = ({ selected, worker }) => {
    const [tglSuperviser, setTglSuperviser] = useState(false)
    const [tglIsSupervised, setTglIsSupervised] = useState(false)
    const [directorSupervised, setDirectorsupervised] = useState(false)
    const [getMoney, setGetsMoney] = useState(false)
    const [hst, setHst] = useState(false)
    const [active, setActive] = useState(false)
    const [associateName, setAssociateName] = useState("")
    const [associateEmail, setAssociateEmail] = useState("")
    const [associate, setAssociate] = useState({ value: "Please Select", label: "Please Select" })
    const [superviserOne, setSupervierOne] = useState({ value: "Please Select", label: "Please Select" })
    const [superviserTwo, setSupervierTwo] = useState({ value: "Select Second Superviser", label: "Select Second Superviser" })
    const [videoFee, setVideoFee] = useState(0)
    const [provValue, setProvValue] = useState({ value: "Please Select", label: "Please Select" })
    const [videoTech, setVideoTech] = useState([])
    const [superviserOneCovrage, setSuperviserOneCovrage] = useState([])
    const [superviserTwoCovrage, setSuperviserTwoCovrage] = useState([])
    const [selectedVideoTech, setSelectedVideoTech] = useState({ value: "Please Select", label: "Please Select" })
    const [inOfficeBlocks, setInOfficeBlocks] = useState("")
    const [inOfficeBlockTimes, setInOfficeBlockTimes] = useState("")
    const [blocksBiWeeklyCharge, setBlocksBiWeeklyCharge] = useState("")
    const [associateFeeBaseRate, setAssociateFeeBaseRate] = useState(0)
    const [associateFeebaseRateOverRide33, setAssociateFeeBaseRate33] = useState(0)
    const [associateFeebaseRateOverRide34, setAssociateFeeBaseRate34] = useState(0)
    const [associateFeeBaseRateOverrideAsseements, setAssociateFeeBaseRateOverrideAsseements] = useState(false)
    const [associateFeeBaseType, setAssociateFeeBaseType] = useState('')
    const [associateFeeBaseTypeTwo, setAssociateFeeBaseTypeTwo] = useState('')
    const storeData = useSelector(state => state)
    const [date, setDate] = useState('')
    const [superviserSelect, setSuperviserSelect] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [modalHeader, setModalHeader] = useState("")
    const [msg, setMsg] = useState('')
    const [varient, setVarient] = useState('success')
    const [nonChargeablesTable, setNonChargeablesTable] = useState(true)
    const [duplicateTable, setDuplicateTable] = useState(true)
    const [associateFeesTable, setAssociateFeesTable] = useState(true)
    const [comments, setComments] = useState('')
    const [adjustmentFee, setAdjustmentFee] = useState([{ name: "", value: 0 }])
    const [adjustmentPaymentFee, setAdjustmentPAymentFee] = useState([{ name: "", value: 0 }])
    const dispatch = useDispatch()


    useEffect(() => {
        setSuperviserSelect(superviserSelectOptions(storeData.Physician))
    }, [worker])

    useEffect(() => {
        videoTechAPI()
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
        storeData.associateLeval.forEach(x => {
            arr.push({ value: x.id, label: x.leval })
        })
        return arr
    }

    const openModal = (text, id) => {
        setModalHeader(text)
        setShowModal(true)

    }


    useEffect(() => {
        if (worker.length !== 0) {
            setActive(worker.status)
            setDate(worker.startDate)
            setProvValue({ value: worker.site, label: worker.site })
            setAssociate({ value: worker.associateType, label: worker.associateType })
            setAssociateName(worker.associateName)
            setAssociateEmail(worker.associateEmail)
            setTglSuperviser(worker.isSuperviser)
            setTglIsSupervised(worker.isSupervised)
            setDirectorsupervised(worker.IsSupervisedByNonDirector)
            setSupervierOne({ value: worker.supervisor1, label: worker.supervisor1 })
            setSupervierTwo({ value: worker.supervisor1, label: worker.supervisor2 })
            setSuperviserOneCovrage(worker.supervisor1Covrage)
            setSuperviserTwoCovrage(worker.supervisor2Covrage)
            setGetsMoney(worker.supervisorGetsMoney)
            setAssociateFeeBaseType(worker.associateFeeBaseType)
            setAssociateFeeBaseTypeTwo(worker.associateFeeBaseType2)
            setAssociateFeeBaseRate(worker.associateFeeBaseRate)
            setAssociateFeeBaseRate33(worker.associateFeeBaseRateOverrideLessThen)
            setAssociateFeeBaseRate34(worker.associateFeeBaseRateOverrideGreaterThen)
            setAssociateFeeBaseRateOverrideAsseements(worker.associateFeeBaseRateOverrideAsseements)
            setInOfficeBlocks(worker.inOfficeBlocks)
            setInOfficeBlockTimes(worker.inOfficeBlockTimes)
            setBlocksBiWeeklyCharge(worker.blocksBiWeeklyCharge)
            setSelectedVideoTech({ value: worker.videoTech, label: worker.videoTech })
            setVideoFee(worker.cahrgeVideoFee)
            setDuplicateTable(worker.duplicateTable)
            setNonChargeablesTable(worker.nonChargeablesTable)
            setAssociateFeesTable(worker.associateFeesTable)
            setComments(worker.comments)
            setAdjustmentFee(JSON.parse(worker.adjustmentFee))
            setAdjustmentPAymentFee(JSON.parse(worker.adjustmentPaymentFee))

        }
    }, [worker])

    const removeStatus = (name) => {
        try {
            let status = storeData.Physician.find(x => x.associateName.includes(name))
            return status.status === true ? name.split("(Active)")[0] : name.split("(Not Active)")[0]
        } catch (error) {
            return name
        }


    }

    const handleSave = async (e) => {
        e.preventDefault()

        var temp = {}
        temp.status = active
        temp.startDate = date
        temp.site = provValue.label
        temp.associateType = associate.label
        temp.associateEmail = associateEmail
        temp.associateName = associateName
        temp.isSuperviser = tglSuperviser
        temp.isSupervised = tglIsSupervised
        temp.IsSupervisedByNonDirector = directorSupervised
        temp.supervisor1 = removeStatus(superviserOne.label)
        temp.supervisor1Covrage = superviserOneCovrage
        temp.supervisor2 = removeStatus(superviserTwo.label)
        temp.supervisor2Covrage = superviserTwoCovrage
        temp.supervisorGetsMoney = getMoney
        temp.chargesHST = hst
        temp.associateFeeBaseType = associateFeeBaseType
        temp.associateFeeBaseType2 = associateFeeBaseTypeTwo
        temp.associateFeeBaseRate = associateFeeBaseRate
        temp.associateFeeBaseRateOverrideLessThen = associateFeebaseRateOverRide33
        temp.associateFeeBaseRateOverrideGreaterThen = associateFeebaseRateOverRide34
        temp.associateFeeBaseRateOverrideAsseements = associateFeeBaseRateOverrideAsseements
        temp.inOfficeBlocks = inOfficeBlocks
        temp.inOfficeBlockTimes = inOfficeBlockTimes
        temp.blocksBiWeeklyCharge = blocksBiWeeklyCharge
        temp.videoTech = selectedVideoTech.label
        temp.cahrgeVideoFee = videoFee
        temp.duplicateTable = duplicateTable
        temp.nonChargeablesTable = nonChargeablesTable
        temp.associateFeesTable = associateFeesTable
        temp.comments = comments
        temp.adjustmentFee = JSON.stringify(adjustmentFee)
        temp.adjustmentPaymentFee = JSON.stringify(adjustmentPaymentFee)

        let validate = Object.keys(temp).map(key => { return temp[key] })
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

    useEffect(() => {
        if (!tglIsSupervised) {
            setSupervierOne({ value: "Please Select", label: "Please Select" })
            setSupervierTwo({ value: "Select Second Superviser", label: "Select Second Superviser" })
        }
    }, [tglIsSupervised])

    return (
        <div>
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
                        <tr >
                            <th className="required">Status</th>
                            <td aria-required>
                                <ToggleButton
                                    className="mb-2"
                                    id="active"
                                    type="checkbox"
                                    variant="outline-dark"
                                    checked={active}
                                    disabled={worker.status === false}
                                    // value="1"
                                    size="sm"
                                    onChange={(e) => setActive(e.currentTarget.checked)}
                                >
                                    {active === true ? "Yes" : "No"}
                                </ToggleButton>
                            </td>
                        </tr>
                        <tr>
                            <th className="required">Start Date</th>
                            <td>
                                <DatePicker
                                    required={true}
                                    id="date"
                                    value={date}
                                    onChange={(date) => setDate(date)}
                                    formatStyle="large"
                                    placeholder="DD/MM/YYYY"
                                /></td>
                        </tr>
                        <tr>
                            <th className="required">Site</th>
                            <td aria-required>
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
                            </td>
                        </tr>
                        <tr>
                            <th className="required">Associate Name</th>
                            <td>
                                <InputGroup size="sm" >
                                    <Form.Control required aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={associateName} onChange={(e) => { setAssociateName(e.target.value) }} />
                                </InputGroup>
                            </td>
                        </tr>
                        <tr>
                            <th className="required">Associate Email</th>
                            <td>
                                <InputGroup size="sm" >
                                    <Form.Control required aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={associateEmail} onChange={(e) => { setAssociateEmail(e.target.value) }} />
                                </InputGroup>
                            </td>
                        </tr>
                        <tr>
                            <th className="required">Associate Type</th>
                            <td>
                                <Select
                                    className="basic-single"
                                    classNamePrefix="select"
                                    isSearchable={true}
                                    name="color"
                                    options={levals()}
                                    placeholder="Please select"
                                    value={associate}
                                    onChange={(e) => setAssociate((e))}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th className="required">Is Superviser</th>
                            <td>
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
                            </td>
                        </tr>
                        <tr>
                            <th className="required">Is Supervised</th>
                            <td>
                                <ToggleButton
                                    className="mb-2"
                                    id="toggle-check-3"
                                    type="checkbox"
                                    variant="outline-dark"
                                    checked={tglIsSupervised}
                                    value="1"
                                    size="sm"
                                    onChange={(e) => setTglIsSupervised(e.currentTarget.checked)}
                                >
                                    {tglIsSupervised === true ? "Yes" : "No"}
                                </ToggleButton>
                            </td>
                        </tr>
                        <tr>
                            <th className={tglIsSupervised === true ? 'required' : ""}>Is Supervised By Non Director</th>
                            <td>
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
                            </td>
                        </tr>
                        <tr>
                            <th className={'required'}>Superviser One</th>
                            <td>
                                <Select
                                    aria-required={true}
                                    className="basic-single"
                                    classNamePrefix="select"
                                    isSearchable={true}
                                    name="superviserOne"
                                    options={superviserSelect}
                                    placeholder="Please select"
                                    value={superviserOne}
                                    onChange={(e) => setSupervierOne(e)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th className={tglIsSupervised === true ? 'required' : ""}>Supervisor One Covrage</th>
                            <td>
                                <Button disabled={superviserOne.value === 'Please Select'} variant="outline-dark" size="sm" onClick={() => openModal('Supervisor One Covrage', 1)}>Covrage Type</Button>
                            </td>
                        </tr>
                        <tr>
                            <th>Superviser Two</th>
                            <td>
                                <Select
                                    className="basic-single"
                                    classNamePrefix="select"
                                    isSearchable={true}
                                    name="superviserTwo"
                                    options={superviserSelect}
                                    placeholder="Please select"
                                    value={superviserTwo}
                                    onChange={(e) => setSupervierTwo(e)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th >Supervisor Two Covrage</th>
                            <td>
                                <Button disabled={superviserTwo.label === 'Select Second Superviser'} variant="outline-dark" size="sm" onClick={() => openModal('Supervisor Two Covrage', 2)}>Covrage Type</Button>
                            </td>
                        </tr>
                        <tr>
                            <th className={tglIsSupervised === true ? 'required' : ""}>Supervisor Gets Money</th>
                            <td>
                                <ToggleButton
                                    className="mb-2"
                                    id="toggle-money"
                                    type="checkbox"
                                    variant="outline-dark"
                                    checked={getMoney}
                                    value="1"
                                    size="sm"
                                    onChange={(e) => setGetsMoney(e.currentTarget.checked)}
                                >
                                    {getMoney === true ? "Yes" : "No"}
                                </ToggleButton>
                            </td>
                        </tr>
                        <tr>
                            <th className="required">Charges HST</th>
                            <td >
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
                            </td>
                        </tr>
                        <tr>
                            <th className="required">Associate Fee Base Type</th>
                            <td>
                                <Form.Check type={'radio'} label={'Online Only'} id={'online'} checked={associateFeeBaseType == 1} name="group1" onChange={() => setAssociateFeeBaseType(1)} />
                                <Form.Check type={'radio'} label={'In Person Only'} id={'inPerson'} checked={associateFeeBaseType == 2} name="group1" onChange={() => setAssociateFeeBaseType(2)} />
                                <Form.Check type={'radio'} label={'Both'} id={'both'} checked={associateFeeBaseType == 3} name="group1" onChange={() => setAssociateFeeBaseType(3)} />
                                <Form.Check type={'radio'} label={'Hybrid (ABOVE SENIOR)'} id={'Hybrid'} checked={associateFeeBaseType == 4} name="group1" onChange={() => setAssociateFeeBaseType(4)} />
                            </td>
                        </tr>
                        <tr>
                            <th className="required">Associate FeeBase Type Two</th>
                            <td>
                                <Form.Check type={'radio'} label={'Junior Basic'} id={'junior'} checked={associateFeeBaseTypeTwo == 1} name="group2" onChange={() => setAssociateFeeBaseTypeTwo(1)} />
                                <Form.Check type={'radio'} label={'Senior Advanced'} id={'senior'} checked={associateFeeBaseTypeTwo == 2} name="group2" onChange={() => setAssociateFeeBaseTypeTwo(2)} />
                                <Form.Check type={'radio'} label={'Above Senior'} id={'above'} checked={associateFeeBaseTypeTwo == 3} name="group2" onChange={() => setAssociateFeeBaseTypeTwo(3)} />
                            </td>
                        </tr>
                        <tr>
                            <th>Associate Fee Base Rate</th>
                            <td>
                                <InputGroup size="sm"  >
                                    <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={associateFeeBaseRate}
                                        onChange={(e) => { setAssociateFeeBaseRate(e.target.value) }} onKeyPress={(e) => NumbersOnly(e)} />
                                </InputGroup>
                            </td>
                        </tr>
                        <tr>
                            <th>Associate Fee Base Rate Override({'<33'})</th>
                            <td>
                                <InputGroup size="sm"  >
                                    <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={associateFeebaseRateOverRide33}
                                        onChange={(e) => { setAssociateFeeBaseRate33(e.target.value) }} onKeyPress={(e) => NumbersOnly(e)} />
                                </InputGroup>
                            </td>
                        </tr>
                        <tr>
                            <th>Associate Fee Base Rate Override({'>34'})</th>
                            <td>
                                <InputGroup size="sm"  >
                                    <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={associateFeebaseRateOverRide34}
                                        onChange={(e) => { setAssociateFeeBaseRate34(e.target.value) }} onKeyPress={(e) => NumbersOnly(e)} />
                                </InputGroup>
                            </td>
                        </tr>
                        <tr>
                            <th>Associate Fee Base Rate Override (Assessments)</th>
                            <td >
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
                            </td>
                        </tr>
                        <tr>
                            <th className={associateFeeBaseType === 1 || associateFeeBaseType === 2 ? 'required' : ""}> In Office Blocks</th >
                            <td>
                                <InputGroup size="sm"  >
                                    <Form.Control required={associateFeeBaseType === 1 || associateFeeBaseType === 2}
                                        aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={inOfficeBlocks} onChange={(e) => { setInOfficeBlocks(e.target.value) }} />
                                </InputGroup>
                            </td>
                        </tr>
                        <tr>
                            <th className={associateFeeBaseType === 1 ? 'required' : ""}>In Office Block Times</th>
                            <td>
                                <InputGroup size="sm"  >
                                    <Form.Control as={'textarea'} required={associateFeeBaseType === 1}
                                        aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={inOfficeBlockTimes} onChange={(e) => { setInOfficeBlockTimes(e.target.value) }} />
                                </InputGroup>
                            </td>
                        </tr>
                        <tr>
                            <th className={associateFeeBaseType === 1 || associateFeeBaseType === 4 ? 'required' : ""}>Blocks Bi Weekly Charge</th>
                            <td>
                                <InputGroup size="sm"  >
                                    <Form.Control required={associateFeeBaseType === 1 || associateFeeBaseType === 4}
                                        aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={blocksBiWeeklyCharge}
                                        onChange={(e) => { setBlocksBiWeeklyCharge(e.target.value) }} onKeyPress={(e) => NumbersOnly(e)} />
                                </InputGroup>
                            </td>
                        </tr>
                        <tr>
                            <th className="required">Video Technology</th>
                            <td>
                                <Select
                                    className="basic-single"
                                    classNamePrefix="select"
                                    isSearchable={true}
                                    name="color"
                                    options={videoTech}
                                    placeholder="Please select"
                                    value={selectedVideoTech}
                                    onChange={(e) => setSelectedVideoTech((e))}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>Charge Video Fee?</th>
                            <td>
                                <ToggleButton
                                    aria-required={true}
                                    className="mb-2"
                                    id="toggle-check5"
                                    type="checkbox"
                                    variant="outline-dark"
                                    checked={videoFee}
                                    value="1"
                                    size="sm"
                                    onChange={(e) => setVideoFee(e.currentTarget.checked)}
                                >
                                    {videoFee === true ? "Yes" : "No"}
                                </ToggleButton>
                            </td>
                        </tr>
                        {/* <tr>
                            <th className={selectedVideoTech.label !== 'Huddle' ? 'required' : ""}>Video Tech Monthly Fee</th>
                            <td>
                                <InputGroup size="sm"  >
                                    <Form.Control required={selectedVideoTech.label !== 'Huddle'} aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={videoFee}
                                        onChange={(e) => { setVideoFee(e.currentTarget.checked) }} onKeyPress={(e) => NumbersOnly(e)} />
                                </InputGroup>
                            </td>
                        </tr> */}
                        <tr>
                            <th >Comments</th>
                            <td>
                                <InputGroup size="sm"  >
                                    <Form.Control as={'textarea'}
                                        aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={comments} onChange={(e) => { setComments(e.target.value) }} />
                                </InputGroup>
                            </td>
                        </tr>
                        <tr>
                            <th >Tables to show on report</th>
                            <td>
                                <Form.Check type={'checkbox'} id={`duplicateTable`} label={`Duplicate Table`} checked={duplicateTable} onChange={(e) => setDuplicateTable(e.target.checked)} />
                                <Form.Check type={'checkbox'} id={`nonChargeablesTable`} label={`Non-chargeables`} checked={nonChargeablesTable} onChange={(e) => setNonChargeablesTable(e.target.checked)} />
                                <Form.Check type={'checkbox'} id={`associateFeesTable`} label={`Associate Fees Table`} checked={associateFeesTable} onChange={(e) => setAssociateFeesTable(e.target.checked)} />
                            </td>
                        </tr>
                        {adjustmentFee.map((x, index) => {
                            return <tr key={index}>
                                <th>Invoice Adjustment fee</th>
                                <td>
                                    <InputGroup size="sm"  >
                                        <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={x.name} placeholder={'Adjustment Fee'} style={{ marginRight: '5px' }}
                                            onChange={(e) => { updateAdjustmentArr(e.target.value, 'name', index) }} />
                                        <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={x.value}
                                            onChange={(e) => { updateAdjustmentArr(e.target.value, 'vlaue', index) }} onKeyPress={(e) => NumbersOnly(e)} />
                                        <Button style={{ marginLeft: '5px' }} variant="dark" onClick={handleAddClick}>+</Button>
                                    </InputGroup>
                                </td>
                            </tr>
                        })}
                        {adjustmentPaymentFee.map((x, index) => {
                            return <tr key={index}>
                                <th>Payment Adjustment fee</th>
                                <td>
                                    <InputGroup size="sm"  >
                                        <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={x.name} placeholder={'Adjustment Fee'} style={{ marginRight: '5px' }}
                                            onChange={(e) => { updatePaymentAdjustmentArr(e.target.value, 'name', index) }} />
                                        <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={x.value}
                                            onChange={(e) => { updatePaymentAdjustmentArr(e.target.value, 'vlaue', index) }} onKeyPress={(e) => NumbersOnly(e)} />
                                        <Button style={{ marginLeft: '5px' }} variant="dark" onClick={handleAddPaymentClick}>+</Button>
                                    </InputGroup>
                                </td>
                            </tr>
                        })}
                    </thead>
                </Table >
                {<Button variant={'dark'} disabled={worker.status === false} type="submit">{selected === "" ? "Save user" : "Update user"}</Button>}
            </Form>
            <br />
            <br />
            <br />
        </div >

    )
}

export default WorkerProfileTable
