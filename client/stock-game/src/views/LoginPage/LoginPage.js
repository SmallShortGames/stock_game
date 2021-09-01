import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

import Navbar from "../../components/Navbar/";
import LoginForm from "../../components/LoginForm";

export default function LoginPage() {
  return (
    <>
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
