import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import Navbar from "../../components/Navbar/index.jsx";
import RegistrationForm from "../../components/RegistrationForm.js";

import "./TestPage.scss";

export default function TestPage() {
  return (
    <>
      <Navbar />
      <Container>
        <Row>
          <Col xs={12}>
            <Card>
              <Card.Header>Test Bed</Card.Header>
              <Card.Body>
                <h2>Patrick's Stuff to Sort Out</h2>
                <ul>
                  <li>
                    gotta remember to ask back end how to run... the back end,
                    essentially
                  </li>
                  <li>
                    Figure out how to stop the dev environment from crashing
                    when the login/registration boxes are empty
                  </li>
                </ul>
              </Card.Body>
            </Card>
            <Card>
              <Card.Header>Test Bed</Card.Header>
              <Card.Body>
                <Link to="/">
                  <Button variant="primary">Return to Main Page</Button>
                </Link>
              </Card.Body>
            </Card>
            <Card>
              <Card.Header>Schema Test Page</Card.Header>
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
