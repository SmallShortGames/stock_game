import React from "react";

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
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
