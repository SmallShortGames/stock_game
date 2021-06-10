import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import Navbar from "../../components/Navbar.js";
import TestChart from "../../components/TestChart.js";
import LoginModal from "../../components/LoginModal.js";
import RegistrationModal from "../../components/RegistrationModal.js"

export default function MainPage() {
  return (
    <>
      <Navbar />
      <Container>
        <TestChart />
        <Row>
          <Col xs={8}>
            <Card>
              <Card.Header>Sell Card</Card.Header>
              <Card.Body>
                <Tabs defaultActiveKey="number1" id="uncontrolled-tab-example">
                  <Tab eventKey="number1" title="Number 1">
                  <Card.Text>
                      Here are some buttons!
                    </Card.Text>
                    <Row className="justify-content-center">
                      <Col>
                        <LoginModal />
                      </Col>
                      <Col>
                        <RegistrationModal />
                      </Col>
                      <Col>
                        <Button variant="warning" href="https://react-bootstrap.github.io/getting-started/introduction/" target="_blank">React B Guide</Button>
                      </Col>
                    </Row>
                  </Tab>
                  <Tab eventKey="number2" title="Number 2">
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
