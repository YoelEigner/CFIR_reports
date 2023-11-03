import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import resetadjustmentfee from './../BL/ResetAjustmentFees';

const ResetAdjustmentFeeModal = ({ show, setShow, token, handleResp }) => {
    const handleClose = () => setShow(false);
    const resetAdjustmentFees = async () => {
        let resp = await resetadjustmentfee(token)
        handleResp(resp)
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Reset Adjustment Fees</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to reset <b>ALL</b> adjustment fees?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => resetAdjustmentFees()}>
                        Reset
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ResetAdjustmentFeeModal;