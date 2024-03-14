import React, { useState } from 'react';
import { Container, Row, Form, Button, Alert } from 'react-bootstrap'; // Import Alert for showing errors

const LoginForm = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // Moved the error state inside the component

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await onLogin(email, password);
            // Optionally, you can clear the form here or redirect the user
            // setEmail('');
            // setPassword('');
            // Redirect the user or update the UI to indicate a successful login
        } catch (error) {
            console.error("Login error:", error);
            setError("Failed to log in. Please check your credentials."); // Update UI with this error message
        }
    };

    return (
        <Container className="about-section">
            <Row className="justify-content-center my-4">
                <Form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '320px' }}>
                    {/* Show error message if there is an error */}
                    {error && <Alert variant="danger">{error}</Alert>}
                    
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100">
                        Login
                    </Button>
                </Form>
            </Row>
        </Container>
    );
};

export default LoginForm;