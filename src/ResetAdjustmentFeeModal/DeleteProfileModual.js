import React from 'react';
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteWorkerProfile from '../BL/DeleteWorkerProfile';

const DeleteProfileModual = ({ show, setShow, token, handleResp, worker, id }) => {
    const handleClose = () => setShow(false);
    const deleteProfile = async () => {
        let resp = await DeleteWorkerProfile(token, id)
        handleResp(resp)
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{`${worker.associateName}`}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{`Are you sure you want to delete ${worker.associateType} ${worker.associateName}?`}</Modal.Body>
                <Modal.Body>{`Start Date: ${moment(worker.startDate).format('DD/MM/YYYY')}\nEnd Date: ${moment(worker.endDate).format('DD/MM/YYYY')}`}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => deleteProfile()}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default DeleteProfileModual;