import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

import RegistrationForm from "../../components/Forms/registrationForm";

import "./RegistrationPage.scss";

export default function RegistrationPage() {
  return (
    <>
      <Container className="center">
        <Row className="w-75">
          <Col>
            <Card>
              <Card.Header>Registration Page</Card.Header>
              <Card.Body>
                <RegistrationForm />
                <p>
                  Already have an account? <Link to="/login">Log in!</Link>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
