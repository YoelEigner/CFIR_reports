import React, { useEffect, useState } from "react";
import { DatePicker } from "react-rainbow-components";
import { Alert, Button, Col, Form, Row, Table } from 'react-bootstrap'
import { useSelector } from "react-redux";
import GetFile from '../DALs/GetFileByDate';
import TokenRefreshModal from "../Login/TokenRefreshModal";
import Select from 'react-select';
import MainTable from "./Table";
import { NumbersOnly } from "./NumbersOnly";
import GetWorkerProfile from "../BL/GetWorkerProfile";
import LoadingSpinner from "../Loader/Loader";
import Logout from "../Login/Logout";



const Main = () => {
  const [date, setDate] = useState([]);
  const storeData = useSelector(state => state)
  const [open, setOpen] = useState(false)
  const [excahngeRate, setExcahngeRate] = useState(0)
  const [physicians, setPhysicians] = useState([])
  const [selectedUser, setSelectedUser] = useState("")
  const [err, setErr] = useState("")
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setPhysicians(storeData.Physician)
  }, [storeData.Physician])

  useEffect(() => {
    revokeAccess()
  }, [])

  const onChangeDate = (date) => {
    let temp = []
    var endate = new Date(date);
    endate.setDate(endate.getDate() + 14);
    temp.push(date)
    temp.push(endate)
    setDate(temp);
  }
  const style = { width: '50%', marginRight: 'auto', marginLeft: 'auto' }

  const physiciansOptions = () => {
    let arr = []
    physicians.forEach(x => {
      arr.push({ value: x.id, label: x.associateName })
    })
    return arr
  }
  const revokeAccess = () => {
    // setTimeout(() => {
    //   setOpen(true)
    // }, storeData.expiresIn);
  }
  const handleUserChange = (id) => {
    setSelectedUser(id.value)
  }

  const getWorker = async () => {
    try {
      setIsLoading(true)
      let resp = await GetWorkerProfile(selectedUser, storeData.accessToken)
      await GetFile(date[0], date[1], storeData.accessToken, 'singlepdf', resp, 'run', excahngeRate)
      // await GetFile(date[0], date[1], storeData.accessToken, 'bydate', resp[0].associateName.split(" (Active)")[0], 'run', resp[0].associateEmail, resp[0].id, excahngeRate)
      setIsLoading(false)

    } catch (error) {
      setErr(String(error))
      setTimeout(() => {
        setErr("")
      }, 10000);
      setIsLoading(false)

    }
  }

  return (
    <Col style={{paddingTop: '80px' }}>
      {isLoading && <LoadingSpinner />}
      {err !== "" && <Alert key={'danger'} variant={'danger'}>
        {err}
      </Alert>}
      <TokenRefreshModal open={open} setOpen={(close) => setOpen(close)} revokeAccess={() => revokeAccess()} />
      <Row style={{ display: 'inline-flex', justifyContent: 'center', width: 300 }}>
        <DatePicker
          id="EndDate"
          value={date[0]}
          onChange={onChangeDate}
          formatStyle="large"
          placeholder="DD/MM/YYYY"
          selectionType="single"

        />
      </Row>
      <br />
      <br />
      {/* 
      <Form.Check style={{ display: 'inline-table' }} type={'radio'} label={'US'} name="group2" id="radio1" />{" "}
      <Form.Check style={{ display: 'inline-table' }} type={'radio'} label={'CAD'} name="group2" id="radio2" />
      <Table style={style}>
        <thead>
          <tr>
            <td ><Form.Control required={true} aria-label="Small" size="sm" aria-describedby="inputGroup-sizing-sm" onKeyPress={(e) => NumbersOnly(e)} contentEditable={true}
              onChange={(e) => setExcahngeRate(e.target.value)} placeholder="Video fee exchange rate, Ex:0.77" /></td>
          </tr>
        </thead>
      </Table> */}
      <Col>
        <Table style={style}>
          <tbody>
            {storeData.paymentTypes.map((x, index) => {
              return (
                <tr key={index}>
                  <th>{x.name}</th>
                  <td>{x.ammount}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>

        <div style={{ borderWidth: '1px', borderStyle: 'solid', paddingTop: '9px', paddingLeft: '5px', paddingRight: '5px' }}>
          <Select
            styles={{ paddingBottem: '5px' }}
            className=""
            classNamePrefix="select"
            isSearchable={true}
            name="color"
            options={physiciansOptions()}
            placeholder="Please select"
            onChange={(e) => handleUserChange((e))}
          />
          <div style={{ paddingTop: '9px' }} ></div>
          {<Button style={{ marginBottom: '9px' }} disabled={date.length === 0 || selectedUser === ""} variant="secondary" onClick={() => getWorker()}>{"Run single user report"}</Button>}

        </div>


        <br />
        <MainTable date={date} loading={(e) => setIsLoading(e)} rate={excahngeRate} />
      </Col>
    </Col >
  )
}
export default Main