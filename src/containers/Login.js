import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { Auth } from "aws-amplify";
import "./Login.css";
import { useAppContext } from "../libs/contextLib";
import { useFormFields } from "../libs/hooksLib";
import { onError } from "../libs/errorLib";
import { LinkContainer } from "react-router-bootstrap";

export default function Login() {
  const { userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
  });

  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      await Auth.signIn(fields.email, fields.password);
      userHasAuthenticated(true);
      setError(null);
    } catch (e) {
      onError(e);

      setError(e.message);
      setIsLoading(false);
    }
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        {error && <Alert variant="danger">{error}</Alert>}
        <h1>Login to your Account</h1>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control autoFocus type="email" value={fields.email} onChange={handleFieldChange}></Form.Control>
        </Form.Group>

        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control autoFocus type="password" value={fields.password} onChange={handleFieldChange}></Form.Control>
        </Form.Group>
        <Form.Group>
          <LinkContainer to="/forgot-password">
            <div>
              Forgot Password? <a href="/forgot-password">Reset Password</a>
            </div>
          </LinkContainer>
        </Form.Group>
        <Form.Group>
          <LinkContainer to="/signup">
            <div>
              New User? <a href="/signup">Create Account</a>
            </div>
          </LinkContainer>
        </Form.Group>
        <LoaderButton block size="lg" type="submit" isLoading={isLoading} disabled={!validateForm()}>
          Login
        </LoaderButton>
      </Form>
    </div>
  );
}
