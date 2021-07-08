import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import Navbar from "../../components/Navbar.js";
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
                    Figure out how to make useFormik use proper error reports
                    when user's dont populate the form items like we want them
                    to
                  </li>
                  <li>
                    I should probably make completely separate components for
                    the forms for each of the login and registration cards to
                    use so I dont have to keep bouncing between each form
                  </li>
                  <li>
                    Also remember to ask back end how to run... the back end,
                    essentially
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
