import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Form, Row, Table } from 'react-bootstrap'
import { useSelector } from "react-redux";
import GetFile from '../DALs/GetFileByDate';
import Select from 'react-select';
import MainTable from "./Table";
import { NumbersOnly } from "./NumbersOnly";
import GetWorkerProfile from "../BL/GetWorkerProfile";
import LoadingSpinner from "../Loader/Loader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Cookies from 'universal-cookie';
import moment from "moment";



const Main = () => {
  const [date, setDate] = useState([new Date()]);
  const storeData = useSelector(state => state)
  const [videoFee, setVideoFee] = useState(0)
  const [physicians, setPhysicians] = useState([])
  const [selectedUser, setSelectedUser] = useState("")
  const [err, setErr] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  const [addEndDate, setAddEndDate] = useState(false)
  const [endDate, setEndDate] = useState('')
  const numberFormat = Intl.NumberFormat()
  const cookies = new Cookies();


  useEffect(() => {
    setPhysicians(storeData.Physician)
  }, [storeData.Physician])


  const onStartDateChange = (startDate) => {
    cookies.set('startDate', startDate, { maxAge: 2629800000 });
    var temp = []
    var endateTemp = new Date(startDate);
    endateTemp.setDate(endateTemp.getDate() + 13);
    setEndDate(endateTemp)
    temp.push(startDate)
    temp.push(endateTemp)
    setDate(temp);
  }

  useEffect(() => {
    if (addEndDate === false) {
      let cookieStartDate = new Date(cookies.get('startDate'))
      if (!moment(cookieStartDate).isValid()) {
        cookieStartDate = new Date()
      }
      date[0] !== undefined && onStartDateChange(cookieStartDate)
    }
  }, [addEndDate])

  useEffect(() => { console.log(cookies.get('startDate')); }, [])

  const onEndDateChange = (endDate) => {
    var temp = date
    temp.splice(1, 1)
    temp.push(endDate)
    setDate(temp);
    setEndDate(endDate)
  }
  const style = { width: '50%', marginRight: 'auto', marginLeft: 'auto' }

  const physiciansOptions = () => {
    let arr = []
    physicians.forEach(x => {
      arr.push({ value: x.id, label: x.associateName })
    })
    return arr
  }

  const handleUserChange = (id) => {
    setSelectedUser(id.value)
  }

  const getWorker = async () => {
    try {
      if (isNaN(numberFormat.format(videoFee))) {
        setErr('Please enter a video fee amount')
        setTimeout(() => {
          setErr("")
        }, 5000);
      }
      else {
        setIsLoading(true)
        let resp = await GetWorkerProfile(selectedUser, storeData.accessToken)
        await GetFile(date[0], date[1], storeData.accessToken, 'singlepdf', resp, 'run', videoFee, 'payment')
        await GetFile(date[0], date[1], storeData.accessToken, 'singlepdf', resp, 'run', videoFee, 'invoice')
        setIsLoading(false)

      }

    } catch (error) {
      setErr(String(error))
      setTimeout(() => {
        setErr("")
      }, 10000);
      setIsLoading(false)

    }
  }

  return (
    <Col style={{ paddingTop: '80px' }}>
      {isLoading && <LoadingSpinner />}
      {err !== "" && <Alert key={'danger'} variant={'danger'}>
        {err}
      </Alert>}
      <Row style={{ display: 'inline-flex', justifyContent: 'center', width: 300 }}>
        <DatePicker selected={date[0]} onChange={(date) => onStartDateChange(date)} />
        <br />
        <br />
        {addEndDate && <DatePicker selected={endDate} onChange={(date) => onEndDateChange(date)} />}
      </Row>
      <br />
      {date[0] && <Form.Check style={{ display: 'inline-table' }} type={'checkbox'} label={'Change End Date?'} onChange={(e) => setAddEndDate(e.target.checked)} name="group2" id="radio1" />}

      <br />
      <Col>
        <Table >
          <tbody>
            {storeData.paymentTypes.map((x, index) => {
              return (
                <tr key={index}>
                  <th>{x.name}</th>
                  <td>{x.percentage}</td>
                  <td>{x.ammount}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
        <Table style={style}>
          <thead>
            <tr>
              <td ><Form.Control required={true} aria-label="Small" size="sm" aria-describedby="inputGroup-sizing-sm" onKeyPress={(e) => NumbersOnly(e)} contentEditable={true}
                onChange={(e) => setVideoFee(e.target.value)} placeholder="Video fee (For All Users)" /></td>
            </tr>
          </thead>
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
        <MainTable date={date} loading={(e) => setIsLoading(e)} videoFee={videoFee} />
      </Col>
    </Col >
  )
}
export default Main