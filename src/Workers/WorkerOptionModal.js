import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import GetServiceTypes from '../BL/GetServiceTypes';

const WorkerOptionModal = ({ open, setOpen, header, accessToken, id, setCovrage1, setCovrage2, covrage1, covrage2, superviser2 }) => {
    const handleClose = () => {
        setOpen(false)
    };
    const [options, setOptions] = useState([])
    const [selectedOptions, setSelectedOptions] = useState([])

    const getServiceTypes = async () => {
        let resp = await GetServiceTypes(accessToken)
        setOptions(resp)
    }

    useEffect(() => {
        getServiceTypes()
    }, [])

    useEffect(() => {
        if (header === 'Supervisor One Covrage') { setSelectedOptions(tryParse(covrage1)) }
        else if (header === 'Supervisor Two Covrage') { setSelectedOptions(tryParse(covrage2)) }
        open === false && setSelectedOptions([])
        open === false && getServiceTypes()
    }, [open]);


    const handleChange = (option, isChecked) => {
        let temp = selectedOptions

        if (isChecked === true) {
            temp.push(option.id)
        }
        else if (isChecked === false) {
            let index = temp.findIndex(x => x === option.id)
            temp.splice(index, 1)
        }
        setSelectedOptions(temp)

        if (header === 'Supervisor One Covrage') { setCovrage1(temp) }
        if (header === 'Supervisor Two Covrage') { setCovrage2(temp) }
        else { return [] }
    }


    const tryParse = (arr) => {
        try {
            if (arr === '') {
                return []
            }
            return JSON.parse(arr)
        } catch (error) {
            return arr
        }
    }

    const checkBox = (x) => {
        if (superviser2.label === "Select Second Superviser") {
            return true
        }
        else {
            return selectedOptions.find(item => item === x.id)
        }

    }

    const disableCheckBox = (x) => {
        try {
            if (superviser2.label === 'Select Second Superviser') { return true }
            if (header === 'Supervisor One Covrage') { return tryParse(covrage2).find(i => x.id === i) === undefined ? false : true }
            if (header === 'Supervisor Two Covrage') { return tryParse(covrage1).find(i => x.id === i) === undefined ? false : true }
        } catch (error) {

        }

    }

    return (
        <>
            <Modal show={open} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{header}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {options && options.map((x) => {
                        return (
                            <Form.Check key={x.id} type={'checkbox'} disabled={disableCheckBox(x)} label={x.name} id={x.id} defaultChecked={checkBox(x)}
                                name="groupOptions" onClick={(e) => handleChange({ id: x.id, value: x.name }, e.target.checked)} />
                        )
                    })}
                </Modal.Body>
            </Modal>
        </>
    );
}

export default WorkerOptionModal