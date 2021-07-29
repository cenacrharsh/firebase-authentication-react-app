import React, { useRef, useState } from "react";

/* BOOTSTRAP */
import { Form, Button, Card, Alert } from "react-bootstrap";

/* IMPORTING CUSTOM HOOK - CONTEXT */
import { useAuth } from "../contexts/AuthContext";

/* REACT ROUTER */
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const emailRef = useRef();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const { resetPassword } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password!");
    }

    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Password Reset</h2>

          {error && <Alert variant="danger">{error}</Alert>}

          {message && <Alert variant="success">{message}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>

            <Button disabled={loading} className="w-100 mt-2" type="submit">
              Reset Password
            </Button>
          </Form>
          <div className="text-center w-100 mt-3">
            <Link to="/login">Log In</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="text-center w-100 mt-2">
        Need an account?
        <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
}
