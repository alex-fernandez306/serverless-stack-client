import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useFormFields } from "../libs/hooksLib";
import LoaderButton from "../components/LoaderButton";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";

const ChangePasswordForm = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [fields, handleFieldChange] = useFormFields({
    oldPassword: "",
    newPassword: "",
  });

  const handleSubmitClick = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await Auth.changePassword(user, fields.oldPassword, fields.newPassword);
      await Auth.signOut();
      history.push("/login");
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  };

  const isValidForm = () => {
    return fields.oldPassword.length > 0 && fields.newPassword.length > 0;
  };

  return (
    <div>
      <Form className="BillingForm" onSubmit={handleSubmitClick} autoComplete="off">
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            value={user.attributes.email}
            onChange={handleFieldChange}
            placeholder="Email Address"
            autoComplete="off"
            disabled
          />
        </Form.Group>
        <Form.Group size="lg" controlId="oldPassword">
          <Form.Label>Old Pasword </Form.Label>
          <Form.Control
            value={fields.oldPassword}
            onChange={handleFieldChange}
            type="password"
            autoComplete="off"
            placeholder="Old Password"
          />
        </Form.Group>
        <Form.Group size="lg" controlId="newPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            value={fields.newPassword}
            type="password"
            onChange={handleFieldChange}
            autoComplete="off"
            placeholder="New Password"
          />
        </Form.Group>
        <Form.Group>
          <LoaderButton block size="lg" type="submit" variant="success" isLoading={isLoading} disabled={!isValidForm()}>
            Change Password
          </LoaderButton>
        </Form.Group>
      </Form>
    </div>
  );
};

export default ChangePasswordForm;
