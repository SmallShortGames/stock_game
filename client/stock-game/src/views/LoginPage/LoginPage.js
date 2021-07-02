import React, { useState } from 'react'
import { Link } from "react-router-dom";
import API from "../../utils/API"

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

import "./LoginPage.scss";

export default function LoginPage() {
  const [loginState, setLoginState] = useState({
    email: "",
    password: ""
  })

  function handleChange(event) {
    const { name, value } = event.target;
    setLoginState({
      ...loginState,
      [name]: value,
    })
  }

  function handleSubmit(event) {
    event.preventDefault();
    API.userLogin(loginState).then((res) => {
      console.log(res)
    }).catch((err) => {console.error(err)})
  }
  return (
    <>
      <Navbar />
      <Container className="center">
        <Row>
          <Col xs={12}>
            <Card>
              <Card.Header>Login Page</Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onChange={handleChange} name="email" type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label >Password</Form.Label>
                    <Form.Control onChange={handleChange} name="password" type="password" placeholder="Password" />
                  </Form.Group>
                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="I'm older than 18" />
                  </Form.Group>
                  <Button onClick={handleSubmit} variant="primary">Login</Button>
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
