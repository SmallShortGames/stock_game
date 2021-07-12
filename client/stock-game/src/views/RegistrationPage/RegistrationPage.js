import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import Navbar from "../../components/Navbar.js";
import RegistrationForm from "../../components/RegistrationForm.js";
import { useAuth } from "../../services/userContext";
import API from "../../utils/API.js";

import "./RegistrationPage.scss";

export default function RegistrationPage() {

  let history = useHistory();
  const { setAuthTokens } = useAuth();
  const [registrationState, setRegistrationState] = useState({
    username: "",
    email: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setRegistrationState({
      ...registrationState,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    API.userRegister(registrationState)
      .then((res) => {
        if (res.status === 201) {
          setRegistrationState({
            username: "",
            email: "",
            password: "",
          });
          console.log(res);
          // setAuthTokens(res.data);
          history.push("/");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
  return (
    <>
      <Navbar />
      <Container className="center">
        <Row className="w-75">
          <Col>
            <Card>
              <Card.Header>Registration Page</Card.Header>
              <Card.Body>

              <RegistrationForm />

                {/* <Form>
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
                  <Button onClick={handleSubmit} variant="primary">
                    Register
                  </Button>{" "}
                  <Link to="/">
                    <Button variant="primary">Return to Main Page</Button>
                  </Link>
                </Form> */}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
