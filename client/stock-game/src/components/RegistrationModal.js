import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function RegistrationModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const formik = useFormik({
    initialValues: {
      registrationUsername: "",
      registrationEmail: "",
      password: "",
      passwordConfirmation: "",
    },

    validationSchema: Yup.object({
      registrationUsername: Yup.string()
        .email("Invalid username")
        .required("Required"),
      registrationEmail: Yup.string()
        .email("Invalid email")
        .required("Required"),
      registrationPassword: Yup.string()
        .required()
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        ),
      registrationPasswordConfirm: Yup.string()
        .required()
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    }),

    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

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
          <Form>
            <Form.Group controlId="formRegistrationUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                name="registrationUsername"
                type="text"
                id="registrationUsername"
                placeholder="Enter Username"
                onChange={formik.handleChange}
                value={formik.values.registrationUsername}
                onBlur={formik.handleBlur}
              />
              {formik.touched.registrationUsername &&
              formik.errors.registrationUsername ? (
                <div style={{ color: "red" }}>Enter Username</div>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formRegistrationEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required
                id="registrationEmail"
                name="registrationEmail"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.registrationEmail}
                onBlur={formik.handleBlur}
                placeholder="Enter Email"
              />
              {formik.touched.registrationEmail &&
              formik.errors.registrationEmail ? (
                <div style={{ color: "red" }}>Enter Email</div>
              ) : null}
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formRegistrationPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                id="registrationPassword"
                name="registrationPassword"
                type="string"
                onChange={formik.handleChange}
                value={formik.values.registrationPassword}
                onBlur={formik.handleBlur}
                placeholder="Enter Password"
              />
              {formik.touched.registrationPassword &&
              formik.errors.registrationPassword ? (
                <div style={{ color: "red" }}>Enter password</div>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formRegistrationPasswordConfirm">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                required
                id="registrationPasswordConfirm"
                name="registrationPasswordConfirm"
                type="string"
                onChange={formik.handleChange}
                value={formik.values.registrationPasswordConfirm}
                onBlur={formik.handleBlur}
                placeholder="Confirm Password"
              />
              {formik.touched.registrationPasswordConfirm &&
              formik.errors.registrationPasswordConfirm ? (
                <div style={{ color: "red" }}>Confirm password</div>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox"></Form.Group>
            <Form.Check type="checkbox" label="I am older than 18" />
            <br />
            <Button onClick="/" variant="primary">
              Register
            </Button>{" "}
            <Link to="/">
              <Button variant="primary">Return to Main Page</Button>
            </Link>
          </Form>
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
