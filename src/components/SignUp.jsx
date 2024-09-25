import { Col, Row, Button, Form } from "react-bootstrap";
import loginImg from "../assets/login.png";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Signout() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const validateEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const validatePassword = (password) => {
        return /^(?=.*[A-Za-z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }
        if (!validatePassword(password)) {
            setError('Password must be at least 8 characters long and include one letter and one symbol.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        localStorage.setItem('userEmail', email);
        setError('');
        navigate('/login'); 
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    }

    return (
        <div className="loginContainer" style={{ padding: '20px', height: '100vh', display: 'flex', alignItems: 'center' }}>
            <Row className="w-100">
                <Col md={6} lg={6} className="d-flex flex-column align-items-center">
                    <img src={loginImg} alt="Signup" height={520} width={510} />
                    <h1 style={{ color: '#fff', textAlign: 'center' }}>Book Tickets || Earn Points</h1>
                </Col>
                <Col md={6} lg={4} className="d-flex justify-content-center align-items-center"> 
                    <Card style={{ width: '100%', height: '450px', padding: '20px' }}>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        onChange={(e) => setEmail(e.currentTarget.value)}
                                        value={email}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        onChange={(e) => setPassword(e.currentTarget.value)}
                                        value={password}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Confirm Password"
                                        onChange={(e) => setConfirmPassword(e.currentTarget.value)}
                                        value={confirmPassword}
                                    />
                                </Form.Group>
                                {error && <p style={{ color: 'red' }}>{error}</p>}
                                <Button
                                    style={{ width: '100%', backgroundColor: '#F44336', border: 'none', marginBottom: 10 }}
                                    variant="primary"
                                    type="submit"
                                >
                                    Register
                                </Button>
                                <div>
                                    Already a user? || <a onClick={() => navigate('/login')} style={{ cursor: 'pointer', color: '#007bff' }}>Click Here</a>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
