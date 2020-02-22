import React from 'react';
import { Modal, Button } from "react-bootstrap";

const CustomModal = props =>(
    <Modal show={props.show} onHide={props.handleClose}>
    <Modal.Body>{props.modalBody}</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={props.handleClose}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
);

export default CustomModal;
