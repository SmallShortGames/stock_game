import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

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
  const formik = useFormik({
    initialValues: {
      loginEmail: "",
      password: "",
    },

    validationSchema: Yup.object({
      loginEmail: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().required(),
    }),

    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <Navbar />
      <Container className="center">
        <Row>
          <Col xs={12}>
            <Card>
              <Card.Header>Login Page</Card.Header>
              <Card.Body>
                <Form onSubmit={formik.handleSubmit} noValidate>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      required
                      id="loginEmail"
                      name="loginEmail"
                      type="email"
                      onChange={formik.handleChange}
                      value={formik.values.loginEmail}
                      onBlur={formik.handleBlur}
                      placeholder="Enter Email"
                    />
                    {formik.touched.loginEmail && formik.errors.loginEmail ? (
                      <div style={{ color: "red" }}>Enter email</div>
                    ) : null}
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      required
                      id="password"
                      name="password"
                      type="string"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      onBlur={formik.handleBlur}
                      placeholder="Enter Password"
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <div style={{ color: "red" }}>Enter password</div>
                    ) : null}
                  </Form.Group>
                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                  </Form.Group>
                  <Form.Group className="mx-auto ml-3">
                    <Button type="submit">Submit</Button>{" "}
                    <Button variant="primary">
                      Forgot Username
                    </Button>{" "}
                    <Button variant="primary">
                      Forgot Password
                    </Button>{" "}
                  </Form.Group>
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
