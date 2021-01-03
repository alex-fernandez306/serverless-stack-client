import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useFormFields } from "../libs/hooksLib";
import LoaderButton from "./LoaderButton";

const ForgotPasswordForm = ({ isLoading = false, handleSubmit }) => {
  const [fields, handleFieldChange] = useFormFields({
    email: "",
  });

  const isValidForm = () => {
    return fields.email.length > 0;
  };

  const handleSubmitClick = (event) => {
    event.preventDefault();
    handleSubmit(fields.email);
  };

  const renderInitalResetForm = () => {
    return (
      <div className="ForgotPasswordForm">
        <Form className="BillingForm" onSubmit={handleSubmitClick}>
          <h2>Enter your email</h2>
          <Form.Group size="lg" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control value={fields.email} onChange={handleFieldChange} placeholder="Email Address" />
            
          </Form.Group>
          <Form.Group>
            <LoaderButton
              block
              size="lg"
              type="submit"
              variant="success"
              isLoading={isLoading}
              disabled={!isValidForm()}
            >
              Reset Password
            </LoaderButton>
          </Form.Group>
        </Form>
      </div>
    );
  };

  return renderInitalResetForm();
};

export default ForgotPasswordForm;
