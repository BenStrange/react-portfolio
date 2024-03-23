import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import emailjs from "emailjs-com";

function Contact() {
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.EMAIL_SERVICE_ID,
        process.env.EMAIL_TEMPLATE_ID,
        e.target,
        process.env.EMAIL_USER_ID
      )
      .then(
        (result) => {
          console.log(result.text);
          setFormData({ user_name: "", user_email: "", message: "" });
          setShowConfirmation(true);
          setTimeout(() => setShowConfirmation(false), 5000);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <Container fluid>
      <Row className="justify-content-center align-items-center">
        <Col md={6}>
          <h2>Please feel free to contact me!</h2>
          <Form onSubmit={sendEmail}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="user_email"
                placeholder="Enter email"
                value={formData.user_email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="user_name"
                placeholder="Name"
                value={formData.user_name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="message"
                placeholder="Your message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          {showConfirmation && (
            <Alert variant="success" className="mt-3">
              Your message has been sent successfully!
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Contact;
