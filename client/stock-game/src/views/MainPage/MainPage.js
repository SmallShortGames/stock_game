import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import TestChart from "../../components/TestChart.js";
import LoginModal from "../../components/LoginModal.js";
import RegistrationModal from "../../components/RegistrationModal.js";

export default function MainPage() {
  return (
    <>
      <Container>
        <TestChart />
        <Row>
          <Col xs={8}>
            <Card>
              <Card.Header>Sell Card</Card.Header>
              <Card.Body>
                <Tabs defaultActiveKey="number1" id="uncontrolled-tab-example">
                  <Tab eventKey="number1" title="Modals">
                    <Card.Text>Here are some modal buttons!</Card.Text>
                    <Row className="justify-content-center">
                      <Col>
                        <LoginModal />
                      </Col>
                      <Col>
                        <RegistrationModal />
                      </Col>
                      <Col>
                        <Button
                          variant="warning"
                          href="https://react-bootstrap.github.io/getting-started/introduction/"
                          target="_blank"
                        >
                          React B Guide
                        </Button>
                      </Col>
                    </Row>
                  </Tab>
                  <Tab eventKey="number2" title="Pages">
                    <Card.Text>Different pages</Card.Text>
                    <Row className="justify-content-center">
                      <Col>
                        <Link to="test-page">
                          <Button variant="primary">To the Test Page</Button>
                        </Link>
                      </Col>
                      <Col>
                        <Link to="login-page">
                          <Button variant="warning">To the Login Page</Button>
                        </Link>
                      </Col>
                      <Col>
                        <Link to="registration-page">
                          <Button variant="danger">To the Reg Page</Button>
                        </Link>
                      </Col>
                    </Row>
                  </Tab>
                  <Tab eventKey="number3" title="Number 3">
                    <Card.Text>
                      With supporting text below as a natural lead-in to
                      additional content.
                    </Card.Text>
                    <Row className="justify-content-center">
                      <Col>
                        <Button variant="primary">Go somewhere</Button>
                      </Col>
                      <Col>
                        <Button variant="danger">Go somewhere</Button>
                      </Col>
                      <Col>
                        <Button variant="warning">Go somewhere</Button>
                      </Col>
                    </Row>
                  </Tab>
                </Tabs>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={4}>
            <Card>
              <Card.Header>Nav Card</Card.Header>
              <Card.Body>
                <Card.Title>Special title treatment</Card.Title>
                <Card.Text>
                  With supporting text below as a natural lead-in to additional
                  content.
                </Card.Text>
                <Form.Control as="select">
                  <option>Default select</option>
                </Form.Control>
                <br />{" "}
                <Form.Control as="select">
                  <option>Default select</option>
                </Form.Control>
                <br />{" "}
                <Form.Control as="select">
                  <option>Default select</option>
                </Form.Control>
                <br />
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
