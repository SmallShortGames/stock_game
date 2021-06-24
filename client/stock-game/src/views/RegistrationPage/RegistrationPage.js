import { Link } from "react-router-dom";

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

import "./RegistrationPage.scss";

export default function RegistrationPage() {
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
                    <Form.Control type="email" placeholder="Enter username" />
                  </Form.Group>
                  <Form.Group controlId="formRegistrationEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>
                  <Form.Group controlId="formRegistrationPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                  </Form.Group>
                  <Form.Group controlId="formBasicCheckbox"></Form.Group>
                  <Form.Group controlId="formRegistrationPasswordConfirm">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                  </Form.Group>
                  <Form.Group controlId="formBasicCheckbox"></Form.Group>
                  <Form.Check type="checkbox" label="I am older than 18" />
                  <br />
                  <Button variant="primary">Register</Button>
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
