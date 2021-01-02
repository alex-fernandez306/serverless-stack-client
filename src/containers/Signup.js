import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import { useAppContext } from "../libs/contextLib";
import { useFormFields } from "../libs/hooksLib";
import { onError } from "../libs/errorLib";
import { Auth } from "aws-amplify";
import "./Signup.css";

const Signup = () => {
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
    confirmPassword: "",
    confirmationCode: "",
  });

  const history = useHistory();
  const [newUser, setNewUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { userHasAuthenticated } = useAppContext();
  const [error, setError] = useState(null);

  const validateForm = () => {
    return fields.email.length > 0 && fields.password.length > 0 && fields.password === fields.confirmPassword;
  };

  const validateConfirmationForm = () => {
    return fields.confirmationCode.length > 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const newUser = await Auth.signUp({
        username: fields.email,
        password: fields.password,
      });
      setNewUser(newUser);
      
    } catch (e) {
      onError(e);
      setError(e.message);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  const handleConfirmationSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await Auth.confirmSignUp(fields.email, fields.confirmationCode);
      await Auth.signIn(fields.email, fields.password);
      userHasAuthenticated(true);
      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  };
  const renderConfirmationForm = () => {
    return (
      <Form onSubmit={handleConfirmationSubmit}>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form.Group controlId="confirmationCode" size="lg">
          <Form.Label>Confirmation Code</Form.Label>
          <Form.Control autoFocus type="tel" onChange={handleFieldChange} value={fields.confirmationCode} />
          <Form.Text muted>Please check your email for the code.</Form.Text>
        </Form.Group>
        <LoaderButton
          block
          size="lg"
          type="submit"
          variant="success"
          isLoading={isLoading}
          disabled={!validateConfirmationForm()}
        >
          Verify
        </LoaderButton>
      </Form>
    );
  };

  const renderForm = () => {
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email" size="lg">
          <Form.Label>Email</Form.Label>
          <Form.Control autoFocus type="email" value={fields.email} onChange={handleFieldChange} />
        </Form.Group>
        <Form.Group controlId="password" size="lg">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={fields.password} onChange={handleFieldChange} />
        </Form.Group>
        <Form.Group controlId="confirmPassword" size="lg">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" onChange={handleFieldChange} value={fields.confirmPassword} />
        </Form.Group>
        <LoaderButton block size="lg" type="submit" variant="success" isLoading={isLoading} disabled={!validateForm()}>
          Signup
        </LoaderButton>
      </Form>
    );
  };

  return <div className="Signup">{newUser === null ? renderForm() : renderConfirmationForm()}</div>;
};

export default Signup;
