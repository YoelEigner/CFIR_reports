import React, { useEffect, useState } from "react";
import { Form, Button, ButtonGroup, Table, Alert } from "react-bootstrap";
import { useSelector } from 'react-redux';
import Select from 'react-select';
import GetAssociateTypes from "../BL/GetAssociateTypes";
import GetFile from "../DALs/GetFileByDate";
import EmailConfirmationModal from "../ResetAdjustmentFeeModal/EmailConfirmationModal";

const MainTable = ({ date, loading, videoFee }) => {
    const storeData = useSelector(state => state)
    const [provence, setProvence] = useState([])
    const [selected, setSelected] = useState("")
    const [chbx, setChbx] = useState([])
    const [errMsg, setErrMsg] = useState("")
    const [varient, setVarient] = useState('danger')
    const [showHide, setShowHide] = useState(false)
    const [reportType, setReportType] = useState('')

    let lines = [1]
    // let chbxValue = []
    useEffect(() => { setSelected('') }, [])

    useEffect(() => {
        setProvence(storeData.provence)
    }, [storeData.provence])

    const optionsArr = [
        { value: 'associateType', label: "Run all reports for all therapists" },
        { value: 'supervisers', label: "Run reports for Supervisors only" },
        { value: 'L1', label: "Run reports for L1 only" },
        { value: 'L2', label: "Run reports for L2 only" },
        { value: 'L3', label: "Run reports for L3 only" },
        { value: 'L4', label: "Run reports for L4 only" },
    ]
    const updateChbxValue = (row, name, checked) => {
        let temp = chbx
        let index = temp.findIndex(x => x.row === row && x.name === name)
        if (index !== -1) { temp.splice(index, 1) }
        temp.push({ row, name, checked })
        setChbx(temp)
    }

    const handleChange = (e) => {
        setSelected(e)
    }


    const handleEmailClick = (type) => {
        if (chbx.filter(x => x.checked === true).length === 0) {
            setErrMsg('Please select one or more sites')
            setVarient('danger')
        }
        else {
            setReportType(type)
            setShowHide(true)
            setErrMsg("")
        }
    }

    const runReport = (type, action) => {
        if (chbx.filter(x => x.checked === true).length === 0) {
            setErrMsg('Please select one or more sites')
            setVarient('danger')
        }
        else {
            setErrMsg("")
            getFiles(action, type)
        }
    }

    const isDisabled = date.length === 0 || selected === ''

    const getFiles = async (action, type) => {
        // let activeWorkers = []
        try {
            loading(true)

            //******Filter Active Workers & select only superviser/supervisees */
            let activeWorkers = []
            let workersTemp = await GetAssociateTypes(storeData.accessToken, selected.value, chbx)
            workersTemp.length === 0 && setErrMsg("No user found in this catagory, please select another option!")
            workersTemp.length === 0 && setVarient('danger')
            if (selected.value === 'superviser') {
                activeWorkers = workersTemp
                    .filter(x => x.status === true)
                    .filter(x => x.isSuperviser === true || x.isSupervised === true)
            }
            else {
                activeWorkers = workersTemp.filter(x => x.status === true)
            }
            // let activeWorkers = workersTemp.filter(x => x.status === true)
            //**************Filter by city *******************/

            let activeChbxValue = chbx.filter(x => x.checked === true).map(x => x.name)
            let filterSites = activeWorkers.filter(x => activeChbxValue.includes(x.site))
            if (filterSites.length === 0) {
                setErrMsg(`No users found in ${activeChbxValue[0]}, please select another city!`)
                setVarient('danger')
            }
            else {
                let resp = await GetFile(date[0], date[1], storeData.accessToken, 'multipdf', filterSites, action, videoFee, type)
                if (resp.status === 200) {
                    setVarient('success')
                    if (action === 'email') {
                        setErrMsg('Emails sent!')
                    }
                    else {
                        setErrMsg('Download compleate!')
                    }
                    setTimeout(() => {
                        setErrMsg("")
                    }, 300000);
                }
            }
            loading(false)
        } catch (error) {
            console.log(error,'ddddddd')
            setErrMsg(String(error))
            setVarient('danger')
            // setTimeout(() => {
            //     setErrMsg("")

            // }, 10000);
            loading(false)
        }
    }

    const tbodyTemplate = (x, index) =>
        <tr key={index}>
            {provence.map((prov, indexKey) => {
                return <td key={indexKey}><Form.Check type={'checkbox'} onChange={(e) => updateChbxValue(x, prov.name, e.target.checked)} id={x} /></td>
            })}
            <td >
                <ButtonGroup size="sm">
                    <Button disabled={isDisabled} variant="secondary" onClick={() => runReport('invoice', 'run')}>Invoice</Button>
                    <Button disabled={isDisabled} variant="secondary" onClick={() => runReport('payment', 'run')}>Payment</Button>
                    {/* <Button disabled={isDisabled} variant="secondary" onClick={() => runReport('both', 'run')}>Both</Button> */}
                    {/* <Button disabled={isDisabled} variant="secondary" onClick={() => runReport('save', 'save')}>Save</Button> */}
                </ButtonGroup>
            </td>
            <td >
                <ButtonGroup size="sm">
                    <Button disabled={isDisabled} variant="secondary" onClick={() => handleEmailClick('invoice')}>Invoice</Button>
                    <Button disabled={isDisabled} variant="secondary" onClick={() => handleEmailClick('payment')}>Payment</Button>
                    {/* <Button disabled={isDisabled} variant="secondary" onClick={() => runReport('both', 'email')}>Both</Button> */}
                </ButtonGroup>
            </td>
        </tr>

    return (
        <div>
            {showHide && <EmailConfirmationModal show={showHide} setShow={(e) => { setShowHide(e) }} reportType={reportType} sendEmails={(type) => { runReport(type, 'email') }} />}
            {errMsg !== "" && <Alert key={1} variant={varient}>
                {errMsg}
            </Alert>}
            <Select
                className="basic-single"
                classNamePrefix="select"
                isSearchable={true}
                name="color"
                options={optionsArr}
                placeholder="Please select"
                onChange={(e) => handleChange((e))}
            />
            <br />
            <Table>
                <thead>
                    <tr className="same-col-widths">
                        {provence.map((province, index) => { return <th key={index}>{province.name}</th> })}
                        <th>Run</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>

                    {lines.map((x, index) => { return tbodyTemplate(x, index) })}
                </tbody>
            </Table>
        </div>
    )
}


export default MainTable