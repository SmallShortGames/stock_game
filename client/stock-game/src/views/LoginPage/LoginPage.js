import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

import Navbar from "../../components/Navbar.js";
import LoginForm from "../../components/LoginForm";

import API from "../../utils/API.js";

// import "./RegistrationPage.scss";

export default function LoginPage() {
  let history = useHistory();
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
              <Card.Header>LoginPage</Card.Header>
              <Card.Body>
                <LoginForm />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
