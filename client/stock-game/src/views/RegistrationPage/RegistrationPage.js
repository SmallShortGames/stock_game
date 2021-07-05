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
import LoginModal from "../../components/LoginModal.js";
import RegistrationModal from "../../components/RegistrationModal.js";
import { AuthContext } from "../../App";
import "./RegistrationPage.scss";
import API from "../../utils/API.js";

const initialState = {
  username: "",
  email: "",
  password: "",
  isSubmitting: false,
  errorMessage: null,
};

export default function RegistrationPage() {
  const { dispatch } = React.useContext(AuthContext);

  const [registrationState, setRegistrationState] = useState(initialState);

  function handleChange(event) {
    const { name, value } = event.target;
    setRegistrationState({
      ...registrationState,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setRegistrationState({
      ...registrationState,
      isSubmitting: true,
      errorMessage: null,
    });
    API.userRegister(registrationState)
      .then((result) => {
        if (result.statusText === "CREATED") {
          dispatch({ type: "LOGIN", payload: result.data });
        }
        throw result;
      })
      .catch((error) => {
        setRegistrationState({
          ...registrationState,
          isSubmitting: false,
          errorMessage: error.message || error.statusText,
        });
      });
  }
  return (
    <>
      <Navbar />
      <Container className="center">
        <Row>
          <Col xs={12}>
            <Card>
              <Card.Header>Registration Page</Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group controlId="formRegistrationUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      onChange={handleChange}
                      name="username"
                      type="email"
                      placeholder="Enter username"
                    />
                  </Form.Group>
                  <Form.Group controlId="formRegistrationEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      onChange={handleChange}
                      name="email"
                      type="email"
                      placeholder="Enter email"
                    />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>
                  <Form.Group controlId="formRegistrationPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      onChange={handleChange}
                      name="password"
                      type="password"
                      placeholder="Password"
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicCheckbox"></Form.Group>
                  <Form.Group controlId="formRegistrationPasswordConfirm">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                  </Form.Group>
                  <Form.Group controlId="formBasicCheckbox"></Form.Group>
                  <Form.Check type="checkbox" label="I am older than 18" />
                  <br />
                  <Button onClick={handleSubmit} variant="primary">
                    Register
                  </Button>
                </Form>
                <br />
                <br />
                <Link to="/">
                  <Button variant="primary">Return to Main Page</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
