import React from "react";
import { Form, Button } from "react-bootstrap";
import { useFormFields } from "../libs/hooksLib";
import LoaderButton from "./LoaderButton";

const ResetPasswordForm = ({ isLoading = false, handleSubmit, email, onCancel }) => {
  const [fields, handleFieldChange] = useFormFields({
    email: email || "",
    verificationCode: "",
    newPassword: "",
  });

  const isValidForm = () => {
    return fields.email.length > 0 && fields.verificationCode.length > 0 && fields.newPassword.length > 0;
  };

  const handleSubmitClick = (event) => {
    event.preventDefault();
    handleSubmit(fields.email, fields.verificationCode, fields.newPassword);
  };

  const renderForm = () => {
    return (
      <div className="ResetPasswordForm">
        <Form className="BillingForm" onSubmit={handleSubmitClick}>
          <h2>Change Password</h2>
          <Form.Group size="lg" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control value={fields.email} onChange={handleFieldChange} placeholder="Email Address" />
          </Form.Group>
          <Form.Group size="lg" controlId="verificationCode">
            <Form.Label>Verification Code </Form.Label>
            <Form.Control
              value={fields.verificationCode}
              onChange={handleFieldChange}
              placeholder="Verification Code"
            />
            <Form.Text muted>Please check your email for the code.</Form.Text>
          </Form.Group>
          <Form.Group size="lg" controlId="newPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              value={fields.newPassword}
              type="password"
              onChange={handleFieldChange}
              placeholder="New Password"
            />
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
            <Button block size="lg" variant="primary" onClick={onCancel}>
                Cancel
              </Button>
          </Form.Group>
        </Form>
      </div>
    );
  };

  return renderForm();
};

export default ResetPasswordForm;
