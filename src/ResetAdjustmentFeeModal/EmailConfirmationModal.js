import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const EmailConfirmationModal = ({ show, setShow, reportType, sendEmails }) => {
    const handleClose = () => setShow(false);
    const handleSend = () => {
        sendEmails(reportType)
        setShow(false)
    }

    return (
        <>
            <Modal  show={show} onHide={handleClose} centered={true}>
                <Modal.Header closeButton>
                    <Modal.Title>{`Send Emails (${reportType.replace(/^./, reportType[0].toUpperCase())})`}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to send emails to <b>ALL</b> users?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => handleSend()}>
                        Send
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    );
}
export default EmailConfirmationModal;