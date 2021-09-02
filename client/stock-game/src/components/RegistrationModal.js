import React, { useState } from "react";

import Modal from "react-bootstrap/Modal";

import Button from "react-bootstrap/esm/Button";

import RegistrationForm from "./RegistrationForm.js";

export default function RegistrationModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Registration Modal
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Register Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RegistrationForm />
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button variant="primary" onClick={handleClose}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
