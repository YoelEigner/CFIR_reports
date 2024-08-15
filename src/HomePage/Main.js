import React, { useCallback, useEffect, useState } from "react";
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
import { useDispatch } from "react-redux";
import { validateVideoFee } from "../utils/utils";

const Main = () => {
  const [date, setDate] = useState([new Date()]);
  const physician = useSelector(state => state.Physician)
  const expiresAt = useSelector(state => state.expiresAt)
  const accessToken = useSelector(state => state.accessToken)
  const paymentTypes = useSelector(state => state.paymentTypes)
  const [videoFee, setVideoFee] = useState(null)
  const dispatch = useDispatch()
  const [physicians, setPhysicians] = useState([])
  const [selectedUser, setSelectedUser] = useState("")
  const [err, setErr] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  const [addEndDate, setAddEndDate] = useState(false)
  const [endDate, setEndDate] = useState('')
  const cookies = new Cookies();
  const [InvalidateCache, setInvalidateCache] = useState(false)


  useEffect(() => {
    setPhysicians(physician)
  }, [physician])

  const onStartDateChange = useCallback((startDate) => {
    cookies.set('startDate', startDate, { maxAge: 2629800000 });
    var temp = []
    var endateTemp = new Date(startDate);
    endateTemp.setDate(endateTemp.getDate() + 13);
    setEndDate(endateTemp)
    temp.push(startDate)
    temp.push(endateTemp)
    setDate(temp);
  }, [cookies]);

  function areDatesEqual(date1, date2) {
    return date1.getTime() === date2.getTime();
  }

  useEffect(() => {
    if (addEndDate === false) {
      let cookieStartDate = new Date(cookies.get('startDate'));
      if (!moment(cookieStartDate).isValid()) {
        cookieStartDate = new Date();
      }

      // Check if the date has actually changed before calling onStartDateChange
      if (date[0] !== undefined && !areDatesEqual(cookieStartDate, date[0])) {
        onStartDateChange(cookieStartDate);
      }
    }
  }, [addEndDate, cookies, date, onStartDateChange]);


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

  useEffect(() => {
    const now = new Date()
    const tokenExpiration = new Date(expiresAt);
    if (now > tokenExpiration) {
      dispatch({ type: "AUTHENTICATED", payload: false })
    }
  }, [expiresAt, dispatch])

  const getWorker = async () => {
    try {
      if (validateVideoFee(videoFee) !== null) {
        setErr('Please enter a video fee amount')
        setTimeout(() => {
          setErr("")
        }, 5000);
      }
      else {
        setIsLoading(true)
        let resp = await GetWorkerProfile(selectedUser, accessToken, InvalidateCache)
        await GetFile(date[0], date[1], accessToken, 'singlepdf', resp, 'run', videoFee, 'payment', InvalidateCache)
        await GetFile(date[0], date[1], accessToken, 'singlepdf', resp, 'run', videoFee, 'invoice', InvalidateCache)
        setIsLoading(false)

      }

    } catch (error) {
      if (error?.response?.status === 403) dispatch({ type: "AUTHENTICATED", payload: false })
      setErr(String(error))
      setTimeout(() => {
        setErr("")
      }, 10000);
      setIsLoading(false)
    }
  }

  const handleVideoFeeChange = (e) => {
    const expirationTime = 12 * 60 * 60 * 1000;
    const expirationDate = new Date(Date.now() + expirationTime);
    cookies.set('viedoFee', e, { expires: expirationDate });
    setVideoFee(e);
  }

  useEffect(() => {
    setVideoFee(cookies.get('viedoFee'))
  }, [cookies])
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
            {paymentTypes.map((x, index) => {
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
              <td >
                <Form.Control required={true} aria-label="Small" size="sm" aria-describedby="inputGroup-sizing-sm" onKeyPress={(e) => NumbersOnly(e)} contentEditable={true}
                  onChange={(e) => handleVideoFeeChange(e.target.value)} defaultValue={videoFee} placeholder="Video fee (For All Users)" />
              </td>
            </tr>
            <tr>
              <td >
                <Form.Check style={{ display: 'inline-table' }}
                  type={'checkbox'} label={'Load Latest Information'}
                  onChange={(e) => setInvalidateCache(e.target.checked)} name="group3" id="radio2" />
              </td>
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

        <MainTable date={date} loading={(e) => setIsLoading(e)} isLoading={isLoading} videoFee={videoFee} InvalidateCache={InvalidateCache} />
      </Col>
    </Col >
  )
}
export default Main