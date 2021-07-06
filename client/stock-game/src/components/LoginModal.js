import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function LoginModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const formik = useFormik({
    initialValues: {
      loginEmail: "",
      password: "",
    },

    validationSchema: Yup.object({
      loginEmail: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().required(),
    }),

    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Login Modal
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit} noValidate>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required
                id="loginEmail"
                name="loginEmail"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.loginEmail}
                onBlur={formik.handleBlur}
                placeholder="Enter Email"
              />
              {formik.touched.loginEmail && formik.errors.loginEmail ? (
                <div style={{ color: "red" }}>Enter email</div>
              ) : null}
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                id="password"
                name="password"
                type="string"
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
                placeholder="Enter Password"
              />
              {formik.touched.password && formik.errors.password ? (
                <div style={{ color: "red" }}>Enter password</div>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Form.Group className="mx-auto ml-3">
              <Button type="submit">Submit</Button>{" "}
              <Button variant="primary" onClick={handleClose}>
                Forgot Username
              </Button>{" "}
              <Button variant="primary" onClick={handleClose}>
                Forgot Password
              </Button>{" "}
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
